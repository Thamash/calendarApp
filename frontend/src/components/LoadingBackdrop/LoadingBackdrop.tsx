import { Loader2 } from 'lucide-react';
import { calendarSelectors, useCalendarStore } from '@/stores/calendar';

const LoadingBackdrop = () => {
  const isLoading = useCalendarStore(calendarSelectors.loading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 bg-background/80 backdrop-blur-sm">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingBackdrop;
