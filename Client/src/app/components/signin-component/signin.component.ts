import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { ResourceMessages } from '../../../Blocks/Messages/Services/ResourceMessages';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [
        LoginService,
        AESEncryption,
        ResourceMessages
    ]
})
export class SigninComponent {
    private _userDTO: UserDTO;
    public loginFormGroup: FormGroup;
    public showErrorMessage: boolean = false;
    public errorMessage: string = null;

    constructor(private _router: Router,
                private _loginService: LoginService,
                private _resourceMessages: ResourceMessages) {
        this._userDTO = new UserDTO();
        this.loginFormGroup = new FormGroup({
            user_name: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    public signin() {
        
        if(this._loginService.isLoginValid()){
            this.showErrorMessageFn(this._resourceMessages.GetResourceMessage("ERROR_SIGNIN_ALREADY_AUTENTICATED"));
            return;
        }

        this._userDTO.UserName = this.loginFormGroup.controls.user_name.value;
        this._userDTO.Password = this.loginFormGroup.controls.password.value;

        this._loginService.SignIn(this._userDTO).subscribe(
            response => {
                let actionResultDTO: ActionResultDTO = response.json();
                
                if (actionResultDTO.HasErrors) {
                    this.showErrorMessageFn(actionResultDTO.UIMessage);
                    return;
                }

                this.showErrorMessage = false;
                localStorage.setItem('user_session', actionResultDTO.ResultData);
                this._router.navigateByUrl('/home');
            },
            err => {
                console.log(err);
            }
        );
    }

    private showErrorMessageFn(errorMessage: string): void{
        this.showErrorMessage = true;
        this.errorMessage = errorMessage;
    }
}