import { is } from "typia";
import jwt from "jsonwebtoken";
import Router from "@koa/router";
import { UserAuthRequest, UserAuthResponse } from "share";
import { DefaultContext, DefaultState } from "koa";
import env from "../../../utils/env.ts";
import db from "../../../utils/db/db.ts";
import CtxPayload from "../../../types/ctxPayload.ts";
import { hashPassword } from "../../../utils/password.ts";
import { ErrorWrongFields, ErrorWrongPassword } from "../../../utils/restError.ts";
import loginVerify from "../../routerMiddleWares/loginVerify.ts";
import { escapeLiteral } from "pg";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/auth" // /api/user/auth
});

router.use(loginVerify);

router.post("/", async (ctx) => {
    if (!is<UserAuthRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { password } = ctx.request.body;
    const hashedPassword = hashPassword(password);

    const result = await db().query(`select hashed_password
                                     from user_security
                                     where uuid = ${escapeLiteral(ctx.userInfo.uuid())};`);

    if (result.rows[0]["hashed_password"] != hashedPassword) {
        ctx.body = ErrorWrongPassword;
        return;
    }

    const token = jwt.sign({ uuid: ctx.userInfo.uuid(), level: 2 }, env.jwt.secret, {
        expiresIn: "1h"
    });

    ctx.body = {
        code: 200,
        data: { jwt: token }
    } satisfies UserAuthResponse;
    return;
});

export default router;
