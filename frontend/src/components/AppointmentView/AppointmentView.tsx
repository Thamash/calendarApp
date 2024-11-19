import { useCalendarService } from '@/hooks/userCalendarService';
import { AppointmentViewProps } from './AppointmentView.type';
import { calendarSelectors, useCalendarStore } from '@/stores/calendar';
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATE_TIME_FORMAT } from '@/constants/config';

export const AppointmentView: React.FC<AppointmentViewProps> = ({
  appointment,
  allAppointments,
  onClick,
}) => {
  const calendarService = useCalendarService();
  const color = useCalendarStore(calendarSelectors.color);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div
            className={`absolute p-2 rounded ${color} text-white text-sm cursor-pointer hover:opacity-90 overflow-hidden`}
            style={calendarService.getAppointmentStyle(appointment, allAppointments)}
            onClick={() => onClick?.(appointment)}
            id={`appointment-${appointment.id}`}
          >
            {appointment.title}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs rounded">
          <div className="space-y-1">
            <p className="font-semibold">{appointment.title}</p>
            <p className="text-xs text-gray-600">
              {format(appointment.start, DATE_TIME_FORMAT)} - {format(appointment.end, DATE_TIME_FORMAT)}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
