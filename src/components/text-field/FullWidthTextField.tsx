import { TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import BaseFullWidthTextField from "./BaseFullWidthTextField";

type Props = TextFieldProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
};

const FullWidthTextField: React.FC<Props> = ({
  formik,
  id,
  name = "",
  ...rest
}) => (
  <BaseFullWidthTextField
    id={id}
    name={name}
    value={formik.values[name] ?? ""}
    error={!!formik.errors[name]}
    helperText={formik.errors[name]?.toString()}
    onChange={formik.handleChange}
    {...rest}
  />
);

export default FullWidthTextField;