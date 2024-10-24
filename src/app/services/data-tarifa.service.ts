import { inject, Injectable } from '@angular/core';
import { DataAuthService } from './data-auth.service';
import { Tarifa } from '../interfaces/tarifa'
import { environment } from '../../environments/environment.development';
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
    const res = await fetch(environment.API_URL+'tarifas',{
    headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
    },
    })
    if(res.status !== 200) {
    console.log("Error")
    } else {
    console.log(res)
    this.tarifas = await res.json();
    }
    }
}