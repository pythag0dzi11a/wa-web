import { createRouter, createWebHistory } from "vue-router";

import Index from "@/pages/index.vue";
import Sensors from "@/pages/sensors.vue";

const routes = [
    { path: '/', component: Index},
    {
        path: '/sensors/:type',
        name: 'sensors',
        component: Sensors,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;