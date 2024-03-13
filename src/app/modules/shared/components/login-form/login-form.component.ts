import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { User } from 'src/app/modules/shared/models/user.type';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  @Output() formEvent = new EventEmitter<User>()

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
  }

  submitForm(){
    let user: User = this.loginForm.value
    this.formEvent.emit(user)
    this.progressBarMode = "indeterminate"
  }

}
