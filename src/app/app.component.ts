import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './modules/shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fake-store';

  token: string | null = null

  constructor(private _router: Router, private _loginService: LoginService){

  }

  ngOnInit(){
    
    this._loginService.shareLoginStatus.subscribe({
      next: ((value: boolean) => {
        if(value){
          this.token = sessionStorage.getItem('token')
        }
      })
    })
  }

  loginLogout(){
    if(!this.token){
      this._router.navigate(['login'])
    }else{
      sessionStorage.removeItem('token')
      this.token = null
      this._router.navigate(['home'])
    }
  }

  
}
