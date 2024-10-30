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
      if(!this.usuario){ 
        this.usuario = {
        username: '',
        token: token,
        isAdmin: false
      };
    } else { 
      this.usuario!.token = token;
    }
  } else {
    this.clearToken();  // Si no hay token válido, limpiar el almacenamiento
  }
}
  
  usuario: Usuario | undefined;

  async login(loginData: Login) {
    try {
        const res = await fetch(`${environment.API_URL}Authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error en el inicio de sesión:", errorText);
            return;
        }
        const token = await res.text();
        if (!token) {
            console.error("No se recibió un token de autenticación.");
            return;
        }
        this.usuario = {
            username: loginData.username,
            token: token,
            isAdmin: false
        };
        localStorage.setItem("authToken", token);
        const userDetailsRes = await fetch(`${environment.API_URL}User/by-username/${encodeURIComponent(loginData.username)}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });     
        if (!userDetailsRes.ok) {
            const errorDetails = await userDetailsRes.text();
            console.error("Error en la solicitud de detalles del usuario:", errorDetails);
            return;
        }
        const userDetailsResJson = await userDetailsRes.json();
        this.usuario.isAdmin = userDetailsResJson.isAdmin;
        return userDetailsRes;
    } catch (error) {
        console.error("Error en el proceso de inicio de sesión:", error);
        return null;
      }
  }

    async register(registerData: Register) {
      const res = await fetch(environment.API_URL+'User/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(registerData)
      });
  
      if (res.status !== 200) return;
      return res;
    }

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
