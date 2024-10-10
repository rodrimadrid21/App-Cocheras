import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, Router} from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { DataCocherasService } from '../../services/data-cocheras.service';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-estado-cocheras',
  standalone: true,
  imports: [RouterModule, NgClass, CommonModule],
  templateUrl: './estado-cocheras.component.html',
  styleUrl: './estado-cocheras.component.scss'
})
export class EstadoCocherasComponent {
  // Inyecta el servicio
  authService = inject(DataAuthService);
  titulo: string = "Parking App";

  isAdmin: boolean = true;

  dataCocherasService = inject(DataCocherasService);

  constructor(private router: Router) {} 
  agregarCochera() {
    this.dataCocherasService.agregarCochera();
  }

  toggleDisponibilidad(index: number) {
    this.dataCocherasService.toggleDisponibilidad(index);
  }

  confirmDeleteCochera(index: number) {
    this.dataCocherasService.confirmDeleteCochera(index);
  }

  confirmLogout(event: Event) {
    this.dataCocherasService.confirmLogout(event);
  }

}