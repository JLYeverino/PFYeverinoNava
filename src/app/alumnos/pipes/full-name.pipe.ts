import { Pipe, PipeTransform } from '@angular/core';
import {Alumno} from 'src/app/models/alumno'
@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Alumno, ...args: string[]): string {
    return value.nombre + ' ' + value.apellido;
  }

}
