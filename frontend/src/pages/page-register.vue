<script setup lang="ts">
import { ref } from "vue";
import { ApiResponseError } from "share";
import UserApi from "@/utils/api/user.ts";
import { t } from "@/utils/i18n.ts";
import { userInfo } from "@/utils/user/user-info.ts";
import aJump from "@/utils/a-jump.ts";
import sleep from "@/utils/sleep.ts";
import re from "@/utils/re.ts";
import ErrorBlock from "@/components/blocks/error-block.vue";
import MessageBlock from "@/components/blocks/message-block.vue";

const username = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");

const inRegister = ref(false);

const error = ref<string>();
const message = ref<string>();

if (userInfo.value.loggedIn) {
    aJump.toUrl("/dashboard", true);
}

async function register() {
    inRegister.value = true;
    if (username.value == "") {
        inRegister.value = false;
        error.value = t("page.register.error.username");
        return;
    }
    if (email.value == "") {
        inRegister.value = false;
        error.value = t("page.register.error.email");
        return;
    }
    if (password.value == "") {
        inRegister.value = false;
        error.value = t("page.register.error.password");
        return;
    }
    if (password2.value == "") {
        inRegister.value = false;
        error.value = t("page.register.error.password2");
        return;
    }
    if (!re.username.test(username.value)) {
        inRegister.value = false;
        error.value = t("page.register.error.usernameInvalid");
        return;
    }
    if (!re.email.test(email.value)) {
        inRegister.value = false;
        error.value = t("page.register.error.emailInvalid");
        return;
    }
    if (password.value != password2.value) {
        inRegister.value = false;
        error.value = t("page.register.error.passwordNotMatch");
        return;
    }
    if (!re.password.test(password.value)) {
        inRegister.value = false;
        error.value = t("page.register.error.passwordWeak");
        return;
    }
    let l = await UserApi.register.fetch({
        username: username.value,
        email: email.value,
        password: password.value
    });
    console.log(l);
    if (l.data.code != 200) {
        inRegister.value = false;
        error.value = t(`error.${(<ApiResponseError>l.data).error}`);
        return;
    }
    error.value = undefined;
    message.value = t("page.register.message.success");
    await sleep(3000);
    aJump.toUrl("/login");
}
</script>

<template>
    <div class="ml-auto mr-auto mt-[calc(3rem+4vh)] mb-4 flex flex-col gap-3 text-sm">
        <div class="w-20 h-20 ml-auto mr-auto" />
        <div class="text-center text-xl mt-6 mb-4">
            <span>{{ $t("page.register.h1") }}</span>
        </div>
        <error-block v-model="error" />
        <message-block v-model="message" />
        <form @submit.prevent="register">
            <div class="rounded-md bg-lighter border-zinc-500 border-[1px] p-5 flex flex-col gap-3">
                <label for="username">
                    {{ $t("page.register.username") }}
                </label>
                <input
                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"
                    id="username"
                    v-model="username"
                    autocomplete="off"
                />
                <label class="mt-3" for="email">
                    {{ $t("page.register.email") }}
                </label>
                <input
                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"
                    id="email"
                    v-model="email"
                    autocomplete="email"
                />
                <label class="mt-3" for="password">
                    {{ $t("page.register.password") }}
                </label>
                <input
                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="new-password"
                />
                <label class="mt-3" for="password2">
                    {{ $t("page.register.password2") }}
                </label>
                <input
                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"
                    id="password2"
                    v-model="password2"
                    type="password"
                    autocomplete="new-password"
                />
                <button
                    class="rounded-md w-full h-8 mt-4 text-white bg-green-500 transition-colors hover:bg-green-600 disabled:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 content-center"
                    :disabled="inRegister"
                >
                    {{ $t("page.register.button.sign-up") }}
                </button>
            </div>
        </form>
        <div class="rounded-md border-zinc-500 border-[1px] p-5 flex flex-col gap-3 text-center">
            <span class="">
                {{ $t("page.register.login") }}
                <a href="/login" class="text-blue-500">
                    {{ $t("page.register.loginL") }}
                </a>
            </span>
        </div>
    </div>
</template>

<style scoped></style>
