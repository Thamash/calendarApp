import { Path, PathValue } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MultiSelectOption, MultiSelectProps } from './MultiSelect.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const MultiSelect = <T extends Record<string, any>, K extends Path<T>, TGroupField extends string = 'groupId'>({
  form,
  name,
  label,
  options,
  groups,
  groupLabel = "Filter by group",
  groupFieldName = 'groupId' as TGroupField,
  isRequired = false,
  placeholder = "Search...",
}: MultiSelectProps<T, K, TGroupField>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const selectedValues = form.watch(name) as MultiSelectOption<TGroupField>[] || [];

  const filteredOptions = options.filter(
    (option) =>
      (!groups || !selectedGroup || option[groupFieldName] === selectedGroup) &&
      (option.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.email?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !selectedValues.some((selected) => selected.id === option.id)
  );

  const handleSelect = (option: MultiSelectOption<TGroupField>) => {
    const currentValues = (form.getValues(name) || []) as MultiSelectOption<TGroupField>[];
    form.setValue(name, [...currentValues, option] as PathValue<T, K>, {
      shouldValidate: true,
    });
  };

  const handleRemove = (optionId: number | string) => {
    const currentValues = (form.getValues(name) || []) as MultiSelectOption<TGroupField>[];
    form.setValue(
      name,
      currentValues.filter((value) => value.id !== optionId) as PathValue<T, K>,
      { shouldValidate: true }
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {isRequired && selectedValues.length === 0 && (
              <span className="ml-1 text-sm text-destructive">*</span>
            )}
          </FormLabel>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {field.value?.map((value: MultiSelectOption<TGroupField>) => (
                <div
                  key={value.id}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary"
                >
                  <span className="text-sm">{value.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(value.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {groups && groups.length > 0 && (
              <Select
                value={selectedGroup?.toString() || ""}
                onValueChange={(value) =>
                  setSelectedGroup(value ? Number(value) : null)
                }
              >
                <SelectTrigger className="mb-2">
                  <SelectValue placeholder={groupLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">All {groupLabel}</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id.toString()}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder={placeholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[--trigger-width] p-0" align="start">
                <div className="max-h-[200px] overflow-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-accent",
                          "text-sm"
                        )}
                        onClick={() => handleSelect(option)}
                      >
                        <span>{option.name}</span>
                        {option.email && (
                          <span className="text-muted-foreground">
                            {option.email}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}