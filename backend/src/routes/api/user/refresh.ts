import Router from "@koa/router";
import { UserRefreshResponse } from "share";
import jwt, { JwtPayload } from "jsonwebtoken";
import { DefaultContext, DefaultState } from "koa";
import env from "../../../utils/env";
import { jwtExpire } from "../../../utils/const.ts";
import CtxPayload from "../../../types/ctxPayload.ts";
import { ErrorUnauthorized } from "../../../utils/restError.ts";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/refresh" // "/api/user/refresh/"
});

router.get("/", async (ctx) => {
    if (ctx.renewedJwt) {
        ctx.body = {
            code: 200,
            data: {
                jwt: ctx.renewedJwt
            }
        } satisfies UserRefreshResponse;
    } else {
        const jwtToken = ctx.header.authorization?.replace("Bearer ", "");
        if (jwtToken == null) {
            ctx.body = ErrorUnauthorized;
        } else {
            try {
                const jwtPayload = jwt.verify(jwtToken, env.jwt.secret) as JwtPayload;

                const { exp, iat, uuid } = jwtPayload;
                const now = Date.now() / 1000;
                if (exp != null && iat != null && uuid != null && exp >= now) {
                    const jwtToken = jwt.sign({ uuid, level: 1 }, env.jwt.secret, {
                        expiresIn: jwtExpire
                    });
                    ctx.set("x-renewed-jwt", jwtToken);
                    ctx.body = {
                        code: 200,
                        data: {
                            jwt: jwtToken
                        }
                    } satisfies UserRefreshResponse;
                    return;
                } else {
                    ctx.body = ErrorUnauthorized;
                    return;
                }
            } catch (err) {
                ctx.body = ErrorUnauthorized;
                return;
            }
        }
    }
});

export default router;
