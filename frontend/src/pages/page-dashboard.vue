<script setup lang="ts">
// import { userInfo } from "../utils/user/user-info.ts";
import DashboardBlock from "@/components/content-block.vue";
import { notice } from "@/utils/notice.ts";
import { EChartsOption } from "echarts";
import IconHome from "~icons/mdi/home";
import mdiCloudPercent from "~icons/mdi/cloud-percent";
import { GridComponent, TitleComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { GaugeChart, LineChart } from "echarts/charts";
import { use } from "echarts/core";
import { onMounted, ref } from "vue";
import aJump from "@/utils/a-jump";

use([GaugeChart, GridComponent, TitleComponent, TooltipComponent, LineChart, CanvasRenderer]);

const temp = ref();

onMounted(() => {
    temp.value.resize();
});

const option: EChartsOption = {
    xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
        type: "value"
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
        }
    ]
};
</script>

<template>
    <div class="flex flex-col md:flex-row w-full mt-16 h-40 p-5 gap-3">
        <!-- main -->
        <div class="w-full flex flex-col gap-6">
            <h2 class="text-lg font-bold mt-3">土壤湿度</h2>
            <div class="w-full h-max grid grid-cols-3 gap-3">
                <a href="\sensor\1cb345" target="_blank" >
                    <dashboard-block
                        class="flex flex-row flex-center gap-3"
                        role="button"

                    >
                        <!-- <div class="h-full w-max"> -->
                        <i-mdi-water-percent class="size-14" />
                        <!-- </div> -->
                        <!-- <div claxss="w-full"> -->
                        <div class="flex flex-col m-auto">
                            <div>土壤湿度传感器1</div>
                            <div>1%</div>
                        </div>
                    </dashboard-block>
                </a>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-water-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>土壤湿度传感器2</div>
                        <div>56%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-water-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>土壤湿度传感器3</div>
                        <div>57%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-water-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>土壤湿度传感器4</div>
                        <div>57%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-water-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>土壤湿度传感器5</div>
                        <div>56%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-water-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>土壤湿度传感器6</div>
                        <div>57%</div>
                    </div>
                </dashboard-block>
            </div>

            <h2 class="text-lg font-bold mt-3">气温</h2>
            <div class="w-full h-max grid grid-cols-3 gap-3">
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-thermometer-auto class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>温度传感器1</div>
                        <div>3摄氏度</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-thermometer-auto class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>温度传感器2</div>
                        <div>3摄氏度</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-thermometer-auto class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>温度传感器3</div>
                        <div>3摄氏度</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-thermometer-auto class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>温度传感器4</div>
                        <div>3摄氏度</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-thermometer-auto class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>温度传感器5</div>
                        <div>3摄氏度</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-thermometer-auto class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>温度传感器6</div>
                        <div>3摄氏度</div>
                    </div>
                </dashboard-block>
            </div>
            <h2 class="text-lg font-bold mt-3">空气湿度</h2>
            <div class="w-full h-max grid grid-cols-3 gap-3">
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-cloud-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>空气湿度传感器</div>
                        <div>26%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-cloud-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>空气湿度传感器2</div>
                        <div>26%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-cloud-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>空气湿度传感器3</div>
                        <div>26%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-cloud-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>空气湿度传感器4</div>
                        <div>25%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-cloud-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>空气湿度传感器5</div>
                        <div>26%</div>
                    </div>
                </dashboard-block>
                <dashboard-block class="relative flex flex-row flex-center gap-3">
                    <!-- <div class="h-full w-max"> -->
                    <i-mdi-cloud-percent class="size-14" />
                    <!-- </div> -->
                    <!-- <div claxss="w-full"> -->
                    <div class="flex flex-col m-auto">
                        <div>空气湿度传感器6</div>
                        <div>26%</div>
                    </div>
                </dashboard-block>
            </div>
        </div>

        <!-- sub -->
        <div class="w-full md:w-[20vw] flex flex-col gap-3">
            <!-- notice -->
            <dashboard-block no-padding v-if="notice">
                <div class="flex flex-col py-3 pl-5">
                    <h2 class="text-lg font-bold">dsf</h2>
                </div>
                <hr />
                <div class="py-3 pl-5" v-html="notice"></div>
            </dashboard-block>
        </div>
    </div>
</template>

<style scoped></style>
0
