// noinspection JSUnusedGlobalSymbols

import axios, { AxiosResponse } from "axios";
import { userInfo } from "@/utils/user/user-info.ts";
import { ApiResponseError } from "share";

type Response<T> = AxiosResponse<T extends never ? ApiResponseError : T | ApiResponseError>;

abstract class ApiBase<TReq, TRes> implements Api<TReq, TRes> {
    protected updateJwtPremium = (() => {
        const that = this;
        return function <T extends AxiosResponse>(r: T): T {
            if (that.premium && r.data?.error == "Unauthorized") {
                userInfo.value.jwtPremium = undefined;
                sessionStorage.removeItem("jwtPremium");
            }
            return r;
        };
    })();
    protected readonly path: string;
    protected readonly auth: boolean;
    protected readonly premium: boolean;

    constructor(path: string, auth: boolean, premium = false) {
        this.path = path;
        this.auth = auth;
        this.premium = premium;
    }

    async fetch(req: TReq): Promise<Response<TRes>> {
        return this._fetch(req).then(this.renewJwt).then(this.updateJwtPremium);
    }

    protected renewJwt<T extends AxiosResponse>(r: T): T {
        if (r.headers["x-renewed-jwt"]) {
            userInfo.value.jwt = r.headers["x-renewed-jwt"];
            localStorage.setItem("jwt", r.headers["x-renewed-jwt"]);
        }
        return r;
    }

    protected abstract _fetch(req: TReq): Promise<Response<TRes>>;
}

abstract class ApiBaseE<TRes> extends ApiBase<never, TRes> {
    async fetch(): Promise<Response<TRes>> {
        return super.fetch(<never>undefined);
    }

    protected abstract _fetch(): Promise<Response<TRes>>;
}

export default interface Api<TReq, TRes> {
    fetch(req: TReq): Promise<AxiosResponse<TRes | ApiResponseError>>;
}

const axiosInstance = axios.create({});
axiosInstance.interceptors.response.use(
    (r) => r,
    (e) => e.response
);

export class ApiGet<
    TReq extends string[][] | Record<string, string> | string | URLSearchParams,
    TRes
> extends ApiBase<TReq, TRes> {
    protected async _fetch(req: TReq): Promise<Response<TRes>> {
        return await axiosInstance.get(`${this.path}?${new URLSearchParams(req).toString()}`, {
            headers: {
                Authorization: this.auth
                    ? `Bearer ${this.premium ? userInfo.value.jwtPremium : userInfo.value.jwt}`
                    : undefined
            }
        });
    }
}

export class ApiGetE<TRes> extends ApiBaseE<TRes> {
    protected async _fetch(): Promise<Response<TRes>> {
        return await axiosInstance.get(this.path, {
            headers: {
                Authorization: this.auth
                    ? `Bearer ${this.premium ? userInfo.value.jwtPremium : userInfo.value.jwt}`
                    : undefined
            }
        });
    }
}

export class ApiPost<TReq, TRes> extends ApiBase<TReq, TRes> {
    protected async _fetch(req: TReq): Promise<Response<TRes>> {
        return await axiosInstance.post(this.path, req, {
            headers: {
                Authorization: this.auth
                    ? `Bearer ${this.premium ? userInfo.value.jwtPremium : userInfo.value.jwt}`
                    : undefined
            }
        });
    }
}

export class ApiPut<TReq, TRes = never> extends ApiBase<TReq, TRes> {
    protected async _fetch(req: TReq): Promise<Response<TRes>> {
        return await axiosInstance.put(this.path, req, {
            headers: {
                Authorization: this.auth
                    ? `Bearer ${this.premium ? userInfo.value.jwtPremium : userInfo.value.jwt}`
                    : undefined
            }
        });
    }
}

export class ApiDelete<TRes = never> extends ApiBase<never, TRes> {
    protected async _fetch(): Promise<Response<TRes>> {
        return await axiosInstance.delete(this.path, {
            headers: {
                Authorization: this.auth
                    ? `Bearer ${this.premium ? userInfo.value.jwtPremium : userInfo.value.jwt}`
                    : undefined
            }
        });
    }
}
