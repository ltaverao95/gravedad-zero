import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';

export interface ICrudOperationsBLL
{
    GetAllItems: () => ActionResultDTO;
    GetItemByID: (itemID: number) => ActionResultDTO;
    AddNewItem: (itemDTO: any) => ActionResultDTO;
    UpdateItemByID: (itemDTO: any) => ActionResultDTO;
    DeleteAllItems: () => ActionResultDTO;
    DeleteItemByID: (itemDTO: any) => ActionResultDTO;
}