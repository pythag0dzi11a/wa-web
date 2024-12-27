import { is } from "typia";
import Router from "@koa/router";
import { escapeLiteral } from "pg";
import { DefaultContext, DefaultState } from "koa";
import { UserInfoPostRequest, UserInfoResponse } from "share";
import db from "../../../utils/db/db";
import CtxPayload from "../../../types/ctxPayload";
import loginVerify from "../../routerMiddleWares/loginVerify.ts";
import {
    ErrorPermissionDenied,
    ErrorUnauthorized,
    ErrorWrongFields
} from "../../../utils/restError.ts";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/info" // /api/user/info
});

router.use(loginVerify);

router.get("/", async (ctx) => {
    if (!ctx.verified) {
        ctx.body = ErrorUnauthorized;
        return;
    }

    ctx.body = {
        code: 200,
        data: {
            uuid: ctx.userInfo.uuid(),
            username: await ctx.userInfo.username(),
            email: await ctx.userInfo.email(),
            permission: await ctx.userInfo.permission()
        }
    } satisfies UserInfoResponse;
});

router.post("/", async (ctx) => {
    if (ctx.jwtLevel < 2 && (await ctx.userInfo.permission()) != 0) {
        ctx.body = ErrorPermissionDenied;
        return;
    }

    if (!is<UserInfoPostRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }
    await db().query(`select *
                                 from user_info
                                 where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);
    const process = await Promise.all([
        (async () => {
            if (
                ctx.request.body.username &&
                (await ctx.userInfo.username()) != ctx.request.body.username
            ) {
                await db().query(`update user_info
                                  set username = ${escapeLiteral(ctx.request.body.username)}
                                  where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);
            }

            return true;
        })(),
        (async () => {
            if (ctx.request.body.email && (await ctx.userInfo.email()) != ctx.request.body.email) {
                const r2 = await db().query(`select *
                                             from user_emails
                                             where email = ${escapeLiteral(ctx.request.body.email)}`);

                if (r2.rows.length == 0) {
                    ctx.request.body = ErrorWrongFields;
                    return false;
                }

                if (r2.rows[0].uuid != ctx.userInfo.uuid()) {
                    ctx.request.body = ErrorWrongFields;
                    return false;
                }

                if (!r2.rows[0].verified) {
                    ctx.request.body = ErrorWrongFields;
                    return false;
                }

                await db().query(`update user_info
                                  set email = ${escapeLiteral(ctx.request.body.email)}
                                  where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);

                if ((await ctx.userInfo.permission()) == 0) {
                    await db().query(`update user_info
                                      set permission = 1
                                      where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);
                }
            }
            return true;
        })()
    ]);

    for (const p of process) {
        if (!p) {
            return;
        }
    }

    const result = await db().query(`select *
                                     from user_info
                                     where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);

    const userInfo = result.rows[0];

    ctx.body = {
        code: 200,
        data: {
            username: userInfo.username,
            email: userInfo.email,
            uuid: userInfo.uuid,
            permission: userInfo.permission
        }
    } satisfies UserInfoResponse;
});

export default router;
