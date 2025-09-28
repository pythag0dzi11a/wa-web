<script setup lang="ts">
const prop = defineProps({
    noPadding: Boolean
});
</script>

<template>
    <div :class="`bg-lighter shadow-sm rounded-xl ${prop.noPadding ? '' : 'p-5'}`">
        <slot/>
    </div>
</template>

<style scoped></style>
