import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AESEncryption } from '../../Blocks/Crypt/Services/AESEncryption';

@Injectable()
export class LoginRedirect implements CanActivate {
    constructor(private router: Router){}

    canActivate():boolean 
    {
        this.router.navigateByUrl('/home');
        return false;
    }
}