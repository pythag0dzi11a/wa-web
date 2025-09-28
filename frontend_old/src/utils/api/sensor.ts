// noinspection JSUnusedGlobalSymbols

import {
    SensorRequest
} from "share";
import { ApiGetE } from "@/types/api.ts";

namespace SensorApi {
    export const getData = new ApiGetE<SensorRequest>(
        "/api/sensor",
        false
    );
}

export default SensorApi;
