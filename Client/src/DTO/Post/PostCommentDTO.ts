import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../Blocks/Utils/Services/UtilsFactory';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';
import { CoreConstants } from '../../Core/index';
import { PostDetailDTO } from './PostDetailDTO';

export class PostCommentDTO {
    public IdPostComment: number = null;
    public Comment: string = null;
    public DatePublished: Date = new Date();

    private _utilsFactory: UtilsFactory;
    private _resourceMessages: ResourceMessages;

    constructor() {
        this._utilsFactory = new UtilsFactory();
        this._resourceMessages = new ResourceMessages();
    }

    public ValidatePostCommentDTO(): ActionResultDTO {
        let actionResultDTO = new ActionResultDTO();

        if (!this._utilsFactory.IsValidString(this.Comment)) {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_POSTCOMMENTDTO_COMMENT_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }
}