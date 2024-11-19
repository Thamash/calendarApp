import '@/App.css';
import { Calendar } from '@/components/Calendar/Calendar';
import { CalendarServiceProvider } from '@/lib/calendar/context';
import { I18nextProvider } from 'react-i18next';
import RootLayout from './layout';
import i18n from './i18n';
import { useCalendarStore } from './stores/calendar/calendar.store';
import { calendarSelectors } from './stores/calendar';
import { useEffect } from 'react';

function App() {
  const { initializeLanguage } = useCalendarStore(calendarSelectors.actions);

  useEffect(() => {
    initializeLanguage();
  }, [])

  return (
    <RootLayout>
      <I18nextProvider i18n={i18n}>
        <CalendarServiceProvider>
          <Calendar />
        </CalendarServiceProvider>
      </I18nextProvider>
    </RootLayout>
  );
}

export default App;
