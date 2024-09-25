import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataCocherasService } from '../../services/data-cocheras.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  // Inyecta el servicio
  dataCocheraService = inject(DataCocherasService)

  // Getters para acceder a los datos y métodos del servicio
  get headertable() {
    return this.dataCocheraService.headertable;
  }

  get cocheras() {
    return this.dataCocheraService.cocheras;
  }

  get isAdmin() {
    return this.dataCocheraService.isAdmin;
  }
  
  // Método para alternar el estado de la cochera
  toggleCochera(index: number) {
    this.dataCocheraService.toggleCochera(index);
  }

  // Métodos para llamar a las funciones del servicio
  Funcionsuma() {
    this.dataCocheraService.Funcionsuma();
  }

  habilitarCochera(index:number) {
    this.dataCocheraService.habilitarCochera(index)
  }

  deshabilitarCochera(index:number) {
    this.dataCocheraService.deshabilitarCochera(index)
  }

  alert(index: number) {
    this.dataCocheraService.alert(index);
  }

  Funcionborrar() {
    this.dataCocheraService.Funcionborrar();
  }

  

}