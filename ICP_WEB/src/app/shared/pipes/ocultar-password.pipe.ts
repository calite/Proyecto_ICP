import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocultarPassword'
})
export class OcultarPasswordPipe implements PipeTransform {

  transform(value: string): string {
    return '******';
  }

}
