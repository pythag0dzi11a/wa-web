<script setup lang="ts"></script>

<template>
    <div class="flex flex-col mt-20 mx-auto w-full max-w-[60rem]">
        <div>
            <h1 class="text-2xl font-bold">
                <slot name="title" />
            </h1>
        </div>
        <div class="mt-1">
            <slot name="link" />
        </div>
        <div class="mt-5 leading-[1.6] flex flex-col gap-3 content">
            <slot name="content" />
        </div>
    </div>
</template>

<style scoped></style>
