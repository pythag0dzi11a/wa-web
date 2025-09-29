<script setup lang="ts">
import { ref } from "vue";

const button = ref<InstanceType<typeof HTMLDivElement>>();
</script>

<template>
        <div
            class="h-8 p-2 flex button items-center cursor-pointer"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            ref="button"
            @click="
                button?.setAttribute(
                    'aria-expanded',
                    button?.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
                )
            "
        >
            <slot name="button"></slot>
        </div>
        <div
            class="menu border-gray-300 dark:border-zinc-600"
        >
            <div class="min-w-32 pr-3 mt-[-0.25rem] pl-3">
                <div class="flex flex-wrap gap-0.5">
                    <slot name="menu"></slot>
                </div>
            </div>
        </div>
</template>

<style scoped>
.menu {
    top: calc(3rem / 2 + 8px);
    right: 0;
    transition:
        opacity 0.25s,
        visibility 0.25s,
        transform 0.25s;

}

.button[aria-expanded="false"] + .menu {
    display: none;
    opacity: 0;
    transform: translateY(0);
}

.button[aria-expanded="true"] + .menu {
    display: flex;
    opacity: 1;
    transform: translateY(0);
}
</style>
