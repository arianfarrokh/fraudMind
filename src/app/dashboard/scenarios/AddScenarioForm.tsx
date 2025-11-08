import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Box, Button, Stack } from "@mui/material";
import FullWidthTextField from "@/components/text-field/FullWidthTextField";
import { useTranslation } from "@/providers/translation";

type Props = {
  data: ScenarioType;
  onCancel: () => void;
  onSave: (data: ScenarioType) => void;
};

const initialValues: ScenarioType = {
  id: 0,
  name: "",
  description: "",
  sqlText: "",
  fraudMindSchemaId: 0,
};

const AddScenarioForm: React.FC<Props> = ({ data, onCancel, onSave }) => {
  const { t } = useTranslation("error");
  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("error", "required-field"))
      .test("english-only", t("error", "english-only"), function (value) {
        if (!value) return true;

        const regex = /^[A-Za-z0-9_@.#$%!&*()]+$/;

        if (!regex.test(value)) {
          return this.createError({
            message: t("error", "english-only-not-space"),
          });
        }

        return true;
      }),
  });

  const formik = useFormik<ScenarioType>({
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
      <FullWidthTextField formik={formik} id="name" name="name" autoFocus />
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

export default AddScenarioForm;
