import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/cursos';
import { Inscripcion } from 'src/app/models/inscripcion';
import { CursoState } from 'src/app/models/curso.state';
import { agregarInscripcion, cargarInscripciones, eliminarInscripcion } from '../../state/inscripciones.actions';
import { InscripcionState } from '../../state/inscripciones.reducer';
import { selectInscripciones } from '../../state/inscripciones.selectors';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectStateCursos } from 'src/app/cursos/state/cursos.selectors';
import {CursoService} from 'src/app/cursos/services/curso.service';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Usuario } from 'src/app/models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditarDialogComponent } from '../editar-dialog/editar-dialog.component';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css']
})
export class ListaInscripcionesComponent implements OnInit {
  inscripciones$!: Observable<Inscripcion[]>;
  usuarioActivo?: Usuario;
  cursos$!: Observable<Curso[]>
  newSubscription?: Subscription;
  sesion$!: Observable<Sesion>;
  cursoSeleccionado!: Curso;
  dataSource!: MatTableDataSource<Inscripcion>;
  columnas: string[] = ['id', 'curso', 'estudiante', 'acciones'];

  constructor(
    private storeInscripciones: Store<InscripcionState>,
    private storeCursos: Store<CursoState>,
    private cursoService: CursoService,
    private sesionService: SesionService,
    private dialog: MatDialog
  ) {
    this.storeInscripciones.dispatch(cargarInscripciones());
   }

  ngOnInit(): void {
    this.storeInscripciones.select(selectInscripciones).subscribe((inscripciones: Inscripcion[]) => {
      this.dataSource = new MatTableDataSource<Inscripcion>(inscripciones);
    });;
    this.cursos$ = this.cursoService.obtenercursos();
    this.sesionService.obtenerSesion().subscribe(res => {
        this.usuarioActivo = res.usuarioActivo;
      }
    );
  }

  inscribir(curso: Curso){
    if(this.usuarioActivo){
      const inscripcion: Inscripcion = {
        id: 0,
        curso: curso,
        estudiante: this.usuarioActivo 
      };
      this.storeInscripciones.dispatch(agregarInscripcion({inscripcion}));
    }
  }

  editar(inscripcion: Inscripcion){
    this.dialog.open(EditarDialogComponent, {
      width: '300px',
      data: inscripcion
    })
  }

  eliminar(inscripcion: Inscripcion){
    this.storeInscripciones.dispatch(eliminarInscripcion({inscripcion}));
  }
}