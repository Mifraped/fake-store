import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AddUser } from 'src/app/modules/shared/models/addUser.interface';
import { APIUser } from 'src/app/modules/shared/models/apiUser.interface';
import { MapsService } from 'src/app/modules/shared/services/maps.service';
import { SnackBarService } from 'src/app/modules/shared/services/snack-bar.service';
import { UserService } from 'src/app/modules/shared/services/user.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  userForm: FormGroup = new FormGroup({})
    
  barMode: ProgressBarMode = 'determinate';

  hidePassword = true

  hidePasswordCheck = true

  constructor(private formBuilder: FormBuilder,
    private mapService: MapsService,
    private snackBarService: SnackBarService,
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(){

    const geolocation = this.formBuilder.group({
      lat: '',
      long: ''
    })

    const address = this.formBuilder.group({
      geolocation: geolocation,
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipcode: ['', Validators.required]
    })

    const name = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    })

    this.userForm = this.formBuilder.group({
      address: address,
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordCheck: ['', Validators.compose([Validators.required, this.mustMatch])],
      name: name,
      phone: ['', Validators.required]
    })

    this.mapService.initStreetAutocomplete()
    this.mapService.initZipcodeAutocomplete()
    this.mapService.initCityAutocomplete()

    this.mapService.initMap(5)

  }

  mustMatch(control: AbstractControl): ValidationErrors | null {

    if(control.parent?.value.password === control.value){
      return  null
    }

    return {mustMatch: true}
  }

  sendForm(){
    const addUser: AddUser = {
      ...this.userForm.value,
    }
    this.barMode = 'indeterminate'
    this.userService.addUser(addUser).subscribe({
      next:((res: APIUser) => {
        if(res){
          sessionStorage.setItem('newUser', JSON.stringify(addUser))
          this.router.navigate(['/login'])
          this.snackBarService.openSnackBar('Usuario creado correctamente')
        }
      }),
      error: ((error: any) => console.log('Algo salio mal: ', error)),
      complete: (() => console.log('Creacion de usuario completado'))
    })
  }

  async setLocation(){
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
        }else{
          this.mapService.initMap(5)
          this.snackBarService.openSnackBar('La direccion proporcionada no es válida')
          console.log('Geocode was not successful for the following reason: ' + status)
        }
        this.mapService.selectedAddress = {...this.mapService.initialState}
      })
  }

}
