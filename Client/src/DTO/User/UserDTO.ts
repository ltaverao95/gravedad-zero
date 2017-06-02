import { UserDetailDTO } from './UserDetailDTO';

export class UserDTO
{
    public Id: number = null;
    public UserName: string = null;
    public Password: string = null;
    public Role: string = null;

    public UserDetail: UserDetailDTO = null;
}