import MClient from "../types/mqtt/mClient.ts";
import saveMessage from "./routerMiddlewares/saveMessage.ts";
import testMqtt from "./routerMiddlewares/testMqtt.ts";
import testRoute from "./routes/testRoute.ts";

export default function initMRouter(app: MClient) {
    app.use(saveMessage);
    app.use(testMqtt);
    app.use(testRoute.routes());
}
