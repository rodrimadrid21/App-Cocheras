
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


  // Método para obtener las cocheras
  async getCocheras(){
    const res = await fetch(environment.API_URL+'cocheras',{
      headers: {
        authorization:'Bearer '+localStorage.getItem("authToken")
      },
    });
    if(res.status !== 200) return;
    const resJson:iCochera[] = await res.json();
    this.cocheras = resJson;
  }

  async getEstacionamientos() {
    const res = await fetch(environment.API_URL+'estacionamientos', {
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
    const res = await fetch(environment.API_URL+'dashboard/cocheras',{
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

  async borrarFila(index:number){
    const res = await fetch(environment.API_URL+`/dashboard/cocheras/${index}`,{
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
    const res = await fetch(environment.API_URL+'/dashboard/cocheras', {
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
    const res = await fetch(environment.API_URL+'/dashboard/cocheras/'+idCochera+'/disable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer'+localStorage.getItem("authToken")
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
    const res = await fetch(environment.API_URL+'/dashboard/cocheras/'+idCochera+'/enable', {
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

  //alert(index: number) {
  //  Swal.fire({
  //    title: "¿Estás seguro?",
  //    text: "Si eliminas esta cochera, no podrás revertirlo.",
  //    icon: "warning",
  //    showCancelButton: true,
  //    confirmButtonColor: "#3085d6",
  //    cancelButtonColor: "#d33",
  //    confirmButtonText: "Sí, estoy seguro",
  //    cancelButtonText: "Cancelar"
  //  }).then((result) => {
  //    if (result.isConfirmed) {
  //      this.funcionBorrar1(index);
  //      Swal.fire({
  //        title: "La cochera fue eliminada.",
  //        icon: "success"
  //      });
  //    }
  //  });
  //}

  async abrirEstacionamiento(patente: string, idUsuarioIngreso: string, idCochera: number) {
    const body = {patente, idUsuarioIngreso, idCochera};
    const res = await fetch(environment.API_URL+'estacionamientos/abrir',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("authToken")
      },
      body: JSON.stringify(body)
    })
    if(res.status !== 200) {
      console.log("Error en abrir estacionamiento")
    } else {
      console.log("Creacion de estacionamiento exitoso")
      this.loadData()
    };
  }  
  async cerrarEstacionamiento(patente: string, idUsuarioEgreso: string) {
    const body = {patente, idUsuarioEgreso};
    const res = await fetch(environment.API_URL+'estacionamientos/cerrar',{
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
}

