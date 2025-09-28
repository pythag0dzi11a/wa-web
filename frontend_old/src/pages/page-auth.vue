<script setup lang="ts">
import { userInfo } from "@/utils/user/user-info.ts";
import { getUrlArg } from "@/utils/url.ts";
import aJump from "@/utils/a-jump.ts";
import { ref } from "vue";
import { ApiResponseError, UserAuthRequest, UserAuthResponse } from "share";
import UserApi from "@/utils/api/user.ts";
import { t } from "@/utils/i18n.ts";
import { shaPassword } from "@/utils/security.ts";
import ErrorBlock from "@/components/blocks/error-block.vue";

const error = ref<string>();
const method = ref("password");
const password = ref("");
// const emailCode = ref("");
const inAuth = ref(false);

function afterAuth() {
    const next = getUrlArg("next");
    if (typeof next == "string") {
        aJump.toUrl(next, true);
    } else {
        aJump.toUrl("/dashboard", true);
    }
}

async function auth(data: UserAuthRequest) {
    let l = await UserApi.auth.fetch(data);
    if (l.data.code != 200) {
        inAuth.value = false;
        error.value = t(`error.${(<ApiResponseError>l.data).error}`);
        return;
    }
    l.data = <UserAuthResponse>l.data;
    sessionStorage.setItem("jwtPremium", l.data.data.jwt);
    userInfo.value.jwtPremium = l.data.data.jwt;

    afterAuth();
}

async function authWithPassword() {
    inAuth.value = true;
    if (password.value == "") {
        inAuth.value = false;
        error.value = t("page.auth.error.password");
        return;
    }
    await auth({ password: await shaPassword(password.value) });
}

// async function authWithEmail() {
//     inAuth.value = true;
//     if (emailCode.value == "") {
//         inAuth.value = false;
//         error.value = "page.auth.error.email";
//         return;
//     }
//     await auth({ emailCode: emailCode.value });
// }

if (userInfo.value.jwtPremium) {
    afterAuth();
}
</script>

<template>
    <div class="ml-auto mr-auto mt-[calc(3rem+4vh)] flex flex-col gap-3 text-sm">
        <div class="text-center text-xl mt-6 mb-4">
            <span>{{ $t("page.auth.h1") }}</span>
        </div>
        <error-block v-model="error" />
        <form @submit.prevent="authWithPassword" v-if="method == 'password'">
            <div class="rounded-md bg-lighter border-zinc-500 border-[1px] p-5 flex flex-col gap-3">
                <label class="mt-3" for="password">
                    {{ $t("page.auth.password") }}
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
                >
                    {{ $t("page.auth.button.auth") }}
                </button>
            </div>
        </form>
        <!--        <form @submit.prevent="authWithEmail" v-if="method == 'email'">-->
        <!--            <div class="rounded-md bg-lighter border-zinc-500 border-[1px] p-5 flex flex-col gap-3">-->
        <!--                <label class="mt-3" for="password">-->
        <!--                    {{ $t("page.auth.email") }}-->
        <!--                </label>-->
        <!--                <input-->
        <!--                    class="rounded-md bg-global border-zinc-600 border-[1px] focus-visible:border-green-600 focus-visible:border-[1px] outline-none h-8 w-64 p-0 pt-1.5 pb-1.5 pl-3 pr-3"-->
        <!--                    id="email-code"-->
        <!--                    v-model="emailCode"-->
        <!--                    autocomplete="one-time-code"-->
        <!--                />-->
        <!--                <button-->
        <!--                    class="rounded-md w-full h-8 mt-4 text-white bg-green-500 transition-colors hover:bg-green-600 disabled:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 content-center"-->
        <!--                >-->
        <!--                    {{ $t("page.auth.button.auth") }}-->
        <!--                </button>-->
        <!--            </div>-->
        <!--        </form>-->
        <!--        <div class="rounded-md border-zinc-500 border-[1px] p-5 flex flex-col gap-3">-->
        <!--            <span>-->
        <!--                {{ $t("page.auth.or") }}-->
        <!--            </span>-->
        <!--            <ul class="ml-5 list-disc">-->
        <!--                <li v-if="method != 'password'">-->
        <!--                    <button class="text-blue-600 hover:underline" @click="method = 'password'">-->
        <!--                        {{ $t("page.auth.button.password") }}-->
        <!--                    </button>-->
        <!--                </li>-->
        <!--                <li v-if="method != 'email'">-->
        <!--                    <button class="text-blue-600 hover:underline" @click="method = 'email'">-->
        <!--                        {{ $t("page.auth.button.email") }}-->
        <!--                    </button>-->
        <!--                </li>-->
        <!--            </ul>-->
        <!--        </div>-->
    </div>
</template>

<style scoped></style>
