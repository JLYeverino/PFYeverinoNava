import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Clase} from '../../models/clases';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerClases(): Observable<Clase[]>{
    return this.http.get<Clase[]>('https://63642b338a3337d9a2f2cda3.mockapi.io/clases');
  }
  addRowData(row_obj:any){
    const clase: Clase = {
      id: Math.round(Math.random()*1000),
      nombre: row_obj.nombre,
      duracion: row_obj.duracion,
      curso: row_obj.curso
    }
    this.http.post(`${environment.api}/clases/`, clase, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Clase añadida."); 
  }

  updateRowData(row_obj:any){
    const clase: Clase = {
      id: row_obj.id,
      nombre: row_obj.nombre,
      duracion: row_obj.duracion,
      curso: row_obj.curso
    }
    this.http.put<Clase>(`${environment.api}/clases/${clase.id}`, clase).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Clase editada.");
  }

  delete(id: number) {
    this.http.delete<Clase>(`${environment.api}/clases/${id}`).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Clase eliminada.");
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