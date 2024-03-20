import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryTraductor'
})
export class CategoryTraductorPipe implements PipeTransform {

  transform(value: string): string {

    let translations: {[key: string]: string} = {
      'electronics': 'Electrónica',
      'jewelery': 'Joyería',
      "men's clothing": 'Ropa Hombre',
      "women's clothing": 'Ropa Mujer'
    }
    return translations[value] || value;
  }

}
