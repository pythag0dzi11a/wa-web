import { DefaultContext, Next } from "koa";

export default async function (ctx: DefaultContext, next: Next) {
    if (ctx.headers["x-forwarded-for"]) {
        ctx.request.ip = ctx.headers["x-forwarded-for"].split(",")[0].trim();
    }
    await next();
}
