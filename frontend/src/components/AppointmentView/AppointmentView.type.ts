import { PositionedAppointment } from '@/types/calendar';

export interface AppointmentViewProps {
  appointment: PositionedAppointment;
  allAppointments: PositionedAppointment[];
  onClick?: (appointment: PositionedAppointment) => void;
}