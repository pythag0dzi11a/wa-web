import { is } from "typia";
import jwt from "jsonwebtoken";
import Router from "@koa/router";
import { escapeLiteral } from "pg";
import { UserLoginRequest, UserLoginResponse } from "share";
import env from "../../../utils/env.ts";
import db from "../../../utils/db/db";
import { hashPassword } from "../../../utils/password.ts";
import RequestLimiter from "../../../types/requestLimiter.ts";
import { jwtExpire, loginLimitCount, loginLimitPeriod } from "../../../utils/const.ts";
import {
    ErrorTooManyAttempts,
    ErrorWrongFields,
    ErrorWrongUsernameOrPassword
} from "../../../utils/restError.ts";

const router = new Router({
    prefix: "/login" // "/api/user/login/"
});

let loginFailedRateLimiter = new RequestLimiter(loginLimitPeriod, loginLimitCount);

router.post("/", async (ctx) => {
    if (!is<UserLoginRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    const { identity, password } = <UserLoginRequest>ctx.request.body;

    if (!loginFailedRateLimiter.check(ctx.ip)) {
        ctx.body = ErrorTooManyAttempts;
        return;
    }

    const userInfoResult = await db().query(
        `SELECT *
        FROM user_info
        WHERE username = ${escapeLiteral(identity)}
            OR email = ${escapeLiteral(identity)};`
    );

    // 判断用户是否存在
    if (userInfoResult.rows.length === 0) {
        ctx.body = ErrorWrongUsernameOrPassword;
        return;
    }

    const uuid = userInfoResult.rows[0]["uuid"];

    if (!loginFailedRateLimiter.check(uuid)) {
        ctx.body = ErrorTooManyAttempts;
    }

    const userPasswordSecurity = await db().query(
        `SELECT hashed_password
        FROM user_security
        WHERE uuid = ${escapeLiteral(uuid)};`
    );

    const dbHashedPassword = userPasswordSecurity.rows[0]["hashed_password"];

    const hashedPassword = hashPassword(password);

    if (dbHashedPassword != hashedPassword) {
        ctx.status = 403;

        if (
            !(
                loginFailedRateLimiter.checkAndAdd(ctx.ip) &&
                loginFailedRateLimiter.checkAndAdd(uuid)
            )
        ) {
            ctx.body = ErrorTooManyAttempts;
            return;
        }

        ctx.body = ErrorWrongUsernameOrPassword;
        return;
    }

    const jwtToken = jwt.sign({ uuid: uuid, level: 1 }, env.jwt.secret, { expiresIn: jwtExpire });

    ctx.body = {
        code: 200,
        data: {
            jwt: jwtToken
        }
    } satisfies UserLoginResponse;
    return;
});

export default router;
