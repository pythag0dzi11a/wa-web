<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getTheme, setTheme } from "mdui";
import { useRouter } from "vue-router";
import "@mdui/icons/menu-book.js";
import "@mdui/icons/home.js";
import "@mdui/icons/list.js";
import "@mdui/icons/first-page.js";
import "@mdui/icons/brightness-7.js";
import "@mdui/icons/brightness-3.js";

const router = useRouter();
// const route = useRoute();

const drawerOpen = ref<boolean>(false);
const themeChecked = ref<boolean>(getTheme() === "dark");

const closeDrawer = (): void => {
    drawerOpen.value = false;
};

const openDrawer = (): void => {
    drawerOpen.value = true;
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
    drawerOpen.value = false;
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

// setTheme('auto')
</script>

<template>
    <mdui-top-app-bar scroll-behavior="elevate" variant="small" class="flex items-center">
        <mdui-button-icon @click="openDrawer" class="w-12 h-12">
            <mdui-icon-list class="w-10 h-10"></mdui-icon-list>
        </mdui-button-icon>
        <router-link to="/">
            <mdui-top-app-bar-title class="text-4xl cursor-pointer"
                >WildAssistant</mdui-top-app-bar-title
            >
        </router-link>
        <div style="flex-grow: 1"></div>

        <!--    <mdui-text-field label="search" class="w-50 h-12"></mdui-text-field>-->
        <mdui-tooltip content="切换主题">
            <mdui-switch :checked="themeChecked" @change="toggleTheme">
                <mdui-icon-brightness-7 slot="unchecked-icon"></mdui-icon-brightness-7>
                <mdui-icon-brightness-3 slot="checked-icon"></mdui-icon-brightness-3>
            </mdui-switch>
        </mdui-tooltip>

        <mdui-button-icon class="mr-4 ml-2 w-12 h-12" @click="toIndex">
            <mdui-icon-home class="w-10 h-10"></mdui-icon-home>
        </mdui-button-icon>
    </mdui-top-app-bar>

    <mdui-navigation-drawer
        modal
        close-on-esc
        close-on-overlay-click
        class=".mdui-drawer-full-height"
        :open="drawerOpen"
        @closed="closeDrawer"
    >
        <mdui-list>
            <mdui-list-subheader class="text-3xl m-4">菜单</mdui-list-subheader>
            <mdui-list-item alignment="center" @click="drawerToIndex">
                <mdui-icon-first-page slot="icon"></mdui-icon-first-page>
                <h1 class="text-2xl">首页</h1>
                <mdui-icon-arrow-right slot="end-icon"></mdui-icon-arrow-right>
            </mdui-list-item>

            <mdui-list-item alignment="center">
                <mdui-icon-first-page slot="icon"></mdui-icon-first-page>
                <h1 class="text-2xl">test2</h1>
                <mdui-icon-arrow-right slot="end-icon"></mdui-icon-arrow-right>
            </mdui-list-item>
        </mdui-list>
    </mdui-navigation-drawer>
</template>

<style scoped></style>
