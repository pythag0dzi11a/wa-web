// noinspection JSUnusedGlobalSymbols

import {
    UserAuthRequest,
    UserAuthResponse,
    UserEmailDeleteQuery,
    UserEmailDeleteResponse,
    UserEmailGetResponse,
    UserEmailPutRequest,
    UserEmailPutResponse,
    UserInfoPostRequest,
    UserInfoResponse,
    UserLoginRequest,
    UserLoginResponse,
    UserPasswordPutRequest,
    UserRefreshResponse,
    UserRegisterRequest,
    UserRegisterResponse,
    UserVerifyQuery,
    UserVerifyResponse
} from "share";
import Api, { ApiGet, ApiGetE, ApiPost, ApiPut } from "@/types/api.ts";
import { shaPassword } from "@/utils/security.ts";

namespace UserApi {
    const _register = new ApiPost<UserRegisterRequest, UserRegisterResponse>(
        "/api/user/register",
        false
    );
    export const register: Api<UserRegisterRequest, UserRegisterResponse> = {
        async fetch(req: UserRegisterRequest) {
            req.password = await shaPassword(req.password);
            return await _register.fetch(req);
        }
    };
    const _login = new ApiPost<UserLoginRequest, UserLoginResponse>("/api/user/login", false);
    export const login: Api<UserLoginRequest, UserLoginResponse> = {
        async fetch(req: UserLoginRequest) {
            req.password = await shaPassword(req.password);
            return await _login.fetch(req);
        }
    };
    export const verify = new ApiGet<UserVerifyQuery, UserVerifyResponse>(
        "/api/user/verify",
        false
    );
    export const infoGet = new ApiGetE<UserInfoResponse>("/api/user/info", true);
    export const infoPost = new ApiPost<UserInfoPostRequest, UserInfoResponse>(
        "/api/user/info",
        true,
        true
    );
    export const emailGet = new ApiGetE<UserEmailGetResponse>("/api/user/email", true);

    export const emailPut = new ApiPut<UserEmailPutRequest, UserEmailPutResponse>(
        "/api/user/email",
        true
    );
    export const emailDelete = new ApiGet<UserEmailDeleteQuery, UserEmailDeleteResponse>(
        "/api/user/email-delete",
        true,
        true
    );

    export const refresh = new ApiGetE<UserRefreshResponse>("/api/user/refresh", true);

    export const passwordPut = new ApiPut<UserPasswordPutRequest, UserEmailPutResponse>(
        "/api/user/password",
        true,
        true
    );

    export const auth = new ApiPost<UserAuthRequest, UserAuthResponse>("/api/user/auth", true);

}
export default UserApi;
