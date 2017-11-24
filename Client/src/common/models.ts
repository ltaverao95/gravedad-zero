import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { UserDTO } from '../DTO/User/UserDTO';

interface ICrudOperations<TEntity>
{
    GetAllItems: () => Observable<Response>;
    GetItemByID: (itemID: number) => Observable<Response>;
    AddNewItem: (itemDTO: TEntity) => Observable<Response>;
    UpdateItemByID: (itemDTO: TEntity) => Observable<Response>;
    DeleteAllItems: () => Observable<Response>;
    DeleteItemByID: (itemID: number) => Observable<Response>;
}

interface ILogin
{
    SignIn: (userDTO: UserDTO) => Observable<Response>;
    LogOut: () => Observable<Response>;
    SignUp: (userDTO: UserDTO) => Observable<Response>;
}

export {
    ILogin,
    ICrudOperations
}