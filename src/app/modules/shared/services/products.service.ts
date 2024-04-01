import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.log(`No se pudo hacer la peticion: ${error.error}`)
    }
    else{
      console.log(`Error en el servidor: ${error.error}`);
    }
    return throwError(() => new Error(error.error))
  }

  getProduct(productId: number):Observable<Product>{
    return this._http.get<Product>(`https://fakestoreapi.com/products/${productId}`).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getProductsInCategory(category: string): Observable<Product[]>{
    return this._http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  getAllProducts():Observable<Product[]>{
    return this._http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      retry(3),
      catchError(this.handleError)
    )
  }
}

