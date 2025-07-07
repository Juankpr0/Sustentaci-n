import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  quantity: number;
  category_id: number;
  imageUrl?: string;
  vendidos?: number;
}

export interface Salida {
  productoId: number | string;
  cantidad: number;
  fecha: string;
  hora: string;
  nota?: string;
  responsable: string;
}

export interface Notificacion {
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
}

export interface Categoria {
  id: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  private salidasUrl = 'http://localhost:3000/api/salidas';
  private notificacionesUrl = 'http://localhost:3000/api/notifications';
  private categoriasUrl = 'http://localhost:3000/api/categories'; // ✅ Añadido

  constructor(private http: HttpClient) {}

  // 🔄 Obtener todos los productos
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // ➕ Crear un nuevo producto
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // ✏️ Actualizar producto por ID
  update(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  // ❌ Eliminar un producto
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 📤 Registrar una salida de producto
  registrarSalida(salida: Salida): Observable<any> {
    return this.http.post<any>(this.salidasUrl, salida);
  }

  // 📋 Obtener todas las salidas registradas
  getSalidas(): Observable<Salida[]> {
    return this.http.get<Salida[]>(this.salidasUrl);
  }

  // 🔔 Registrar una notificación
  registrarNotificacion(mensaje: string, tipo: Notificacion['tipo'] = 'info'): Observable<any> {
    return this.http.post<any>(this.notificacionesUrl, { mensaje, tipo });
  }

  // 📚 Obtener categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl);
  }
}
