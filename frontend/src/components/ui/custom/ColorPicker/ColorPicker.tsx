import React from 'react';
import { Paintbrush } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useCalendarStore } from '@/stores/calendar/calendar.store';
import { calendarSelectors } from '@/stores/calendar';
import { colorShades, safeColors } from '@/constants/tailwind';

export const ColorPicker: React.FC = () => {
  const { setColor } = useCalendarStore(calendarSelectors.actions);
  const color = useCalendarStore(calendarSelectors.color);

  const handleColorChange = (colorClass: string) => {
    setColor(colorClass);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative h-9 w-9">
            <Paintbrush className="w-4 h-4" />
            <div
              className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${color}`}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3" align="end">
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {Object.entries(safeColors).map(([colorName]) => (
              <div key={colorName} className="space-y-1.5">
                <div className="text-xs font-semibold capitalize">
                  {colorName}
                </div>
                <div className="flex flex-wrap gap-1">
                  {colorShades.map((shade) => {
                    const colorClass = `bg-${colorName}-${shade}`;
                    return (
                      <button
                        key={`${colorName}-${shade}`}
                        className={`w-6 h-6 rounded-md hover:ring-2 hover:ring-offset-2 hover:ring-offset-black hover:ring-white transition-all ${colorClass}`}
                        onClick={() => handleColorChange(colorClass)}
                        title={colorClass}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
