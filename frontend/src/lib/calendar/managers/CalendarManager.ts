import { Appointment, PositionedAppointment } from '@/types/calendar';
import { ICalendarManager, IPositioner, IStyleCalculator, ITimeManager } from '../interfaces/services';

export class CalendarManager implements ICalendarManager {
  constructor(
    private timeManager: ITimeManager,
    private styleCalculator: IStyleCalculator,
    private positioner: IPositioner
  ) {}

  positionAppointments(appointments: Appointment[]): PositionedAppointment[] {
    return this.positioner.positionAppointments(appointments);
  }

  getAppointmentStyle(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): React.CSSProperties {
    return this.styleCalculator.getAppointmentStyle(appointment, allAppointments);
  }

  doAppointmentsOverlap(a: Appointment, b: Appointment): boolean {
    return this.timeManager.doAppointmentsOverlap(a, b);
  }
}