import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorRegister = false;
  authService = inject(DataAuthService)
  router = inject(Router)

  async register(registerForm: NgForm){
    const {username, nombre, apellido, password} = registerForm.value;
    const registerData = {username, nombre, apellido, password};
    
    const res = await this.authService.register(registerData)

    if(res?.statusText === "Created") {
      this.router.navigate(['/login']).then(() => {
        Swal.fire("Registro exitoso", "", "success");
      })
    } else this.errorRegister = true;
  }
}


//export class RegisterComponent {
//  errorRegister = false;
//  authService = inject(DataAuthService)
//  router = inject(Router)
//
//  async register(registerForm: NgForm){
//    const {username, nombre, apellido, password} = registerForm.value;
//    const registerData = {username, nombre, apellido, password};
//    
//    const res = await this.authService.register(registerData)//espera la respuesta del registro
//
//    if(res?.statusText === "Created") {
//      this.router.navigate(['/login']).then(() => {
//        Swal.fire("Registro exitoso", "", "success");
//      })
//    } else this.errorRegister = true;
//  }

  //async register(registerForm: NgForm) {
  //  const { username, email, password, confirmPassword } = registerForm.value;
  //
  //    // Verifica que los campos no estén vacíos
  //if (!username || !email || !password || !confirmPassword) {
  //  Swal.fire("Todos los campos son obligatorios", "", "warning");
  //  return;
  //}
  //  // Verifica si las contraseñas coinciden antes de intentar el registro
  //  if (password !== confirmPassword) {
  //    Swal.fire("Las contraseñas no coinciden", "", "error");
  //    // Limpia los campos de contraseña y confirmación
  //    registerForm.controls['password'].setValue('');
  //    registerForm.controls['confirmPassword'].setValue('');
  //    return; // Salez de la función
  //  }
  //  // Si las contraseñas coinciden, procede con el registro
  //  const registerData = { username, email, password, confirmPassword };
  //  try {
  //    const res = await this.authService.register(registerData);//espera la respuesta del registro
  //    if (res?.statusText === "Created") {
  //      this.router.navigate(['/login']).then(() => {
  //        Swal.fire("Registro exitoso", "", "success");
  //      });
  //    } else {
  //      this.errorRegister = true;
  //    }
  //  } catch (error) {
  //    console.error('Error en el proceso de registro:', error);
  //    Swal.fire("Ocurrió un error durante el registro", "", "error");
  //  }
  //}
  //


