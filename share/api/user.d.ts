import { tags } from "typia";
import customTags from "../typia";

export interface UserLoginRequest {
    identity: string;
    password: string;
}

export interface UserLoginResponse {
    code: 200;
    data: {
        jwt: string;
    };
}

export interface UserRegisterRequest {
    username: string & customTags.Username;
    email: string & tags.Format<"email">;
    password: string;
}

export interface UserRegisterResponse {
    code: 200;
    data: {
        uuid: string;
    };
}

export interface UserRefreshResponse {
    code: 200;
    data: {
        jwt: string;
    };
}

export interface UserInfoResponse {
    code: 200;
    data: {
        username: string;
        email: string;
        uuid: string;
        permission: number;
    };
}

export interface UserInfoPostRequest {
    username?: string & customTags.Username;
    email?: string & tags.Format<"email">;
}

export interface UserInfoPostResponse {
    code: 200;
    data: {};
}
export interface UserEmailGetResponse {
    code: 200;
    data: {
        emails: {
            email: string;
            verified: boolean;
        }[];
    };
}

export interface UserEmailPutRequest {
    email: string & tags.Format<"email">;
}

export interface UserEmailPutResponse {
    code: 200;
    data: {};
}

export interface UserEmailDeleteQuery extends Record<string, string> {
    email: string & tags.Format<"email">;
}

export interface UserEmailDeleteResponse {
    code: 200;
    data: {};
}

export interface UserVerifyQuery extends Record<string, string> {
    token: string;
}

export interface UserVerifyResponse {
    code: 200;
    data: {};
}
export interface UserAuthRequest {
    password: string;
}

export interface UserAuthResponse {
    code: 200;
    data: {
        jwt: string;
    };
}

export interface UserPasswordPutRequest {
    password: string;
    newPassword: string;
}

export interface UserPasswordPutResponse {
    code: 200;
    data: {};
}
