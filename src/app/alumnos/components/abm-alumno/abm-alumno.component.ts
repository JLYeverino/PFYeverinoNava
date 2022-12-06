import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Alumno} from 'src/app/models/alumno';
import {AlumnoService} from 'src/app/alumnos/services/alumno.service';
import {DialogAlumnoComponent} from '../dialog-alumno/dialog-alumno.component';
import { Observable, Subscription } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/core/services/sesion.service';

@Component({
  selector: 'app-abm-alumno',
  templateUrl: './abm-alumno.component.html',
  styleUrls: ['./abm-alumno.component.css']
})
export class AbmAlumnoComponent implements OnInit, OnDestroy {
  sesion$!: Observable<Sesion>;
  ELEMENT_DATA = new MatTableDataSource<Alumno>()
  displayedColumns: string[] = ['nombre','edad','telefono','email','edit','delete'];
  newSubscription?: Subscription;
  constructor(
    private dialog: MatDialog,
    private alumnoService: AlumnoService,
    private sesionService: SesionService
    ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerSesion();
    this.getStudentsInformation();
  }
  ngOnDestroy(): void {
    this.newSubscription?.unsubscribe();
  }
  getStudentsInformation(){
    this.newSubscription = this.alumnoService.obtenerAlumnos()
    .subscribe({
      next: (alumnos: Alumno[]) => {
        this.ELEMENT_DATA.data = alumnos;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  openDialog(action:string,obj:any) {
    obj.action = action;
    const dialog = this.dialog.open(DialogAlumnoComponent, {
      width: '30%',
      height: '85%',
      panelClass: 'custom-modalbox',
      data:obj,
    });
    dialog.afterClosed().subscribe(result => {
      if(result.event == 'Guardar'){
        console.log(result.data);
        this.alumnoService.addRowData(result.data);
        this.getStudentsInformation();
      }
      else if(result.event == 'Editar'){
        console.log(result.data);
        this.alumnoService.updateRowData(result.data);
        this.getStudentsInformation();
      }
    });
  }

  eliminarAlumno(id: number){
    this.alumnoService.delete(id);
    this.getStudentsInformation();
  }
}