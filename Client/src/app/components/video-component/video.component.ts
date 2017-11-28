import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { CoreConstants } from '../../../Core/constants';

@Component({
  selector: 'video-panel',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  public enumUserPermissions = CoreConstants.EnumUserPermission;

  constructor(public loginService: LoginService) {}
}