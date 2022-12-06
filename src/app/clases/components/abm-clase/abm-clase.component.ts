import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {Clase} from 'src/app/models/clases';
import {ClaseService} from 'src/app/clases/services/clase.service';
import {DialogClaseComponent} from '../dialog-clase/dialog-clase.component';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/core/services/sesion.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-abm-clase',
  templateUrl: './abm-clase.component.html',
  styleUrls: ['./abm-clase.component.css']
})
export class AbmClaseComponent implements OnInit, OnDestroy {
  sesion$!: Observable<Sesion>;
  ELEMENT_DATA = new MatTableDataSource<Clase>()
  displayedColumns: string[] = ['nombre','duracion','curso','edit','delete'];
  newSubscription?: Subscription;
  constructor(
    private dialog: MatDialog,
    private claseService: ClaseService,
    private sesionService: SesionService
  ) { }

  ngOnInit(): void {
    this.sesion$ = this.sesionService.obtenerSesion();
    this.getClasesInformation();
  }
  ngOnDestroy(): void {
    this.newSubscription?.unsubscribe();
  }
  getClasesInformation(){
    this.newSubscription = this.claseService.obtenerClases()
    .subscribe({
      next: (clases: Clase[]) => {
        this.ELEMENT_DATA.data = clases;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  openDialog(action:string,obj:any) {
    obj.action = action;
    const dialog = this.dialog.open(DialogClaseComponent, {
      width: '30%',
      height: '60%',
      panelClass: 'custom-modalbox',
      data:obj,
    });
    dialog.afterClosed().subscribe(result => {
      
      if(result.event == 'Guardar'){
        console.log(result.data);
        this.claseService.addRowData(result.data);
        this.getClasesInformation();
      }
      else if(result.event == 'Editar'){
        console.log(result.data);
        this.claseService.updateRowData(result.data);
        this.getClasesInformation();
      }
    });
  }

  eliminarClase(id: number){
    this.claseService.delete(id);
    this.getClasesInformation();
  }
}
