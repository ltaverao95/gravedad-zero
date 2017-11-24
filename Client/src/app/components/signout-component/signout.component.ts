import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignOutComponent {

  constructor(private _router: Router) {
    Observable.timer(1100)
      .subscribe(x => {
        localStorage.removeItem('user_session');
        this._router.navigateByUrl("/home");
      });
  }
}