import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:3000/api/stock';
  private categoryUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(this.categoryUrl, categoria);
  }

  getResumenStock(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen`);
  }

  getResumenPorCategoria(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen/categoria`);
  }

  getResumenPorProducto(): Observable<any> {
    return this.http.get(`${this.apiUrl}/resumen/producto`);
  }

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos`);
  }

  getCategorias(): Observable<any> {
    return this.http.get(this.categoryUrl);
  }

  getProductosPorCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/productos/categoria/${categoriaId}`);
  }
  
}
