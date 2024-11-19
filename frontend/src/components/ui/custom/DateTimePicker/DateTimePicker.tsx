import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { DATE_FORMAT } from '@/constants/config';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateTimePickerProps } from './DateTimePicker.types';

export const DateTimePicker = <T extends Record<string, any>>({
  form,
  dateFieldName,
  timeFieldName,
  disabled,
  dateFieldLabel,
  timeFieldLabel,
}: DateTimePickerProps<T>) => {
  const timeFieldId = `${timeFieldName}InputId`;

  return (
    <>
      <FormField
        control={form.control}
        name={dateFieldName}
        render={({ field }) => {
          const [isOpen, setIsOpen] = useState(false);

          return (
            <FormItem className="flex flex-col">
              <FormLabel>{dateFieldLabel}</FormLabel>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, DATE_FORMAT)
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsOpen(false);
                    }}
                    disabled={disabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name={timeFieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{timeFieldLabel}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="time"
                  step="900"
                  {...field}
                  className="pr-8 [&::-webkit-calendar-picker-indicator]:hidden"
                  id={timeFieldId}
                />{' '}
                <ClockIcon
                  className="absolute w-4 h-4 -translate-y-1/2 right-3 top-1/2 text-muted-foreground"
                  onClick={() => {
                    const input = document.getElementById(
                      timeFieldId
                    ) as HTMLInputElement;
                    if (input) {
                      input.showPicker();
                    }
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default DateTimePicker;
