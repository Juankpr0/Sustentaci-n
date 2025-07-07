import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notificacion {
  id?: number;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private readonly apiUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) {}

  /** Obtiene todas las notificaciones */
  getNotificaciones(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  /** Registra una nueva notificación */
  registrarNotificacion(
    mensaje: string,
    tipo: 'info' | 'success' | 'warning' | 'error' = 'info'
  ): Observable<Notificacion> {
    const payload = { mensaje, tipo };
    return this.http.post<Notificacion>(this.apiUrl, payload);
  }
}
