import { DefaultContext, Next } from "koa";
import CtxPayload from "../../types/ctxPayload.ts";
import { ErrorPermissionDenied } from "../../utils/restError.ts";

export default function (level: number) {
    return async function (ctx: DefaultContext & CtxPayload.jwt, next: Next) {
        if ((await ctx.userInfo.permission()) < level) {
            ctx.status = 403;
            ctx.body = ErrorPermissionDenied;
            return;
        }
        await next();
    };
}
