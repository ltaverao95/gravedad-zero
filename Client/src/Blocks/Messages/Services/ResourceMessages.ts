export class ResourceMessages
{
    private _resourceMessagesList: Array<any> = [
        {
            key: 'ERROR_POSTDTO_TITLE_EMPTY',
            value: 'El título de la publicación no puede estar vacío'
        },
        {
            key: 'ERROR_POSTDTO_DESCRIPTION_EMPTY',
            value: 'La descripción de la publicación no puede estar vacía'
        },
        {
            key: 'ERROR_POSTDETAILDTO_MESSAGE_EMPTY',
            value: 'El mensaje del post no puede estar vacío'
        },
        {
            key: 'ERROR_POSTCOMMENTDTO_COMMENT_EMPTY',
            value: 'El comentario no puede estar vacío'
        },
        {
            key: 'INF_POSTDTO_COMMENTS_LIST_EMPTY',
            value: 'Actualmente no hay comentarios para mostrar'
        },
        {
            key: 'ERROR_SIGNIN_ALREADY_AUTENTICATED',
            value: 'Actualmente ya hay un usuario autenticado, por favor cierre sesión e inténtelo de nuevo'
        },
        {
            key: 'ERROR_SIGNIN_WITH_SERVER',
            value: 'Ocurrió un error tratando de iniciar sesión'
        },
        {
            key: 'ERROR_DOING_REQUEST',
            value: 'Ocurrió un error ejecutando petición HTTP'
        },
        {
            key: 'ERROR_USER_USERNAME_EMPTY',
            value: 'El nombre de usuario no puede estar vacío'
        },
        {
            key: 'ERROR_USER_PASSWORD_EMPTY',
            value: 'La contraseña no puede estar vacía'
        },
        {
            key: 'ERROR_USER_PASSWORD_DOESNT_MATCH',
            value: 'La contraseñas no coinciden'
        },
        {
            key: 'ERROR_USER_ROLE_EMPTY',
            value: 'El rol para el usuario no puede estar vacío'
        },
        {
            key: 'ERROR_USER_DETAIL_NAME_EMPTY',
            value: 'El nombre no puede estar vacío'
        },
        {
            key: 'ERROR_USER_DETAIL_SURNAME_EMPTY',
            value: 'El apellido no puede estar vacío'
        },
        {
            key: 'ERROR_USER_DETAIL_EMAIL_EMPTY',
            value: 'El correo electrónico no puede estar vacío'
        },
        {
            key: 'ERROR_USER_DETAIL_IDENTITY_NUMBER_EMPTY',
            value: 'El documento de identificación no puede estar vacío'
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