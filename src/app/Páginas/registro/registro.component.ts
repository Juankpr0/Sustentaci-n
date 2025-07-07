import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  rol = '';

  constructor(private http: HttpClient, private router: Router) {}
  onRegister() {
    const userData = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.http.post('http://localhost:3000/api/register', userData).subscribe({
      next: (res: any) => {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar el usuario');
      }
    });
  }
}
