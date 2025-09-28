<script setup lang="ts">
import Settings from "@/components/settings.vue";
import { updateEmailInfo, userInfo } from "@/utils/user/user-info.ts";
import IconDelete from "@/components/icons/icon-delete.vue";
import UserApi from "@/utils/api/user.ts";
import IconLoading from "@/components/icons/icon-loading.vue";
import { ref } from "vue";
import { t } from "@/utils/i18n";
import re from "@/utils/re.ts";
import { ApiResponseError, UserInfoResponse } from "share";
import aJump from "@/utils/a-jump.ts";
import ErrorBlock from "@/components/blocks/error-block.vue";
import MessageBlock from "@/components/blocks/message-block.vue";

if (!userInfo.value.email.all) {
    updateEmailInfo();
}

const error = ref<string>();
const message = ref<string>();
const newEmail = ref("");
const primarySelect = ref(<string>userInfo.value.email.primary);
const inAdd = ref(false);
const inPrimaryEmailSave = ref(false);
const inVerify = ref(false);

async function deleteEmail(email: string) {
    userInfo.value.email.all = userInfo.value.email.all?.filter((e) => e.email != email);
    const result = await UserApi.emailDelete.fetch({ email });
    if (result.data.code != 200) {
        result.data = <ApiResponseError>result.data;
        error.value = t(`error.${result.data.error}`);
        return;
    }
}

async function addEmail() {
    inAdd.value = true;

    if (newEmail.value == "") {
        inAdd.value = false;
        error.value = t("page.settings.email.error.email");
        return;
    }
    if (!re.email.test(newEmail.value)) {
        inAdd.value = false;
        error.value = t("page.settings.email.error.emailInvalid");
        return;
    }
    if (userInfo.value.email.all?.find((e) => e.email == newEmail.value)) {
        inAdd.value = false;
        error.value = t("page.settings.email.error.emailExists");
        return;
    }
    const r = await UserApi.emailPut.fetch({ email: newEmail.value });
    if (r.status != 200) {
        r.data = <ApiResponseError>r.data;
        error.value = r.data.error ? t(`error.${r.data.error}`) : t("error.InternalServerError");
        inAdd.value = false;
        return;
    }
    userInfo.value.email.all?.push({ email: newEmail.value, verified: false });
    newEmail.value = "";
    error.value = undefined;
    inAdd.value = false;
}

async function verify(_email: string) {
}

async function setPrimaryEmail() {
    inPrimaryEmailSave.value = true;
    if (primarySelect.value == userInfo.value.email.primary) {
        inPrimaryEmailSave.value = false;
        return;
    }
    if (
        userInfo.value.email.all?.filter((e) => e.email == primarySelect.value)[0].verified == false
    ) {
        inPrimaryEmailSave.value = false;
        return;
    }
    const r = await UserApi.infoPost.fetch({ email: primarySelect.value });
    if (r.data.code != 200) {
        r.data = <ApiResponseError>r.data;
        error.value = t(`error.${r.data.error}`);
        inPrimaryEmailSave.value = false;
        return;
    }
    r.data = <UserInfoResponse>r.data;
    userInfo.value.email.primary = r.data.data.email;
    userInfo.value.permission = r.data.data.permission;
    userInfo.value.username = r.data.data.username;
    inPrimaryEmailSave.value = false;
}
</script>

<template>
    <settings id="email">
        <template #content>
            <div v-if="userInfo.email.all" class="flex flex-col gap-5">
                <error-block v-model="error" />
                <message-block v-model="message" />
                <ul
                    class="rounded-md border-zinc-300 dark:border-zinc-600 border-[1px] text-sm md:text-base"
                >
                    <li class="p-5">
                        <div class="flex flex-row">
                            <span>{{ userInfo.email.primary }}</span>
                            <span class="ml-0 md:ml-4" />
                            <span class="ml-3">-&nbsp;</span>
                            <span class="text-green-500">{{
                                $t("page.settings.email.primary")
                            }}</span>
                            <span
                                v-if="
                                    !userInfo.email.all.filter(
                                        (e) => e.email == userInfo.email.primary
                                    )[0].verified
                                "
                            >
                                <span class="ml-3">-&nbsp;</span>
                                <span class="text-red-500">{{
                                    $t("page.settings.email.unverified")
                                }}</span>
                            </span>
                            <div class="ml-auto" />
                            <button
                                class="button-green ml-2 px-2 py-1 rounded-md text-xs"
                                v-if="
                                    !userInfo.email.all.filter(
                                        (e) => e.email == userInfo.email.primary
                                    )[0].verified
                                "
                                :disabled="inVerify"
                                @click="verify(<string>userInfo.email.primary)"
                            >
                                {{ $t("page.settings.email.button.verify") }}
                            </button>
                        </div>
                        <div>
                            <span class="text-xs text-dim">{{
                                $t("page.settings.email.primaryDetail")
                            }}</span>
                        </div>
                    </li>
                    <li
                        v-for="email in userInfo.email.all.filter(
                            (e) => e.email != userInfo.email.primary
                        )"
                        class="border-zinc-300 dark:border-zinc-600 border-t-[1px] p-5 flex"
                    >
                        <div>
                            <span>{{ email.email }}</span>
                            <span class="ml-0 md:ml-4" />
                            <span v-if="!email.verified">
                                <span class="ml-3">-&nbsp;</span>
                                <span class="text-red-500">{{
                                    $t("page.settings.email.unverified")
                                }}</span>
                            </span>
                        </div>
                        <div class="ml-auto" />
                        <button
                            class="button-green ml-2 px-2 py-1 rounded-md text-xs"
                            v-if="!email.verified"
                            :disabled="inVerify"
                            @click="verify(email.email)"
                        >
                            {{ $t("page.settings.email.button.verify") }}
                        </button>
                        <button
                            class="rounded-md ml-2 border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 border-[1px] p-1 hover:bg-red-300 dark:hover:bg-red-950 text-red-600 disabled:text-zinc-600 disabled:bg-zinc-200"
                            :disabled="!userInfo.jwtPremium"
                            @click="deleteEmail(email.email)"
                        >
                            <IconDelete class="size-4" />
                        </button>
                    </li>
                </ul>
                <div>
                    <h2>{{ $t("page.settings.email.add") }}</h2>
                    <form @submit.prevent="addEmail">
                        <input
                            type="text"
                            id="new-email"
                            name="new-email"
                            :disabled="!userInfo.jwtPremium"
                            v-model="newEmail"
                            autocomplete="email"
                            class="w-48 max-w-full md:w-60 px-2.5 py-1 text-sm rounded-md bg-global border-input"
                        />
                        <button
                            class="w-max px-2.5 py-1 ml-3 text-sm rounded-md bg-global border-zinc-300 dark:border-zinc-600 border-[1px]"
                            :disabled="!userInfo.jwtPremium || inAdd"
                        >
                            {{ $t("page.settings.email.button.add") }}
                        </button>
                    </form>
                </div>
                <div>
                    <h2>{{ $t("page.settings.email.primary") }}</h2>
                    <form @submit.prevent="setPrimaryEmail">
                        <select
                            id="primary-email"
                            name="primary-email"
                            v-model="primarySelect"
                            :disabled="!userInfo.jwtPremium || inPrimaryEmailSave"
                            class="w-48 max-w-full md:w-60 px-2.5 py-1 text-sm rounded-md bg-global border-input"
                        >
                            <option
                                v-for="email in userInfo.email.all.filter((e) => e.verified)"
                                :value="email.email"
                            >
                                {{ email.email }}
                            </option>
                        </select>
                        <button
                            class="w-max px-2.5 py-1 ml-3 text-sm rounded-md bg-global border-zinc-300 dark:border-zinc-600 border-[1px]"
                            :disabled="!userInfo.jwtPremium || inPrimaryEmailSave"
                        >
                            {{ $t("page.settings.email.button.save") }}
                        </button>
                    </form>
                </div>
                <a
                    class="text-xs link-green"
                    :href="`/auth?next=${encodeURIComponent(aJump.url)}`"
                    v-if="!userInfo.jwtPremium"
                >
                    {{ $t("page.settings.email.modifyLocked") }}
                </a>
            </div>
            <div v-else class="w-full h-[30vh]">
                <icon-loading class="mx-auto mt-[21vh] size-10 text-zinc-400" />
            </div>
        </template>
    </settings>
</template>

<style scoped></style>
