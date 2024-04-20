import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from './lan/en.json'
import fr from './lan/fr.json'

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources,
    // resources: {
    //   en: {
    //     translation,
    //   },
    // },
    // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
    // set returnNull to false (and also in the i18next.d.ts options)
    // returnNull: false,
    detection: {
      order: ['localStorage', 'navigator'],
    },
    // lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });
