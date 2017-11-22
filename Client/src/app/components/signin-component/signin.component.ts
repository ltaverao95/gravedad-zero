import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
    providers: [
        LoginService,
        AESEncryption
    ]
})
export class SigninComponent 
{
   public loginFormGroup: FormGroup;
   private _userDTO: UserDTO;

   constructor(private _loginService: LoginService, private _aesEncryption: AESEncryption)
   {
      this._userDTO = new UserDTO();
      this.loginFormGroup = new FormGroup({
          user_name: new FormControl('', [Validators.required ]),
          password: new FormControl('', [Validators.required ])
      });
   }  

   public signin()
   {
      this._userDTO.UserName = this.loginFormGroup.controls.user_name.value;
      this._userDTO.Password = this.loginFormGroup.controls.password.value;

      this._loginService.SignIn(this._userDTO).subscribe(
        response => {
            let actionResultDTO: ActionResultDTO = response.json();

            console.log(this._aesEncryption.DecryptText(actionResultDTO.ResultData));
        },
        err => {
            console.log(err);
        }
      );
   }
}