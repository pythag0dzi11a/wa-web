<script setup lang="ts">
import { userInfo } from "@/utils/user/user-info.ts";
import md5 from "md5";
defineProps({
    z: Number
});
</script>

<template>
    <div class="relative">
        <svg viewBox="0 0 50 50">
            <circle fill="#eee" cx="25" cy="25" r="25" />
            <path
                fill="#666"
                d="M19.89 21.25c0-2.76 2.29-5 5.11-5s5.11 2.24 5.11 5-2.29 5-5.11 5-5.11-2.24-5.11-5zm-4.26 14.17h1.7c0-4.14 3.44-7.5 7.67-7.5s7.67 3.36 7.67 7.5h1.71c0-3.83-2.42-7.12-5.84-8.49 1.96-1.17 3.28-3.27 3.28-5.68 0-3.68-3.06-6.67-6.82-6.67s-6.82 2.99-6.82 6.67c0 2.41 1.32 4.51 3.28 5.68-3.42 1.37-5.83 4.66-5.83 8.49z"
            />
        </svg>
        <div
            v-if="userInfo && userInfo.email.primary"
            :style="`background-image: url(https://www.gravatar.com/avatar/${md5(userInfo.email.primary.trim().toLowerCase())})${z != undefined ? `;z-index:${z}` : ''};`"
            class="rounded-full avatar absolute top-0 z-10 size-full"
        />
    </div>
</template>

<style scoped>
.avatar {
    background-repeat: no-repeat;
    background-size: 100%;
}
</style>
