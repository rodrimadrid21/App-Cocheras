import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {//VER
  
  authService = inject(DataAuthService); // Inyecta el servicio

  router = inject(Router);

  errorLogin = false;

  //opcion 1
  async login(loginForm: NgForm){
    const {username, password} = loginForm.value;
    const loginData = {username, password};
    
    const res = await this.authService.login(loginData)

    if(res?.statusText === "OK") this.router.navigate(['/dashboard/estado-cocheras']);
    
    else this.errorLogin = true;
  }
  //opcion 2 (Login con .then)
  // login(){
  //   console.log('Comienzo login') //1.
  //   fetch('http://localhost:4000/login',{ {//le manda una solicitud al back
  //     method: 'POST',
  //     headers: {
  //       'Content-type':'application/json'
  //     },
  //     body: JSON.stringify(this.loginData)
  //   }).then(res => { //es para leer los datos de la respuesta pero funciona igual
  //     console.log('Tengo respuesta del back',res) //3. Este es tercero porque tardo en responder el back, como 20milisegundos
  //     res.json().then((resJson:ResLogin) => { //desifra el body el segundo then
  //       console.log(resJson)
  //     })
  //   })
  //   console.log('Despues del fetch') //2.
  // }
}
