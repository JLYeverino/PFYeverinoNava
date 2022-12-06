import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClasesModule } from '../../clases.module';
import { AbmClaseComponent } from '../abm-clase/abm-clase.component';

import { DialogClaseComponent } from './dialog-clase.component';

// describe('Pruebas unitarias de Clases', () => {
//   let component: DialogClaseComponent;
//   let fixture: ComponentFixture<DialogClaseComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ DialogClaseComponent ],
//       imports: [ ReactiveFormsModule],
//       providers: [
//         { provide: MAT_DIALOG_DATA, useValue: {} },
//         { provide: MatDialogRef, useValue: {} } 
//     ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DialogClaseComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('El formulario se mantiene invalido cuando ingreso unicamente la comision del curso', () => {
//     const formulario = component.formClase;
//     const comision = formulario.controls['nombre'];

//     comision.setValue('Reactive Forms');

//     expect(formulario.valid).toBeFalse();
//   })
// });
