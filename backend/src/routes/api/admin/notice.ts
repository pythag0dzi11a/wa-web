import fs from "fs";
import { is } from "typia";
import Router from "@koa/router";
import { AdminNoticeGetResponse, AdminNoticePostRequest, AdminNoticePostResponse } from "share";
import db from "../../../utils/db/db";
import { ErrorWrongFields } from "../../../utils/restError";
import { escapeLiteral } from "pg";

const router = new Router({
    prefix: "/notice" // /api/admin/notice
});

const noticePath = process.cwd() + "/cache/notice.md";

router.get("/", async (ctx) => {
    const noticeMdSourceCode = fs.readFileSync(noticePath, "utf-8").toString();

    ctx.body = {
        code: 200,
        data: {
            src: noticeMdSourceCode
        }
    } satisfies AdminNoticeGetResponse;

    return;
});

router.post("/", async (ctx) => {
    if (!is<AdminNoticePostRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    fs.writeFileSync(noticePath, ctx.request.body.src, "utf-8");

    await db().query(`update user_info set notice = ${escapeLiteral(ctx.request.body.src)};`);

    ctx.body = {
        code: 200,
        data: {}
    } satisfies AdminNoticePostResponse;

    return;
});
export default router;
