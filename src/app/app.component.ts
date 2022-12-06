import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SesionService } from './core/services/sesion.service';
import { Sesion } from './models/sesion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  sesion$!: Observable<Sesion>;

  constructor(
    private sesionService: SesionService
  ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerSesion();
    console.log(this.sesion$);
  }
}
