import { is } from "typia";
import Router from "@koa/router";
import { UserRegisterRequest, UserRegisterResponse } from "share";
import { RegisterStatus, regUser } from "../../../utils/users/reg";
import { ErrorEmailExist, ErrorUsernameExist, ErrorWrongFields } from "../../../utils/restError.ts";

const router = new Router({
    prefix: "/register" // "/api/user/register/"
});

router.post("/", async (ctx) => {
    if (!is<UserRegisterRequest>(ctx.request.body)) {
        ctx.body = ErrorWrongFields;
        return;
    }

    let { username, email, password } = <UserRegisterRequest>ctx.request.body;

    const result = await regUser(username, email, password);

    switch (result.status) {
        case RegisterStatus.USERNAME_EXIST:
            ctx.body = ErrorUsernameExist;
            break;
        case RegisterStatus.EMAIL_EXIST:
            ctx.body = ErrorEmailExist;
            break;
        case RegisterStatus.OK:
            ctx.body = {
                code: 200,
                data: {
                    uuid: result.uuid
                }
            } satisfies UserRegisterResponse;
            break;
    }
});

export default router;
