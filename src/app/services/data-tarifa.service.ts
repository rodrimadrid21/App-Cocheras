import { inject, Injectable } from '@angular/core';
import { Tarifa } from '../interfaces/tarifa';
import { DataAuthService } from './data-auth.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataTarifasService {
    tarifas: Tarifa[] = []
    authService = inject(DataAuthService);

constructor() { 
    this.getTarifas()
}

async getTarifas(){
    const res = await fetch(environment.API_URL+'Tarifa',{
    headers: {
        authorization:'Bearer '+this.authService.usuario?.token
    },
    })
    if(res.status !== 200) {
    console.log("Error")
    } else {
    console.log(res)
    this.tarifas = await res.json();
    }
}

async createTarifa(tarifa: Tarifa): Promise<void> {
    const res = await fetch(environment.API_URL + 'Tarifa', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + this.authService.usuario?.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarifa)
    });

    if (!res.ok) {
        throw new Error('Error al crear la tarifa');
    } else {
        console.log("Tarifa creada con éxito");
        this.getTarifas(); // Actualiza la lista de tarifas
    }
}

async updateTarifa(tarifa: Tarifa): Promise<void> {
    const res = await fetch(`${environment.API_URL}Tarifa/${tarifa.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + this.authService.usuario?.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarifa)
    });

    if (!res.ok) {
        throw new Error('Error al actualizar la tarifa');
    } else {
        console.log("Tarifa actualizada con éxito");
        this.getTarifas(); // Actualiza la lista de tarifas
    }
}

// Eliminar una tarifa por ID
async deleteTarifa(id: number): Promise<void> {
    const res = await fetch(`${environment.API_URL}Tarifa/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + this.authService.usuario?.token,
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error('Error al eliminar la tarifa');
    } else {
        console.log("Tarifa eliminada con éxito");
        this.getTarifas(); // Actualiza la lista de tarifas
}
}
}