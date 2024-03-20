import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTitleMax'
})
export class ProductTitleMaxPipe implements PipeTransform {

  transform(value: string): string {
    return `${value.slice(0,50)} ...`;
  }

}
