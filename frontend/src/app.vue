<script setup lang="ts">
import aJump from "@/utils/a-jump.ts";
import Navbar from "@/components/navbar.vue";

aJump.update();
</script>

<template>
    <navbar />
    <div class="w-full max-w-7xl mx-auto flex">
        <component v-bind:is="aJump.component.value"></component>
    </div>
</template>

<style>
</style>