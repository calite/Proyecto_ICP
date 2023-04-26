import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoActivo'
})
export class EstadoActivoPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
        return 'no';
      case 1:
        return 'si';
      default:
        return 'fail';
    }
  }

}
