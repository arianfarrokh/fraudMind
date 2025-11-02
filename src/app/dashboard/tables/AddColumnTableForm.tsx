import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Stack,
} from "@mui/material";
import FullWidthTextField from "@/components/text-field/FullWidthTextField";
import { useTranslation } from "@/providers/translation";
import { Checkbox } from "@mui/material";
import { columnTypeMap } from "@/utils/enums-map";
import { formatString } from "@/utils";

type Props = {
  data: FraudMindColumnType;
  onCancel: () => void;
  onSave: (data: FraudMindColumnType) => void;
};

const initialValues: FraudMindColumnType = {
  id: 0,
  tableId: 0,
  name: "",
  title: "",
  columnType: "BIG_INT",
  description: "",
  isNullable: false,
  isUnique: false,
};

const AddColumnTableForm: React.FC<Props> = ({ data, onCancel, onSave }) => {
  const { t } = useTranslation("error");

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("error", "required-field"))
      .matches(/^[A-Za-z]+$/, t("error", "english-only-not-space")),
    title: yup.string().required(t("error", "required-field")),
    columnType: yup
      .mixed<ColumnType>()
      .oneOf(["BIG_INT", "DATE_TIME", "INT", "STRING"])
      .required(),
  });

  const formik = useFormik<FraudMindColumnType>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  useEffect(() => {
    if (data) formik.setValues(data);
  }, [data]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FullWidthTextField
        formik={formik}
        id="name"
        name="name"
        // label="نام ستون"
        label={formatString(t("common", "name"), t("form", "column"))}
      />
      <FullWidthTextField
        formik={formik}
        id="title"
        name="title"
        label={t("form", "title")}
      />
      <FullWidthTextField
        formik={formik}
        id="description"
        name="description"
        label={t("form", "description")}
      />

      <Autocomplete
        options={columnTypeMap.keys().toArray()}
        size="small"
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option: ColumnType) => columnTypeMap.get(option) ?? ""}
        value={formik.values.columnType || null}
        onChange={(e, value: ColumnType | null) =>
          formik.setFieldValue("columnType", value)
        }
        renderInput={(params) => (
          <FullWidthTextField
            {...params}
            formik={formik}
            id="columnType"
            name="columnType"
            label={formatString(t("common", "kind"), t("form", "column"))}
          />
        )}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.isNullable}
            onChange={(e) =>
              formik.setFieldValue("isNullable", e.target.checked)
            }
          />
        }
        label="nullable"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.isUnique}
            onChange={(e) => formik.setFieldValue("isUnique", e.target.checked)}
          />
        }
        label="Unique"
      />

      <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
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

export default AddColumnTableForm;
