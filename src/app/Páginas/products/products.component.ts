import { Component, NgModule, OnInit } from '@angular/core';
import { AxiosService } from '../../services/axios.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [FormsModule, RouterModule, NgIf, NgFor],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];

  nombre = '';
  categoriaId: number | null = null;
  cantidad: number | null = null;

  mensajeExito = '';
  mensajeError = '';

  constructor(
    private axiosService: AxiosService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.cargarCategorias();
  }

  async cargarCategorias() {
  this.categoryService.obtenerCategorias().subscribe({
    next: (data) => {
      this.categorias = data;
    },
    error: (error) => {
      console.error('Error al cargar categorías:', error);
    }
  });
}

  async obtenerProductos() {
    try {
      this.productos = await this.axiosService.obtenerProductos();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      this.mensajeError = 'No se pudieron cargar los productos.';
    }
  }

  async agregarProducto() {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.nombre || this.categoriaId == null || this.cantidad == null) {
      this.mensajeError = 'Completa todos los campos.';
      return;
    }

    const nuevoProducto = {
      name: this.nombre,
      quantity: this.cantidad,
      category_id: this.categoriaId
    };

    try {
      const resultado = await this.axiosService.crearProducto(nuevoProducto);
      this.mensajeExito = '¡Producto agregado exitosamente!';
      this.obtenerProductos();
      this.nombre = '';
      this.categoriaId = null;
      this.cantidad = null;
    } catch (error) {
      console.error('Error:', error);
      this.mensajeError = 'Error al agregar el producto.';
    }
  }

  getNombreCategoria(id: number | string): string {
  const cat = this.categorias.find(c => c.id == id);
  return cat ? cat.name : 'Sin nombre';
}


  async removerProducto(producto: any) {
    try {
      await this.axiosService.eliminarProducto(producto.id);
      this.obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      this.mensajeError = 'Error al eliminar el producto.';
    }
  }
}
