import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from '../../../Core/Services/PostService';
import { PostDTO } from '../../../DTO/Post/PostDTO';
import { UtilsConstants } from '../../../Blocks/Utils/index';
import { CoreConstants } from '../../../Core/index';

@Component({
  selector: 'post-detail',
  templateUrl: './post.detail.component.html',
  styleUrls: ['./post.detail.component.css']
})
export class PostDetailComponent {
  private id: number;
  private paramsSub: any;
  public currentPostDTO: PostDTO;
  public utilsConstants = UtilsConstants;
  public coreConstants = CoreConstants;

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public postService: PostService) {
      this.currentPostDTO = new PostDTO();
  }

  ngOnInit() {
    this.paramsSub = this._activatedRoute.params.subscribe(params => this.id = parseInt(params['id'], 10));

    if (this.postService.postsList == null ||
      this.id == null) {
      this._router.navigateByUrl("/posts");
      return;
    }

    this.currentPostDTO = this.postService.postsList.find((postDTO: PostDTO) => postDTO.Id == this.id);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}