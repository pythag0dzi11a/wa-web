<script setup lang="ts">
import SensorsVisualCard from "@/components/sensorsVisualCard.vue";
import { ref } from "vue";

const props = defineProps({
    type: String
})

switch (props.type) {
    case "temperature":
        break;
}

const apiData = ref([
    { id: "1", name: "Temperature Sensor", value: "22°C" },
    { id: "2", name: "Temperature Sensor", value: "22°C" },
    { id: "3", name: "Temperature Sensor", value: "22°C" },
    { id: "4", name: "Temperature Sensor", value: "22°C" },
    { id: "5", name: "Temperature Sensor", value: "22°C" },
    { id: "6", name: "Temperature Sensor", value: "22°C" },
    { id: "7", name: "Temperature Sensor", value: "22°C" }
]);
</script>

<template>
    <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        <SensorsVisualCard
            :type=props.type
            v-for="item in apiData"
            :value="item.value"
            :id="item.id"
        />
    </div>
</template>

<style scoped></style>
