import { inject, Injectable } from '@angular/core';
import { iCochera } from '../interfaces/cochera';
import Swal from 'sweetalert2';
import { DataAuthService } from './data-auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {
  cocheras: iCochera[] = [];
  authService = inject(DataAuthService);

  router= inject(Router);

  constructor() {
    this.getCocheras()
  }

  async getCocheras(){
    const res = await fetch('http://localhost:4000/cocheras',{
      headers: {
        authorization:'Bearer '+this.authService.usuario?.token
      },
    })
    if(res.status !== 200) return;
    const resJson:iCochera[] = await res.json();
    this.cocheras = resJson;
  }

  ultimoNumero = this.cocheras[this.cocheras.length - 1]?.id || 0;
  agregarCochera() {
    this.cocheras.push({
      id: this.ultimoNumero + 1,
      descripcion: "-",
      deshabilitada: 0,
      eliminada: 0
    });
    this.ultimoNumero++; 
  }

  toggleDisponibilidad(index: number) {
    if (this.cocheras[index].deshabilitada === 1) {
      this.cocheras[index].deshabilitada = 0;
    } else {
      this.cocheras[index].deshabilitada = 1;
    }
  }

  confirmDeleteCochera(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta cochera será eliminada permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarCochera(index);
        Swal.fire('¡Eliminado!', 'La cochera ha sido eliminada exitosamente.', 'success');
      }
    });
  }

  borrarCochera(index: number) {
    this.cocheras.splice(index, 1); 
  }

  confirmLogout(event: Event) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Cerrando sesión!',
          text: 'Has cerrado sesión exitosamente.',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}