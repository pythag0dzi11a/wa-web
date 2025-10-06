<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const timeAxis = ref(["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"]);

const dataPoints = ref([120, 200, 150, 80, 70, 11]);
interface Props {
    type: string;
    id: string;
    timeAxis: string[];
    dataPoints: number[];
}



const props = defineProps<Props>();
const option = ref({
    xAxis: {
        type: "category",
        data: props.timeAxis
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: props.dataPoints,
            type: "line"
        }
    ]
});

// Responsive chart width
// e chart问题多的一匹。所以手动做响应式。
const mduiCardRef = ref<HTMLElement | null>(null);
const chartWidth = ref("200px");
const showChart = ref(false);

onMounted(async () => {
    await nextTick();
    if (mduiCardRef.value) {
        chartWidth.value = mduiCardRef.value.offsetWidth + "px";
        showChart.value = true;
    }
});
</script>

<template>
    <mdui-card
        ref="mduiCardRef"
        class="shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col"
        variant="elevated"
        clickable
    >
        <div class="flex flex-col m-4 items-center">
            <div class="title-area flex flex-row items-center">
                <h1 v-if="props.type === 'temperature'" class="inline text-xl">温度传感器:</h1>
                <p class="inline text-xl">
                    {{ props.id }}
                </p>
            </div>
        </div>

        <e-chart
            ref="mduiCardRef"
            v-if="showChart"
            :option="option"
            :style="{ width: chartWidth, height: '300px' }"
        ></e-chart>
    </mdui-card>
</template>

<style scoped></style>
