import { IPublishPacket } from "mqtt";
import { QoS, UserProperties } from "mqtt-packet";

type MMessageLike = IPublishPacket & {
    topic: string;
    message: Buffer;
    retain: boolean;
    timestamp: number;
};

export default class MMessage implements MMessageLike {
    cmd: "publish";
    qos: QoS;
    dup: boolean;
    retain: boolean;
    topic: string;
    payload: string | Buffer;
    properties?: {
        payloadFormatIndicator?: boolean;
        messageExpiryInterval?: number;
        topicAlias?: number;
        responseTopic?: string;
        correlationData?: Buffer;
        userProperties?: UserProperties;
        subscriptionIdentifier?: number | number[];
        contentType?: string;
    };
    timestamp: number;
    message: Buffer;

    constructor(instance: MMessageLike) {
        this.cmd = "publish";
        this.qos = instance.qos;
        this.dup = instance.dup;
        this.retain = instance.retain;
        this.topic = instance.topic;
        this.payload = instance.message;
        this.properties = instance.properties
        this.timestamp = instance.timestamp;
        this.message = instance.message
    }

}
