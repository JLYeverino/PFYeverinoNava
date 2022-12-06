import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../../models/cursos';
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(
    private http: HttpClient
  ) { }

  obtenercursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>('https://63642b338a3337d9a2f2cda3.mockapi.io/cursos');
  }
  addRowData(row_obj:any){
    const curso: Curso = {
      id: Math.round(Math.random()*1000),
      nombre: row_obj.nombre,
      profesor: row_obj.profesor,
      fechaInicio: row_obj.fechaInicio,
      fechaFin: row_obj.fechaFin,
      clases: row_obj.clases
    }
    this.http.post(`${environment.api}/cursos/`, curso, {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'encoding': 'UTF-8'
      })
    }).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Curso añadido.");  
  }

  updateRowData(row_obj:any){
    const curso: Curso = {
      id: row_obj.id,
      nombre: row_obj.nombre,
      profesor: row_obj.profesor,
      fechaInicio: row_obj.fechaInicio,
      fechaFin: row_obj.fechaFin,
      clases: row_obj.clases
    }
    this.http.put<Curso>(`${environment.api}/cursos/${curso.id}`, curso).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Curso editado."); 
  }

  delete(id: number) {
    this.http.delete<Curso>(`${environment.api}/cursos/${id}`).pipe(
      catchError(this.manejarError)
    ).subscribe(console.log);
    alert("Curso eliminado");
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