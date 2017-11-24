import { UtilsFactory } from '../../Blocks/Utils/Services/UtilsFactory';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';
import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';

export class UserDetailDTO
{
    public IdUserDetail: number;
    public IdentityNumber: number;
    public Name: string;
    public Surname: string;
    public Email: string;
    public IdUser: number;
    public ProfilePhoto: string;

    private _utilsFactory: UtilsFactory;
    private _resourceMessages: ResourceMessages;

    constructor()
    {
        this._utilsFactory = new UtilsFactory();
        this._resourceMessages = new ResourceMessages();
    }

    public ValidateUserDetailDTO() : ActionResultDTO
    {
        let actionResultDTO = new ActionResultDTO();

        if(!this._utilsFactory.IsValidNumber(this.IdentityNumber))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_DETAIL_NAME_EMPTY"));
            return actionResultDTO;
        }

        if(!this._utilsFactory.IsValidString(this.Name))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_DETAIL_NAME_EMPTY"));
            return actionResultDTO;
        }

        if(!this._utilsFactory.IsValidString(this.Surname))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_DETAIL_SURNAME_EMPTY"));
            return actionResultDTO;
        }

        if(!this._utilsFactory.IsValidString(this.Email))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_USER_DETAIL_EMAIL_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }
}