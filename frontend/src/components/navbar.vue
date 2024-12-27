<script setup lang="ts">
import NavIcon from "./navbar/nav-icon.vue";
import IconLang from "@/components/icons/icon-lang.vue";
import IconDown from "@/components/icons/icon-down.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { currentLang, langNames, langs } from "../utils/i18n.ts";
import NavMenu from "@/components/navbar/nav-menu.vue";
import NavNarrowMenu from "@/components/navbar/nav-narrow-menu.vue";
import Avatar from "@/components/avatar.vue";
import { userInfo } from "@/utils/user/user-info.ts";
import logout from "@/utils/user/logout.ts";

let isTop = ref(window.scrollY <= 0);

const phoneButton = ref<InstanceType<typeof HTMLDivElement>>();
const phoneMenu = ref<InstanceType<typeof HTMLDivElement>>();
const pcMenuInstance = ref<InstanceType<typeof NavMenu>>();

function handleScroll() {
    isTop.value = window.scrollY <= 0;
}

function handleClick(event: MouseEvent) {
    if (
        phoneButton.value?.getAttribute("aria-expanded") === "true" &&
        phoneMenu.value &&
        !phoneMenu.value.contains(event.target as Node) &&
        !phoneButton.value.contains(event.target as Node)
    ) {
        phoneButton.value.setAttribute("aria-expanded", "false");
    }
}

function collapseMenu() {
    phoneButton.value?.setAttribute("aria-expanded", "false");
    pcMenuInstance.value?.button?.setAttribute("aria-expanded", "false");
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("click", handleClick);
});
</script>

<template>
    <nav
        class="fixed top-0 left-0 right-0 z-50 transition-shadow bg-background-light-10 dark:bg-background-dark-80"
        :class="isTop ? '' : 'nav-top'"
    >
        <div
            class="max-w-7xl flex flex-row items-center mx-auto px-4 py-2 gap-4 text-gray-800 dark:text-gray-200 text-base"
        >
            <nav-icon />
            <!-- pc menu -->
            <div class="ml-auto flex-row gap-3 items-center hidden md:flex text-sm">
                <div>
                    <a href="/plan" role="button" class="nav-link">
                        {{ $t("navbar.plan") }}
                    </a>
                </div>
                <div class="w-4" />
                <nav-menu>
                    <template #button>
                        <icon-lang />
                        <icon-down />
                    </template>
                    <template #menu>
                        <div class="text-sm font-black p-1.5 pl-3 w-full">
                            {{ langNames[currentLang] }}
                        </div>
                        <a
                            v-for="lang in langs.filter((i) => i != currentLang)"
                            role="button"
                            :key="lang"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                            :href="`?lang=${lang}`"
                        >
                            {{ langNames[lang] }}
                        </a>
                    </template>
                </nav-menu>
                <nav-menu ref="pcMenuInstance">
                    <template #button>
                        <avatar class="h-6 w-6" />
                    </template>
                    <template #menu>
                        <a
                            v-if="userInfo.loggedIn"
                            href="/dashboard"
                            role="button"
                            @click="collapseMenu"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                        >
                            {{ $t("navbar.dashboard") }}
                        </a>
                        <a
                            v-if="userInfo.loggedIn"
                            href="/settings"
                            role="button"
                            @click="collapseMenu"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                        >
                            {{ $t("navbar.settings") }}
                        </a>
                        <div
                            v-if="userInfo.loggedIn"
                            role="button"
                            @click="logout()"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                        >
                            {{ $t("navbar.logout") }}
                        </div>
                        <a
                            v-if="!userInfo.loggedIn"
                            href="/register"
                            role="button"
                            @click="collapseMenu"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 text-green-700 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                        >
                            {{ $t("navbar.register") }}
                        </a>
                        <a
                            v-if="!userInfo.loggedIn"
                            href="/login"
                            role="button"
                            @click="collapseMenu"
                            class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                        >
                            {{ $t("navbar.login") }}
                        </a>
                    </template>
                </nav-menu>
            </div>
            <!-- phone menu -->
            <div
                class="ml-auto narrow-button md:hidden"
                title="Toggle nav"
                ref="phoneButton"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                @click="
                    phoneButton?.setAttribute(
                        'aria-expanded',
                        phoneButton?.getAttribute('aria-expanded') == 'true' ? 'false' : 'true'
                    )
                "
            >
                <avatar class="h-6 w-6" />
            </div>
            <div
                class="narrow-menu bg-global p-6 border-gray-300 dark:border-zinc-600"
                ref="phoneMenu"
            >
                <div class="flex flex-col gap-1 p-2">
                    <a
                        v-if="userInfo.loggedIn"
                        href="/dashboard"
                        role="button"
                        @click="collapseMenu"
                        class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-500 dark:hover:bg-zinc-700"
                    >
                        {{ $t("navbar.dashboard") }}
                    </a>
                    <a
                        v-if="userInfo.loggedIn"
                        href="/settings"
                        role="button"
                        @click="collapseMenu"
                        class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-500 dark:hover:bg-zinc-700"
                    >
                        {{ $t("navbar.settings") }}
                    </a>
                    <div
                        v-if="userInfo.loggedIn"
                        role="button"
                        @click="logout()"
                        class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                    >
                        {{ $t("navbar.logout") }}
                    </div>
                    <a
                        v-if="!userInfo.loggedIn"
                        href="/register"
                        role="button"
                        @click="collapseMenu"
                        class="text-sm rounded-lg w-full p-1.5 pl-3 text-green-700 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                    >
                        {{ $t("navbar.register") }}
                    </a>
                    <a
                        v-if="!userInfo.loggedIn"
                        href="/login"
                        role="button"
                        @click="collapseMenu"
                        class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                    >
                        {{ $t("navbar.login") }}
                    </a>
                    <hr class="m-2" />
                    <a
                        href="/plan"
                        role="button"
                        @click="collapseMenu"
                        class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                    >
                        {{ $t("navbar.plan") }}
                    </a>
                    <hr class="m-2" />
                    <nav-narrow-menu>
                        <template #button>
                            <icon-lang />
                            <icon-down />
                        </template>
                        <template #menu>
                            <div class="text-sm font-black p-1.5 pl-3 w-full" translate="no">
                                {{ langNames[currentLang] }}
                            </div>
                            <a
                                v-for="lang in langs.filter((i) => i != currentLang)"
                                role="button"
                                :key="lang"
                                class="text-sm rounded-lg w-full p-1.5 pl-3 hover:bg-gray-200 hover:text-green-600 dark:hover:bg-zinc-700"
                                :href="`?lang=${lang}`"
                                translate="no"
                            >
                                {{ langNames[lang] }}
                            </a>
                        </template>
                    </nav-narrow-menu>
                </div>
            </div>
        </div>
    </nav>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.nav-top {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
        var(--tw-shadow);
}

.narrow-menu {
    position: fixed;
    top: 3rem;
    left: 0;
    height: calc(100vh - 3rem);
    width: 100vw;
    transition:
        opacity 0.25s,
        visibility 0.25s,
        transform 0.25s;
    border-top-width: 2px;
    --tw-border-opacity: 1;
}

.narrow-button[aria-expanded="false"] + .narrow-menu {
    visibility: hidden;
    opacity: 0;
    transform: translateY(0);
}

.narrow-button[aria-expanded="true"] + .narrow-menu {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}

.nav-link {
    transition: color 0.4s;
}

.nav-link:hover {
    color: #16a34a;
}
</style>
