import { createApp } from "vue";
import App from "./App.vue";
import "@/tailwind.css";
import "mdui/mdui.css";
import "mdui";
import router from "@/router";

import en from "@/locales/en.json";
import zh from "@/locales/zh.json";
import { createI18n } from "vue-i18n";
import "echarts";
import ECharts from "vue-echarts";

const i18n = createI18n({
    locale: "zh", // set locale
    fallbackLocale: "zh", // set fallback locale
    messages: {
        en: en,
        zh: zh
    }
});

// import {IndexBasicLayout, ButtonIcon} from "mdui";

const app = createApp(App);
// app.use(IndexBasicLayout).use(ButtonIcon)
app.use(router);
app.use(i18n);
app.component("EChart", ECharts);
app.mount("#app");
