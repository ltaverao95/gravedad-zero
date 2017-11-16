import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ILogin } from '../../common';
import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { UserDTO } from '../../DTO/User/UserDTO';
import { UtilsConstants } from '../../Blocks/Utils/constants';

@Injectable()
export class LoginService implements ILogin
{
    constructor(private _http: Http) { }

    SignIn(userDTO: UserDTO): Observable<Response>
    {
        let requestOptions: RequestOptions = new RequestOptions({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: JSON.stringify(userDTO)
        });

        return this.DoRequest(requestOptions);
    }

    LogOut(): Observable<Response>
    {
        let requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            url: ""
        });

        return this.DoRequest(requestOptions);
    }

    SignUp(userDTO: UserDTO): Observable<Response>
    {
        let requestOptions = new RequestOptions({
            url: "",
            method: RequestMethod.Post,
            body: JSON.stringify(userDTO)
        });

        return this.DoRequest(requestOptions);
    }

    //##### Private Methods

    private DoRequest(requestOptions: RequestOptions): Observable<Response>
    {
        requestOptions.headers = new Headers({'Content-Type': 'application/json'});

        return this._http.options(requestOptions.url, requestOptions)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json().error || 'Server error'));
    }
}