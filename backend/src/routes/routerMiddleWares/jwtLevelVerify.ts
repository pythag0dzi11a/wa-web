import { DefaultContext, Next } from "koa";
import CtxPayload from "../../types/ctxPayload.ts";
import { ErrorPermissionDenied } from "../../utils/restError.ts";

export default function (level: number) {
    return async function (ctx: DefaultContext & CtxPayload.jwt, next: Next) {
        if (ctx.jwtLevel < level) {
            ctx.body = ErrorPermissionDenied;
            return;
        }
        await next();
    };
}
