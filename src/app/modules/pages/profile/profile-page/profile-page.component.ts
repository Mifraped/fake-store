import { Component } from '@angular/core';
import { APIUser } from 'src/app/modules/shared/models/apiUser.type';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  logedUser!: APIUser 

  constructor(private _userService: UserService){

  }

  ngOnInit(){
    let storageUser = sessionStorage.getItem('logedUser')
    if(storageUser){
      this.logedUser = JSON.parse(storageUser)
    }
    console.log(this.logedUser);
  }

  enviarCambios(user: APIUser){
    this._userService.updateUser(user).subscribe({
      next: ((res: APIUser) => sessionStorage.setItem('logedUser', JSON.stringify(res))),
      error: ((error: any) => console.error(`No se han podido realizar los cambios: ${error}`)),
      complete: () => console.log(`Proceso finalizado correctamente`)
    })
  }

}
