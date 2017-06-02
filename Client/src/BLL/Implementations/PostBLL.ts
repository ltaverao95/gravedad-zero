import { ICrudOperationsBLL } from '../Interfaces/ICrudOperationsBLL';
import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';

export class PostBLL implements ICrudOperationsBLL
{
    public GetAllItems(): ActionResultDTO
    {
        let actionResultDTO: ActionResultDTO = new ActionResultDTO();

        try 
        {
            
        } 
        catch (error) 
        {
            actionResultDTO.SetErrorAndStackTrace("", error.message);    
        }

        return actionResultDTO;
    }

    public GetItemByID(itemID: number): ActionResultDTO
    {
        let actionResultDTO: ActionResultDTO = new ActionResultDTO();

        try 
        {
            
        } 
        catch (error) 
        {
            actionResultDTO.SetErrorAndStackTrace("", error.message);    
        }

        return actionResultDTO;
    }

    public AddNewItem(itemDTO: any): ActionResultDTO
    {
        let actionResultDTO: ActionResultDTO = new ActionResultDTO();

        try 
        {
            
        } 
        catch (error) 
        {
            actionResultDTO.SetErrorAndStackTrace("", error.message);    
        }

        return actionResultDTO;
    }

    public UpdateItemByID(itemDTO: any): ActionResultDTO
    {
        let actionResultDTO: ActionResultDTO = new ActionResultDTO();

        try 
        {
            
        } 
        catch (error) 
        {
            actionResultDTO.SetErrorAndStackTrace("", error.message);    
        }

        return actionResultDTO;
    }

    public DeleteAllItems(): ActionResultDTO
    {
        let actionResultDTO: ActionResultDTO = new ActionResultDTO();

        try 
        {
            
        } 
        catch (error) 
        {
            actionResultDTO.SetErrorAndStackTrace("", error.message);    
        }

        return actionResultDTO;
    }

    public DeleteItemByID(itemDTO: any): ActionResultDTO
    {
        let actionResultDTO: ActionResultDTO = new ActionResultDTO();

        try 
        {
            
        } 
        catch (error) 
        {
            actionResultDTO.SetErrorAndStackTrace("", error.message);    
        }

        return actionResultDTO;
    }
}