import Router from "@koa/router";
import { ApiResponseError } from "share";
import { DefaultContext, DefaultState } from "koa";
import coffee from "./coffee";
import { logger } from "../../utils/log.ts";
import userRouter from "./user/userRouter.ts";
import adminRouter from "./admin/adminRouter.ts";
import CtxPayload from "../../types/ctxPayload.ts";
import tokenVerify from "../routerMiddleWares/tokenVerify.ts";
import { ErrorInternalServerError } from "../../utils/restError.ts";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/api"
});

router.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = ErrorInternalServerError;
        ctx.status = 500;
        logger.error(err);
    }
});

router.use(tokenVerify);

router.use(async (ctx, next) => {
    ctx.type = "application/json";

    await next();

    if ((ctx.body as any)?.code != null) {
        ctx.status = (ctx.body as any).code;
    }

    let chunk = ctx.body;
    if (chunk == null) {
        chunk = "";
    } else if (typeof chunk == "object") {
        chunk = JSON.stringify(chunk);
    } else {
        chunk = chunk.toString();
    }

    if (chunk == "") {
        chunk = null;
    }

    ctx.body = chunk;
});

router.use(coffee.routes());
router.use(userRouter.routes());
router.use(adminRouter.routes());

router.get("/", async (ctx) => {
    ctx.body = {
        code: 200,
        data: {
            message: "wa api"
        }
    };
});

router.all("/(.*)", async (ctx) => {
    ctx.body = {
        code: 404,
        error: "NotFound"
    } satisfies ApiResponseError;
});

export default router;
