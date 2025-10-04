<script setup lang="ts">
// const props = defineProps([
//     "type",
//     "id"
// ])

// import type { ComposeOption } from "echarts/core";
// import * as echarts from "echarts/core";
// import type { LineSeriesOption } from "echarts/charts";
// import { LineChart } from "echarts/charts";
// import {
//     DatasetComponent,
//     type DatasetComponentOption,
//     type GridComponentOption,
//     type TitleComponentOption,
//     type TooltipComponentOption,
//     TransformComponent
// } from "echarts/components";
// import { GridComponent, TitleComponent, TooltipComponent } from "echarts/components";
// import { CanvasRenderer } from "echarts/renderers";
// import { LabelLayout, UniversalTransition } from "echarts/features";
//
// type ECOption = ComposeOption<
//     | LineSeriesOption
//     | TitleComponentOption
//     | TooltipComponentOption
//     | GridComponentOption
//     | DatasetComponentOption
// >;
//
// echarts.use([
//     TitleComponent,
//     TooltipComponent,
//     GridComponent,
//     DatasetComponent,
//     TransformComponent,
//     LineChart,
//     LabelLayout,
//     UniversalTransition,
//     CanvasRenderer
// ]);
//
// const option:ECOption = {
//
// }

import type { ECharts } from "echarts";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";
import { GridComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { use } from "echarts/core";
import { onMounted, ref } from "vue";

use([GridComponent, TitleComponent, TooltipComponent, LineChart, CanvasRenderer]);

let myChart = null;
const charDom = ref(null);

const initChart = () => {
    myChart = echarts.init();
    const option: EChartsOption = {
        title: { text: "示例图表" },
        tooltip: {},
        xAxis: { data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"] },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    };
    myChart.setOption(option);
};
interface Props {
    type: string;
    id: string;
}

const props = defineProps<Props>();

onMounted(() => {
    initChart();
})
</script>

<template>
    <mdui-card
        class="shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col"
        variant="elevated"
        clickable
    >
        <div class="flex flex-col m-4">
            <div class="title-area flex flex-row items-center">
                <h1 v-if="props.type === 'temperature'" class="inline text-xl">温度传感器:</h1>
                <p class="inline text-xl">
                    {{ props.id }}
                </p>
            </div>

            <div class="w-full h-50">
                <v-charts :option="option"></v-charts>
            </div>
            <div class="content-area">占位</div>
        </div>
    </mdui-card>
</template>

<style scoped></style>
