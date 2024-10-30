import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Precio } from '../interfaces/precios';


@Injectable({
  providedIn: 'root'
})
export class DataPreciosService {

  constructor() { }

  // Obtener todos los precios
  async getPrecios(): Promise<Precio[]> {
    const res = await fetch(environment.API_URL + 'Tarifa', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error('Error al obtener los precios');
    }
    return await res.json();
  }

  // Actualizar un precio existente
  async updatePrecio(precio: Precio): Promise<void> {
    const res = await fetch(`${environment.API_URL + 'Tarifa'}/${precio.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(precio)
    });

    if (!res.ok) {
      throw new Error('Error al actualizar el precio');
    }
  }

  // Borrar un precio
  async deletePrecio(id: number): Promise<void> {
    const res = await fetch(`${environment.API_URL + 'Tarifa'}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error('Error al borrar el precio');
    }
  }

  // Crear un nuevo precio
  async createPrecio(precio: Precio): Promise<void> {
    const res = await fetch(environment.API_URL + 'Tarifa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(precio)
    });

    if (!res.ok) {
      throw new Error('Error al crear el precio');
    }
  }
}