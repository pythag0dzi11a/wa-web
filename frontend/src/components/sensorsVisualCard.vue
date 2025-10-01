<script setup lang="ts">
import type { TemperatureSensorData } from "@/types/sensorData.ts";

const props = defineProps<TemperatureSensorData>();
</script>

<template>
    <mdui-card
        class="shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col"
        variant="elevated"
        clickable
    >
        <div class="flex flex-col m-4">
            <div class="title-area flex flex-row items-center">
                <h1 v-if="props.type === 'temperature'" class="inline text-xl">
                    温度传感器:
                </h1>
                <p class="inline text-xl">
                    {{ props.id }}
                </p>
            </div>

            <div class="content-area ">
                占位
            </div>
        </div>
    </mdui-card>
</template>

<style scoped></style>
