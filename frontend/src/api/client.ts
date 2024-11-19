import { AppointmentFormValues } from '@/components/AppointmentDialog/AppointmentDialog.type';
import { DATE_FORMAT, LOCAL_STORAGE_APPOINTMENTS_KEY } from '@/constants/config';
import { Appointment } from '@/types/calendar';
import {
  deleteAppointmentById,
  generateRandomInt,
  sleep,
} from '@/utils/calendar';
import { format } from 'date-fns';
import { transformDtoToAppointment } from '../utils/calendar';

export const calendarClient = {
  fetchAppointments: async (date: string): Promise<Appointment[]> => {
    await sleep(1);
    const storedAppointments = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY) || '[]'
    );
    return (storedAppointments[date] || []).map((appointment: Appointment) => ({
      ...appointment,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
    }));
  },

  createAppointment: async (
    appointmentData: AppointmentFormValues
  ): Promise<{ success: boolean }> => {
    await sleep(1);

    if (!appointmentData.startDate) {
      throw new Error('Invalid appointment data');
    }

    const appointment: Appointment = {
      ...transformDtoToAppointment(appointmentData),
      id: generateRandomInt(100, 100000),
    };
    const dateKey = format(appointmentData.startDate, DATE_FORMAT);

    const storedAppointments = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY) || '[]'
    );

    storedAppointments[dateKey] = [
      ...(storedAppointments[dateKey] || []),
      appointment,
    ];
    localStorage.setItem(LOCAL_STORAGE_APPOINTMENTS_KEY, JSON.stringify(storedAppointments));

    return { success: true };
  },

  updateAppointment: async (
    appointment: Appointment
  ): Promise<{ success: boolean }> => {
    await sleep(1);

    const dateKey = format(appointment.start, DATE_FORMAT);

    const storedAppointments = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY) || '[]'
    );

    const newStoredAppointments = deleteAppointmentById(
      storedAppointments,
      appointment.id
    );

    newStoredAppointments[dateKey] = [
      ...(newStoredAppointments[dateKey] || []),
      {
        ...appointment,
        start: appointment.start.toISOString(),
        end: appointment.end.toISOString(),
      },
    ];

    localStorage.setItem(
      LOCAL_STORAGE_APPOINTMENTS_KEY,
      JSON.stringify(newStoredAppointments)
    );

    return { success: true };
  },

  deleteAppointment: async (
    appointmentId: number
  ): Promise<{ success: boolean }> => {
    await sleep(1);

    const storedAppointments = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_APPOINTMENTS_KEY) || '[]'
    );

    const newStoredAppointments = deleteAppointmentById(
      storedAppointments,
      appointmentId
    );

    localStorage.setItem(
      LOCAL_STORAGE_APPOINTMENTS_KEY,
      JSON.stringify(newStoredAppointments)
    );

    return { success: true };
  },
};
