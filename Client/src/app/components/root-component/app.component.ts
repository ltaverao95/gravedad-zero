import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { CoreConstants } from '../../../Core/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoginService,
    AESEncryption,
    UserDTO
  ]
})
export class AppComponent {

  public enumUserPermissions = CoreConstants.EnumUserPermission;
  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(public loginService: LoginService,
    public currentUser: UserDTO) {
    this.currentUser = this.loginService.getLoggedUser();
    AppComponent.updateUserStatus.subscribe(res => {
      this.currentUser = this.loginService.getLoggedUser();
    });
  }
}