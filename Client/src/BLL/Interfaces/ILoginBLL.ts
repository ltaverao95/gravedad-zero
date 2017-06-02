import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { UserDTO } from '../../DTO/User/UserDTO';

export interface ILoginBLL
{
    SignIn: (userDTO: UserDTO) => Observable<Response>;
    LogOut: () => Observable<Response>;
    SignUp: (userDTO: UserDTO) => Observable<Response>;
}