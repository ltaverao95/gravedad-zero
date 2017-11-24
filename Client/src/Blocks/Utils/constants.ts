export namespace UtilsConstants {

    export enum EnumResult {
        Success = 1,
        Error = 0
    }

    export const SERVER_ABSOLUTE_PATH: string = "http://localhost:81/gravedad-zero/Server/api/";

    export const LOGIN_URLS = {
        SIGN_IN_URL: UtilsConstants.SERVER_ABSOLUTE_PATH + "Login/SignIn.php"
    };

    export const POST_URLS = {
        GET_ALL_POSTS: UtilsConstants.SERVER_ABSOLUTE_PATH + "Post/GetAllPosts.php"
    };
}