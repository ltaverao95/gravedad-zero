import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as jQuery from 'jquery';

import { LoginService } from '../../../Core/Services/LoginService';
import { AESEncryption } from '../../../Blocks/Crypt/Services/AESEncryption';
import { UserDTO } from '../../../DTO/User/UserDTO';
import { CoreConstants } from '../../../Core/constants';
import { PostService } from '../../../Core/Services/PostService';
import { ActionResultDTO } from '../../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../../Blocks/Utils/Services/UtilsFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoginService,
    PostService,
    AESEncryption
  ]
})
export class AppComponent {

  public newPostFormGroup: FormGroup;
  public coreConstants = CoreConstants;

  private file: File = null;
  private formData: FormData = new FormData();
  private _utilsFactory: UtilsFactory;

  constructor(public loginService: LoginService,
    public postService: PostService) {

    this._utilsFactory = new UtilsFactory();

    this.newPostFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      post_type: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });

    this.clearForm();
  }

  public newPost() {

    if (this.file != null) {
      this.formData.append('photo', this.file, this.file.name);
    }

    for (let item in this.newPostFormGroup.value) {
      this.formData.append(item, this.newPostFormGroup.value[item]);
    }

    this.formData.append('id_user', this.loginService.currentUser.Id.toString());
    this.formData.append('date_published', this._utilsFactory.GetCurrentDate());

    this.postService.AddNewItem(this.formData).subscribe(
      response => {
        this.clearForm();
        let actionResultDTO: ActionResultDTO = response.json();
        console.log(actionResultDTO);
        if (actionResultDTO.HasErrors) {
          console.log(actionResultDTO.StackTrace);
          return;
        }

        jQuery("#new_post_modal .close").click();
      },
      error => {
        console.log(error);
        this.clearForm();
      }
    );
  }

  public onFileChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }

  private clearForm() {
    this.newPostFormGroup.setValue({
      title: null,
      post_type: CoreConstants.EnumPostType.NEW,
      message: null
    });

    jQuery("#post_photo").val("");
  }
}