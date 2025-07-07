import { Component, NgModule, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  rolesDisponibles: string[] = ['Admin', 'Editor', 'Encargado', 'Vendedor'];

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  usuarioEditando: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.obtenerUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  agregarUsuario(): void {
    this.userService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.nuevoUsuario = { nombre: '', email: '', password: '', rol: '' };
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
      }
    });
  }

  iniciarEdicion(usuario: any): void {
    this.usuarioEditando = { ...usuario }; // Clonar datos para editar
  }

  guardarEdicion(): void {
    if (!this.usuarioEditando) return;

    this.userService.actualizarUsuario(this.usuarioEditando.id, this.usuarioEditando).subscribe({
      next: () => {
        this.usuarioEditando = null;
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }

  cancelarEdicion(): void {
    this.usuarioEditando = null;
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.eliminarUsuario(id).subscribe({
        next: () => this.cargarUsuarios(),
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
        }
      });
    }
  }
}
