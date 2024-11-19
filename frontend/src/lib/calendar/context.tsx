import { createContext } from 'react';
import { CalendarService } from '../services/CalendarService';
import { CalendarContainer } from './container';

export const CalendarServiceContext = createContext<CalendarService | null>(null);

export const CalendarServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const calendarService = CalendarContainer.getInstance().getCalendarService();

  return (
    <CalendarServiceContext.Provider value={calendarService}>
      {children}
    </CalendarServiceContext.Provider>
  );
};