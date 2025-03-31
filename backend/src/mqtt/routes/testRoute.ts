import MRouter from "../../types/mqtt/mRouter.ts";

const router = new MRouter();
export const sensorData = {
    humidity: -1,
    timestamp: Date.now()
};

router.message("liuLake/SoilHumiditySensor", async (ctx) => {
    try {
        const body = JSON.parse(ctx.message.toString());
        sensorData.humidity = parseInt(body.humidity);
        sensorData.timestamp = ctx.timestamp;
    } catch {}
});

export default router;