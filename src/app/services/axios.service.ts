import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  private baseUrl = 'http://127.0.0.1:8000/api'; // Cambia esto por la URL de tu backend

  constructor() { }

  async obtenerDatos() {
    try {
      const respuesta = await axios.get(`${this.baseUrl}/datos`);
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener datos:', error);
      throw error;
    }
  }

  async enviarDatos(payload: any) {
    try {
      const respuesta = await axios.post(`${this.baseUrl}/guardar`, payload);
      return respuesta.data;
    } catch (error) {
      console.error('Error al enviar datos:', error);
      throw error;
    }
  }
}
