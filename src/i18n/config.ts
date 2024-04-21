import i18next from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from './lan/en.json';
import fr from './lan/fr.json';
import { LanguageDetector } from 'i18next-http-middleware';
// import ru from './lan/ru.json';
// import frBE from './lan/fr-BE.json';

const resources = {
  // 'fr-BE': {
  //   translation: frBE, // Предполагаем, что у вас есть отдельный файл перевода frBE.json
  // },
  en: {
    translation: {
      title: {
        'Welcome to React': 'Welcome to React and react-i18next',
        'Welcome to React1': 'Welcome to React and react-i18next',
        signature: 'Signature',
        'welcome to signature': 'Welcome to Signature',
        'log into access': 'Log in to access the platform',
        required: 'Required',
        'condition of us': 'accept the General Conditions of Use',
        validate: 'validate',
      },
      form: {
        email: 'email',
        password: 'password',
        login: 'login',
      },
      folder: {
        'new-folder': 'Nouveau dossier',
      },
    },
  },
  fr: {
    translation: {
      title: {
        'Welcome to React': 'Bienvenue à React et react-i18next',
        'Welcome to React1': 'Welcome to React and react-i18next',
        signature: 'Signature',
        'welcome to signature': 'Bienvenue sur Signature',
        'log into access': 'Connectez-vous pour acceder a la plateforme',
        required: 'Required',
        'condition of us': "j'accepte les Conditions Generales d'Utilsation",
        validate: 'valider',
      },
      form: {
        email: 'Adresse email',
        password: 'Mot de passe',
        login: 'Se connecter',
      },
      folder: {
        'new-folder': 'Nouveau dossier',
      },
    },
  },

  // ru: {
  //   translation: ru,
  // },
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
    // whitelist: ['en-US', 'fr-BE', 'ru', 'fr'],
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

// Использование middleware
export default i18next;
