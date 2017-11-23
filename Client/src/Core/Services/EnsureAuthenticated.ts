import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('user_session') &&
            localStorage.getItem('user_session') != "null") {
            return true;
        }

        this.router.navigateByUrl('/signin');
        return false;
    }
}