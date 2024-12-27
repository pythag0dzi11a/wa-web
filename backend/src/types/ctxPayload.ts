import UserInfo from "./lazyload/userInfo.ts";

namespace CtxPayload {
    export interface jwt {
        verified: boolean;
        renewedJwt: string | undefined;
        userInfo: UserInfo;
        jwtLevel: number;
    }
}

export default CtxPayload;
