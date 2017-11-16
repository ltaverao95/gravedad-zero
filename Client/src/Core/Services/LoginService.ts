import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ILogin } from '../../common';
import { UserDTO } from '../../DTO/User/UserDTO';
import { UtilsConstants } from '../../Blocks/Utils/constants';

@Injectable()
export class LoginService implements ILogin
{
    constructor(private _http: Http) { }

    SignIn(userDTO: UserDTO): Observable<Response>
    {
        let requestOptions: Request = new Request({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: JSON.stringify(userDTO)
        });

        return this.DoRequest(requestOptions);
    }

    LogOut(): Observable<Response>
    {
        let requestOptions = new Request({
            method: RequestMethod.Get,
            url: ""
        });

        return this.DoRequest(requestOptions);
    }

    SignUp(userDTO: UserDTO): Observable<Response>
    {
        let requestOptions = new Request({
            url: "",
            method: RequestMethod.Post,
            body: JSON.stringify(userDTO)
        });

        return this.DoRequest(requestOptions);
    }

    //##### Private Methods

    private DoRequest(requestOptions: Request): Observable<Response>
    {
        return this._http.request(requestOptions)
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error.json().error || 'Server error'));
    }
}