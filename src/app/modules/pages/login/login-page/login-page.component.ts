import { MatSnackBar } from '@angular/material/snack-bar';
import { Token } from '../../../shared/models/token.interface';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/modules/shared/models/loginUser.interface';
import { LoginService } from 'src/app/modules/shared/services/login.service';
import { Subject, Subscription, switchMap, throwError } from 'rxjs';
import { APIUser } from 'src/app/modules/shared/models/apiUser.interface';
import { SnackBarService } from 'src/app/modules/shared/services/snack-bar.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  private _loginFormReset = new Subject<boolean>

  private loginSubscription!: Subscription

  newUser: APIUser | undefined

  loginFormResetObs$ = this._loginFormReset.asObservable()

  constructor(private _loginService: LoginService, private _userService: UserService, private _router: Router, private snackBarService: SnackBarService){}

  ngOnInit(){

    let token = sessionStorage.getItem('token')

    if(token){
      this._router.navigate(['home'])
    }

    let newUser = sessionStorage.getItem('newUser')

    if(newUser){
      this.newUser = JSON.parse(newUser)
    }
  }

  sendUser(loginUser: LoginUser){
    this.loginSubscription = this._loginService.login(loginUser).pipe(
      switchMap((res: Token) => {
        if(res.token){
          sessionStorage.setItem('token', res.token)
          return this._userService.getUser(loginUser)
        }else{
          return throwError(() =>new Error('No token'))
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
        this.snackBarService.openSnackBar(error)
        this._loginFormReset.next(true)
      }),
      complete: () => console.info('Proceso de Login completado')
    })
  }

  loginNewUser(loginUser: LoginUser){
    if(loginUser.username === this.newUser?.username && loginUser.password === this.newUser?.password){
      sessionStorage.setItem('token', 'abgtq4t43tertry6576e5uydu6u65')
    }
  }

  login(loginUser: LoginUser){
    if(this.newUser){
      this.loginNewUser(loginUser)
      let token = sessionStorage.getItem('token')
      if(token){
        sessionStorage.setItem('logedUser', JSON.stringify(this.newUser))
        this._loginService.updateLoginStatus()
        this._router.navigate(['home'])
      }else{
        this.sendUser(loginUser)
      }
    }else{
      this.sendUser(loginUser)
    }
  }

  ngOnDestroy(){
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe()
    }
  }
}

