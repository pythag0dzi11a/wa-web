<script setup lang="ts">
import { t } from "@/utils/i18n.ts";
import Avatar from "@/components/avatar.vue";
import { userInfo } from "@/utils/user/user-info.ts";
import ContentBlock from "@/components/content-block.vue";

interface SidebarItem {
    id: string;
    name: () => string;
    title: () => string;
    url: string;
}

function makeName(k: string): () => string {
    return () => t(k);
}

const sidebarItems: SidebarItem[] = [
    {
        id: "account",
        name: makeName("page.settings.sidebar.account"),
        title: makeName("page.settings.account.h1"),
        url: "/settings/account"
    },
    {
        id: "email",
        name: makeName("page.settings.sidebar.email"),
        title: makeName("page.settings.email.h1"),
        url: "/settings/email"
    },
    {
        id: "security",
        name: makeName("page.settings.sidebar.security"),
        title: makeName("page.settings.security.h1"),
        url: "/settings/security"
    }
];

const props = defineProps({
    id: String
});
</script>

<template>
    <div class="flex flex-col size-full mt-16">
        <div>
            <div class="flex ml-6">
                <avatar
                    class="size-14 border-gray-300 dark:border-zinc-500 rounded-full border-[1px]"
                />
                <div class="ml-4 my-auto">
                    <span>{{ userInfo.username }}</span>
                    <br />
                    <span>{{ userInfo.email.primary }}</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row w-full mt-2 h-40 p-5 gap-3">
            <!-- sidebar -->
            <content-block no-padding class="w-full md:w-60 flex flex-col gap-3 p-2 text-sm">
                <ul class="flex flex-col gap-1">
                    <li v-for="item in sidebarItems" :key="item.id">
                        <div
                            v-if="item.id == props.id"
                            class="px-3 py-1.5 rounded-md transition-colors bg-gray-100 dark:bg-zinc-700"
                        >
                            {{ item.name() }}
                        </div>
                        <a :href="item.url" v-else>
                            <div
                                class="px-3 py-1.5 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                {{ item.name() }}
                            </div>
                        </a>
                    </li>
                </ul>
            </content-block>
            <!-- main -->
            <content-block class="w-full h-max flex flex-col gap-3">
                <h1 class="text-lg md:text-xl">
                    {{ sidebarItems.find((item) => item.id == props.id)?.title() }}
                </h1>
                <hr class="my-3" />
                <slot name="content"></slot>
            </content-block>
        </div>
    </div>
</template>

<style scoped></style>
