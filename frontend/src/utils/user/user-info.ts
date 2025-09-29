import { Component, Ref, ref, ShallowRef, shallowRef } from "vue";
import aJump from "@/utils/a-jump.ts";
import UserApi from "@/utils/api/user.ts";
import {
    ApiResponseError,
    UserEmailGetResponse,
    UserInfoResponse
} from "share";
import { updateNotice } from "@/utils/notice.ts";
import Locker from "@/types/locker.ts";

export type UserInfo = {
    loggedIn: boolean;
    jwt?: string;
    userLoading: boolean;
    username?: string;
    email: {
        primary?: string;
        all?: {
            email: string;
            verified: boolean;
        }[];
    };
    uuid?: string;
    permission?: number;
    jwtPremium?: string;
    emails?: string[];
};

export const userInfo: Ref<UserInfo> = ref({
    loggedIn: localStorage.getItem("jwt") != null,
    jwt: localStorage.getItem("jwt") || undefined,
    jwtPremium: sessionStorage.getItem("jwtPremium") || undefined,
    userLoading: true,
    email: {}
});

async function updateUserInfo() {
    if (!userInfo.value.loggedIn) {
        return false;
    }
    const info = await UserApi.infoGet.fetch();
    updateNotice().then(); // update notice async
    if (info.data.code == 200) {
        info.data = <UserInfoResponse>info.data;
        userInfo.value.username = info.data.data.username;
        userInfo.value.email.primary = info.data.data.email;
        userInfo.value.uuid = info.data.data.uuid;
        userInfo.value.userLoading = false;
        userInfo.value.permission = info.data.data.permission;

        if (userInfo.value.permission == 0) {
            userInfo.value.jwtPremium = userInfo.value.jwt;
        }

        return true;
    } else {
        info.data = <ApiResponseError>info.data;
        if (!info.data?.error) {
            throw new Error("Failed to connect to backend");
        }
        userInfo.value.loggedIn = false;
        userInfo.value.jwt = undefined;
        localStorage.removeItem("jwt");
        aJump.toUrl(
            "/login?next=" + encodeURIComponent(window.location.pathname + window.location.search)
        );
        return false;
    }
}

export function updateEmailInfo() {
    return Locker.withLockOrWait("updateEmailInfo", async () => {
        const info = await UserApi.emailGet.fetch();
        if (info.data.code == 200) {
            info.data = <UserEmailGetResponse>info.data;
            userInfo.value.email.all = info.data.data.emails;
        }
    });
}
updateUserInfo()
    .catch(() => false)
    .then((v) => {
        if (v && nextPageAfterUserLoaded.value) {
            aJump.component.value = nextPageAfterUserLoaded.value;
        } else {
            nextPageAfterUserLoaded.value = undefined;
        }
    });
export const nextPageAfterUserLoaded: ShallowRef<Component | undefined> = shallowRef(undefined);
