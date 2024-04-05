import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, retry, throwError } from 'rxjs';
import { APIUser } from '../models/apiUser.interface';
import { Cart } from '../models/cart.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cart = new BehaviorSubject<Product[]>(JSON.parse(sessionStorage.getItem('cart') || '[]'))

  cart$ = this.cart.asObservable()

  constructor(private _http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.log(`No se pudo hacer la peticion ${error.error}`)
    }else{
      console.log(`Error en el servidor ${error.error}`)
    }
    return throwError(() => new Error(error.error))
  }

  addToCart(product: Product){
    const currentCart = this.cart.getValue()
    currentCart.unshift(product)
    sessionStorage.setItem('cart', JSON.stringify(currentCart))
    this.cart.next(currentCart)
  }

  removeFromCart(productId: number){
    let currentCart = this.cart.getValue()
    currentCart = currentCart.filter(product => product.id !== productId)
    sessionStorage.setItem('cart', JSON.stringify(currentCart))
    this.cart.next(currentCart)
  }

  updateCart(productId: number, quantity: number){
    let currentCart = this.cart.getValue()
    let product = currentCart.find(product => product.id === productId)
    let currentQuantity = currentCart.filter(product => product.id === productId).length
    let difference = Math.max(quantity, currentQuantity) - Math.min(quantity, currentQuantity)
    if(currentQuantity > quantity){
      for(let i = 0; i < difference; i++){
        if(product){
          currentCart.splice(currentCart.indexOf(product), 1)
          sessionStorage.setItem('cart', JSON.stringify(currentCart))
          this.cart.next(currentCart)
        }
      }
    }else if(currentQuantity < quantity){
      for(let i = 0; i < difference; i++){
        if(product){
          this.addToCart(product)
        }
      }
    }
  }

  getCartUser(user: APIUser): Observable<Cart[]>{
    return this._http.get<Cart[]>('https://fakestoreapi.com/carts/user/' + user.id).pipe(
      retry(3),
      catchError(this.handleError)
    )
  }
}
