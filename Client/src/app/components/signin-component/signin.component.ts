import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { UserDTO } from '../../../DTO/User/UserDTO';
import { LoginService } from '../../../Core/Services/LoginService';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
    providers: [
        LoginService
    ]
})
export class SigninComponent 
{
   public loginFormGroup: FormGroup;
   private _userDTO: UserDTO;

   constructor(private _loginService: LoginService)
   {
      this._userDTO = new UserDTO();
      this.loginFormGroup = new FormGroup({
          user_name: new FormControl('', [Validators.required ]),
          password: new FormControl('', [Validators.required ])
      });
   }  

   public singin()
   {
      this._userDTO.UserName = this.loginFormGroup.controls.user_name.value;
      this._userDTO.Password = this.loginFormGroup.controls.password.value;

      this._loginService.SignIn(this._userDTO).subscribe(
        response => {
            console.log(response);
        },
        err => {
            console.log(err);
        }
      );
   }
}