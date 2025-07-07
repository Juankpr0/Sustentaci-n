import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  private usuarioSubject = new BehaviorSubject<any>(this.obtenerUsuario());
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión
  login(email: string, password: string) {
    return this.http.post<{ token: string, usuario: any }>(`${this.apiUrl}/login`, { email, password });
  }

  // Guardar token y usuario, y emitir el usuario actual
  guardarSesion(token: string, usuario: any) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.usuarioSubject.next(usuario); // 🔴 Emite el nuevo usuario
    }
  }

  // Obtener token
  obtenerToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Obtener usuario actual
  obtenerUsuario(): any {
    if (this.isBrowser()) {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  // Cerrar sesión y emitir null
  cerrarSesion() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null); // 🔴 Emite null al cerrar sesión
    }
    this.router.navigate(['/login']);
  }

  // Verificar si está autenticado
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  // Método esperado por el AuthGuard
  isLoggedIn(): boolean {
    return this.estaAutenticado();
  }

  // Verifica si se está ejecutando en navegador (no en SSR o test)
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
