<script setup lang="ts">
import "mdui/components/card.js";
import "@mdui/icons/thermostat.js";
import IndexDataCard from "@/components/IndexDataCard.vue";
import { onMounted, ref } from "vue";

// 根据https://cn.vuejs.org/guide/essentials/list.html。同时使用v-if 和 v-for 不被推荐
// 所以我也不想这么用，所以我想要直接分开。
// 这里是使用多个api，还是由前端来判断？
// 如果使用多个api，这些api可以在具体页面中复用

const overviewData = ref([]);

async function fetchData() {
    const response = await fetch("/api/sensors/overview");
    overviewData.value = await response.json();
}

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1 class="text-2xl col-span-full">{{ $t("index.overviewTitle") }}</h1>

        <IndexDataCard type="temperature">
            <template #sensorIcon>
                <mdui-icon-thermostat></mdui-icon-thermostat>
            </template>

            <div class="flex items-center justify-center mb-8">
                <p class="text-3xl font-bold">22 °C</p>
            </div>
        </IndexDataCard>

        <IndexDataCard type="soilMoisture">
            <template #sensorIcon>
                <mdui-icon-thermostat></mdui-icon-thermostat>
            </template>

            <div class="flex items-center justify-center mb-8">
                <p class="text-3xl font-bold">22 °C</p>
            </div>
        </IndexDataCard>
    </div>
</template>
