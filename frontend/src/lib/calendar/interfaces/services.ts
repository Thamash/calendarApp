import { Appointment, PositionedAppointment } from '@/types/calendar';

export interface ITimeManager {
  doAppointmentsOverlap(a: Appointment, b: Appointment): boolean;
  getUniqueTimePoints(appointments: Appointment[]): Set<number>;
  getSortedTimePoints(appointments: Appointment[]): number[];
  sortAppointmentsByStartTime(appointments: Appointment[]): Appointment[];
  countActiveAppointments(time: number, appointments: Appointment[]): number;
}

export interface IStyleCalculator {
  getAppointmentStyle(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): React.CSSProperties;
}

export interface IOverlapCalculator {
  findOverlappingAppointments(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): PositionedAppointment[];
  getMaxOverlapsForAppointment(
    appointment: Appointment,
    sortedTimePoints: number[],
    appointments: Appointment[]
  ): number;
  findMaxTotalColumns(
    appointment: PositionedAppointment,
    overlapping: PositionedAppointment[]
  ): number;
}

export interface IPositioner {
  positionAppointments(appointments: Appointment[]): PositionedAppointment[]
  findFirstAvailableColumn(overlapping: PositionedAppointment[]): number
  assignInitialPositions(
    sortedAppointments: Appointment[],
    sortedTimePoints: number[],
    appointments: Appointment[]
  ): PositionedAppointment[]
  updateTotalColumns(
    positionedAppointments: PositionedAppointment[]
  ): PositionedAppointment[]
}

export interface ICalendarManager {
  positionAppointments(appointments: Appointment[]): PositionedAppointment[]
  getAppointmentStyle(
    appointment: PositionedAppointment,
    allAppointments: PositionedAppointment[]
  ): React.CSSProperties
  doAppointmentsOverlap(a: Appointment, b: Appointment): boolean
}