import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {  Observable, Subject, catchError, map, throwError } from 'rxjs';
import { User } from 'src/app/modules/shared/models/user.interface';
import { APIUser } from 'src/app/modules/shared/models/apiUser.interface';
import { Token } from '../models/token.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _loginStatus = new Subject<boolean>

  public shareLoginStatus = this._loginStatus.asObservable()

  constructor(private _http: HttpClient) { }


  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.log(`No se pudo hacer la peticion al servidor: ${error.error}`)
    }else{
      console.log(`Error en el servidor: ${error.status} ${error.error}`);
    }
    return throwError(() => new Error(error.error))
  }

  public login(user: User): Observable<Token>{
    return this._http.post<Token>("https://fakestoreapi.com/auth/login", user).pipe(
      catchError(this.handleError)
    )
  }

  updateLoginStatus(){
    this._loginStatus.next(true)
  }

  getUser(loginUser: User): Observable<APIUser> {
    return this._http.get<APIUser[]>("https://fakestoreapi.com/users").pipe(
      map((users: APIUser[]) => {
        const foundUser = users.find((userInUsers: APIUser) => 
          userInUsers.username === loginUser.username && userInUsers.password === loginUser.password
        );
        if (!foundUser) {
          throw new Error('User not found');
        }
        return foundUser;
      }),
      catchError(error => throwError(() => error))
    );
  }
}
