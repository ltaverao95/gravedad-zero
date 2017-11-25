import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { CoreConstants } from '../../../Core/constants';
import { PostService } from '../../../Core/Services/PostService';
import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoginService,
    PostService,
    AESEncryption,
    UserDTO
  ]
})
export class AppComponent {

  public newPostFormGroup: FormGroup;

  public static updateUserStatus: Subject<boolean> = new Subject();
  public coreConstants = CoreConstants;

  private file: File = null;
  private formData: FormData = new FormData();

  constructor(public loginService: LoginService,
    public postService: PostService,
    public currentUser: UserDTO) {
    this.newPostFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      post_type: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });

    this.newPostFormGroup.setValue({
      title: null,
      post_type: CoreConstants.EnumPostType.NEW,
      message: null
    });

    this.currentUser = this.loginService.getLoggedUser();

    AppComponent.updateUserStatus.subscribe(
      res => {
        this.currentUser = this.loginService.getLoggedUser();
      }
    );
  }

  public newPost() {

    if (this.file != null) {
      this.formData.append('photo', this.file, this.file.name);
    }

    for (let item in this.newPostFormGroup.value) {
      this.formData.append(item, this.newPostFormGroup.value[item]);
    }

    this.formData.append('id_user', this.currentUser.Id.toString());

    this.postService.AddNewItem(this.formData).subscribe(
      response => {

        let actionResultDTO: ActionResultDTO = response.json();
        console.log(actionResultDTO);
        if (actionResultDTO.HasErrors) {
          console.log(actionResultDTO.StackTrace);
          return;
        }

        //$("#new_post_modal").modal('hide');
      },
      error => {
        console.log(error);
      }
    );
  }

  public onFileChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }
}