import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './modules/shared/services/login.service';
import { APIUser } from './modules/shared/models/apiUser.interface';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from './modules/shared/components/search-dialog/search-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fake-store';

  token: string | null = null

  logedUser: APIUser | null = null

  constructor(private _router: Router, private _loginService: LoginService, public dialog: MatDialog){

  }

  openDialog(): void {
    this.dialog.open(SearchDialogComponent, {
      width: '40%',
      position: {
        top: '3.36%',
      },
    });
  }

  ngOnInit(){

    this.token = sessionStorage.getItem('token')

    let storedUser = sessionStorage.getItem('logedUser');
    this.logedUser = storedUser ? JSON.parse(storedUser) : null;
    
    this._loginService.shareLoginStatus.subscribe({
      next: ((value: boolean) => {
        if(value){
          this.token = sessionStorage.getItem('token')
          let storedUser = sessionStorage.getItem('logedUser');
          this.logedUser = storedUser ? JSON.parse(storedUser) : null;    
        }
      })
    })

  }

  loginLogout(){
    if(!this.token){
      this._router.navigate(['login'])
    }else{
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('logedUser')
      sessionStorage.removeItem('searchObject')
      this.token = null
      this.logedUser = null
      this._router.navigate(['home'])
    }
  }
}
