import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { APIUser } from '../models/apiUser.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { Cart } from '../models/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.log(`No se pudo hacer la peticion ${error.error}`)
    }else{
      console.log(`Error en el servidor ${error.error}`)
    }
    return throwError(() => new Error(error.error))
  }

  updateUser(user: APIUser): Observable<APIUser>{
    return this._http.put<APIUser>('https://fakestoreapi.com/users/' + user.id, user).pipe(
    catchError(this.handleError)
    )
  }

  getCartUser(user: APIUser): Observable<Cart[]>{
    return this._http.get<Cart[]>('https://fakestoreapi.com/carts/user/' + user.id).pipe(
      catchError(this.handleError)
    )
  }
}
