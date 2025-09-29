<script setup lang="ts">
import {ref} from "vue";
import IndexDataCard from "@/components/IndexDataCard.vue";

const apiData = ref([
  {id: 1, name: 'Temperature Sensor', value: '22°C'},
  {id: 2, name: 'Temperature Sensor', value: '22°C'},
  {id: 3, name: 'Temperature Sensor', value: '22°C'},
  {id: 4, name: 'Temperature Sensor', value: '22°C'},
  {id: 5, name: 'Temperature Sensor', value: '22°C'},
  {id: 6, name: 'Temperature Sensor', value: '22°C'},
  {id: 7, name: 'Temperature Sensor', value: '22°C'},
])
</script>

<template>
  <IndexDataCard v-for="item in apiData">
    {{ item.value }}
  </IndexDataCard>

</template>

<style scoped>

</style>