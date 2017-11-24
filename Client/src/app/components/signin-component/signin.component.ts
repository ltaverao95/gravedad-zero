import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { ResourceMessages } from '../../../Blocks/Messages/Services/ResourceMessages';
import { LoginRestoreViews } from '../../../Core/Services/LoginRestoreViews';

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [
        LoginService,
        AESEncryption,
        ResourceMessages,
        LoginRestoreViews
    ]
})
export class SigninComponent {
    public loginFormGroup: FormGroup;
    public showErrorMessage: boolean = false;
    public errorMessage: string = null;

    constructor(private _router: Router,
        private _loginService: LoginService,
        private _resourceMessages: ResourceMessages,
        private _loginRestoreViews: LoginRestoreViews) {
        this.loginFormGroup = new FormGroup({
            user_name: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });

        this.loginFormGroup.setValue({
            user_name: "admin",
            password: "123"
        });
    }

    public signin() {

        if (this._loginService.isLoginValid()) {
            this.showErrorMessageFn(this._resourceMessages.GetResourceMessage("ERROR_SIGNIN_ALREADY_AUTENTICATED"));
            return;
        }

        this._loginService.SignIn({
            UserName: this.loginFormGroup.controls.user_name.value,
            Password: this.loginFormGroup.controls.password.value
        } as UserDTO).subscribe(
            response => {
                let actionResultDTO: ActionResultDTO = response.json();

                if (actionResultDTO.HasErrors) {
                    this.showErrorMessageFn(actionResultDTO.UIMessage);
                    console.log(actionResultDTO.StackTrace);
                    return;
                }

                this.showErrorMessage = false;
                localStorage.setItem('user_session', actionResultDTO.ResultData);
                this._loginRestoreViews.setViewsWithCurrentUserLogged();
                this._router.navigateByUrl('/home');
            },
            err => {
                this.showErrorMessageFn(this._resourceMessages.GetResourceMessage("ERROR_SIGNIN_WITH_SERVER"));
                console.log(err);
            }
            );
    }

    private showErrorMessageFn(errorMessage: string): void {
        this.showErrorMessage = true;
        this.errorMessage = errorMessage;
    }
}