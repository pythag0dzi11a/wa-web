<script setup lang="ts">
import { ref } from "vue";
import { ApiResponseError, UserLoginResponse } from "share";
import UserApi from "@/utils/api/user.ts";
import { t } from "@/utils/i18n.ts";
import { userInfo } from "@/utils/user/user-info.ts";
import aJump from "@/utils/a-jump.ts";
import { getUrlArg } from "@/utils/url.ts";
import ErrorBlock from "@/components/blocks/error-block.vue";

const username = ref("");
const password = ref("");

const inLogin = ref(false);

const error = ref<string | undefined>();

if (userInfo.value.loggedIn) {
    const next = getUrlArg("next");
    if (typeof next == "string") {
        aJump.toUrl(next, true);
    } else {
        aJump.toUrl("/dashboard", true);
    }
}

async function login() {
    inLogin.value = true;
    if (username.value == "") {
        inLogin.value = false;
        error.value = t("page.login.error.username");
        return;
    }
    if (password.value == "") {
        inLogin.value = false;
        error.value = t("page.login.error.password");
        return;
    }
    let l = await UserApi.login.fetch({ identity: username.value, password: password.value });
    if (l.data.code != 200) {
        inLogin.value = false;
        error.value = t(`error.${(<ApiResponseError>l.data).error}`);
        return;
    }
    l.data = <UserLoginResponse>l.data;
    localStorage.setItem("jwt", l.data.data.jwt);

    // do not use aJump here, to update everything
    const next = getUrlArg("next");
    if (typeof next == "string") {
        window.location.replace(next);
    } else {
        window.location.replace("/dashboard");
    }
}
</script>

<template>
    <div class="ml-auto mr-auto mt-[calc(3rem+4vh)] flex flex-col gap-3 text-sm">
        <div class="w-20 h-20 ml-auto mr-auto" />
        <div class="text-center text-xl mt-6 mb-4">
            <span>{{ $t("page.login.h1") }}</span>
        </div>
        <error-block v-model="error" />
        <form @submit.prevent="login">
            <div class="rounded-md bg-lighter border-zinc-500 border-[1px] p-5 flex flex-col gap-3">
                <label for="username">
                    {{ $t("page.login.username") }}
                </label>
                <input
                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"
                    id="username"
                    v-model="username"
                    autocomplete="username"
                />
                <label class="mt-3" for="password">
                    {{ $t("page.login.password") }}
                </label>
                <input
                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"
                    id="password"
                    v-model="password"
                    type="password"
                    autocomplete="current-password"
                />
                <button
                    class="rounded-md w-full h-8 mt-4 text-white bg-green-500 transition-colors hover:bg-green-600 disabled:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 content-center"
                    :disabled="inLogin"
                >
                    {{ $t("page.login.button.sign-in") }}
                </button>
            </div>
        </form>
        <div class="rounded-md border-zinc-500 border-[1px] p-5 flex flex-col gap-3 text-center">
            <span class="">
                {{ $t("page.login.register") }}
                <a href="/register" class="text-blue-500">
                    {{ $t("page.login.registerL") }}
                </a>
            </span>
        </div>
    </div>
</template>

<style scoped></style>
