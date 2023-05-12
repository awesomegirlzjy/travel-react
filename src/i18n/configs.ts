import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",  // 默认初始化使用的语言
    
    // keySeparator: false, // we do not use keys in form messages.welcome
    
    // header.slogan  // 获得具体的字符串
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
