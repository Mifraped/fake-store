import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { APIUser } from '../models/apiUser.type';
import { Observable, catchError, throwError } from 'rxjs';

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
    return throwError(() => error.error)
  }

  updateUser(user: APIUser): Observable<APIUser>{
    return this._http.put<APIUser>('https://fakestoreapi.com/users/' + user.id, user).pipe(
    catchError(this.handleError)
    )
  }
}
