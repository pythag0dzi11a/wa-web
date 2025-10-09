<script setup lang="ts">
import IndexBasicLayout from "@/components/indexBasicLayout.vue";
import IndexBasicFooter from "@/components/indexBasicFooter.vue";
</script>

<template>
    <mdui-layout class="min-h-screen min-w-screen">
        <index-basic-layout></index-basic-layout>

        <mdui-layout-main>
            <router-view />
        </mdui-layout-main>
    </mdui-layout>

    <index-basic-footer></index-basic-footer>
</template>

<style scoped></style>
