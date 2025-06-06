import { createApp } from "vue";
import "@/style.css";
import App from "@/app.vue";
import { i18n } from "@/utils/i18n";


createApp(App)
    .use(i18n)
    .mount("#app");
