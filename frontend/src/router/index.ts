import { createRouter, createWebHistory } from "vue-router";

import Index from "@/pages/index.vue";
import Sensors from "@/pages/sensors.vue";
import SingleSensor from "@/pages/singleSensor.vue";

const routes = [
    { path: "/", component: Index },
    {
        path: "/sensors",
        name: "sensors",
        component: Sensors
    },
    {
        path: "/sensorinfo",
        name: "singleSensor",
        component: SingleSensor
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
