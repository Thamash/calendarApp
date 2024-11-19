import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/config';
import i18n, { z } from '@/i18n'

export const appointmentFormSchema = z.object({
  title: z.string().min(1).max(100, i18n.t('validation.title_required')),
  startDate: z.date({
    required_error: i18n.t('validation.start_date_required'),
    invalid_type_error: i18n.t('validation.start_date_required'),
  }),
  startTime: z.string().min(1, i18n.t('validation.start_time_required')),
  id: z.number().optional(),
  endDate: z.date({
    required_error: i18n.t('validation.end_date_required'),
  }),
  endTime: z.string().min(1, i18n.t('validation.end_time_required')),
  participants: z.array(z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    departmentId: z.number(),
  })).min(1, i18n.t('validation.at_least_on_participant_required')),
}).refine(
  (data) => {
    const startDateTime = new Date(`${data.startDate.toDateString()} ${data.startTime}`);
    const endDateTime = new Date(`${data.endDate.toDateString()} ${data.endTime}`);
    return endDateTime > startDateTime;
  },
  {
    message: i18n.t('validation.end_must_be_after_start'),
    path: ["endDate"],
  }
).refine(
  (data) => {
    const startDateTime = format(new Date(data.startDate), DATE_FORMAT);
    const endDateTime = format(new Date(data.endDate), DATE_FORMAT);
    return endDateTime == startDateTime;
  },
  {
    message: i18n.t('validation.multi_day_events_are_not_allowed'),
    path: ["endDate"],
  }
);

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;