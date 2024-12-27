import Router from "@koa/router";
import { DefaultContext, DefaultState } from "koa";
import userEmail from "./email";
import userEmailDelete from "./emailDelete";
import userInfo from "./info";
import userLogin from "./login";
import userPassword from "./password";
import userVerify from "./verify";
import userRefresh from "./refresh";
import userRegister from "./register";
import userDangerZoneVerify from "./auth";
import CtxPayload from "../../../types/ctxPayload";

const router = new Router<DefaultState, DefaultContext & CtxPayload.jwt>({
    prefix: "/user"
});

router.use(userEmail.routes());
router.use(userEmailDelete.routes());
router.use(userInfo.routes());
router.use(userLogin.routes());
router.use(userPassword.routes());
router.use(userRefresh.routes());
router.use(userRegister.routes());
router.use(userVerify.routes());
router.use(userDangerZoneVerify.routes());

export default router;
