import { Component, OnInit } from '@angular/core';

import { PostService } from '../../../Core/Services/PostService';
import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../../Blocks/Utils/Services/UtilsFactory';
import { UtilsConstants } from '../../../Blocks/Utils/index';
import { CoreConstants } from '../../../Core/index';
import { LoginService } from '../../../Core/Services/LoginService';
import { PostDTO } from '../../../DTO/Post/PostDTO';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public postMessages: string = null;
  public coreConstants = CoreConstants;
  public utilsConstants = UtilsConstants;
  public showPostToDelete: boolean = false;
  private _utilsFactory: UtilsFactory;

  public config: PaginationInstance = {
    id: 'posts_pagination',
    itemsPerPage: 3,
    currentPage: 1
  };

  constructor(public loginService: LoginService,
    public postService: PostService) {

    this._utilsFactory = new UtilsFactory();
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  public selectChanged(post: PostDTO): void {
    console.log(post);
  }

  public CheckAllPosts(): void {
    for (let i = 0; i < this.config.itemsPerPage; i++) {
      this.postService.postsList[i].Selected = !this.postService.postsList[i].Selected;
    }
  }

  private getAllPosts(): void {
    this.postService.GetAllItems().subscribe(
      response => {
        let actionResultDTO: ActionResultDTO = response.json();

        if (actionResultDTO.HasErrors) {
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
      err => {
        console.log(err);
      }
    );
  }
}