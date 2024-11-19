import { CalendarServiceContext } from '@/lib/calendar/context';
import { useContext } from 'react';

export const useCalendarService = () => {
  const service = useContext(CalendarServiceContext);
  if (!service) {
    throw new Error('useCalendarService must be used within CalendarServiceProvider');
  }
  return service;
};