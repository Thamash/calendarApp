import { PositionedAppointment } from '@/types/calendar';
import { IOverlapCalculator, IStyleCalculator } from '../interfaces/services';

export class AppointmentStyleCalculator implements IStyleCalculator {
  constructor(private overlapCalculator: IOverlapCalculator) {}

  getAppointmentStyle(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): React.CSSProperties {
    const position = this.calculatePositionAndHeight(appointment);
    const overlapping = this.overlapCalculator.findOverlappingAppointments(
      appointment,
      allAppointments
    );
    const width =
      overlapping.length === 0
        ? '99%'
        : this.calculateAppointmentWidth(appointment, allAppointments);
    const left =
      overlapping.length === 0 ? '0' : this.calculateLeftPosition(appointment);

    return {
      top: `${position.top}px`,
      height: `${position.height}px`,
      width,
      left,
    };
  }

  private calculatePositionAndHeight(appointment: PositionedAppointment) {
    const topPosition =
      (appointment.start.getHours() * 60 + appointment.start.getMinutes()) / 2;
    const durationInMinutes =
      (appointment.end.getTime() - appointment.start.getTime()) / (1000 * 60);
    const height = durationInMinutes / 2;

    return { top: topPosition, height };
  }

  private calculateAppointmentWidth(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): string {
    const overlapping = this.overlapCalculator.findOverlappingAppointments(
      appointment,
      allAppointments
    );
    const shouldExpand = this.shouldExpandAppointment(appointment, overlapping);

    if (shouldExpand) {
      const overlappingWidth = this.calculateOverlappingWidth(overlapping);
      return `${100 - overlappingWidth - 1}%`;
    }

    return `${100 / appointment.totalColumns - 1}%`;
  }

  private shouldExpandAppointment(
    appointment: PositionedAppointment,
    overlapping: PositionedAppointment[]
  ): boolean {
    return (
      overlapping.length === 1 &&
      overlapping[0].totalColumns > 2 &&
      appointment.column > overlapping[0].column
    );
  }

  private calculateOverlappingWidth(
    overlapping: PositionedAppointment[]
  ): number {
    return overlapping.reduce(
      (total, app) => total + 100 / app.totalColumns,
      0
    );
  }

  private calculateLeftPosition(appointment: PositionedAppointment): string {
    return `${(appointment.column * 100) / appointment.totalColumns}%`;
  }
}
