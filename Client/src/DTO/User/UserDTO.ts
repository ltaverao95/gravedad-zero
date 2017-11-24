import { UserDetailDTO } from './UserDetailDTO';
import { UtilsFactory } from '../../Blocks/Utils/Services/UtilsFactory';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';
import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';

export class UserDTO
{
    public Id: number = null;
    public UserName: string = null;
    public Password: string = null;
    public Role: string = null;

    public UserDetail: UserDetailDTO = null;

    private _utilsFactory: UtilsFactory;
    private _resourceMessages: ResourceMessages;

    constructor()
    {
        this._utilsFactory = new UtilsFactory();
        this._resourceMessages = new ResourceMessages();
    }

    public ValidateUserDTO() : ActionResultDTO
    {
        let actionResultDTO = new ActionResultDTO();

        if(!this._utilsFactory.IsValidString(this.UserName))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_USERNAME_EMPTY"));
            return actionResultDTO;
        }

        if(!this._utilsFactory.IsValidString(this.Password))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_PASSWORD_EMPTY"));
            return actionResultDTO;
        }

        if(!this._utilsFactory.IsValidString(this.Role))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_ROLE_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }

    public ValidateUserAndUserDetailDTO() : ActionResultDTO
    {
        let actionResultDTO = this.ValidateUserDTO();
        if(actionResultDTO.HasErrors)
        {
            return actionResultDTO;
        }

        return this.UserDetail.ValidateUserDetailDTO();
    }
}