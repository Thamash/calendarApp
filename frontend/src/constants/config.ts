import { Language } from '@/components/ui/custom/LanguageSelector/LanguageSelector.type'

export const DATE_FORMAT = 'y-M-d'
export const DATE_TIME_FORMAT = `${DATE_FORMAT} HH:mm`

export const LOCAL_STORAGE_APPOINTMENTS_KEY = 'calendar_appointments'
export const LOCAL_STORAGE_COLOR_KEY = 'calendar_color'
export const LOCAL_STORAGE_LANGUAGE_KEY = 'i18nextLng'

export const DEFAULT_COLOR = "bg-blue-500"

export const DEFAULT_LANGUAGE: Language = { code: 'en', name: 'English', flag: '🇬🇧' }

export const LANGUAGES: Language[] = [
  DEFAULT_LANGUAGE,
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' }
];