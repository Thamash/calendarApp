import { Path, UseFormReturn } from 'react-hook-form';

export interface DateTimePickerProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  dateFieldName: Path<T>;
  timeFieldName: Path<T>;
  dateFieldLabel: string;
  timeFieldLabel: string;
  disabled?: (date: Date) => boolean;
}