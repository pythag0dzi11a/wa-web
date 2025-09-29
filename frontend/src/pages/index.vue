<script setup lang="ts">
import "mdui/components/card.js";
import IndexDataCard from "@/components/IndexDataCard.vue";

// 根据https://cn.vuejs.org/guide/essentials/list.html。同时使用v-if 和 v-for 不被推荐
// 所以我也不想这么用，所以我想要直接分开。
// 这里是使用多个api，还是由前端来判断？
// 如果使用多个api，这些api可以在具体页面中复用
</script>

<template>
    <div class="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h1 class="text-2xl col-span-full">传感器总览</h1>

        <IndexDataCard>
            <template #sensorIcon>
                <mdui-icon-home></mdui-icon-home>
            </template>
        </IndexDataCard>
    </div>
</template>
