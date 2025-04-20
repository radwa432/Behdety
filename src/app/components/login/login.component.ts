import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup;

  constructor(){

    this.loginForm=new FormGroup({
      username:new FormControl('',[Validators.required]),
      password:new FormControl('')
  });}

  onSubmit() {
  }

}
