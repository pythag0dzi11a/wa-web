import { createI18n } from "vue-i18n";
import en from "@/languages/en.json";
import zh from "@/languages/zh-CN.json";
import { ref } from "vue";

const navLang = navigator.language;
const localLang = navLang == "zh-CN" ? "zh-CN" : navLang == "en-US" ? "en" : false;
const storeLang = localStorage.getItem("language");
const currentLang = ref(storeLang || localLang || "en");
currentLang.value = ["zh-CN", "en"].includes(currentLang.value)
    ? currentLang.value
    : currentLang.value.startsWith("zh")
      ? "zh-CN"
      : "en";
if (!storeLang) {
    localStorage.setItem("language", currentLang.value);
}
const i18n = createI18n({
    locale: currentLang.value,
    fallbackLocale: "en",
    messages: {
        en,
        "zh-CN": zh
    }
});

const t = (...args: string[]): string => {
    return (i18n.global.t as Function)(...args);
};

const langs = ["zh-CN", "en"];

const langNames: Record<string, string> = {
    "zh-CN": "简体中文",
    en: "English"
};

function changeLocale(lang: "en" | "zh-CN" | string) {
    const lang2 = <"en" | "zh-CN" >(
        (["zh-CN", "en"].includes(lang) ? lang : lang == "zh" ? "zh-CN" : "en")
    );
    i18n.global.locale = lang2;
    localStorage.setItem("language", lang2);
    currentLang.value = lang2;
}

export { i18n, t, changeLocale, currentLang, langs, langNames };
