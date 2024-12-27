<script setup lang="ts">
import { ref } from "vue";

const button = ref<InstanceType<typeof HTMLDivElement>>();
const isOnMenu: Record<string, boolean> = {
    button: false,
    menu: false
};

function onMouseMenu(i: string, isEnter: boolean) {
    isOnMenu[i] = isEnter;
    if (isOnMenu.button || isOnMenu.menu) {
        button.value?.setAttribute("aria-expanded", "true");
    } else if (!isOnMenu.button && !isOnMenu.menu) {
        button.value?.setAttribute("aria-expanded", "false");
    }
}

defineExpose({
    button
})
</script>

<template>
    <div class="ml-auto relative">
        <div
            class="h-8 p-2 flex button items-center cursor-pointer"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            ref="button"
            @mouseover="onMouseMenu('button', true)"
            @mouseleave="onMouseMenu('button', false)"
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
            class="menu bg-global border-gray-300 dark:border-zinc-600"
            @mouseover="onMouseMenu('menu', true)"
            @mouseleave="onMouseMenu('menu', false)"
        >
            <div class="min-w-32 p-3">
                <div class="flex flex-wrap gap-0.5">
                    <slot name="menu"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.menu {
    position: absolute;
    top: calc(3rem / 2 + 8px);
    right: 0;
    transition:
        opacity 0.25s,
        visibility 0.25s,
        transform 0.25s;
    box-shadow:
        0 12px 32px rgba(0, 0, 0, 0.1),
        0 2px 6px rgba(0, 0, 0, 0.08);
    border-radius: 0.75rem;
    border-width: 1px;
    --tw-border-opacity: 1;
}

.button[aria-expanded="false"] + .menu {
    visibility: hidden;
    opacity: 0;
    transform: translateY(0);
}

.button[aria-expanded="true"] + .menu {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
}
</style>
