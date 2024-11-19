import { Appointment } from '@/types/calendar';
import { ITimeManager } from '../interfaces/services';

export class AppointmentTimeManager implements ITimeManager {
  doAppointmentsOverlap(a: Appointment, b: Appointment): boolean {
    return a.start < b.end && b.start < a.end;
  }

  getUniqueTimePoints(appointments: Appointment[]): Set<number> {
    const timePoints = new Set<number>();
    appointments.forEach(app => {
      timePoints.add(app.start.getTime());
      timePoints.add(app.end.getTime());
    });
    return timePoints;
  }

  getSortedTimePoints(appointments: Appointment[]): number[] {
    const timePoints = this.getUniqueTimePoints(appointments);
    return Array.from(timePoints).sort((a, b) => a - b);
  }

  sortAppointmentsByStartTime(appointments: Appointment[]): Appointment[] {
    return [...appointments ?? []].sort((a, b) => a.start.getTime() - b.start.getTime());
  }

  countActiveAppointments(time: number, appointments: Appointment[]): number {
    return appointments.filter(app =>
      app.start.getTime() <= time &&
      app.end.getTime() > time
    ).length;
  }
}