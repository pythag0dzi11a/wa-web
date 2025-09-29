<script setup lang="ts">
import IconCross from "@/components/icons/icon-cross.vue";

defineProps<{
    modelValue: string | undefined;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string | undefined): void;
}>();

const clearError = () => {
    emit("update:modelValue", undefined);
};
</script>

<template>
    <div
        v-if="modelValue"
        class="rounded-md bg-red-100 border-red-600 dark:bg-red-950 border-[1px] px-5 py-4 flex"
    >
        <span class="w-64 mr-2">
            {{ modelValue }}
        </span>
        <icon-cross
            role="button"
            class="h-4 w-4 ml-auto mt-auto mb-auto text-red-600"
            @click="clearError"
            @keydown.enter="clearError"
            tabindex="0"
        />
    </div>
</template>

<style scoped></style>
