import { AppointmentFormValues } from '@/components/AppointmentDialog/AppointmentDialog.type'
import { Language } from '@/components/ui/custom/LanguageSelector/LanguageSelector.type'
import { Appointment } from '@/types/calendar'

export interface CalendarState {
  appointments?: Appointment[]
  loading: boolean
  color: string
  date: Date
  language: Language
}

export interface CalendarActions {
  setAppointments: (appointments: Appointment[]) => void
  setLoading: (loading: boolean) => void
  initLocalStorage: () => void
  setColor: (color: string) => void
  setDate: (date: Date) => void
  setLanguage: (language: Language) => void
  initializeLanguage: () => void
}

export interface CalendarAsyncActions {
  fetchAppointments: (date: string) => Promise<void>
  createAppointment: (appointment: AppointmentFormValues) => Promise<void>
  updateAppointment: (appointment: AppointmentFormValues) => Promise<void>
  deleteAppointment: (appointmentId: number) => Promise<void>
}

export type CalendarStore = CalendarState & CalendarActions & CalendarAsyncActions

export interface StoreErrorToastProps {
  title: string
}

export interface StoreInfoToastProps {
  title: string,
  description: string
}
