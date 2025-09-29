<script setup lang="ts">

import {ref} from "vue";
import {getTheme, setTheme} from "mdui";
import '@mdui/icons/menu-book.js'
import '@mdui/icons/home.js'
import '@mdui/icons/list.js'
import '@mdui/icons/first-page.js'
import '@mdui/icons/brightness-7.js'
import '@mdui/icons/brightness-3.js'

const drawerOpen = ref(false);

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
  console.log(drawerOpen.value);
}

const toggleTheme = () => {
  if (getTheme() === 'dark') {
    setTheme('light');
  } else {
    setTheme('dark');
  }
}

// setTheme('auto')

</script>

<template>
  <mdui-top-app-bar
      scroll-behavior="elevate"
      variant="small"
      class="flex items-center"
  >
    <mdui-button-icon
        @click="toggleDrawer"
        class="w-12 h-12"
    >
      <mdui-icon-list class="w-10 h-10"></mdui-icon-list>
    </mdui-button-icon>
    <mdui-top-app-bar-title class="text-4xl">WildAssistant</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>

    <!--    <mdui-text-field label="search" class="w-50 h-12"></mdui-text-field>-->
    <mdui-tooltip content="切换主题">
      <mdui-switch @change="toggleTheme">
        <mdui-icon-brightness-7 slot="unchecked-icon"></mdui-icon-brightness-7>
        <mdui-icon-brightness-3 slot="checked-icon"></mdui-icon-brightness-3>
      </mdui-switch>
    </mdui-tooltip>

    <mdui-button-icon class="mx-4 w-12 h-12">
      <mdui-icon-home class="w-10 h-10"></mdui-icon-home>
    </mdui-button-icon>
  </mdui-top-app-bar>

  <mdui-navigation-drawer
      modal
      close-on-esc
      close-on-overlay-click
      class=".mdui-drawer-full-height"
      :open="drawerOpen"
      @closed="toggleDrawer"
  >
    <mdui-list>
      <mdui-list-subheader class="text-3xl m-4">菜单</mdui-list-subheader>
      <mdui-list-item alignment="center">
        <mdui-icon-first-page slot="icon"></mdui-icon-first-page>
        <h1 class="text-2xl">test1</h1>
        <mdui-icon-arrow-right slot="end-icon"></mdui-icon-arrow-right>
      </mdui-list-item>

      <mdui-list-item alignment="center">
        <mdui-icon-first-page slot="icon"></mdui-icon-first-page>
        <h1 class="text-2xl">test2</h1>
        <mdui-icon-arrow-right slot="end-icon"></mdui-icon-arrow-right>
      </mdui-list-item>
    </mdui-list>
  </mdui-navigation-drawer>
</template>

<style scoped>

</style>