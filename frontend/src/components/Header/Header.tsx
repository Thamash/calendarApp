import { ColorPicker } from '@/components/ui/custom/ColorPicker/ColorPicker';
import { ThemeToggle } from '@/components/ui/custom/ThemeToggle/ThemeToggle';
import { DatePickerWithStepper } from '@/components/ui/custom/DatePickerWithStepper/DatePickerWithStepper';
import LanguageSelector from '../ui/custom/LanguageSelector/LanguageSelector';

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 p-4 mb-4 rounded-lg shadow-sm md:flex-row bg-card dark:bg-gray-800">
      <DatePickerWithStepper />
      <div className="flex gap-2">
        <LanguageSelector />
        <ColorPicker />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
