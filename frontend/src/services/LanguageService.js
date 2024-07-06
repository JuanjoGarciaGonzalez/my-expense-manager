// languageService.js
import i18next from 'i18next';
import common_es from './../translations/es/common.json';
import common_en from './../translations/en/common.json';
import common_eu from './../translations/eu/common.json';
import common_fr from './../translations/fr/common.json';

const initI18n = () => {
  i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en', // Valor por defecto
    resources: {
      es: {
        common: common_es,
      },
      en: {
        common: common_en,
      },
      eu: {
        common: common_eu,
      },
      fr: {
        common: common_fr,
      }
    },
  });

  // Detectar el idioma del navegador
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang === 'es-ES') {
    console.log('español');
    i18next.changeLanguage('es');
    } else if (userLang === 'eu-ES') {
    console.log('euskara');
    i18next.changeLanguage('eu');
    } else if (userLang === 'fr-FR') {
    console.log('français');
    i18next.changeLanguage('fr');
    } else {
    console.log('english');
    i18next.changeLanguage('en');
    }
};

const changeLanguage = (language) => {
  i18next.changeLanguage(language);
};

export { initI18n, changeLanguage };