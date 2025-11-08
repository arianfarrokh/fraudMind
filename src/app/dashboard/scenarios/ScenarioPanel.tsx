import { FullWidthTextField } from "@/components";
import { useTranslation } from "@/providers/translation";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Grid, Tab, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

type Props = {
  scenario: ScenarioType;
  onSave: (data: ScenarioType) => void;
};

const initialScenarioValue: ScenarioType = {
  id: 0,
  name: "",
  description: "",
  sqlText: "",
  fraudMindSchemaId: 0,
};

const ScenarioPanel: React.FC<Props> = ({ scenario, onSave }) => {
  const { t } = useTranslation("error");

  const [tabValue, setTabValue] = useState("1");
  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("error", "required-field"))
      .matches(
        /^[A-Za-z0-9_@.#$%!&*()]+$/,
        t("error", "english-only-not-space")
      ),
  });

  const formik = useFormik<ScenarioType>({
    initialValues: initialScenarioValue,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const handleTabValueChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    formik.setValues(scenario);
  }, [scenario]);

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <FullWidthTextField
            formik={formik}
            name="name"
            label="عنوان سناریو"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FullWidthTextField
            formik={formik}
            name="description"
            label="توضیحات"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TabContext value={tabValue}>
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <TabList
                onChange={handleTabValueChange}
                aria-label="scenario tabs"
                variant="scrollable"
              >
                <Tab label="SQL Query" value="1" />
                <Tab label="پیکربندی" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <FullWidthTextField
                formik={formik}
                id="sql-text"
                name="sqlText"
                multiline
                minRows={3}
                maxRows={6}
                dir="ltr"
              />

              {formik.touched.sqlText && formik.errors.sqlText && (
                <Typography color="error" variant="caption">
                  {formik.errors.sqlText}
                </Typography>
              )}
            </TabPanel>

            <TabPanel value="2">
              <Typography variant="body2" color="gray">
                بخش پیکربندی سناریو در آینده تکمیل می‌شود.
              </Typography>
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>

      <Button
        type="submit"
        sx={{ marginTop: 2 }}
        variant="contained"
        color="primary"
        disabled={!formik.isValid}
      >
        {t("common", "save")}
      </Button>
    </Box>
  );
};

export default ScenarioPanel;
