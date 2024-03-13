import { MatSnackBar } from '@angular/material/snack-bar';
import { Token } from '../../../shared/models/token.type';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/shared/models/user.type';
import { LoginService } from 'src/app/modules/shared/services/login.service';
import { SnackBarComponent } from 'src/app/modules/shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  durationInSeconds = 4;

  constructor(private _loginService: LoginService, private _router: Router, private _snackBar: MatSnackBar){}

  ngOnInit(){

    let token = sessionStorage.getItem('token')

    if(token){
      this._router.navigate(['home'])
    }
  }

  sendUser(user: User){
    this._loginService.login(user).subscribe({
      next: ((res: Token) => {
        if(res.token){
          sessionStorage.setItem('token', res.token)
          this._router.navigate(['home'])
        }
      }),
      error: ((error: any) => {
        console.error(`Algo salio mal: ${error}`)          
        this.openSnackBar(error)
        setTimeout(() => location.reload(), 4000)
      }),
      complete: () => console.info('Proceso de Login completado')
    })
  }
  
  openSnackBar(message: string) {
    // this._snackBar.openFromComponent(SnackBarComponent, {
    //   duration: this.durationInSeconds * 1000,
    //   verticalPosition: 'top',
    // });
    this._snackBar.open(message, undefined, {
      duration: this.durationInSeconds * 1000
    })
  }
}

