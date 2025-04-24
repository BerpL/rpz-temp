import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    fallbackLng: 'es',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    parse: function(data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error(`Error parsing JSON: ${e}`);
        throw e;
      }
    }
  });

export default i18n;
