<script setup lang="ts">
import { userInfo } from "@/utils/user/user-info.ts";
import aJump from "@/utils/a-jump.ts";

if (userInfo.value.loggedIn) {
    aJump.toUrl("/dashboard", true);
}
</script>

<template>
    <div class="block">
        <div class="flex w-full min-h-[66vh]">
            <div class="m-auto mb-0">
                <div class="flex flex-col lg:ml-12 lg:mr-24 pl-4 pr-4">
                    <div class="text-center lg:text-left w-auto max-w-[44rem] lg:w-[44rem]">
                        <h1 translate="no" class="text-5xl lg:text-6xl font-black title">

                        </h1>
                        <p class="text-4xl lg:text-5xl lg:leading-[1.16] font-black mt-5 whitespace-pre-wrap">
                            {{ $t("page.index.h2") }}
                        </p>
                        <p class="text-xl font-[550] mt-8 whitespace-pre-wrap">
                            {{ $t("page.index.h3") }}
                        </p>
                        <div class="mt-16 flex gap-4 ml-auto mr-auto lg:ml-0 lg:mr-0">
                            <a
                                class="ml-auto lg:ml-0 button-green"
                                role="button"
                                href="/login"
                            >
                                {{ $t("page.index.button.login") }}
                            </a>

                            <a
                                class="mr-auto lg:mr-0 button-normal"
                                role="button"
                                href="/register"
                            >
                                {{ $t("page.index.button.register") }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    background: linear-gradient(120deg, #43e5a0 10%, #126945);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

:root {
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #ffcc00 30%, #ffff00);
}
</style>
