import { MatSnackBar } from '@angular/material/snack-bar';
import { Token } from '../../../shared/models/token.type';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/shared/models/user.type';
import { LoginService } from 'src/app/modules/shared/services/login.service';
import { Subject, Subscription, switchMap } from 'rxjs';
import { APIUser } from 'src/app/modules/shared/models/apiUser.type';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  private _loginFormReset = new Subject<boolean>

  loginFormResetObs$ = this._loginFormReset.asObservable()

  durationSnackBar = 4;

  private loginSubscription!: Subscription

  constructor(private _loginService: LoginService, private _router: Router, private _snackBar: MatSnackBar){}

  ngOnInit(){

    let token = sessionStorage.getItem('token')

    if(token){
      this._router.navigate(['home'])
    }
  }

  sendUser(loginUser: User){
    this.loginSubscription = this._loginService.login(loginUser).pipe(
      switchMap((res: Token) => {
        if(res.token){
          sessionStorage.setItem('token', res.token)
          return this._loginService.getUser(loginUser)
        }else{
          throw new Error('No token')
        }
      })
    ).subscribe({
      next: ((res: APIUser) => {
        sessionStorage.setItem('logedUser', JSON.stringify(res))
        this._loginService.updateLoginStatus()
        this._router.navigate(['home'])
      }),
      error: ((error: any) => {
        console.error(`Algo salio mal: ${error}`)
        this.openSnackBar(error)
        this._loginFormReset.next(true)
      }),
      complete: () => console.info('Proceso de Login completado')
    })
  }
  
  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: this.durationSnackBar * 1000,
      verticalPosition: 'top'
    })
  }

  ngOnDestroy(){
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe()
    }
  }
}

