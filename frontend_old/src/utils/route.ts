import { Component } from "vue";
import { t } from "@/utils/i18n.ts";
import PageIndex from "@/pages/page-index.vue";
import PageNotFound from "@/pages/page-not-found.vue";
import PageDashboard from "@/pages/page-dashboard.vue";
import PageLogin from "@/pages/page-login.vue";
import PageRegister from "@/pages/page-register.vue";
import PageSettingsAccount from "@/pages/settings/page-settings-account.vue";
import PageSettingsEmail from "@/pages/settings/page-settings-email.vue";
import PageSettingsSecurity from "@/pages/settings/page-settings-security.vue";
import PageAuth from "@/pages/page-auth.vue";
import PageBbb from "@/pages/page-bbb.vue";

function makeTitle(k: string): () => string {
    return () => t(k);
}

export type Route =
    | {
          type: "page";
          path: string | RegExp;
          component: Component;
          requireLogin: boolean;
          title: string | (() => string);
      }
    | {
          type: "redirect";
          path: string | RegExp;
          url: string;
      };

export const routeNotFound = {
    type: "page",
    path: "/404",
    requireLogin: false,
    component: PageNotFound,
    title: makeTitle("title.404")
};

export const routeLogin = {
    type: "page",
    path: "/login",
    requireLogin: false,
    component: PageLogin,
    title: makeTitle("title.login")
};

export const routes: Route[] = [
    routeNotFound as Route,
    /*{
        type: "page",
        path: "/",
        requireLogin: false,
        component: PageIndex,
        title: makeTitle("title.home")
    },*/
    {
        type: "redirect",
        path: "/",
        url: "/dashboard",
    },
    {
        type: "page",
        path: "/dashboard",
        requireLogin: false,
        component: PageDashboard,
        title: makeTitle("title.dashboard")
    },
    routeLogin as Route,
    {
        type: "page",
        path: "/register",
        requireLogin: false,
        component: PageRegister,
        title: makeTitle("title.register")
    },
    {
        type: "redirect",
        path: "/settings",
        url: "/settings/account"
    },
    {
        type: "page",
        path: "/settings/account",
        requireLogin: true,
        component: PageSettingsAccount,
        title: makeTitle("title.settings.account")
    },
    {
        type: "page",
        path: "/settings/email",
        requireLogin: true,
        component: PageSettingsEmail,
        title: makeTitle("title.settings.email")
    },
    {
        type: "page",
        path: "/settings/security",
        requireLogin: true,
        component: PageSettingsSecurity,
        title: makeTitle("title.settings.security")
    },
    {
        type: "page",
        path: "/auth",
        requireLogin: true,
        component: PageAuth,
        title: makeTitle("title.auth")
    },{
        type: "page",
        path: "/sensor/1cb345",
        requireLogin: false,
        component: PageBbb,
        title: "数据"
    }
];
