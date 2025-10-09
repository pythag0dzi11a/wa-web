<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getTheme, setTheme } from "mdui";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import "@mdui/icons/menu-book.js";
import "@mdui/icons/home.js";
import "@mdui/icons/list.js";
import "@mdui/icons/sensors.js";
import "@mdui/icons/first-page.js";
import "@mdui/icons/brightness-7.js";
import "@mdui/icons/brightness-3.js";
import "@mdui/icons/translate.js";

const router = useRouter();
// const route = useRoute();

const drawerStatus = ref<boolean>(false);
const themeChecked = ref<boolean>(getTheme() === "dark");

const { t, locale } = useI18n();
const changeLanguage = (): void => {
    locale.value = locale.value === "zh" ? "en" : "zh";
};

const closeDrawer = (): void => {
    drawerStatus.value = false;
};

const openDrawer = (): void => {
    drawerStatus.value = true;
};

const toggleTheme = (): void => {
    if (getTheme() === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
};

const drawerToIndex = (): void => {
    router.push("/");
    drawerStatus.value = false;
};

const toIndex = (): void => {
    router.push("/");
};

onMounted((): void => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
        setTheme("dark");
        themeChecked.value = true;
    } else {
        setTheme("light");
        themeChecked.value = false;
    }
});
</script>

<template>
    <mdui-top-app-bar scroll-behavior="elevate" variant="small" class="flex items-center">
        <mdui-button-icon @click="openDrawer" class="w-10 h-10 md:not-last:w-12 md:h-12">
            <mdui-icon-list class="w-8 h-8 md:w-10 md:h-10"></mdui-icon-list>
        </mdui-button-icon>
        <router-link to="/">
            <mdui-top-app-bar-title class="text-3xl md:text-4xl cursor-pointer">{{
                $t("navbar.pageTitle")
            }}</mdui-top-app-bar-title>
        </router-link>
        <div style="flex-grow: 1"></div>

        <!--    <mdui-text-field label="search" class="w-50 h-12"></mdui-text-field>-->
        <mdui-tooltip :content="$t('navbar.changeTheme')">
            <mdui-switch :checked="themeChecked" @change="toggleTheme">
                <mdui-icon-brightness-7 slot="unchecked-icon"></mdui-icon-brightness-7>
                <mdui-icon-brightness-3 slot="checked-icon"></mdui-icon-brightness-3>
            </mdui-switch>
        </mdui-tooltip>

        <mdui-tooltip :content="$t('navbar.changeLanguage')">
            <mdui-button-icon selectable @click="changeLanguage()" class="w-10 h-10 md:w-12 md:h-12 mx-4">
                <mdui-icon-translate class="w-8 h-8 md:w-10 md:h-10"></mdui-icon-translate>
            </mdui-button-icon>
        </mdui-tooltip>

        <mdui-tooltip :content="$t('navbar.home')">
            <mdui-button-icon class="mr-4 w-10 h-10 md:w-12 md:h-12" @click="toIndex">
                <mdui-icon-home class="w-8 h-8 md:w-10 md:h-10"></mdui-icon-home>
            </mdui-button-icon>
        </mdui-tooltip>
    </mdui-top-app-bar>

    <mdui-navigation-drawer
        modal
        close-on-esc
        close-on-overlay-click
        @open="openDrawer"
        @closed="closeDrawer"
        :open="drawerStatus.valueOf()"
    >
        <!-- 这里用valueOf()是因为用value和直接解包都会出现bug-->
        <!-- 具体错误体现为打开页面时drawer被触发。所以直接使用原生方法获取boolean值，具体原因我不知道。有空再说-->

        <mdui-list-subheader class="text-3xl m-4">菜单</mdui-list-subheader>

        <mdui-list-item alignment="center" @click="drawerToIndex">
            <mdui-icon-first-page slot="icon"></mdui-icon-first-page>
            <h1 class="text-2xl">首页</h1>
            <mdui-icon-arrow-right slot="end-icon"></mdui-icon-arrow-right>
        </mdui-list-item>

        <mdui-list-item alignment="center">
            <mdui-icon-first-page slot="icon"></mdui-icon-first-page>
            <h1 class="text-2xl">传感器</h1>
            <mdui-icon-arrow-right slot="end-icon"></mdui-icon-arrow-right>
        </mdui-list-item>
    </mdui-navigation-drawer>
</template>

<style scoped></style>
