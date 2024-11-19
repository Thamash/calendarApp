import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '@/constants/lang/en.ts';
import { nl } from '@/constants/lang/nl.ts';
import { DEFAULT_LANGUAGE, LOCAL_STORAGE_LANGUAGE_KEY } from '@/constants/config';
import zodNl from '@/constants/lang/zod/nl.json';
import zodEn from '@/constants/lang/zod/en.json';
import { z } from 'zod'
import { makeZodI18nMap } from 'zod-i18n-map'

const resources = {
  en: {
    translation: {
      ...en,
    },
    zod: {
      ...zodEn
    },
  },
  nl: {
    translation: {
      ...nl,
    },
    zod: {
      ...zodNl
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE.code,
    lng: JSON.parse(localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || JSON.stringify(DEFAULT_LANGUAGE)).code,
    interpolation: {
      escapeValue: false,
    },
  });

  z.setErrorMap(makeZodI18nMap({ ns: ["zod"] }));

export default i18n;
export { z }

