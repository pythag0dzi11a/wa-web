<script setup lang="ts">
import Settings from "@/components/settings.vue";
import { ref } from "vue";
import { t } from "@/utils/i18n.ts";
import { userInfo } from "@/utils/user/user-info.ts";
import aJump from "@/utils/a-jump.ts";
import { ApiResponseError, UserInfoPostRequest, UserInfoResponse } from "share";
import UserApi from "@/utils/api/user.ts";
import re from "@/utils/re.ts";
import ErrorBlock from "@/components/blocks/error-block.vue";

const formData = ref({
    username: userInfo.value.username ?? ""
});

const inSave = ref(false);
const error = ref<string>();

async function save() {
    inSave.value = true;
    let data: UserInfoPostRequest = {};
    let flag = false;
    if (formData.value.username == "") {
        inSave.value = false;
        error.value = t("page.settings.account.error.username");
        return;
    }
    if (formData.value.username != userInfo.value.username) {
        if (!re.username.test(formData.value.username)) {
            inSave.value = false;
            error.value = t("page.settings.account.error.usernameInvalid");
            return;
        }
        data.username = formData.value.username;
        flag = true;
    }

    if (!flag || !userInfo.value.jwtPremium) {
        inSave.value = false;
        return;
    }

    const r = await UserApi.infoPost.fetch(data);

    if (r.data.code != 200) {
        r.data = <ApiResponseError>r.data;
        inSave.value = false;
        error.value = `error.${r.data.error}`;
        return;
    }

    r.data = <UserInfoResponse>r.data;
    userInfo.value.email.primary = r.data.data.email;
    userInfo.value.permission = r.data.data.permission;
    userInfo.value.username = r.data.data.username;
}
</script>

<template>
    <settings id="account">
        <template #content>
            <div class="flex flex-col gap-6">
                <error-block v-model="error" />
                <div class="flex flex-col gap-1">
                    <label for="username" class="my-auto w-max">{{
                        $t("page.settings.account.username")
                    }}</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        :disabled="!userInfo.jwtPremium"
                        v-model="formData.username"
                        class="w-48 max-w-full md:w-60 px-2.5 py-1 text-sm rounded-md bg-global border-input"
                    />
                </div>
                <div class="flex flex-col gap-1">
                    <span>
                        {{ $t("page.settings.account.avatar") }}
                    </span>
                    <a
                        class="w-max px-2.5 py-1 text-sm font-[550] rounded-md bg-global border-zinc-300 dark:border-zinc-600 border-[1px]"
                        href="https://gravatar.com/profile/avatars"
                    >
                        {{ $t("page.settings.account.button.avatar") }}
                    </a>
                    <span class="text-xs text-dim">
                        {{ $t("page.settings.account.avatarDetail") }}
                    </span>
                </div>
                <button
                    class="w-max px-2.5 py-1 text-sm font-[550] rounded-md button-green border-zinc-300 dark:border-zinc-600 border-[1px]"
                    @click="save"
                    :disabled="!userInfo.jwtPremium || inSave"
                >
                    {{ $t("page.settings.account.button.save") }}
                </button>
                <a
                    class="text-xs link-green mt-[-1rem]"
                    :href="`/auth?next=${encodeURIComponent(aJump.url)}`"
                    v-if="!userInfo.jwtPremium"
                >
                    {{ $t("page.settings.account.modifyLocked") }}
                </a>
            </div>
        </template>
    </settings>
</template>

<style scoped></style>
