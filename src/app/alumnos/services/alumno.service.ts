import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Alumno} from '../../models/alumno';

@Injectable()

export class AlumnoService {
  
  constructor(
    private http: HttpClient
  ) { }

  obtenerAlumnos(): Observable<Alumno[]>{
    return this.http.get<Alumno[]>('https://63642b338a3337d9a2f2cda3.mockapi.io/alumnos');
  }
  addRowData(row_obj:any){
    const alumno: Alumno = {
      id: Math.round(Math.random()*1000),
      nombre: row_obj.nombre,
      apellido: row_obj.apellido,
      email: row_obj.email,
      telefono: row_obj.telefono,
      edad: row_obj.edad
    }
    this.http.post(`${environment.api}/alumnos/`, alumno, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Alumno añadido.");  
  }

  updateRowData(row_obj:any){
    const alumno: Alumno = {
      id: row_obj.id,
      nombre: row_obj.nombre,
      apellido: row_obj.apellido,
      email: row_obj.email,
      telefono: row_obj.telefono,
      edad: row_obj.edad
    }
    this.http.put<Alumno>(`${environment.api}/alumnos/${alumno.id}`, alumno).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Alumno editado."); 
  }

  delete(id: number) {
    this.http.delete<Alumno>(`${environment.api}/alumnos/${id}`).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Alumno eliminado");
  }
  private manejarError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error del lado del cliente', error.error.message);
    }else{
      console.warn('Error del lado del servidor', error.error.message);
    }
    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }
}