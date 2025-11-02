import React from "react";
import {
  Alert,
  AlertColor,
  AlertPropsColorOverrides,
  AlertTitle,
  Slide,
  Snackbar,
  SxProps,
  Theme,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { useTranslation } from "@/providers/translation";

export type SnackbarProps = {
  message?: React.ReactNode;
  type: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>;
  sx?: SxProps<Theme>;
  autoHideDuration?: number;
};

export type SnackbarMessageProps = Omit<SnackbarProps, "type">;

const BaseSnackbar: React.FC<SnackbarProps> = ({
  message,
  type,
  autoHideDuration = 6000,
  sx,
}) => {
  const { t } = useTranslation("error", "common");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(!!message);
  }, [message]);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      slots={{ transition: Slide }}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant={type === "error" ? "filled" : "standard"}
        sx={{ p: 2, minWidth: "300px", ...sx }}
      >
        <AlertTitle>
          {type === "error" ? t("error", "error") : t("common", "notification")}
        </AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BaseSnackbar;
