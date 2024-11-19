import { AppointmentFormValues } from '@/components/AppointmentDialog/AppointmentDialog.type';
import { Appointment, AppointmentsByDate, Participant } from '@/types/calendar';

export const sleep = (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000));

export const createDateTimeFromParts = (date: Date, timeString: string) => {
  const [hours, minutes] = timeString.split(':').map(Number);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours,
    minutes
  );
};

export const generateRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const splitDateTime = (dateTime: Date) => {
  return {
    date: new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate()
    ),
    time: `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime
      .getMinutes()
      .toString()
      .padStart(2, '0')}`,
  };
};

export const transformDtoToAppointment = (
  dto: AppointmentFormValues
): Omit<Appointment, 'id'> => {
  if (
    dto.startDate === null ||
    dto.startTime === null ||
    dto.endDate === null ||
    dto.endTime === null
  ) {
    throw new Error('Invalid appointment data');
  }
  return {
    participants: dto.participants,
    title: dto.title,
    start: createDateTimeFromParts(dto.startDate, dto.startTime),
    end: createDateTimeFromParts(dto.endDate, dto.endTime),
  };
};

export const deleteAppointmentById = (
  appointments: AppointmentsByDate,
  idToDelete: number
): AppointmentsByDate => {
  return Object.fromEntries(
    Object.entries(appointments)
      .map(([date, dateAppointments]) => {
        const filteredAppointments = dateAppointments.filter(
          (appointment) => appointment.id !== idToDelete
        );

        return [date, filteredAppointments];
      })
      .filter(([_, appointments]) => appointments.length > 0)
  );
};

export const parseAppointment = (
  appointment: Appointment
): AppointmentFormValues => {
  const { date: startDate, time: startTime } = splitDateTime(appointment.start);
  const { date: endDate, time: endTime } = splitDateTime(appointment.end);

  return {
    id: appointment.id,
    title: appointment.title,
    startDate,
    startTime,
    endDate,
    endTime,
    participants: appointment.participants || ([] as Participant[]),
  };
};
