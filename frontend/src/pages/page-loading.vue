<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

let interval: NodeJS.Timeout | undefined = undefined;
const timeout = ref(false);

function reload() {
    location.reload();
}

onMounted(() => {
    interval = setInterval(() => {
        timeout.value = true;
        clearInterval(interval);
        interval = undefined;
    }, 10000);
});

onUnmounted(() => {
    if (interval) {
        clearInterval(interval);
        interval = undefined;
    }
});
</script>

<template>
    <div class="w-full flex flex-col">
        <div class="h-[40vh] w-full flex flex-col">
            <div class="h-full w-full" />
            <div class="mx-auto">
                <span class="text-2xl font-bold">{{ $t("page.loading.h1") }}</span>
                <br />
                <span class="text-gray-500">{{ $t("page.loading.h2") }}</span>
            </div>
        </div>
        <div v-if="timeout" class="mt-4 mx-auto">
            <span>{{ $t("page.loading.timeout.title") }}</span>
            <span @click="reload" role="button" class="text-green-600 hover:text-green-500">{{
                $t("page.loading.timeout.refresh")
            }}</span>
        </div>
    </div>
</template>

<style scoped></style>
