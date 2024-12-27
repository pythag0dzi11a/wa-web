import { is } from "typia";
import Router from "@koa/router";
import { AdminBanRequest, AdminBanResponse, AdminUnbanResponse, UnBanUserRequest } from "share";
import db from "../../../utils/db/db";
import { ErrorWrongFields } from "../../../utils/restError";
import { escapeLiteral } from "pg";

const router = new Router();

router.post("/ban", async (ctx) => {
    if (!is<AdminBanRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { uuid, type } = ctx.request.body;

    let banLevel;

    if (type === "strong") banLevel = -2;
    else if (type === "weak") banLevel = -1;

    await db().query(`update user_info
                    set permission = ${banLevel}
                    where uuid = ${escapeLiteral(uuid)};`);

    ctx.body = {
        code: 200,
        data: {}
    } satisfies AdminBanResponse;

    return;
});

router.post("/unban", async (ctx) => {
    if (!is<UnBanUserRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { uuid } = ctx.request.body;

    await db().query(`update user_info
                    set permission = 1
                    where uuid = ${escapeLiteral(uuid)};`);

    ctx.body = {
        code: 200,
        data: {}
    } satisfies AdminUnbanResponse;

    return;
});

export default router;
