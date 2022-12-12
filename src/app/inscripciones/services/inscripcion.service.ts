import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${environment.api2}/inscripciones`);
  }

  agregarInscripciones(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${environment.api2}/inscripciones`, inscripcion);
  }

  editarInscripciones(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${environment.api2}/inscripciones/${inscripcion.id}`, inscripcion);
  }

  eliminarInscripciones(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.delete<Inscripcion>(`${environment.api2}/inscripciones/${inscripcion.id}`);
  }
}