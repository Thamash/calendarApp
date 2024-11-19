import { Appointment, PositionedAppointment } from '@/types/calendar';
import { IOverlapCalculator, IPositioner, ITimeManager } from '../interfaces/services';

export class AppointmentPositioner implements IPositioner{
  constructor(
    private timeManager: ITimeManager,
    private overlapCalculator: IOverlapCalculator
  ) {}
  positionAppointments(appointments: Appointment[]): PositionedAppointment[] {
    if (!appointments.length) return [];

    const sortedAppointments = this.timeManager.sortAppointmentsByStartTime(appointments);
    const sortedTimePoints = this.timeManager.getSortedTimePoints(appointments);
    const positionedAppointments = this.assignInitialPositions(sortedAppointments, sortedTimePoints, appointments);

    return this.updateTotalColumns(positionedAppointments);
  }

  findFirstAvailableColumn(overlapping: PositionedAppointment[]): number {
    let column = 0;
    const usedColumns = new Set(overlapping.map(app => app.column));
    while (usedColumns.has(column)) column++;
    return column;
  }

  assignInitialPositions(
    sortedAppointments: Appointment[],
    sortedTimePoints: number[],
    appointments: Appointment[]
  ): PositionedAppointment[] {
    const positionedAppointments: PositionedAppointment[] = [];

    sortedAppointments.forEach(appointment => {
      const overlapping = this.overlapCalculator.findOverlappingAppointments(
        appointment as PositionedAppointment,
        positionedAppointments
      );
      const column = this.findFirstAvailableColumn(overlapping);
      const maxOverlaps = this.overlapCalculator.getMaxOverlapsForAppointment(
        appointment,
        sortedTimePoints,
        appointments
      );

      positionedAppointments.push({
        ...appointment,
        column,
        totalColumns: maxOverlaps
      });
    });

    return positionedAppointments;
  }

  updateTotalColumns(
    positionedAppointments: PositionedAppointment[]
  ): PositionedAppointment[] {
    return positionedAppointments.map(appointment => {
      const overlapping = this.overlapCalculator.findOverlappingAppointments(
        appointment,
        positionedAppointments
      );
      const maxTotalColumns = this.overlapCalculator.findMaxTotalColumns(appointment, overlapping);

      return {
        ...appointment,
        totalColumns: maxTotalColumns
      };
    });
  }
}