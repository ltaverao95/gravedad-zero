import { Injectable } from '@angular/core';

import { AppComponent } from '../../app/components/root-component/app.component';
import { HomeComponent } from '../../app/components/home-component/home.component';

@Injectable()
export class LoginRestoreViews {
    
    public setViewsWithCurrentUserLogged(){
        AppComponent.updateUserStatus.next(true);
        HomeComponent.updateUserStatus.next(true);
    }
}