<script setup lang="ts">
import '@mdui/icons/home.js'

const props = defineProps([
  'title',
]);

</script>

<template>
  <mdui-card
      class="relative overflow-hidden flex flex-col"
      variant="elevated"
      clickable
  >
    <div class="m-4">
      <slot name="sensorIcon"></slot>
    </div>

    <div class="p-4">
      <h2 class="text-base font-semibold mb-1">{{ props.title }}</h2>

      <slot></slot>
    </div>


  </mdui-card>


</template>

