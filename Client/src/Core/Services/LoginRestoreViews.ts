import { Injectable } from '@angular/core';

import { AppComponent } from '../../app/components/root-component/app.component';
import { HomeComponent } from '../../app/components/home-component/home.component';
import { VideoComponent } from '../../app/components/video-component/video.component';

@Injectable()
export class LoginRestoreViews {
    
    public setViewsWithCurrentUserLogged(){
        AppComponent.updateUserStatus.next(true);
        HomeComponent.updateUserStatus.next(true);
        VideoComponent.updateUserStatus.next(true);
    }
}