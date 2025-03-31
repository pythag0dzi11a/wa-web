import { MDefaultContext } from "../../types/mqtt";
import db from "../../utils/db/db.ts";

export default async function (ctx: MDefaultContext, next: () => Promise<void>) {
    db()
        .query("INSERT INTO mqtt_message_history (topic, message, created_at) VALUES (?, ?, ?)", [
            ctx.topic,
            ctx.message.toString(),
            ctx.timestamp
        ])
        .then(() => {
            console.debug(
                `MQTT message (${ctx.timestamp}) from ${ctx.topic}: ${ctx.message.toString()}`
            );
        });
    return next();
}
