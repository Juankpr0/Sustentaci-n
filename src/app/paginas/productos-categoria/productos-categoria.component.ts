import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-productos-categoria',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './productos-categoria.component.html',
  styleUrls: ['./productos-categoria.component.css']
})
export class ProductosPorCategoriaComponent implements OnInit {
  productos: any[] = [];
  categoriaNombre = '';
  cargando = true;
  mensajeError = '';

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.stockService.getProductosPorCategoria(Number(id)).subscribe({
      next: (data) => {
        console.log('Respuesta del backend:', data); 
        this.productos = data;
        this.categoriaNombre = data[0]?.categoria || 'Sin categoría';
        this.cargando = false;
      },
      error: (err) => {
        this.mensajeError = 'Error al cargar los productos.';
        this.cargando = false;
      }
    });
  }
}


  editarProducto(producto: any) {
    console.log('Editar producto:', producto);
  }

  eliminarProducto(producto: any) {
    console.log('Eliminar producto:', producto);
  }
}