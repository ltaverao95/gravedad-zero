import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../../Core/Services/LoginService';
import { PostService } from '../../../Core/Services/PostService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';

import { CoreConstants } from '../../../Core/constants';
import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';

import { UserDTO } from '../../../DTO/User/UserDTO';
import { PostDTO } from '../../../DTO/Post/PostDTO';
import { UtilsFactory } from '../../../Blocks/Utils/Services/UtilsFactory';
import { UtilsConstants } from '../../../Blocks/Utils/index';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public coreConstants = CoreConstants;
  public utilsConstants = UtilsConstants
  public postMessages: string = null;

  private _utilsFactory: UtilsFactory;

  constructor(public loginService: LoginService,
    public postService: PostService) {
    this._utilsFactory = new UtilsFactory();
    this.loginService.getLoggedUser();
  }

  ngOnInit() {
    this.getAllPostsByPostType();
  }

  public getAllPostsByPostType() {
    this.postService.GetAllPostsByPostType(CoreConstants.EnumPostType.NEW).subscribe(
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

        this.postService.postsList = actionResultDTO.ResultData;
      },
      error => {
        console.log(error);
      }
    );
  }
}