export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  isSubmitting?: boolean;
  triggerText?: string;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}