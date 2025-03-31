import { MDefaultContext } from "../../types/mqtt";

export default async function(ctx:MDefaultContext, next: () => Promise<void>) {
    // console.debug(`MQTT message from ${ctx.topic}: ${ctx.message.toString()}`);
    // try {
    //     const message = JSON.parse(ctx.message.toString());
    //     console.debug(`Parsed message: ${JSON.stringify(message)}`);
    // }catch (e) {
    //     console.error(`Error parsing message: ${e}`);
    // }
    await next();
}