<script setup lang="ts">
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { onMounted, ref } from "vue";
import { GridComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { GaugeChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { EChartsOption } from "echarts";
import SensorApi from "@/utils/api/sensor.ts";
import { SensorRequest } from "share";

use([GaugeChart, GridComponent, TitleComponent, TooltipComponent, LineChart, CanvasRenderer]);

const temp = ref();

onMounted(() => {
    temp.value.resize();
});

const data = ref<SensorRequest[]>([
    {
        humidity: 1,
        timestamp: Date.now() - 7 * 10000
    },
    {
        humidity: 1,
        timestamp: Date.now() - 6 * 10000
    },
    {
        humidity: 1,
        timestamp: Date.now() - 5 * 10000
    },
    {
        humidity: 1,
        timestamp: Date.now() - 4 * 10000
    },
    {
        humidity: 1,
        timestamp: Date.now() - 3 * 10000
    },
    {
        humidity: 1,
        timestamp: Date.now() - 2 * 10000
    },
    {
        humidity: 1,
        timestamp: Date.now() - 1 * 10000
    }
]);

setInterval(async () => {
    const r = await SensorApi.getData.fetch();
    if (r.status == 200) {
        const d = (r as any).data.data as SensorRequest;

        data.value.push(d);
        updateConfig();
    }
}, 10000);

const opt = ref({
    xAxis: {
        type: "category",
        //get end 7 item from data and select timestamps into a new array
        data: data.value.slice(-7).map((item) => {
            return new Date(item.timestamp).toLocaleTimeString();
        })
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: data.value.slice(-7).map((item) => {
                return item.humidity;
            }),
            type: "line",
            label: {
                show: true,
                position: "bottom",
                formatter: "{c}%"
            }
        }
    ]
});

function updateConfig() {
    opt.value.xAxis.data = data.value.slice(-7).map((item) => {
        return new Date(item.timestamp).toLocaleTimeString();
    });
    opt.value.series[0].data = data.value.slice(-7).map((item) => {
        return item.humidity;
    });
    temp.value.setOption(opt.value);
}
</script>
<template>
    <div class="h-96 w-full">
        <e-charts :option="opt" :ref="temp"></e-charts>
    </div>
</template>
