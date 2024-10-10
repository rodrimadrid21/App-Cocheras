import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login, ResLogin } from '../../interfaces/login';
import { DataAuthService } from '../../services/data-auth.service';
import { FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {//VER
  //le damos la forma con la interface

  loginData: Login = {
    username: 'admin',
    password: 'admin'
  };

  router = inject(Router);
 authService = inject(DataAuthService); // Inyecta el servicio

//opcion 1
//login(){
  //console.log("comienzo del login-1")
  //fetch('http://localhost:4000/login', {//le manda una solicitud al back
  //  method: 'POST',
  //  headers: {
  //    'Content-type': 'application/json'
  //  },
  //  body: JSON.stringify(this.loginData)
  //}).then(res => {//es para leer los datos de la respuesta pero funciona igual
  //  console.log("tengo resp del back-3")//este es tercero porque tardo en responder el back, como 20milisegundos
  //  res.json().then(resJson => {//desifra el body el segundo then
  //    console.log(resJson)
  //  })
  //})
  //console.log("despues del fech-2")

  //opcion 2

  //async login(){
  //  const res = await fetch('http://localhost:4000/login', {//le manda una solicitud al back
  //    method: 'POST',
  //    headers: {
  //      'Content-type': 'application/json'
  //    },
  //    body: JSON.stringify(this.loginData)
  //  })
  //  if(res.status !=200) return;
  //  const resJson:ResLogin = await res.json();
  //  if(!resJson.token) return;
  //  this.authService.usuario = {
  //    username: this.loginData.username,
  //    token: resJson.token,
  //    isAdmin: false
  //  }
  //    const newLocal = this;
  //  newLocal.router.navigate(['dashboard/estado-cocheras']);
  //}


  
  errorLogin = false;
async login(loginForm: NgForm){
  const {username, password} = loginForm.value;
  const loginData: Login = {username, password}
  const res = await this.authService.login(loginData)
  if(res?.status === "ok") this.router.navigate(['/dashboard/estado-cocheras']);
  else this.errorLogin = true;
}
//if(res?.subscribe(x => x.status=== "ok")) this.router.navigate(['/dashboard/estado-cocheras']);
//else this.errorLogin = true;
//}

  async register(){
    const res = await fetch('http://localhost:4000/login', {//le manda una solicitud al back
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.loginData)
    })
    if(res.status !=200) return;
    const resJson:ResLogin = await res.json();
    if(!resJson.token) return;
    this.authService.usuario = {
      username: this.loginData.username,
      token: resJson.token,
      isAdmin: false
    }
      const newLocal = this;
    newLocal.router.navigate(['/register-cochera']);
  }

}
