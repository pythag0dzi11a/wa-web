<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
    emit("update:modelValue", !props.modelValue);
};

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.checked);
};
</script>

<template>
    <div class="toggle-switch" @click="toggle">
        <input
            type="checkbox"
            v-bind="$attrs"
            :checked="modelValue"
            class="toggle-input"
            @change="handleChange"
        />
        <span class="slider"></span>
    </div>
</template>

<style scoped>
.toggle-switch {
    position: relative;
    display: inline-block;
}

.toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d4d4d8;
    transition: 0.4s;
    border-radius: 9999px;
}

@media (prefers-color-scheme: dark) {
    .slider {
        background-color: #181a1b;
    }
}

.slider:before {
    position: absolute;
    content: "";
    height: 80%;
    aspect-ratio: 1 / 1;
    left: 5%;
    right: auto;
    bottom: 10%;
    top: 10%;
    background-color: white;
    border-radius: 9999px;
    transition: 0.5s;
}

.toggle-input:checked + .slider {
    background-color: #22c55e;
}

.toggle-input:checked + .slider:before {
    left: auto;
    right: 5%;
}
</style>
