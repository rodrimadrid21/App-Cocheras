import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-cochera',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register-cochera.component.html',
  styleUrl: './register-cochera.component.scss'
})
export class RegisterCocheraComponent {
  errorRegister = false;
  authService = inject(DataAuthService)
  router = inject(Router)

  async register(registerForm: NgForm) {
    const {username, nombre, apellido, password} = registerForm.value;
    const registerData = {username, nombre, apellido, password};

    const res = await this.authService.register(registerData)

    if(res?.statusText === "Created") {
      this.router.navigate(['/login']).then(() => {
        Swal.fire("Registro exitoso", "", "success");
      })
    } else this.errorRegister = true;
  }
}
