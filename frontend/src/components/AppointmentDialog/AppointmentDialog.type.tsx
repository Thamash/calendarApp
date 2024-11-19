import { Appointment } from '@/types/calendar';
import { MultiSelectOption } from '../ui/custom/MultiSelect/MultiSelect.types';

export interface AppointmentFormValues {
  id?: number;
  title: string;
  startDate: Date | null;
  startTime: string;
  endDate: Date | null;
  endTime: string;
  participants: MultiSelectOption<'departmentId'>[];
}

export interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAppointmentCreate?: (appointment: AppointmentFormValues) => Promise<void>;
  onAppointmentUpdate?: (appointment: AppointmentFormValues) => Promise<void>;
  onAppointmentDelete?: (appointmentId: number) => Promise<void>;
  appointment?: Appointment | null;
}

export enum AppointmentDialogMode {
  CREATE = 'create',
  UPDATE = 'update',
}

export const emptyDefaultValues: AppointmentFormValues = {
  title: '',
  startDate: null,
  startTime: '',
  endDate: null,
  endTime: '',
  participants: [],
};
