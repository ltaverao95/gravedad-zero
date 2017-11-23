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
        },
        {
            key: 'ERROR_SIGNIN_ALREADY_AUTENTICATED',
            value: 'Actualmente ya hay un usuario autenticado, por favor cierre sesión e inténtelo de nuevo.'
        },
        {
            key: 'ERROR_SIGNIN_WITH_SERVER',
            value: 'Ocurrió un error tratando de iniciar sesión.'
        },
        {
            key: 'ERROR_DOING_REQUEST',
            value: 'Ocurrió un error ejecutando petición HTTP'
        }
    ];

    public GetResourceMessage(resourceMessageId: string): string
    {
        var resource = this.FindResource(resourceMessageId);
        
        return resource === null ? "" : resource;
    }

    private FindResource(resourceId: string): string
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