import { useCalendarService } from '@/hooks/userCalendarService';
import { Appointment, PositionedAppointment } from '@/types/calendar';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { TimeGrid } from '@/components/TimeGrid/TimeGrid';
import { AppointmentView } from '@/components/AppointmentView/AppointmentView';
import { Plus } from 'lucide-react';
import { DATE_FORMAT } from '@/constants/config';
import { calendarSelectors } from '@/stores/calendar/calendar.selectors';
import { useCalendarStore } from '@/stores/calendar/calendar.store';
import LoadingBackdrop from '@/components/LoadingBackdrop/LoadingBackdrop';
import { useAppointmentDialog } from '@/hooks/useAppointmentDialog';
import NewAppointmentDialog from '@/components/AppointmentDialog/AppointmentDialog';
import { AppointmentFormValues } from '@/components/AppointmentDialog/AppointmentDialog.type';
import Header from '@/components/Header/Header';
import { useTranslation } from 'react-i18next';

export const Calendar: React.FC = () => {
  const calendarService = useCalendarService();
  const date = useCalendarStore(calendarSelectors.date);
  const [positionedAppointments, setPositionedAppointments] = useState<
    PositionedAppointment[]
  >([]);
  const actions = useCalendarStore(calendarSelectors.actions);
  const appointments = useCalendarStore(calendarSelectors.appointments);
  const {
    isOpen: isAppointmentDialogOpen,
    openDialog: openAppointmentDialog,
    setIsOpen: setIsAppointmentDialogOpen,
  } = useAppointmentDialog();

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    actions.initLocalStorage();
  }, []);

  useEffect(() => {
    const positioned = calendarService.positionAppointments(appointments ?? []);
    setPositionedAppointments(positioned);
  }, [appointments]);

  useEffect(() => {
    fetchCurrentAppointments();
  }, [calendarService, date]);

  const fetchCurrentAppointments = async () => {
    const dateKey = format(date, DATE_FORMAT);
    actions.fetchAppointments(dateKey);
  };

  const handleAppointmentCreate = async (
    appointment: AppointmentFormValues
  ) => {
    actions.createAppointment(appointment);
    fetchCurrentAppointments();
  };

  const handleAppointmentUpdate = async (
    appointment: AppointmentFormValues
  ) => {
    actions.updateAppointment(appointment);
    setSelectedAppointment(null);
    fetchCurrentAppointments();
  };

  const handleAppointmentDelete = async (appointmentId: number) => {
    actions.deleteAppointment(appointmentId);
    setSelectedAppointment(null);
    fetchCurrentAppointments();
  };

  const handleClickAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    openAppointmentDialog();
  };

  const handleAppointmentDialogClose = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedAppointment(null);
    }
    setIsAppointmentDialogOpen(isOpen);
  };
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen m-auto bg-white min-w-[300px] max-w-[500px] dark:bg-gray-900">
      <div className="flex flex-col w-full h-screen max-w-4xl gap-3 p-4 mx-auto">
        <Header />

        <div className="overflow-auto border rounded-lg shadow-md dark:border-gray-700 bg-card dark:bg-gray-800">
          <div className="flex">
            <TimeGrid>
              {positionedAppointments.map((appointment) => (
                <AppointmentView
                  key={appointment.id}
                  appointment={appointment}
                  allAppointments={positionedAppointments}
                  onClick={handleClickAppointment}
                />
              ))}
            </TimeGrid>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={openAppointmentDialog}
          className="w-[160px] text-left self-end"
        >
          {' '}
          <Plus />
          {t('newAppointment')}
        </Button>

        {isAppointmentDialogOpen && (
          <NewAppointmentDialog
            open={isAppointmentDialogOpen}
            appointment={selectedAppointment}
            onOpenChange={(isOpen) => handleAppointmentDialogClose(isOpen)}
            onAppointmentCreate={handleAppointmentCreate}
            onAppointmentUpdate={handleAppointmentUpdate}
            onAppointmentDelete={handleAppointmentDelete}
          />
        )}
      </div>
      <LoadingBackdrop />
    </div>
  );
};
