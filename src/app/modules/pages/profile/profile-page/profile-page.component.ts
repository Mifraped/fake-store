import { Component } from '@angular/core';
import { APIUser } from 'src/app/modules/shared/models/apiUser.interface';
import { LoginService } from 'src/app/modules/shared/services/login.service';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MapsService } from 'src/app/modules/shared/services/maps.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { SnackBarService } from 'src/app/modules/shared/services/snack-bar.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  logedUser!: APIUser

  userForm: FormGroup = new FormGroup({})

  dataUserBarMode: ProgressBarMode = 'determinate';

  addressBarMode: ProgressBarMode = 'determinate';

  hidePassword = true

  hidePasswordCheck = true

  constructor(
    private _userService: UserService, 
    private _loginService: LoginService, 
    private formBuilder: FormBuilder,
    private mapService: MapsService,
    private snackBarService: SnackBarService
    ){

  }

  ngOnInit(){
    let storageUser = sessionStorage.getItem('logedUser')
    if(storageUser){
      this.logedUser = JSON.parse(storageUser)      

      const name = this.formBuilder.group({
        firstname: [this.logedUser.name.firstname, Validators.required],
        lastname: [this.logedUser.name.lastname, Validators.required]
      })

      const geolocation = this.formBuilder.group({
        lat: this.logedUser.address.geolocation.lat,
        long: this.logedUser.address.geolocation.long
      })

      const address = this.formBuilder.group({
        geolocation: geolocation,
        city: [this.logedUser.address.city, Validators.required],
        street: [this.logedUser.address.street, Validators.required],
        number: [this.logedUser.address.number, Validators.required],
        zipcode: [this.logedUser.address.zipcode, Validators.required]
      })
      this.userForm = this.formBuilder.group({
        address: address,
        id: this.logedUser.id,
        email: [this.logedUser.email, Validators.compose([Validators.required, Validators.email])],
        username: [this.logedUser.username, Validators.required],
        password: [this.logedUser.password, Validators.required],
        passwordCheck: [this.logedUser.password, Validators.compose([Validators.required, this.mustMatch])],
        name: name,
        phone: [this.logedUser.phone, Validators.required]
      })
    }

    this.mapService.initStreetAutocomplete()
    this.mapService.initZipcodeAutocomplete()
    this.mapService.initCityAutocomplete()
    if(!this.logedUser.id){
      this.mapService.initMap(15, Number(this.logedUser.address.geolocation.lat), Number(this.logedUser.address.geolocation.long))
    }else{
      this.mapService.geocoder.geocode(
        {'address': 
        `${this.logedUser.address.street}, ${this.logedUser.address.number}, ${this.logedUser.address.zipcode},${this.logedUser.address.city}`
      },
        (results: any, status: any) => {
          if(status == 'OK'){
            let lat = results[0].geometry.location.lat()
            let lng = results[0].geometry.location.lng()
            this.mapService.initMap(15, lat, lng)
          }else{
            this.mapService.initMap(5)
            this.snackBarService.openSnackBar('La direccion proporcionada no es válida')
            console.log('Geocode was not successful for the following reason: ' + status)
          }
        })  
    }
    
  }

  mustMatch(control: AbstractControl): ValidationErrors | null {
    if (control.parent?.value.password === control.value) {
      return null
    }
  
    return { mustMatch: true }
  }

  updateUserData(user: APIUser){
    this.dataUserBarMode = 'indeterminate'
    let userToSend = {
      ...this.userForm.value,
      address: user.address
    }
    if(this.logedUser.id){
      this.updateApiUser(userToSend, 'dataUserBarMode')
    }else{
      this.updateNewUser(userToSend, 'dataUserBarMode')
    }
  }

  async updateAddress(user: APIUser){
    this.addressBarMode = 'indeterminate'
    let address = this.mapService.selectedAddress
    let addressUserForm = this.userForm.get('address')?.value 
    for(let key in address){
      if(address[key] === ''){
        address[key] = addressUserForm[key]
      }
    }    
    await this.mapService.geocoder.geocode(
      {'address': 
      `${address.street}, ${address.number}, ${address.zipcode},${address.city}`
    },
      (results: any, status: any) => {
        if(status == 'OK'){
          let lat = results[0].geometry.location.lat()
          let lng = results[0].geometry.location.lng()
          this.mapService.initMap(15, lat, lng)
          this.userForm.get('address')?.patchValue(address)
          this.userForm.get('address')?.get('geolocation')?.patchValue({lat: String(lat), long: String(lng)})          
          this.mapService.selectedAddress = {...this.mapService.initialState}
        }else{
          this.mapService.initMap(5)
          this.snackBarService.openSnackBar('La direccion proporcionada no es válida')
          console.log('Geocode was not successful for the following reason: ' + status)
        }
      })      
      let userToSend = {
        ...this.logedUser,
        address: this.userForm.get('address')?.value
      }
      if(this.logedUser.id){
        this.updateApiUser(userToSend, 'addressBarMode')
      }else{
        this.updateNewUser(userToSend, 'addressBarMode')
      }
  }

  updateApiUser(user: APIUser, barMode: string){
    this._userService.updateUser(user).subscribe({
      next: ((res: APIUser) => {
        sessionStorage.setItem('logedUser', JSON.stringify(res))
        this._loginService.updateLoginStatus()
        barMode === 'dataUserBarMode' ? this.dataUserBarMode = 'determinate' : this.addressBarMode = 'determinate'
        this.snackBarService.openSnackBar('Usuario modificado correctamente')
      }),
      error: ((error: any) => {
        console.error(`No se han podido realizar los cambios: ${error}`)
        barMode === 'dataUserBarMode' ? this.dataUserBarMode = 'determinate' : this.addressBarMode = 'determinate'

        this.snackBarService.openSnackBar('No se pudo modificar el usuario')
      }),
      complete: () => console.log(`Proceso finalizado correctamente`)
    })
  }

  updateNewUser(user: APIUser, barMode: string){
    sessionStorage.setItem('logedUser', JSON.stringify(user))
    this._loginService.updateLoginStatus()
    barMode === 'dataUserBarMode' ? this.dataUserBarMode = 'determinate' : this.addressBarMode = 'determinate'
    this.snackBarService.openSnackBar('Usuario modificado correctamente')
  }

  restoreUserData(){
    this.userForm.get('name')?.patchValue(this.logedUser.name)
    this.userForm.get('username')?.patchValue(this.logedUser.username)
    this.userForm.get('email')?.patchValue(this.logedUser.email)
    this.userForm.get('phone')?.patchValue(this.logedUser.phone)
    this.userForm.get('password')?.patchValue(this.logedUser.password)
    this.userForm.get('passwordCheck')?.patchValue(this.logedUser.password)
  }

  restoreAddress(){
    this.userForm.get('address')?.patchValue(this.logedUser.address)
  }

}
