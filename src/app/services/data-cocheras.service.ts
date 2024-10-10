
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

  toggleCochera(index: number) {
  this.cocheras[index].dispo = this.cocheras[index].dispo === 'Ocupado' ? 'Disponible' : 'Ocupado';
  }

  // Método para obtener las cocheras
  getCocheras() {
    return this.cocheras;
  }

  Funcionborrar(){
    this.cocheras = []
  };

  deshabilitarCochera(index:number){
    this.cocheras[index].dispo = "Ocupado";
  }

  habilitarCochera(index:number){
    this.cocheras[index].dispo = "Disponible";
  }

  funcionBorrar1(indice: number) {
    this.cocheras.splice(indice, 1)
  };
  
//ultimo numero
  ultnro = this.cocheras.length > 0 ? this.cocheras[this.cocheras.length - 1].nro : 0;

  Funcionsuma(){
    this.cocheras.push({
      nro: this.ultnro+1,
      dispo: "Disponible",
      nodispo: "Ocupado",
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


