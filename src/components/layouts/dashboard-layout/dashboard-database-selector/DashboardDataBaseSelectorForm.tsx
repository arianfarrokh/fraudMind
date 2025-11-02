import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Box, Button, Stack } from "@mui/material";
import FullWidthTextField from "@/components/text-field/FullWidthTextField";
import { useTranslation } from "@/providers/translation";

type Props = {
  data: SchemaType;
  onCancel: () => void;
  onSave: (data: SchemaType) => void;
};

const initialValues: SchemaType = {
  id: 0,
  name: "",
  description: "",
};

const DashboardDataBaseSelectorForm: React.FC<Props> = ({
  data,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation("error");
  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("error", "required-field"))
      .test("english-only", t("error", "english-only"), function (value) {
        if (!value) return true;

        const regex = /^[A-Za-z0-9]+$/;
        if (!regex.test(value)) {
          return this.createError({
            message: t("error", "english-only-not-space"),
          });
        }

        return true;
      }),
  });

  const formik = useFormik<SchemaType>({
    initialValues,
    validationSchema,
    onSubmit: (value) => {
      onSave(value);
    },
  });

  useEffect(() => {
    formik.setValues(data);
  }, [data]);

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <FullWidthTextField formik={formik} id="name" name="name" />
      <FullWidthTextField formik={formik} id="description" name="description" />

      <Stack spacing={2} direction={"row"} justifyContent={"flex-end"} mt={2}>
        <Button variant="contained" color="error" onClick={onCancel}>
          {t("form", "close")}
        </Button>

        <Button variant="contained" color="success" type="submit">
          {t("form", "save")}
        </Button>
      </Stack>
    </Box>
  );
};

export default DashboardDataBaseSelectorForm;
