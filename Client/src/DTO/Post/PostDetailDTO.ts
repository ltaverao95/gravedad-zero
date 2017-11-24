import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../Blocks/Utils/Services/UtilsFactory';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';
import { CoreConstants } from '../../Core/index';

export class PostDetailDTO
{
    public IdPostDetail: number = null;
    public Message: string = null;
    public PhotoUrl: string = null;
    public DatePublished: Date = new Date();
    public IdPost: number = null;

    private _utilsFactory: UtilsFactory;
    private _resourceMessages: ResourceMessages;

    constructor()
    {
        this._utilsFactory = new UtilsFactory();
        this._resourceMessages = new ResourceMessages();
    }

    public ValidatePostDetailDTO() : ActionResultDTO
    {
        var actionResultDTO = new ActionResultDTO();

        if(!this._utilsFactory.IsValidString(this.Message))
        {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_POSTDETAILDTO_MESSAGE_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }
}