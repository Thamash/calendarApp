import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AppointmentDialogMode,
  emptyDefaultValues,
  type AppointmentDialogProps,
  type AppointmentFormValues,
} from './AppointmentDialog.type';
import { useToast } from '@/hooks/use-toast';
import { appointmentFormSchema } from './validation/schema';
import DateTimePicker from '@/components/ui/custom/DateTimePicker/DateTimePicker';
import { MultiSelect } from '@/components/ui/custom/MultiSelect/MultiSelect';
import { PARTICIPANTS } from '@/constants/participants';
import { DEPARTMENTS } from '@/constants/departments';
import { parseAppointment } from '@/utils/calendar';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import { useTranslation } from 'react-i18next';

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  open,
  onOpenChange,
  onAppointmentCreate,
  onAppointmentUpdate,
  onAppointmentDelete,
  appointment,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const mode = appointment
    ? AppointmentDialogMode.UPDATE
    : AppointmentDialogMode.CREATE;

  const defaultValues = useMemo(() => {
    if (appointment) {
      return parseAppointment(appointment);
    }

    return emptyDefaultValues;
  }, [appointment]);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open && defaultValues) {
      form.reset(defaultValues);
    }
  }, [open, defaultValues, form]);

  const validateData = (data: AppointmentFormValues) => {
    const validationResult = appointmentFormSchema.safeParse(data);

    if (!validationResult.success) {
      toast({
        title: t('validation.validation_error'),
        description: validationResult.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }
    return validationResult;
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    try {
      setIsSubmitting(true);

      const validationResult = validateData(data);

      if (!validationResult?.success) {
        return;
      }

      if (mode === AppointmentDialogMode.CREATE && onAppointmentCreate) {
        await onAppointmentCreate(validationResult.data);
      } else if (mode === AppointmentDialogMode.UPDATE && onAppointmentUpdate) {
        await onAppointmentUpdate(validationResult.data);
      }

      onOpenChange(false);
      form.reset();

      toast({
        title: t('Success'),
        description: t('The operation completed successfully'),
      });
    } catch (error) {
      console.error(`Failed to ${mode} appointment:`, error);
      toast({
        title: t('Error'),
        description: t('The operation failed. Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onHandleDelete = async () => {
    try {
      setIsSubmitting(true);
      if (onAppointmentDelete && appointment) {
        await onAppointmentDelete(appointment.id);
      }
      onOpenChange(false);
      toast({
        title: t('Success'),
        description: t('The operation completed successfully'),
      });
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      toast({
        title: t('Error'),
        description: t('The operation failed. Please try again.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {mode === AppointmentDialogMode.CREATE
              ? t('Create New Appointment')
              : defaultValues?.title}{' '}
          </DialogTitle>
          <DialogDescription>
            {t('Fill in the details below to')}{' '}
            {mode === AppointmentDialogMode.CREATE
              ? t('create a new')
              : t('update the')}{' '}
            appointment.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{t('Title')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('Enter appointment title')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <DateTimePicker<AppointmentFormValues>
                form={form}
                dateFieldName="startDate"
                timeFieldName="startTime"
                dateFieldLabel={t('Start Date')}
                timeFieldLabel={t('Start Time')}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DateTimePicker<AppointmentFormValues>
                form={form}
                dateFieldName="endDate"
                timeFieldName="endTime"
                dateFieldLabel={t('End Date')}
                timeFieldLabel={t('End Time')}
                disabled={(date) => {
                  const startDate = form.getValues('startDate');
                  if (!startDate || date < startDate) return true;
                  return false;
                }}
              />
            </div>

            <MultiSelect<AppointmentFormValues, 'participants', 'departmentId'>
              form={form}
              name="participants"
              label={t('Participants')}
              options={PARTICIPANTS}
              groups={DEPARTMENTS}
              groupLabel={t('Filter by department')}
              groupFieldName="departmentId"
              isRequired
              placeholder={t('Search participants...')}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {t('Cancel')}
              </Button>
              {mode === AppointmentDialogMode.UPDATE && (
                <ConfirmDialog
                  open={isDeleteAlertOpen}
                  onOpenChange={setIsDeleteAlertOpen}
                  onConfirm={onHandleDelete}
                  isSubmitting={isSubmitting}
                  description={t(
                    'This action cannot be undone. This will permanently delete the appointment and remove it from the calendar.'
                  )}
                />
              )}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? `${
                      mode === AppointmentDialogMode.CREATE
                        ? t('Creating')
                        : t('Updating')
                    }...`
                  : mode === AppointmentDialogMode.CREATE
                  ? t('Create')
                  : t('Update')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
