<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const sensorId: string = route.query.id as string;
const sensorType: string = route.query.type as string;
const sensorTypeName: string = "sensors." + sensorType;

const option = {
    xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
        }
    ]
};
</script>

<template>
    <div class="title-area text-3xl m-4">{{ $t(sensorTypeName) }}{{ sensorId }}</div>
    <e-chart :option="option" style="width: 600px; height: 700px"></e-chart>
</template>`

<style scoped></style>
