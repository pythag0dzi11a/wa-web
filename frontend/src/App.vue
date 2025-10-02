<script setup lang="ts">

import IndexBasicLayout from "@/components/indexBasicLayout.vue";
</script>

<template>

  <index-basic-layout></index-basic-layout>

  <mdui-layout-main>

    <router-view v-slot="{ Component }">
        <Transition name="fade">
            <component :is="Component"/>
        </Transition>
    </router-view>

  </mdui-layout-main>

</template>

<style scoped></style>
