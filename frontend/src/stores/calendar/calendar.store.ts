import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { createSelectors } from '@/utils/zustand'

import { calendarAsyncActions } from './calendar.async.actions'
import {
  CalendarState, CalendarStore
} from './calendar.types'
import { Appointment } from '@/types/calendar'
import { DEFAULT_COLOR, DEFAULT_LANGUAGE, LOCAL_STORAGE_APPOINTMENTS_KEY, LOCAL_STORAGE_COLOR_KEY, LOCAL_STORAGE_LANGUAGE_KEY } from '@/constants/config'
import { DUMMY_APPOINTMENTS } from '@/constants/appointments'
import { Language } from '@/components/ui/custom/LanguageSelector/LanguageSelector.type'
import i18n from '@/i18n'

const initialState: CalendarState = {
  appointments: undefined,
  loading: false,
  color: '',
  date: new Date(),
  language: JSON.parse(localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) || JSON.stringify(DEFAULT_LANGUAGE))
}

export const userStore = create(
  subscribeWithSelector(
    immer<CalendarStore>((set, get) => ({
      ...initialState,
      initLocalStorage: () => {
        const storedAppointments = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY) || '[]');
        if (storedAppointments.length === 0 ) {
          localStorage.setItem(LOCAL_STORAGE_APPOINTMENTS_KEY, JSON.stringify(DUMMY_APPOINTMENTS));
        }
        get().setAppointments(JSON.parse(localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY) || '[]'))
        get().setColor(localStorage.getItem(LOCAL_STORAGE_COLOR_KEY) || DEFAULT_COLOR)
      },
      setAppointments: (appointments: Appointment[]) =>
        set((state) => {
          state.appointments = appointments
        }),

      setLoading: (loading: boolean) =>
        set((state) => {
          state.loading = loading
        }),

        setColor: (color: string) => {
          set((state) => {
            localStorage.setItem(LOCAL_STORAGE_COLOR_KEY, color);
            state.color = color
          })
        },
        setDate: (date: Date) => {
          set((state) => {
            state.date = date
          })
        },
        initializeLanguage: () => {
          const currentLang = get().language;
          if (currentLang) {
            i18n.changeLanguage(currentLang.code);
          }
        },
        setLanguage: (language: Language) => {
          set((state) => {
            i18n.changeLanguage(language.code);
            localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, JSON.stringify(language));
            state.language = language
            window.location.reload();
          })
        },

      ...calendarAsyncActions(get),
    })),
  ),
)

export const useCalendarStore = createSelectors(userStore)
