import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ILogin } from '../../common';
import { UserDTO } from '../../DTO/User/UserDTO';
import { UtilsConstants } from '../../Blocks/Utils/constants';
import { AESEncryption } from '../../Blocks/Crypt/Services/AESEncryption';
import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';

@Injectable()
export class LoginService implements ILogin {

    currentUser: UserDTO;
    private _resourceMessages: ResourceMessages;

    constructor(private _http: Http,
        private _aesEncryption: AESEncryption) {
            this._resourceMessages = new ResourceMessages();
    }

    isLoginValid() {
        if (sessionStorage.getItem('user_session') &&
            sessionStorage.getItem('user_session') != "null") {
            return true;
        }

        return false;
    }

    getLoggedUser(): void {

        this.currentUser = null;

        if (!this.isLoginValid()) {
            return;
        }

        let actionResultDTO: ActionResultDTO = this._aesEncryption.DecryptText(sessionStorage.getItem('user_session'));
        if (actionResultDTO.HasErrors) {
            return;
        }

        if (actionResultDTO.ResultData == null ||
            actionResultDTO.ResultData === "") {
            return;
        }

        let userDTO: UserDTO = JSON.parse(actionResultDTO.ResultData);
        userDTO.Password = this._aesEncryption.EncryptText(userDTO.Password).ResultData;
        this.currentUser = userDTO;
    }

    SignIn(userDTO: UserDTO): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: this._aesEncryption.EncryptText(JSON.stringify(userDTO)).ResultData
        });

        return this.DoRequest(requestOptions);
    }

    LogOut(): Observable<Response> {
        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: ""
        });

        return this.DoRequest(requestOptions);
    }

    SignUp(userDTO: UserDTO): Observable<Response> {
        let requestOptions = new Request({
            url: "",
            method: RequestMethod.Post,
            body: JSON.stringify(userDTO)
        });

        return this.DoRequest(requestOptions);
    }

    //##### Private Methods

    private DoRequest(requestOptions: Request): Observable<Response> {
        return this._http.request(requestOptions)
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error.json().error || this._resourceMessages.GetResourceMessage("ERROR_DOING_REQUEST")));
    }
}