import { ActionResultDTO } from '../../Blocks/Utils/Services/ActionResultDTO';
import { UtilsFactory } from '../../Blocks/Utils/Services/UtilsFactory';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';
import { CoreConstants } from '../../Core/index';
import { PostDetailDTO } from './PostDetailDTO';
import { PostCommentDTO } from './PostCommentDTO';
import { UserDTO } from '../User/UserDTO';

export class PostDTO {
    public Id: number = null;
    public Title: string = null;
    public PostType: CoreConstants.EnumPostType = CoreConstants.EnumPostType.NEW;
    public Selected: boolean = false;

    public UserDTO: UserDTO = null;
    public PostDetailDTO: PostDetailDTO = null;
    public PostCommentsDTOList: Array<PostCommentDTO> = null;

    private _utilsFactory: UtilsFactory;
    private _resourceMessages: ResourceMessages;

    constructor() {
        this._utilsFactory = new UtilsFactory();
        this._resourceMessages = new ResourceMessages();
        
        this.UserDTO = new UserDTO();
        this.PostDetailDTO = new PostDetailDTO();
        this.PostCommentsDTOList = new Array<PostCommentDTO>();
    }

    public ValidatePostDTO(): ActionResultDTO {
        let actionResultDTO = new ActionResultDTO();

        if (!this._utilsFactory.IsValidString(this.Title)) {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("ERROR_POSTDTO_TITLE_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }

    public ValidatePostAndPostDetailDTO(): ActionResultDTO {
        let actionResultDTO = this.ValidatePostDTO();

        if (actionResultDTO.HasErrors) {
            return actionResultDTO;
        }

        return this.PostDetailDTO.ValidatePostDetailDTO();
    }

    public ValidatePostCommentsList(): ActionResultDTO {
        let actionResultDTO = new ActionResultDTO();

        if (!this._utilsFactory.IsArrayNullOrEmpty(this.PostCommentsDTOList)) {
            actionResultDTO.SetError(this._resourceMessages.GetResourceMessage("INF_POSTDTO_COMMENTS_LIST_EMPTY"));
            return actionResultDTO;
        }

        return actionResultDTO;
    }
}