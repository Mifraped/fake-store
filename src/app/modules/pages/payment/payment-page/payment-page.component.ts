import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { APIUser } from 'src/app/modules/shared/models/apiUser.interface';
import { ExtendedCart } from 'src/app/modules/shared/models/extendedCart.interface';
import { CartServiceService } from 'src/app/modules/shared/services/cart-service.service';
import { MapsService } from 'src/app/modules/shared/services/maps.service';
import { SnackBarService } from 'src/app/modules/shared/services/snack-bar.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  logedUser!: APIUser

  cart!: ExtendedCart

  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup
  thirdFormGroup!: FormGroup

  selectedValue: string | undefined

  stepperOrientation: Observable<StepperOrientation>;

  displayedColumns: string[] = ['image', 'title', 'category', 'price', 'quantity', 'totalPrice'];

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private mapService: MapsService,
    private cartService: CartServiceService,
    private router: Router,
    private snackBarService: SnackBarService
    ){
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(){
    let storedUser = sessionStorage.getItem('logedUser')

    if(storedUser){
      this.logedUser = JSON.parse(storedUser)
    }

    if(history.state.cart){
      this.cart = {
        ...history.state.cart,
        id:11,
        userId:this.logedUser.id
      }
    }

    if(this.logedUser){

      let name = this._formBuilder.group({
        firstname: [this.logedUser.name.firstname, Validators.required],
        lastname : [this.logedUser.name.lastname, Validators.required]
      })
    
      this.firstFormGroup = this._formBuilder.group({
        name: name,
        email: [this.logedUser.email, Validators.required],
        phone: [this.logedUser.phone, Validators.required]
      });
    
      this.secondFormGroup = this._formBuilder.group({
        street: [this.logedUser.address.street, Validators.required],
        number: [this.logedUser.address.number, Validators.required],
        zipcode: [this.logedUser.address.zipcode, Validators.required],
        city: [this.logedUser.address.city, Validators.required],
      });
    }
  }

  ngAfterViewInit(){
    this.mapService.initStreetAutocomplete()
    this.mapService.initZipcodeAutocomplete()
    this.mapService.initCityAutocomplete()
  }

  finish(){
    this.cart.date = new Date().toISOString()
    sessionStorage.setItem('newCart', JSON.stringify(this.cart))
    this.cartService.deleteCart()
    sessionStorage.removeItem('cart')
    this.router.navigate(['orders'])
    this.snackBarService.openSnackBar('¡Gracias por fake-comprar en Fake-Store!')
  }
}
