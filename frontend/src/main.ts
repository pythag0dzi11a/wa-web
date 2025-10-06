import { createApp } from "vue";
import App from "./App.vue";
import "@/tailwind.css";
import "mdui/mdui.css";
import "mdui";
import router from "@/router";

import "echarts";
import ECharts from "vue-echarts";

// import {IndexBasicLayout, ButtonIcon} from "mdui";

const app = createApp(App);
// app.use(IndexBasicLayout).use(ButtonIcon)
app.use(router);
app.component("EChart", ECharts);
app.mount("#app");
