import { PropsWithChildren, useMemo } from 'react';

export const TimeGrid: React.FC<PropsWithChildren> = ({ children }) => {
  const timeSlots = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        return `${i.toString().padStart(2, '0')}:00`;
      }),
    []
  );

  return (
    <>
      <div className="w-20 border-r dark:border-gray-700">
        {timeSlots.map((time) => (
          <div
            key={time}
            className="h-[30px] border-b text-xs px-2 py-1 dark:border-gray-700 dark:text-gray-400"
          >
            {time}
          </div>
        ))}
      </div>
      <div className="relative flex-1">
        {timeSlots.map((time) => (
          <div key={time} className="h-[30px] border-b dark:border-gray-700" />
        ))}
        {children}
      </div>
    </>
  );
};
