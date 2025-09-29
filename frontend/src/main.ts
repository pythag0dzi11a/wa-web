import { createApp } from 'vue'
import App from './App.vue'
import '@/tailwind.css'
import 'mdui/mdui.css'
import 'mdui'
import router from "@/router";


// import {NavBar, ButtonIcon} from "mdui";

const app = createApp(App);
// app.use(NavBar).use(ButtonIcon)
app.use(router);
app.mount('#app')
