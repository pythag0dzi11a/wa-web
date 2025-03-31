import Router from "@koa/router";
import { sensorData } from "../../mqtt/routes/testRoute.ts";

const router = new Router({
    prefix: "/sensor"
});

router.get("/", async (ctx) => {
    if (sensorData.humidity == -1) {
        ctx.body = {
            code: 502,
            error: "NoData"
        };
        ctx.status = 502;
    } else {
        ctx.body = {
            code: 200,
            data: {
                humidity: sensorData.humidity,
                timestamp: sensorData.timestamp
            }
        };
        ctx.status = 200;
    }
});

export default router;
