import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../Blocks/Utils/Services/UtilsFactory';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';

export class NewsDTO
{
    public Title: string = null;
    public Description: string = null;
    public OwnerPhoto: string = null;

    private _utilsFactory: UtilsFactory;
    private _resourceMessages: ResourceMessages;

    constructor()
    {
        this._utilsFactory = new UtilsFactory();
        this._resourceMessages = new ResourceMessages();
    }

    public ValidateNewsDTO() : ActionResultDTO
    {
        var actionResultDTO = new ActionResultDTO();

        if(!this._utilsFactory.IsValidString(this.Title))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_NEWS_DTO_TITLE_EMPTY"));
            return actionResultDTO;
        }

        if(!this._utilsFactory.IsValidString(this.Description))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_NEWS_DTO_DESCRIPTION_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }
}