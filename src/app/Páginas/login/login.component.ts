import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.usuario);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.mensajeError = 'Credenciales inválidas. Intenta de nuevo.';
        setTimeout(() => this.mensajeError = '', 3000); // Oculta el mensaje en 3 segundos
      }
    });
  }
}
