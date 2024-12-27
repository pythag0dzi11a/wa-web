import { is } from "typia";
import Router from "@koa/router";
import { escapeLiteral } from "pg";
import { DefaultContext, DefaultState } from "koa";
import { UserEmailGetResponse, UserEmailPutRequest, UserEmailPutResponse } from "share";
import Locker from "../../../types/locker.ts";
import db from "../../../utils/db/db";
import CtxPayload from "../../../types/ctxPayload";
import loginVerify from "../../routerMiddleWares/loginVerify.ts";
import permissionVerify from "../../routerMiddleWares/permissionVerify.ts";
import { ErrorEmailExist, ErrorPermissionDenied, ErrorWrongFields } from "../../../utils/restError";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/email" //  /api/user/email
});

router.use(loginVerify);
router.use(permissionVerify(0));

router.get("/", async (ctx) => {
    const result = await db().query(`select *
                                     from user_emails
                                     where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);
    const emails: {
        email: string;
        verified: boolean;
    }[] = [];
    result.rows.map((row) => {
        emails.push({
            email: row["email"],
            verified: row["verified"]
        });
    });

    ctx.body = {
        code: 200,
        data: {
            emails
        }
    } satisfies UserEmailGetResponse;
});

router.put("/", async (ctx) => {
    if (ctx.jwtLevel < 2 && (await ctx.userInfo.permission()) != 0) {
        ctx.body = ErrorPermissionDenied;
    }

    if (!is<UserEmailPutRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { email } = ctx.request.body;
    const uuid = ctx.userInfo.uuid();

    const lock = await Locker.lock([`user/add-email/${uuid}`, `email/${email}`]);

    try {
        const result = await db().query(`SELECT *
                                         FROM user_emails
                                         WHERE email = ${escapeLiteral(email)}`);
        if (result.rows.length > 0) {
            ctx.body = ErrorEmailExist;
        }

        ctx.body = {
            code: 200,
            data: {}
        } satisfies UserEmailPutResponse;

        // background
        db()
            .query(
                `insert into user_emails (uuid, email, verified)
                 values (${escapeLiteral(uuid)}, ${escapeLiteral(email)}, true)`
            )
            .finally(() => {
                lock.unlock();
            });
    } catch (e) {
        lock.unlock();
        throw e;
    }
});

export default router;
