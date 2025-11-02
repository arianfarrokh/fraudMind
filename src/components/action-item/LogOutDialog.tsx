import { useTranslation } from "@/providers/translation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import React from 'react'

type Props = {
  open: boolean
  handleLogoutConfirm: () => void
  onCancel: () => void
  title?: string
  message?: string
}
const LogOutDialog = ({ open, onCancel, handleLogoutConfirm }: Props) => {
  const { t } = useTranslation('common')

  return (
    <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{t("common", "logout")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("common", "are-you-sure-logout")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>{t("common", "cancel")}</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            {t("common", "logout")}
          </Button>
        </DialogActions>  
    </Dialog>
  )
}

export default LogOutDialog