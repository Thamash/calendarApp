import { Appointment, PositionedAppointment } from '@/types/calendar';
import { ICalendarManager } from '../calendar/interfaces/services';

export class CalendarService {
  constructor(
    private calendarManager: ICalendarManager,
  ) {}

  positionAppointments(appointments: Appointment[]): PositionedAppointment[] {
    return this.calendarManager.positionAppointments(appointments);
  }

  getAppointmentStyle(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): React.CSSProperties {
    return this.calendarManager.getAppointmentStyle(appointment, allAppointments);
  }

  doAppointmentsOverlap(a: Appointment, b: Appointment): boolean {
    return this.calendarManager.doAppointmentsOverlap(a, b);
  }
}