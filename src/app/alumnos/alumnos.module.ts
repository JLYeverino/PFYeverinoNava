import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AbmAlumnoComponent } from './components/abm-alumno/abm-alumno.component';
import { DialogAlumnoComponent } from './components/dialog-alumno/dialog-alumno.component';
import { MaterialModule } from '../material.module';
import { InicioAlumnoComponent } from './components/inicio-alumno/inicio-alumno.component';
import { AlumnoService } from './services/alumno.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NombreCompletoPipe } from '../pipes/nombre-completo.pipe';
import { SharedModule } from '../shared/shared.module';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [
    AbmAlumnoComponent,
    DialogAlumnoComponent,
    InicioAlumnoComponent,
    NombreCompletoPipe,
    FullNamePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AlumnosRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    AlumnoService
  ]
})
export class AlumnosModule { }
