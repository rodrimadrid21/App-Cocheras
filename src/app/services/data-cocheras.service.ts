
import { Injectable } from '@angular/core';
import { iCochera } from '../interfaces/cochera';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataCocherasService {
  cocheras: iCochera[] = [];
  
  headertable = {
    t1: "Nro",
    t2: "Disponibilidad",
    t3: "Ingreso",
    t4: "Acción"
  };

  isAdmin: boolean = true;

  Funcionborrar(){
    this.cocheras = []
  };

  funcionBorrar1(indice: number) {
    this.cocheras.splice(indice, 1)
  };

  ultnro = this.cocheras[this.cocheras.length-1].nro//ultimo numero
  
  Funcionsuma(){
    this.cocheras.push({
      nro: this.ultnro+1,
      dispo: true,
      ingreso: '-',
      acc: '-'
    })
    this.ultnro ++;
  }

  alert(index: number) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Si eliminas esta cochera, no podrás revertirlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.funcionBorrar1(index);
        Swal.fire({
          title: "La cochera fue eliminada.",
          icon: "success"
        });
      }
    });
  }
}


