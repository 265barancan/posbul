import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import trTranslation from "./locales/tr/translation.json";
import enTranslation from "./locales/en/translation.json";

const resources = {
    tr: {
        translation: trTranslation,
    },
    en: {
        translation: enTranslation,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
