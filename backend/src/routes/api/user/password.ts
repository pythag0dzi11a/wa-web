import Router from "@koa/router";
import { DefaultContext, DefaultState } from "koa";
import CtxPayload from "../../../types/ctxPayload.ts";
import loginVerify from "../../routerMiddleWares/loginVerify.ts";
import jwtLevelVerify from "../../routerMiddleWares/jwtLevelVerify.ts";
import { is } from "typia";
import { UserPasswordPutRequest, UserPasswordPutResponse } from "share";
import { ErrorWrongFields, ErrorWrongPassword } from "../../../utils/restError.ts";
import Locker from "../../../types/locker.ts";
import { escapeLiteral } from "pg";
import db from "../../../utils/db/db.ts";
import { hashPassword } from "../../../utils/password.ts";
import { securityUpdateTimeCache } from "../../../types/lazyload/userInfo.ts";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/password" // /api/user/password
});

router.use(loginVerify);
router.use(jwtLevelVerify(2));

router.put("/", async (ctx) => {
    if (!is<UserPasswordPutRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const oldPassword = hashPassword(ctx.request.body.password);
    const newPassword = hashPassword(ctx.request.body.newPassword);

    await Locker.withLock(`user/password/${ctx.userInfo.uuid()}`, async () => {
        const result = await db().query(`select hashed_password
                                         from user_security
                                         where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);

        if (result.rows[0]["hashed_password"] != oldPassword) {
            ctx.body = ErrorWrongPassword;
            return;
        }

        await db().query(`update user_security
                          set hashed_password = ${escapeLiteral(newPassword)}
                          where uuid = ${escapeLiteral(ctx.userInfo.uuid())}`);

        securityUpdateTimeCache.delete(ctx.userInfo.uuid());

        ctx.body = {
            code: 200,
            data: {}
        } satisfies UserPasswordPutResponse;
    });
});

export default router;
