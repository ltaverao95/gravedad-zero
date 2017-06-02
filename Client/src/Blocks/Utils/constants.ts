enum EnumResult{
    Success = 1,
    Error = 0
}   

export class UtilsConstants
{
    public static EnumResult = EnumResult;
    public static SERVER_ABSOLUTE_PATH: string  = "http://localhost:81/gravedad-zero/Server/api/";

    public static LOGIN_URLS = {
        SIGN_IN_URL: UtilsConstants.SERVER_ABSOLUTE_PATH + "Login/SignIn.php"
    };
}