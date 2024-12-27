import { is } from "typia";
import Router from "@koa/router";
import { escapeLiteral } from "pg";
import { AdminUserGetQuery, AdminUserGetResponse } from "share";
import { logger } from "../../../utils/log";
import db from "../../../utils/db/db";
import { ErrorWrongFields, ErrorNotFound } from "../../../utils/restError";

const router = new Router({
    prefix: "/user"
});

router.get("/", async (ctx) => {
    if (!is<AdminUserGetQuery>(ctx.query)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { uuid, username, email, count } = <AdminUserGetQuery>ctx.query;

    const sql = `select * from user_info
                ${uuid ? `where uuid = ${escapeLiteral(uuid)}` : ""}
                ${count ? `limit ${count}` : ""}
                ${username ? `where username = ${escapeLiteral(username)}` : ""}
                ${email ? `where email = ${escapeLiteral(email)}` : ""};`;

    logger.debug(sql);

    const result = await db().query(sql);

    if (result.rows.length === 0) {
        ctx.body = ErrorNotFound;
        return;
    }

    ctx.body = {
        code: 200,
        data: result.rows
    } satisfies AdminUserGetResponse;
    return;
});

export default router;
