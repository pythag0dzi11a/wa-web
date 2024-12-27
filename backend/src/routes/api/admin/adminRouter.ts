import Router from "@koa/router";
import { DefaultContext, DefaultState } from "koa";
import info from "./info";
import ban from "./ban";
import CtxPayload from "../../../types/ctxPayload.ts";
import loginVerify from "../../routerMiddleWares/loginVerify.ts";
import adminPermissionVerify from "../../routerMiddleWares/permissionVerify.ts";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/admin" // /api/admin
});

router.use(loginVerify);
router.use(adminPermissionVerify(10));

router.use(info.routes());
router.use(ban.routes());

export default router;
