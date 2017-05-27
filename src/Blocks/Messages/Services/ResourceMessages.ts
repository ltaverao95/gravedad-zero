export class ResourceMessages
{
    private _resourceMessagesList: Array<any> = [
        {
            key: 'ERROR_NEWS_DTO_TITLE_EMPTY',
            value: 'El título de la publicación no puede estar vacío'
        },
        {
            key: 'ERROR_NEWS_DTO_DESCRIPTION_EMPTY',
            value: 'La descripción de la publicación no puede estar vacía'
        }
    ];

    public GetResourceMessage(resourceMessageId: string)
    {
        var resource = this.FindResource(resourceMessageId);
        
        return resource === null ? "" : resource;
    }

    private FindResource(resourceId: string)
    {
        for(var i = 0; i < this._resourceMessagesList.length; i++)
        {
            if(this._resourceMessagesList[i].key === resourceId)
            {
                return this._resourceMessagesList[i].value;
            }
        }

        return null;
    }
}