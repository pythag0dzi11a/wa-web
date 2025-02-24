import MClient from "../types/mqtt/mClient.ts";
import testMqtt from "./routerMiddlewares/testMqtt.ts";

export default function initMRouter(app: MClient) {
    app.use(testMqtt);
}
