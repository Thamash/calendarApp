import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ConfirmDialogProps } from './ConfirmDialog.types';
import i18n from '@/i18n'

export const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
  triggerText = i18n.t('Delete'),
  title = i18n.t('Are you absolutely sure?'),
  description = i18n.t('This action cannot be undone. This will permanently delete this item.'),
  confirmText = i18n.t('Delete'),
  cancelText = i18n.t('Cancel'),
}: ConfirmDialogProps) => {

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" disabled={isSubmitting}>
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
