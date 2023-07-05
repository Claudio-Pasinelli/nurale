import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';
import 'dayjs/locale/it';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { it, en } from './lang';

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
};

const lng = localStorage.getItem('lang') || 'it';

dayjs.extend(localizedFormat);

export const changeLanguageSideEffects = (lng: string): any => {
  dayjs.locale(lng);
};
changeLanguageSideEffects(lng);

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'it',
  compatibilityJSON: 'v3',
  debug: false,
  lng,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
