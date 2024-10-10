import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, ResLogin } from '../interfaces/login';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  usuario: Usuario | undefined;

  constructor(private http: HttpClient) { }

  login(loginData: Login): Observable<ResLogin> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResLogin>('http://localhost:4000/login', loginData, { headers });
  }

  register(loginData: Login): Observable<ResLogin> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResLogin>('http://localhost:4000/register', loginData, { headers });
  }

  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  getUsuario(): Usuario | undefined {
    return this.usuario;
  }
}
