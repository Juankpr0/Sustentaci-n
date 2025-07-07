import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id?: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  // 🟢 Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  // 🔵 Obtener categoría por ID
  getCategoriaPorId(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  // 🟢 Crear nueva categoría (con FormData si es necesario)
  crearCategoria(categoria: Categoria | FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  // 🟡 Editar categoría
  editarCategoria(id: number, categoria: Categoria | FormData): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  // 🔴 Eliminar categoría
  eliminarCategoria(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/${id}`);
  }

  // 📊 Obtener resumen por categoría
  getResumenCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resumen`);
  }
}
