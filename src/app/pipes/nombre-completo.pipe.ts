import { Pipe, PipeTransform } from '@angular/core';
import {Alumno} from '../models/alumno'
@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Alumno, ...args: string[]): string {
    return value.nombre + ' ' + value.apellido;
  }

}