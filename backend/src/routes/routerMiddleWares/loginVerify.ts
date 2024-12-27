import { DefaultContext, Next } from "koa";
import CtxPayload from "../../types/ctxPayload.ts";
import { ErrorUnauthorized } from "../../utils/restError.ts";

export default async function (ctx: DefaultContext & CtxPayload.jwt, next: Next) {
    if (!ctx.verified) {
        ctx.body = ErrorUnauthorized;
        return;
    }

    await next();
}
