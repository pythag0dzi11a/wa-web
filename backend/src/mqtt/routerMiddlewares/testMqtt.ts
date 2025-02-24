import { MDefaultContext } from "../../types/mqtt";

export default async function(ctx:MDefaultContext, next: () => Promise<void>) {
    console.debug(`MQTT message from ${ctx.topic}: ${ctx.message.toString()}`);
    await next();
}