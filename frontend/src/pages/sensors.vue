<script setup lang="ts">
import "mdui/components/circular-progress.js";
import "@mdui/icons/error.js";
import loadingPage from "@/components/loadingPage.vue";
import SensorsVisualCard from "@/components/sensorsVisualCard.vue";
import { onMounted, ref } from "vue";

const type = "temperature"; // Example type, can be dynamic

switch (type) {
    case "temperature":
        break;
}

const apiData = ref([
    // { id: "1", name: "Temperature Sensor", value: "22°C" },
    // { id: "2", name: "Temperature Sensor", value: "22°C" },
    // { id: "3", name: "Temperature Sensor", value: "22°C" },
    // { id: "4", name: "Temperature Sensor", value: "22°C" },
    // { id: "5", name: "Temperature Sensor", value: "22°C" },
    // { id: "6", name: "Temperature Sensor", value: "22°C" },
    // { id: "7", name: "Temperature Sensor", value: "22°C" }
]);

const isLoading = ref(true);

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 1000); // Simulate loading delay
});
</script>

<template>
    <!--    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center">-->
    <!--        <mdui-circular-progress></mdui-circular-progress>-->
    <!--    </div>-->
    <loading-page v-if="isLoading" />

    <div
        v-if="!isLoading && apiData.length > 0"
        class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3"
    >
        <SensorsVisualCard :type="type" v-for="item in apiData" :value="item.value" :id="item.id" />
    </div>

    <div
        v-if="!isLoading && apiData.length === 0"
        class="fixed inset-0 flex flex-col items-center justify-center"
    >
        <mdui-icon-error class="w-10 h-10"></mdui-icon-error>
        <p class="mt-4 text-2xl">没有数据😭</p>
        <p class="text-2xl">请刷新！</p>
    </div>
</template>

<style scoped></style>
