import Router from "@koa/router";

const router = new Router({
    prefix: "/coffee" // "/api/coffee/"
});

router.use(async (ctx, next) => {
    ctx.type = "application/json";
    await next();
});

router.get("/", async (ctx) => {
    const response = {
        code: 418,
        data: {
            type: "message",
            message: "I am a teapot"
        }
    };

    ctx.status = 418;

    ctx.body = response;
});

export default router;
