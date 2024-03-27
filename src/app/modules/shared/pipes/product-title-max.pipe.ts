import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productTitleMax'
})
export class ProductTitleMaxPipe implements PipeTransform {

  transform(value: string): string {

    let count: number = 0

    for(let i = 45; i > 0; i--){
      if(value.charAt(i) === ' ')
      break
      count ++
    }

    if(value.length >= 45){
      return `${value.slice(0,45 - count)} ...`;
    }else{
      return value
    }
  }

}
