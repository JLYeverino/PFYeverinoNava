import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { AbmCursoComponent } from './components/abm-curso/abm-curso.component';
import { DialogCursoComponent } from './components/dialog-curso/dialog-curso.component';
import { MaterialModule } from '../material.module';
import { CursoService } from './services/curso.service';
import {SharedModule} from '../shared/shared.module'
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { cursosFeatureKey, reducer } from './state/cursos.reducer';

@NgModule({
  declarations: [
    AbmCursoComponent,
    DialogCursoComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(cursosFeatureKey, reducer)
  ],
  providers:[
    CursoService
  ]
})
export class CursosModule { }
