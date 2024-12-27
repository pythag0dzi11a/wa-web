import Router from "@koa/router";
import { escapeLiteral } from "pg";
import { DefaultContext, DefaultState } from "koa";
import CtxPayload from "../../../types/ctxPayload.ts";
import loginVerify from "../../routerMiddleWares/loginVerify.ts";
import permissionVerify from "../../routerMiddleWares/permissionVerify.ts";
import {
    ErrorDeletingPrimaryEmail,
    ErrorEmailNotFound,
    ErrorPermissionDenied,
    ErrorWrongFields
} from "../../../utils/restError.ts";
import { is } from "typia";
import { UserEmailDeleteQuery, UserEmailDeleteResponse } from "share";
import db from "../../../utils/db/db.ts";
import Locker from "../../../types/locker.ts";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/email-delete" //  /api/user/email-delete
});

router.use(loginVerify);
router.use(permissionVerify(0));

router.get("/", async (ctx) => {
    if (ctx.jwtLevel < 2 && (await ctx.userInfo.permission()) != 0) {
        ctx.body = ErrorPermissionDenied;
        return;
    }

    if (!is<UserEmailDeleteQuery>(ctx.query)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { email } = ctx.query;

    await Locker.withLock([`user/email-delete/${ctx.userInfo.uuid()}`, `email/${email}`], async () => {
        const userEmailsResult = await db().query(
            `select email
             from user_emails
             where email = ${escapeLiteral(email)};`
        );

        if ((await ctx.userInfo.email()) == email) {
            ctx.body = ErrorDeletingPrimaryEmail;
            return;
        }

        if (userEmailsResult.rows.length == 0) {
            ctx.body = ErrorEmailNotFound;
            return;
        }

        Promise.all([
            db().query(`delete
                        from user_emails
                        where email = ${escapeLiteral(email)};`)
        ]).then();

        ctx.body = {
            code: 200,
            data: {}
        } satisfies UserEmailDeleteResponse;
    });
});

export default router;
