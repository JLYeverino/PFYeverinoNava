import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Curso} from 'src/app/models/cursos';
import {CursoService} from 'src/app/cursos/services/curso.service';
import {DialogCursoComponent} from '../dialog-curso/dialog-curso.component';
import { Observable, Subscription } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.css']
})
export class AbmCursoComponent implements OnInit, OnDestroy  {
  sesion$!: Observable<Sesion>;
  ELEMENT_DATA = new MatTableDataSource<Curso>()
  displayedColumns: string[] = ['nombre','profesor','fechaInicio','fechaFin','clases','edit','delete'];
  newSubscription?: Subscription;
  constructor(
    private dialog: MatDialog,
    private cursoService: CursoService,
    private sesionService: SesionService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerSesion();
    this.getCourses();
  }
  ngOnDestroy(): void {
    this.newSubscription?.unsubscribe();
  }
  getCourses(){
    this.newSubscription = this.cursoService.obtenercursos()
    .subscribe({
      next: (courses: Curso[]) => {
        this.ELEMENT_DATA.data = courses;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  openDialog(action:string,obj:any) {
    obj.action = action;
    const dialog = this.dialog.open(DialogCursoComponent, {
      width: '30%',
      height: '85%',
      panelClass: 'custom-modalbox',
      data:obj,
    });
    dialog.afterClosed().subscribe(result => {
      if(result.event == 'Guardar'){
        this.cursoService.addRowData(result.data);
        this.getCourses();
      }
      else if(result.event == 'Editar'){
        this.cursoService.updateRowData(result.data);
        this.getCourses();
      }
    });
  }

  eliminarCurso(id: number){
    this.cursoService.delete(id);
    this.getCourses();
  }
}