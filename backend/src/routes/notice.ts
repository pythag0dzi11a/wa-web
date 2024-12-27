import Router from "@koa/router";
import noticeHtml from "../utils/data/noticeHtml.ts";

const router = new Router({
    prefix: "/notice" // /notice
});

router.get("/", async (ctx) => {
    ctx.body = await noticeHtml.get();
    ctx.type = "text/html";
});

export default router;
