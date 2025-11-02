import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useTranslation } from "@/providers/translation";

type Props = TextFieldProps & {};

const BaseFullWithTextField: React.FC<Props> = ({ id, ...rest }) => {
  const { t } = useTranslation("form");

  return (
    <TextField
      fullWidth
      margin="dense"
      size="small"
      type="text"
      autoComplete="off"
      id={id}
      //@ts-expect-error - ignore translation key type check`
      label={t("form", id ?? "")}
      {...rest}
      // variant="standard"
    />
  );
};

export default BaseFullWithTextField;
