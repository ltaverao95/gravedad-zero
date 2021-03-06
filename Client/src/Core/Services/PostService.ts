import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UtilsConstants } from '../../Blocks/Utils/constants';
import { AESEncryption } from '../../Blocks/Crypt/Services/AESEncryption';
import { ResourceMessages } from '../../Blocks/Messages/Services/ResourceMessages';
import { ICrudOperations } from '../../common/index';
import { PostDTO } from '../../DTO/Post/PostDTO';
import { CoreConstants } from '../index';

@Injectable()
export class PostService implements ICrudOperations<PostDTO>
{
    postsList: Array<PostDTO>;
    private _resourceMessages: ResourceMessages;

    constructor(private _http: Http,
        private _aesEncryption: AESEncryption) {
        this._resourceMessages = new ResourceMessages();
    }

    public GetAllPostsByPostType(enumPostType: CoreConstants.EnumPostType): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.POST_URLS.GET_ALL_POSTS_BY_POST_TYPE,
            method: RequestMethod.Post,
            body: JSON.stringify({
                enumPostType: enumPostType
            })
        });

        return this.DoRequest(requestOptions);
    }

    public GetAllItems(): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.POST_URLS.GET_ALL_POSTS,
            method: RequestMethod.Get
        });

        return this.DoRequest(requestOptions);
    }

    public GetItemByID(itemID: number): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: ''
        });

        return this.DoRequest(requestOptions);
    }

    public AddNewItem(itemDTO: any): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.POST_URLS.ADD_NEW_POST,
            method: RequestMethod.Post,
            body: itemDTO
        });

        return this.DoRequest(requestOptions);
    }

    public UpdateItemByID(itemDTO: PostDTO): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: ''
        });

        return this.DoRequest(requestOptions);
    }

    public DeleteAllItems(): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: ''
        });

        return this.DoRequest(requestOptions);
    }

    public DeleteItemByID(itemDTO: number): Observable<Response> {
        let requestOptions: Request = new Request({
            url: UtilsConstants.LOGIN_URLS.SIGN_IN_URL,
            method: RequestMethod.Post,
            body: ''
        });

        return this.DoRequest(requestOptions);
    }

    //##### Private Methods

    private DoRequest(requestOptions: Request): Observable<Response> {
        return this._http.request(requestOptions)
            .map((response: Response) => response)
            .catch((error: Response) => Observable.throw(error.json().error || this._resourceMessages.GetResourceMessage("ERROR_DOING_REQUEST")));
    }
}