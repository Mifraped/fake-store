import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryRouting'
})
export class CategoryRoutingPipe implements PipeTransform {

  transform(value: string): string {

    let translateForRouting: {[key:string]: string} = {
      "electronics": "electronics",
      "jewelery": "jewelry",
      "men's clothing": "men-clothing",
      "women's clothing": "women-clothing"
    }
    return translateForRouting[value] || value;
  }

}
