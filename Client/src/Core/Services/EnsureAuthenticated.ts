import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('user_session')) {
            return true;
        }

        this.router.navigateByUrl('/signin');
        return false;
    }
}