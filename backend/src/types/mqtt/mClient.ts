import { connect, IPublishPacket, MqttClient } from "mqtt";
import { IClientOptions } from "mqtt/src/lib/client.ts";
import MMessage from "./mMessage.ts";
import { MMiddleware } from "./index.ts";
import { callMiddlewares } from "../../utils/callMiddleware.ts";

export default class MClient{
    inner: MqttClient;
    protected middlewares: MMiddleware[] = [];

    constructor(inner:MqttClient) {
        this.inner = inner;

        const self = this;
        inner.on("message", async (topic, message, packet) => {
            return self.onMessage(topic, message, packet);
        });
    }

    static connect(brokerUrl: string): MClient;
    static connect(opts: IClientOptions): MClient;
    static connect(brokerUrl: string, opts?: IClientOptions): MClient;
    static connect(brokerUrl: string | IClientOptions, opts?: IClientOptions): MClient {
        const client = connect(brokerUrl as string, opts);
        return new MClient(client);
    }

    use(middleware: MMiddleware) {
        this.middlewares.push(middleware);
    }

    protected async onMessage(_topic: string, message_: Buffer, packet: IPublishPacket) {
        let message = new MMessage({
            timestamp: Date.now(),
            message: message_,
            ...packet
        });
        await callMiddlewares(this.middlewares, message);
    }

    subscribe(topic: string) {
        this.inner.subscribe(topic);
    }
}
