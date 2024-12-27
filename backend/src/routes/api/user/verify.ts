import { is } from "typia";
import Router from "@koa/router";
import { escapeLiteral } from "pg";
import { UserVerifyQuery, UserVerifyResponse } from "share";
import { logger } from "../../../utils/log";
import db from "../../../utils/db/db";
import { emailVerifyExpire } from "../../../utils/const.ts";
import { ErrorPermissionDenied, ErrorWrongFields } from "../../../utils/restError.ts";

const router = new Router({
    prefix: "/verify" // /api/user/verify
});

router.get("/", async (ctx) => {
    if (!is<UserVerifyQuery>(ctx.query)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const token = ctx.query.token;

    const resultToken = await db().query(`select *
                                          from user_email_verify
                                          where token = ${escapeLiteral(token)}`);

    if (resultToken.rowCount == 0) {
        ctx.body = ErrorPermissionDenied;
        return;
    }

    const { uuid, email } = resultToken.rows[0];
    const createdAt = resultToken.rows[0]["created_at"];

    if (createdAt + emailVerifyExpire < Date.now()) {
        ctx.body = ErrorPermissionDenied;
        return;
    }

    // 更新数据库中的数据
    logger.info(`Verified: ${email}`);

    await db().query(`update user_emails
                      set verified = true
                      where email = ${escapeLiteral(email)};`);

    const result = await db().query(`select *
                                     from user_info
                                     where uuid = ${escapeLiteral(uuid)}`);
    if (result.rows[0]["email"] == email && result.rows[0]["permission"] == 0) {
        logger.info(`User ${uuid} verified`);
        await db().query(`UPDATE user_info
                          SET permission = 1
                          WHERE uuid = ${escapeLiteral(uuid)}
                            and email = ${escapeLiteral(email)};`);
    }

    ctx.body = {
        code: 200,
        data: {}
    } satisfies UserVerifyResponse;
    return;
});

export default router;
