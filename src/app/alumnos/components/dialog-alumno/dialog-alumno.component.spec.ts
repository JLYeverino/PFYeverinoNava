import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlumnosModule } from '../../alumnos.module';

import { DialogAlumnoComponent } from './dialog-alumno.component';

describe('Pruebas dialog alumno', () => {
  let component: DialogAlumnoComponent;
  let fixture: ComponentFixture<DialogAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlumnoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} } 
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('El formulario se mantiene invalido cuando se ingresa unicamente el nombre de la clase', () => {
    const formulario = component.formAlumno;
    const comision = formulario.controls['nombre'];

    comision.setValue('Luis');

    expect(formulario.valid).toBeFalse();
  })
  
});
