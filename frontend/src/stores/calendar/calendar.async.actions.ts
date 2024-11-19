import { Appointment } from '@/types/calendar';
import {
  CalendarAsyncActions, CalendarStore
} from './calendar.types'
import { calendarClient } from '@/api/client';
import { AppointmentFormValues } from '@/components/AppointmentDialog/AppointmentDialog.type';
import { transformDtoToAppointment } from '@/utils/calendar';
import { errorToast, infoToast } from './calendar.toast';
import i18n from '@/i18n';

export const calendarAsyncActions = (
  currState: () => CalendarStore,
): CalendarAsyncActions => ({
  fetchAppointments: async (date: string) => {
    const { setAppointments, setLoading } = currState()

    setLoading(true)
    try {
      const appointments = await calendarClient.fetchAppointments(date);
      setAppointments(appointments)
      if (!appointments || appointments.length === 0) {
        infoToast({title: i18n.t("No appointment found for today"), description: i18n.t('Create one!')})
      } else {
        infoToast({title: `${appointments.length} ${i18n.t("Appointment(s) found for today")}`, description: 'You can view all now'})
      }

      setLoading(false)

    } catch (error: any) {
      setLoading(false)
      errorToast({title: i18n.t('Create Appointment Failed')})
      if (error?.message) {
        console.error(`Fetch Appointment Failed: ${error.message}`)
      }
    }
  },
  createAppointment: async (appointment: AppointmentFormValues) => {
    const { setLoading } = currState()

    setLoading(true)
    try {
      const response = await calendarClient.createAppointment(appointment);
      if (!response?.success) {
        errorToast({title: i18n.t('Create Appointment Failed')})
      }

      setLoading(false)

    } catch (error: any) {
      setLoading(false)
      errorToast({title: i18n.t('Create Appointment Failed')})
      if (error?.message) {
        console.error(`Create Appointment Failed: ${error.message}`)
      }
    }
  },

  updateAppointment: async (appointmentData: AppointmentFormValues) => {
    const { setLoading } = currState()

    setLoading(true)
    try {
      const appointment: Appointment = {
        ...transformDtoToAppointment(appointmentData),
        id: appointmentData.id as number
      }
      const response = await calendarClient.updateAppointment(appointment);
      if (!response?.success) {
        errorToast({title: i18n.t('Update Appointment Failed')})
      }

      setLoading(false)

    } catch (error: any) {
      setLoading(false)
      errorToast({title: i18n.t('Update Appointment Failed')})
      if (error?.message) {
        console.error(`Update Appointment Failed: ${error.message}`)
      }
    }
  },

  deleteAppointment: async (appointmentId: number) => {
    const { setLoading } = currState()
    setLoading(true)
    try {
      const response = await calendarClient.deleteAppointment(appointmentId);
      if (!response?.success) {
        errorToast({title: i18n.t('Delete Appointment Failed')})
      }
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      errorToast({title: i18n.t('Delete Appointment Failed')})
      if (error?.message) {
        console.error(`Delete Appointment Failed: ${error.message}`)
      }
    }
  },

})
