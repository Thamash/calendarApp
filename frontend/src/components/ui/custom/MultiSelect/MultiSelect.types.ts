import { Path, UseFormReturn } from 'react-hook-form';

export interface Group {
  id: number;
  name: string;
}

export interface MultiSelectOptionBase {
  id: number;
  name: string;
  email: string;
}

export type MultiSelectOption<TGroupField extends string> =
  MultiSelectOptionBase & {
    [K in TGroupField]?: number;
  };

export interface MultiSelectProps<
  T extends Record<string, any>,
  K extends Path<T>,
  TGroupField extends string = 'groupId'
> {
  form: UseFormReturn<T>;
  name: K;
  label: string;
  options: MultiSelectOption<TGroupField>[];
  groups?: Group[];
  groupLabel?: string;
  groupFieldName?: TGroupField;
  isRequired?: boolean;
  placeholder?: string;
}
