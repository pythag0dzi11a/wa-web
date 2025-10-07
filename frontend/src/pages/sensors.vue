<script setup lang="ts">
import "mdui/components/circular-progress.js";
import "@mdui/icons/error.js";
import loadingPage from "@/pages/loadingPage.vue";
import noDataPage from "@/pages/noDataPage.vue";
import SensorsVisualCard from "@/components/sensorsVisualCard.vue";
import { useRoute } from "vue-router";
import { onMounted, type Ref, ref } from "vue";

const route = useRoute();
const type: string = Array.isArray(route.query.type) ? "error" : (route.query.type as string) || "";
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

async function fetchApiData() {
    const response = await fetch(`/api/sensors?type=${encodeURIComponent(type)}`);
    apiData.value = await response.json();
    isLoading.value = false;
}

onMounted(() => {
    // fetchApiData();
    setTimeout(() => {
        isLoading.value = false;
    }, 1000); // Simulate loading delay
});
</script>

<template>
    <loading-page v-if="isLoading" />
    <no-data-page v-if="!isLoading && apiData.length === 0" />

    <div
        v-if="!isLoading && apiData.length > 0"
        class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3"
    >
        <h1 class="text-2xl font-bold col-span-full">{{ type }}数据</h1>
        <SensorsVisualCard
            :type="type"
            v-for="item in apiData"
            :value="item.temperature"
            :id="item.id"
            :data-points="dataPoints"
            :time-axis="timeAxis"
        />
    </div>
</template>

<style scoped></style>
