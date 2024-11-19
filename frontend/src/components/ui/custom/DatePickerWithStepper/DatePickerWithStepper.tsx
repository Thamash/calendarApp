import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as SCalendar } from '@/components/ui/calendar';
import { addDays, format, subDays } from 'date-fns';
import { DATE_FORMAT } from '@/constants/config';
import { calendarSelectors, useCalendarStore } from '@/stores/calendar';
import { useState } from 'react';

export const DatePickerWithStepper = () => {
  const { setDate } = useCalendarStore(calendarSelectors.actions)
  const { date } = useCalendarStore(calendarSelectors.state)

  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (newDate?: Date) => {
    if (newDate) {
      setDate(newDate);
    }
    setIsOpen(false);
  }

  return (<div>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setDate(subDays(date, 1))}
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-start text-left font-normal"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span className="m-auto">{format(date, DATE_FORMAT)}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <SCalendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
          className="border rounded-md dark:border-gray-700"
        />
      </PopoverContent>
    </Popover>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setDate(addDays(date, 1))}
    >
      <ChevronRight className="w-4 h-4" />
    </Button>
  </div>);
};
