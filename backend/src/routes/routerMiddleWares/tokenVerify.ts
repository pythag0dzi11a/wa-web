import { DefaultContext, Next } from "koa";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../../utils/env.ts";
import { jwtExpire } from "../../utils/const.ts";
import CtxPayload from "../../types/ctxPayload.ts";
import UserInfo from "../../types/lazyload/userInfo.ts";

export default async function (ctx: DefaultContext & CtxPayload.jwt, next: Next) {
    ctx.verified = false;
    ctx.jwtLevel = 0;
    const jwtToken = ctx.header.authorization?.replace("Bearer ", "");
    if (jwtToken != null) {
        try {
            const jwtPayload = jwt.verify(jwtToken, env.jwt.secret) as JwtPayload;

            const { exp, iat, uuid, level } = jwtPayload;
            const now = Date.now() / 1000;
            if (exp != null && iat != null && uuid != null && level != null && exp >= now) {
                const userInfo = new UserInfo(uuid);
                if ((await userInfo.securityUpdatedTime()) / 1000 <= iat) {
                    ctx.verified = true;
                    ctx.userInfo = userInfo;
                    ctx.jwtLevel = level;
                    if (level == 1 && now - iat > 3600) {
                        const jwtToken = jwt.sign({ uuid, level: 1 }, env.jwt.secret, {
                            expiresIn: jwtExpire
                        });
                        ctx.set("x-renewed-jwt", jwtToken);
                        ctx.renewedJwt = jwtToken;
                    }
                }
            }
        } catch {}
    }

    await next();
}
