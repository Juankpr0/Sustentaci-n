import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasService, Notificacion } from '../../services/alertas.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit, OnDestroy {
  notificaciones: Notificacion[] = [];
  private intervaloSub!: Subscription;

  constructor(private alertasService: AlertasService) {}

  ngOnInit(): void {
    this.cargarNotificaciones();

    // Actualizar notificaciones cada 15 segundos
    this.intervaloSub = interval(10000).subscribe(() => {
      this.cargarNotificaciones();
    });
  }

  ngOnDestroy(): void {
    if (this.intervaloSub) this.intervaloSub.unsubscribe();
  }

  cargarNotificaciones(): void {
    this.alertasService.getNotificaciones().subscribe({
      next: (data) => this.notificaciones = data,
      error: (err) => console.error('❌ Error al cargar notificaciones:', err)
    });
  }

  getIconoClase(tipo: string): string {
    switch (tipo) {
      case 'success': return 'bi bi-check-circle-fill text-success';
      case 'warning': return 'bi bi-exclamation-triangle-fill text-warning';
      case 'error': return 'bi bi-x-circle-fill text-danger';
      default: return 'bi bi-info-circle-fill text-info';
    }
  }

  extraerResponsable(mensaje: string): string | null {
    const match = mensaje.match(/responsable\s*:\s*(.+)$/i);
    return match ? match[1] : null;
  }
}
