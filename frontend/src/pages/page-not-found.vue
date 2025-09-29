<script setup lang="ts"></script>

<template>
    <div class="h-[44vh] w-full flex flex-col">
        <div class="h-full" />
        <div class="ml-auto mr-auto flex flex-col gap-4">
            <h1 class="text-4xl font-bold mt-2">404</h1>
            <h2 class="text-2xl font-bold">{{ $t("page.404.h2") }}</h2>
            <a
                class="button-green w-max mt-6"
                role="button"
                href="/"
            >
                {{ $t("page.404.button.home") }}
            </a>
        </div>
    </div>
</template>

<style scoped></style>
