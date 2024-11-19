import { Group, MultiSelectOption } from '@/components/ui/custom/MultiSelect/MultiSelect.types';

export interface Appointment {
  id: number;
  title: string;
  start: Date;
  end: Date;
  participants?: Participant[];
}

export interface AppointmentDTO {
  id: number;
  title: string;
  start: string;
  end: string;
  participants?: Participant[];
}


export interface PositionedAppointment extends Appointment {
  column: number;
  totalColumns: number;
}

export type AppointmentsByDate = {
  [date: string]: AppointmentDTO[];
};

export interface Department extends Group {}

export interface Participant extends MultiSelectOption<"departmentId"> {}

