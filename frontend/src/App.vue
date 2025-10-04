<script setup lang="ts">
import IndexBasicLayout from "@/components/indexBasicLayout.vue";

import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const chartDom = ref(null);
let myChart = null;

// 初始化图表
const initChart = () => {
    myChart = echarts.init(chartDom.value);
    // 配置项对象
    const option = {
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
    //使用配置
    myChart.setOption(option);
};

// 生命周期钩子
onMounted(() => {
    //挂载后才能操作DOM
    initChart();
});
</script>

<template>
    <index-basic-layout></index-basic-layout>

    <mdui-layout-main>
        <router-view v-slot="{ Component }">
            <Transition name="fade">
                <component :is="Component" />
            </Transition>
        </router-view>
    </mdui-layout-main>
    <div ref="chartDom" style="width: 600px; height: 400px"></div>
</template>

<style scoped></style>
