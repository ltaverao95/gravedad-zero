import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../../Core/Services/LoginService';

@Component({
  selector: 'signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignOutComponent {

  constructor(private _router: Router,
  private _loginService: LoginService) {
    Observable.timer(1100)
      .subscribe(x => {
        sessionStorage.removeItem('user_session');
        this._loginService.currentUser = null;
        this._router.navigateByUrl("/home");
      });
  }
}