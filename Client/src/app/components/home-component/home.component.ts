import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LoginService } from '../../../Core/Services/LoginService';
import { PostService } from '../../../Core/Services/PostService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';

import { CoreConstants } from '../../../Core/constants';
import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';

import { UserDTO } from '../../../DTO/User/UserDTO';
import { PostDTO } from '../../../DTO/Post/PostDTO';
import { UtilsFactory } from '../../../Blocks/Utils/Services/UtilsFactory';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    LoginService,
    PostService,
    AESEncryption
  ]
})
export class HomeComponent implements OnInit {
  public enumUserPermissions = CoreConstants.EnumUserPermission;
  public static updateUserStatus: Subject<boolean> = new Subject();
  public postMessages: string = null;

  private _utilsFactory: UtilsFactory;

  public postsList: Array<PostDTO>;

  constructor(public loginService: LoginService,
    public postService: PostService,
    public currentUser: UserDTO) {
    this.currentUser = this.loginService.getLoggedUser();
    this._utilsFactory = new UtilsFactory();
    HomeComponent.updateUserStatus.subscribe(res => {
      this.currentUser = this.loginService.getLoggedUser();
    });
  }

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
    this.postService.GetAllItems().subscribe(
      response => {

        let actionResultDTO: ActionResultDTO = response.json();
        if (actionResultDTO.HasErrors) {
          this.postMessages = actionResultDTO.UIMessage;
          console.log(actionResultDTO.StackTrace);
          return;
        }

        if ((actionResultDTO.ResultData == null ||
          actionResultDTO.ResultData === "") &&
          this._utilsFactory.IsValidString(actionResultDTO.UIMessage)) {
          this.postMessages = actionResultDTO.UIMessage;
          return;
        }

        this.postsList = actionResultDTO.ResultData;
      },
      error => {
        console.log(error);
      }
    );
  }
}