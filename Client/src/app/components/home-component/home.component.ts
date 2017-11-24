import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { CoreConstants } from '../../../Core/constants';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    LoginService,
    AESEncryption,
    UserDTO
  ]
})
export class HomeComponent {
  public enumUserPermissions = CoreConstants.EnumUserPermission;
  public static updateUserStatus: Subject<boolean> = new Subject();

  constructor(public loginService: LoginService,
    public currentUser: UserDTO) {
    this.currentUser = this.loginService.getLoggedUser();
    HomeComponent.updateUserStatus.subscribe(res => {
      this.currentUser = this.loginService.getLoggedUser();
    });
  }
}