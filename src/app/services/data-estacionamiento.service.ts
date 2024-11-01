import { Injectable, inject } from '@angular/core';
import { DataCocherasService } from './data-cocheras.service';
import { Estacionamiento } from '../interfaces/estacionamiento';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataEstacionamientosService {
  ultimasTransacciones: Estacionamiento[] = [];

  constructor() {
    this.getUltimasTransacciones();
  }

  async getUltimasTransacciones(cantidad = 5) {
    const res = await fetch(`${environment.API_URL}Estacionamiento/UltimasTransacciones?cantidad=${cantidad}`, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem("authToken")
        }
    });

    if (res.status !== 200) {
        console.error("Error al obtener las últimas transacciones");
        return;
    }

    // Asigna la respuesta directamente ya que ahora incluye la cochera con su descripción
    this.ultimasTransacciones = await res.json();
    console.log(this.ultimasTransacciones);
  }
}
