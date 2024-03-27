import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { SearchObject } from '../models/searchObject.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  nameFilter(name: string, product: Product): boolean{
    return product.title.includes(name) || product.description.includes(name)
}

categoryFilter(queryParams: SearchObject, product: Product): boolean{
  let catArr = []
  for(let key in queryParams){
    if(queryParams['womenClothes'] === true){
      catArr.push("women's clothing")
    }
    if(queryParams['menClothes'] === true){
      catArr.push("men's clothing")
    }
    if(queryParams['jewelry'] === true){
      catArr.push("jewelery")
    }
    if(queryParams['electronics'] === true){
      catArr.push("electronics")
    }
  }
  return catArr.includes(product.category)
}

priceFilter(minPrice: number, maxPrice: number, product: Product): boolean{
  return product.price > minPrice && product.price < maxPrice
}

ratingFilter(minRating: number, maxRating: number, product: Product): boolean{
  return product.rating.rate > minRating && product.rating.rate < maxRating
}
}
