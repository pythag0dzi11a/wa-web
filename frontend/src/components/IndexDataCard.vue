<script setup lang="ts">
import "@mdui/icons/home.js";

const props = defineProps(["type"]);

const sensorTypeName: string = `sensors.${props.type}`;
</script>

<template>
    <router-link :to="{ path: '/sensors', query: { type: props.type } }">
        <mdui-card
            class="shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col"
            variant="elevated"
            clickable
        >
            <div class="title-area m-4 flex flex-row items-center">
                <slot name="sensorIcon"></slot>
                <h2 class="ml-4 inline text-xl font-semibold mb-1">{{ $t(sensorTypeName) }}</h2>
            </div>

            <div class="content-area p-4">
                <slot></slot>
            </div>
        </mdui-card>
    </router-link>
</template>
