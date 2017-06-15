import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { ActionResultDTO } from '../Blocks/Utils/Services/ActionResultDTO';
import { UserDTO } from '../DTO/User/UserDTO';

interface ICrudOperations<TEntity>
{
    GetAllItems: () => ActionResultDTO;
    GetItemByID: (itemID: number) => ActionResultDTO;
    AddNewItem: (itemDTO: TEntity) => ActionResultDTO;
    UpdateItemByID: (itemDTO: TEntity) => ActionResultDTO;
    DeleteAllItems: () => ActionResultDTO;
    DeleteItemByID: (itemID: number) => ActionResultDTO;
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