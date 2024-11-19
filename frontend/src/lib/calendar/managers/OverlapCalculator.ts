import { Appointment, PositionedAppointment } from '@/types/calendar';
import { IOverlapCalculator, ITimeManager } from '../interfaces/services';

export class OverlapCalculator implements IOverlapCalculator {
  constructor(private timeManager: ITimeManager) {}
  findOverlappingAppointments(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): PositionedAppointment[] {
    return allAppointments.filter(other =>
      other.id !== appointment.id &&
      appointment.start < other.end &&
      other.start < appointment.end
    );
  }

  getMaxOverlapsForAppointment(
    appointment: Appointment,
    sortedTimePoints: number[],
    appointments: Appointment[]
  ): number {
    let maxOverlaps = 0;

    sortedTimePoints.forEach(time => {
      if (time < appointment.start.getTime() && time >= appointment.end.getTime()) {
        return;
      }
      const activeCount = this.timeManager.countActiveAppointments(time, appointments);
      maxOverlaps = Math.max(maxOverlaps, activeCount);
    });

    return maxOverlaps;
  }

  findMaxTotalColumns(
    appointment: PositionedAppointment,
    overlapping: PositionedAppointment[]
  ): number {
    return Math.max(
      ...overlapping.map(app => app.totalColumns),
      appointment.totalColumns
    );
  }
}