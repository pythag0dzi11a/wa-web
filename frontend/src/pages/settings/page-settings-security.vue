<script setup lang="ts">
import Settings from "@/components/settings.vue";
import { ref } from "vue";
import { t } from "@/utils/i18n.ts";
import re from "@/utils/re.ts";
import UserApi from "@/utils/api/user.ts";
import { ApiResponseError } from "share";
import logout from "@/utils/user/logout.ts";
import { userInfo } from "@/utils/user/user-info.ts";
import aJump from "@/utils/a-jump.ts";
import ErrorBlock from "@/components/blocks/error-block.vue";

const oldPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const error = ref<string>();
const inChangingPassword = ref(false);

async function changePassword() {
    if (inChangingPassword.value) {
        return;
    }
    inChangingPassword.value = true;
    if (!oldPassword.value) {
        error.value = t("page.settings.security.passwordOld");
        inChangingPassword.value = false;
        return;
    }
    if (!newPassword.value) {
        error.value = t("page.settings.security.password");
        inChangingPassword.value = false;
        return;
    }
    if (!confirmPassword.value) {
        error.value = t("page.settings.security.password2");
        inChangingPassword.value = false;
        return;
    }

    if (newPassword.value != confirmPassword.value) {
        error.value = t("page.settings.security.error.passwordsDoNotMatch");
        inChangingPassword.value = false;
        return;
    }
    if (!re.password.test(newPassword.value)) {
        error.value = t("page.settings.security.error.passwordWeak");
        inChangingPassword.value = false;
        return;
    }

    const result = await UserApi.passwordPut.fetch({
        password: oldPassword.value,
        newPassword: newPassword.value
    });

    if (result.data.code != 200) {
        result.data = <ApiResponseError>result.data;
        error.value = t(`error.${result.data.error}`);
        inChangingPassword.value = false;
        return;
    }

    logout();
}
</script>

<template>
    <settings id="security">
        <template #content>
            <div class="flex flex-col gap-5">
                <error-block v-model="error" />
                <h2>
                    {{ $t("page.settings.security.changePassword") }}
                </h2>
                <form @submit.prevent="changePassword" class="flex flex-col gap-5">
                    <div class="flex flex-col">
                        <label for="oldPassword" class="text-sm">{{
                            $t("page.settings.security.passwordOld")
                        }}</label>
                        <input
                            id="oldPassword"
                            type="password"
                            v-model="oldPassword"
                            :disabled="!userInfo.jwtPremium || inChangingPassword"
                            autocomplete="current-password"
                            class="w-48 max-w-full md:w-60 px-2.5 py-1 text-sm rounded-md bg-global border-input"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="newPassword" class="text-sm">{{
                            $t("page.settings.security.password")
                        }}</label>
                        <input
                            id="newPassword"
                            type="password"
                            v-model="newPassword"
                            :disabled="!userInfo.jwtPremium || inChangingPassword"
                            autocomplete="new-password"
                            class="w-48 max-w-full md:w-60 px-2.5 py-1 text-sm rounded-md bg-global border-input"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="confirmPassword" class="text-sm">{{
                            $t("page.settings.security.password2")
                        }}</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            v-model="confirmPassword"
                            :disabled="!userInfo.jwtPremium || inChangingPassword"
                            autocomplete="new-password"
                            class="w-48 max-w-full md:w-60 px-2.5 py-1 text-sm rounded-md bg-global border-input"
                        />
                    </div>
                    <button
                        class="w-max px-2.5 py-1 text-sm font-[550] rounded-md button-green border-zinc-300 dark:border-zinc-600 border-[1px]"
                        :disabled="!userInfo.jwtPremium || inChangingPassword"
                    >
                        <template v-if="inChangingPassword">
                            <i class="fas fa-spinner fa-spin"></i>
                        </template>
                        <template v-else
                            >{{ $t("page.settings.security.button.changePassword") }}
                        </template>
                    </button>
                </form>
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
