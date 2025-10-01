<script setup lang="ts">
import "@mdui/icons/home.js";

const props = defineProps(["title"]);
</script>

<template>
    <router-link :to="{ name: 'sensors', params: { type: 'soil' } }">
        <mdui-card
            class="shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col"
            variant="elevated"
            clickable
        >
            <div class="title-area m-4 flex flex-row items-center">
                <slot name="sensorIcon"></slot>
                <h2 class="ml-4 inline text-xl font-semibold mb-1">{{ props.title }}</h2>
            </div>

            <div class="content-area p-4">
                <slot></slot>
            </div>
        </mdui-card>
    </router-link>
</template>
