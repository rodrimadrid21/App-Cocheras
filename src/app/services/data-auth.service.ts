import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';
import { Register, ResRegister } from '../interfaces/register';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  constructor() {
    const token = this.getToken();
    if(token){
      if(!this.usuario) this.usuario = {
        username: '',
        token: token,
        isAdmin: false
      }
      else this.usuario!.token = token;
    }
   }
  
  usuario: Usuario | undefined;

  async login(loginData: Login) {
    const res = await fetch(environment.API_URL+'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });
  
      // Si la respuesta es exitosa (código 200)
      if (res.status !== 200) return;
  
      const resJson: ResLogin = await res.json();
  
      // Si se recibe un token, considera el login exitoso
      if (!resJson.token) return;
  
      this.usuario = {
          username: loginData.username,
          token: resJson.token,
          isAdmin: false
      };

      localStorage.setItem("authToken", resJson.token);
  
      const userDetailsRes = await fetch(environment.API_URL+`usuarios/${encodeURIComponent(loginData.username)}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${resJson.token}`,
              'Content-Type': 'application/json'
          }
      });
  
      if (userDetailsRes.status !== 200) return;
  
      const userDetailsResJson = await userDetailsRes.json();
  
      this.usuario.isAdmin = userDetailsResJson.isAdmin;
  
      return userDetailsRes;
    }

    async register(registerData: Register) {
      const res = await fetch(environment.API_URL+'register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
      });
  
      if (res.status !== 201) return;
      return res;
    }

//async register(registerData: Register) {
//  try {
//    const res = await fetch(environment.API_URL+'register-cochera', {
//      method: 'POST',
//      headers: {
//        'Content-type': 'application/json'
//      },
//      body: JSON.stringify(registerData)
//    });
//    
//    if (res.status !== 201) {
//      const errorData = await res.json(); // Captura el cuerpo de la respuesta con más detalles
//      throw new Error(errorData.message || 'Error en el registro');
//    }
//    
//    return res;
//  } catch (error) {
//    console.error('Error en el servicio de registro:', error);
//    throw error; // Vuelve a lanzar el error para manejarlo en el componente
//  }
//}

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  getUsuario(): Usuario | undefined {
    return this.usuario;
  }

  getToken() {
    return localStorage.getItem("authToken")
  }
  clearToken() {
    localStorage.removeItem("authToken")
  }
}
