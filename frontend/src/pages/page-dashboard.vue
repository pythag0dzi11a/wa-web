<script setup lang="ts">
// import { userInfo } from "../utils/user/user-info.ts";
import DashboardBlock from "@/components/content-block.vue";
import { notice } from "@/utils/notice.ts";
</script>

<template>
    <div class="flex flex-col md:flex-row w-full mt-16 h-40 p-5 gap-3">
        <!-- main -->
        <div class="w-full flex flex-col gap-3">
            <dashboard-block class="w-max"> </dashboard-block>
        </div>
        <!-- sub -->
        <div class="w-full md:w-[20vw] flex flex-col gap-3">
            <!-- notice -->
            <dashboard-block no-padding v-if="notice">
                <div class="flex flex-col py-3 pl-5">
                    <h2 class="text-lg font-bold">{{ $t("page.dashboard.notice.h2") }}</h2>
                </div>
                <hr />
                <div class="py-3 pl-5" v-html="notice"></div>
            </dashboard-block>
        </div>
    </div>
</template>

<style scoped></style>
