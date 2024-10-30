
import { inject, Injectable } from '@angular/core';
import { iCochera } from '../interfaces/cochera';
import { DataAuthService } from './data-auth.service';
import Swal from 'sweetalert2';
import { Estacionamiento } from '../interfaces/estacionamiento';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {

  cocheras: iCochera[] = [];
  estacionamientos: Estacionamiento[] = []
  authService = inject(DataAuthService);

  constructor() {
    this.loadData()
  }

  async loadData() {
    await this.getCocheras();
    await this.getEstacionamientos();
    this.asociarEstacionamientosConCocheras();
  }

  async getCocheras(){
    const res = await fetch(environment.API_URL+'Cochera',{
      headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
    });
    if(res.status !== 200) return;
    const resJson:iCochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getEstacionamientos() {
    const res = await fetch(environment.API_URL+'Estacionamiento', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem("authToken")
      },
    });
    if(res.status !== 200) return;
    const resJson: Estacionamiento[] = await res.json();
    this.estacionamientos = resJson;
  }

  asociarEstacionamientosConCocheras() {
    this.cocheras = this.cocheras.map(cochera => {
      const estacionamiento = this.estacionamientos.find(e => e.idCochera === cochera.id)
      return {...cochera, estacionamiento}
    });
  }

  //ultimo numero
  ultnro = this.cocheras.length > 0 ? this.cocheras[this.cocheras.length - 1].id : 0;
  //ultimoNumero = this.cocheras.length === 0 ? 0 : this.cocheras[this.cocheras.length-1].numero;

  async agregarCochera(nombreCochera:string){
    const cochera = {"descripcion" : nombreCochera};
    const res = await fetch(environment.API_URL+'Cochera',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
      body: JSON.stringify(cochera)
    })
    if(res.status !== 200) {
      console.log("Error en la creacion de una nueva cochera")
    } else {
      console.log("Creacion de cochera exitosa")
      this.loadData();
    };
  }

  async borrarFila(id:number){
    const res = await fetch(environment.API_URL+`Cochera/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+localStorage.getItem("authToken")
      }
    })
    if (res.status !== 200) {
      console.log('Error en la eliminacion de la cochera')
    } else {
      console.log('Cochera eliminada con exito')
      this.loadData()
    }
  }
  
  async borrarTodo() {
    const res = await fetch(environment.API_URL+'Cochera', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' +localStorage.getItem("authToken")
      }
    });
    if (res.status !== 200) {
      console.log('Error al eliminar todas las cocheras');
    } else {
      console.log('Todas las cocheras han sido eliminadas con éxito');
      this.loadData();
    }
  }

  async deshabilitarCochera(idCochera:number){
    const token = this.authService.getToken();
    if (!token) {
      console.error("Token no disponible");
      return;
    }
    const res = await fetch(environment.API_URL+`Cochera/disable/${idCochera}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer'+token
      },
    })
    if(res.status === 200) {
      console.log("Cochera deshabilitada")
      this.loadData()
    } else {
      console.warn("Error deshabilitando cochera")
    };
  }

  async habilitarCochera(idCochera:number){
    const res = await fetch(environment.API_URL+`Cochera/enable/${idCochera}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer'+localStorage.getItem("authToken")
      },
    })
    if(res.status === 200) {
      console.log("Cochera habilitada")
      this.loadData()
    } else {
      console.warn("Error habilitando cochera")
    };
  }

  async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number) {
    const token = this.authService.getToken();
    if (!token) {
      console.error("Token no disponible");
      return;
    }
    const body = { patente, idUsuarioIngreso, idCochera };
    const res = await fetch(`${environment.API_URL}Estacionamiento/abrir`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });
    if (res.status !== 200) {
      console.log("Error en abrir estacionamiento");
    } else {
      console.log("Creación de estacionamiento exitoso");
      this.loadData();
    }
  } 
  async cerrarEstacionamiento(patente: string, idUsuarioEgreso: string) {
    const body = {patente, idUsuarioEgreso};
    const res = await fetch(environment.API_URL+'Estacionamiento/cerrar',{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en el cerrado del estacionamiento")
    } else {
      console.log("Cerrado del estacionamiento exitoso")
      console.log(res)
      this.loadData();
    };   
  }

  async deleteEstacionamiento(id: number): Promise<void> {
    const token = this.authService.getToken();
    if (!token) {
      console.error("Token no disponible");
      return;
    }

    return fetch(`${environment.API_URL}Estacionamiento/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token  // Se incluye el token para la autenticación
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error("Error al eliminar el estacionamiento.");
      }
          // Si la eliminación es exitosa, actualizamos la lista local de cocheras
    this.cocheras = this.cocheras.filter(cochera => cochera.id !== id);
  }).catch(error => {
    console.error('Error al eliminar el estacionamiento:', error);
    });
  }
}

