import { Component, OnInit } from '@angular/core';

import { PostService } from '../../../Core/Services/PostService';
import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../../Blocks/Utils/Services/UtilsFactory';
import { UtilsConstants } from '../../../Blocks/Utils/index';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public postMessages: string = null;
  public utilsConstants = UtilsConstants;
  private _utilsFactory: UtilsFactory;

  constructor(public postService: PostService) {

    this._utilsFactory = new UtilsFactory();

   }

  ngOnInit() {
    this.getAllPosts();
  }

  private getAllPosts() {
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