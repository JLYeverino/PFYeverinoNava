import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PaginaNoEncontradaComponent } from './components/pagina-no-encontrada/pagina-no-encontrada.component';
import { SesionService } from './services/sesion.service';
import { MaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { reducer, sesionFeatureKey } from './state/sesion.reducer';


@NgModule({
  declarations: [
    InicioComponent,
    PaginaNoEncontradaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(sesionFeatureKey, reducer)
  ],
  providers: [
    SesionService
  ],
})
export class CoreModule { }
