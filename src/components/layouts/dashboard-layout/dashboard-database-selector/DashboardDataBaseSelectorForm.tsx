import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Box, Button, Stack } from "@mui/material";
import FullWidthTextField from "@/components/text-field/FullWidthTextField";
import { useTranslation } from "@/providers/translation";

type Props = {
  // * ؟ نوع داده‌ای که فرم می‌گیره
  data: SchemaType;
  // * ؟ تابعی که هنگام لغو فرم اجرا می‌شه
  onCancel: () => void;
  // * ؟ تابعی که هنگام ذخیره فرم اجرا می‌شه و داده فرم رو برمی‌گردونه
  onSave: (data: SchemaType) => void;
};

// ! ? ؟ مقدار اولیه برای فرم
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
  // * ؟ استفاده از hook ترجمه برای چندزبانه بودن متن‌ها
  const { t } = useTranslation("error");

  // * ؟ تعریف شِمای اعتبارسنجی با yup
  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t("error", "required-field"))
      .test("english-only", t("error", "english-only"), function (value) {
        if (!value) return true;

        // * ؟ فقط حروف انگلیسی، عدد و برخی کاراکترهای خاص مجاز هستند
        const regex = /^[A-Za-z0-9_@.#$%!&*()]+$/;

        if (!regex.test(value)) {
          return this.createError({
            message: t("error", "english-only-not-space"),
          });
        }

        return true;
      }),
  });

  // * ؟ مقداردهی formik برای مدیریت فرم
  const formik = useFormik<SchemaType>({
    initialValues, // * ؟ مقدار اولیه
    validationSchema, // * ؟ قوانین اعتبارسنجی
    onSubmit: (value) => {
      // * ؟ هنگام ارسال فرم، تابع onSave اجرا می‌شود
      onSave(value);
    },
  });

  // * ؟ هر زمان که مقدار props.data تغییر کند، مقدار فرم را به‌روزرسانی کن
  useEffect(() => {
    formik.setValues(data);
  }, [data]);

  return (
    // * ؟ فرم اصلی با کامپوننت Box از MUI
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      {/* فیلد نام */}
      <FullWidthTextField formik={formik} id="name" name="name" />
      {/* فیلد توضیحات */}
      <FullWidthTextField formik={formik} id="description" name="description" />

      {/* دکمه‌ها در انتهای فرم */}
      <Stack spacing={2} direction={"row"} justifyContent={"flex-end"} mt={2}>
        {/* دکمه بستن یا لغو */}
        <Button variant="contained" color="error" onClick={onCancel}>
          {t("form", "close")}
        </Button>

        {/* دکمه ذخیره؛ فقط زمانی فعال است که فرم معتبر باشد */}
        <Button
          disabled={!formik.isValid}
          variant="contained"
          color="success"
          type="submit"
        >
          {t("form", "save")}
        </Button>
      </Stack>
    </Box>
  );
};

export default DashboardDataBaseSelectorForm;
