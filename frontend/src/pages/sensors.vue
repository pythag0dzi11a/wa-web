<script setup lang="ts">
import "mdui/components/circular-progress.js";
import "@mdui/icons/error.js";
import loadingPage from "@/components/loadingPage.vue";
import SensorsVisualCard from "@/components/sensorsVisualCard.vue";
import { useRoute } from "vue-router";
import { onMounted, type Ref, ref } from "vue";

const route = useRoute();
const type = Array.isArray(route.params.type) ? "error" : route.params.type || "";
const isLoading = ref(true);

switch (type) {
    case "temperature":
        break;
}

const apiData = ref([
    { type: "temperature", id: "0", time: new Date(), temperature: 24 },
    { type: "temperature", id: "1", time: new Date(), temperature: 24 },
    { type: "temperature", id: "2", time: new Date(), temperature: 24 },
    { type: "temperature", id: "3", time: new Date(), temperature: 24 },
    { type: "temperature", id: "4", time: new Date(), temperature: 24 },
    { type: "temperature", id: "5", time: new Date(), temperature: 23 },
    { type: "temperature", id: "6", time: new Date(), temperature: 22 },
    { type: "temperature", id: "7", time: new Date(), temperature: 23 },
    { type: "temperature", id: "8", time: new Date(), temperature: 21 },
    { type: "temperature", id: "9", time: new Date(), temperature: 22 },
    { type: "temperature", id: "10", time: new Date(), temperature: 22 },
    { type: "temperature", id: "11", time: new Date(), temperature: 21 },
    { type: "temperature", id: "12", time: new Date(), temperature: 22 },
    { type: "temperature", id: "13", time: new Date(), temperature: 20 },
    { type: "temperature", id: "14", time: new Date(), temperature: 21 },
    { type: "temperature", id: "15", time: new Date(), temperature: 21 },
    { type: "temperature", id: "16", time: new Date(), temperature: 22 },
    { type: "temperature", id: "17", time: new Date(), temperature: 23 },
    { type: "temperature", id: "18", time: new Date(), temperature: 21 },
    { type: "temperature", id: "19", time: new Date(), temperature: 22 },
    { type: "temperature", id: "20", time: new Date(), temperature: 23 }
]);

function decodeTime(apiData: Ref<{ time: Date }[]>): string[] {
    return apiData.value.map((item) => item.time.toLocaleTimeString());
}

const timeAxis = decodeTime(apiData);

function decodeDataPoints(apiData: Ref<{ temperature: number }[]>): number[] {
    return apiData.value.map((item) => item.temperature);
}
const dataPoints = decodeDataPoints(apiData);

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
        <SensorsVisualCard
            :type="type"
            v-for="item in apiData"
            :value="item.temperature"
            :id="item.id"
            :data-points="dataPoints"
            :time-axis="timeAxis"
        />
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
