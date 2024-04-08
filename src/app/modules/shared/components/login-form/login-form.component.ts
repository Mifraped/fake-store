import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Observable, Subscription } from 'rxjs';
import { LoginUser } from 'src/app/modules/shared/models/loginUser.interface';
import { ExtendedCart } from '../../models/extendedCart.interface';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() formEvent = new EventEmitter<LoginUser>()

  @Input() loginFormReset$!: Observable<boolean>

  @Input() cart: ExtendedCart | undefined

  resetSubscription!: Subscription

  progressBarMode: ProgressBarMode = "determinate"

  hide: boolean = true

  loginForm: FormGroup = new FormGroup({})

  constructor(private _formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(){

    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.resetSubscription = this.loginFormReset$.subscribe({
      next: ((value: boolean) => {
        this.loginForm.reset()
        this.progressBarMode = 'determinate'
      })
    })
  }

  submitForm(){
    let loginUser: LoginUser = this.loginForm.value
    this.formEvent.emit(loginUser)
    this.progressBarMode = "indeterminate"
  }

  ngOnDestroy(){
    if(this.resetSubscription){
      this.resetSubscription.unsubscribe()
    }
  }

  goToRegister(){
    if(this.cart){
      let navigationExtras: NavigationExtras = {state: {cart: this.cart}}
      this.router.navigate(['/register'], navigationExtras)
    }else{
      this.router.navigate(['/register'])
    }
  }

}
