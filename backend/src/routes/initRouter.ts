import Koa from "koa";
import notice from "./notice";
import apiRouter from "./api/api.ts";
import staticRouter from "./staticRouter.ts";

export default function initRouter(app: Koa) {
    app.use(apiRouter.routes()).use(apiRouter.allowedMethods());
    app.use(notice.routes()).use(notice.allowedMethods());
    app.use(staticRouter.routes()).use(staticRouter.allowedMethods());
}
