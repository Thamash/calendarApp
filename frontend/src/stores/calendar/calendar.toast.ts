import { toast } from "@/hooks/use-toast"
import { StoreErrorToastProps, StoreInfoToastProps } from './calendar.types'
import i18n from '@/i18n'

export const errorToast = ({ title }: StoreErrorToastProps) => {
  toast({
    title,
    description: i18n.t("Please try again"),
    variant: "destructive",
  })
}

export const infoToast = ({ title, description }: StoreInfoToastProps) => {
  toast({
    title,
    description
  })
}