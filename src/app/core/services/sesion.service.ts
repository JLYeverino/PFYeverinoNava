import { Injectable } from '@angular/core';
import { Sesion } from 'src/app/models/sesion';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  sesionSubject!: BehaviorSubject<Sesion>;
  
  constructor(private http: HttpClient,
    private router: Router
    ) { 
    const sesion: Sesion = {
      sesionActiva: false
    };
    this.sesionSubject = new BehaviorSubject(sesion);
  }

  login(user: Usuario){
    this.http.get<Usuario[]>(`${environment.api}/usuarios`).pipe(
      map((usuarios: Usuario[]) => 
        usuarios.filter((u: Usuario) => u.usuario === user.usuario && u.contrasena===user.contrasena)[0]
      )).subscribe((usuario) => {
        if(usuario){
          const sesion: Sesion = {
            sesionActiva: true,
            usuarioActivo: usuario
          };
          this.sesionSubject.next(sesion);
          this.router.navigate(['inicio']);
        }
      })
  }

  // login(usuario: Usuario): Observable<Usuario>{
  //   return this.http.get<Usuario[]>(`${environment.api}/usuarios`).pipe(
  //     map((usuarios: Usuario[]) => {
  //       return usuarios.filter((u: Usuario) => u.usuario === usuario.usuario && u.contrasena===usuario.contrasena)[0]
  //     }));
  // }

  logOut() {
    const sesion: Sesion = {
      sesionActiva: false
    }
    this.sesionSubject.next(sesion);
  }
  obtenerSesion(): Observable<Sesion>{
    return this.sesionSubject.asObservable();
  }
}
