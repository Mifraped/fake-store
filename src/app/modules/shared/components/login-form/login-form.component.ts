import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/modules/shared/models/user.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() formEvent = new EventEmitter<User>()

  @Input() loginFormReset$!: Observable<boolean>

  resetSubscription!: Subscription

  progressBarMode: ProgressBarMode = "determinate"

  hide: boolean = true

  loginForm: FormGroup = new FormGroup({})

  constructor(private _formBuilder: FormBuilder){

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
    let loginUser: User = this.loginForm.value
    this.formEvent.emit(loginUser)
    this.progressBarMode = "indeterminate"
  }

  ngOnDestroy(){
    if(this.resetSubscription){
      this.resetSubscription.unsubscribe()
    }
  }

}
