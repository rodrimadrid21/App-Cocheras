import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { EstadoCocherasComponent } from '../estado-cocheras/estado-cocheras.component';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, EstadoCocherasComponent],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})
export class DashboardContentComponent {
  isAdmin = true;
  menu = false;
  authService = inject(DataAuthService);
  router = inject(Router);

  toggleMenu(): void {
    this.menu = !this.menu;
  }

  cerrarSesion(){
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
