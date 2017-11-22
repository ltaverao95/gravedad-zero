import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignOutComponent {
  constructor(private _router: Router) {
    localStorage.removeItem('user_session');
    this._router.navigateByUrl("/home");
  }
}