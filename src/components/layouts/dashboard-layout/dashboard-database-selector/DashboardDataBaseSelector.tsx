"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  CardContent,
  Stack,
  IconButton,
  TextField,
  Autocomplete,
  Box,
  CircularProgress,
} from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
//!Please don't delete these comments
// import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import {
  addNewSchemaMutation,
  //!Please don't delete these comments
  // updateSchemaMutation,
  deleteSchemaMutation,
  allSchemasNoPagedQuery,
} from "@/components/layouts/dashboard-layout/dashboard-database-selector/graphql";
import { useDialog } from "@/providers/dialog-provider/DialogProvider";
import { useMutation, useQuery } from "@apollo/client/react";
import DashboardDataBaseSelectorForm from "./DashboardDataBaseSelectorForm";
import { useTranslation } from "@/providers/translation";
import { formatString } from "@/utils";
import { useDispatch } from "react-redux";
import { setSchemaId } from "@/store/schema-slicet";
import { useAlert } from "@/providers/alert-provider/AlertProvider";

const initialValues: SchemaType = {
  // مقادیر اولیه برای فرم افزودن دیتابیس جدید
  id: 0,
  name: "",
  description: "",
};

export default function DashboardDataBaseSelector() {
  // استفاده از Dialog Provider برای باز و بسته کردن دیالوگ‌ها
  const { show: showDialog, hide: hideDialog } = useDialog();
  // استفاده از Alert Provider برای نمایش پیام‌های موفقیت یا خطا
  const { show } = useAlert();
  // hook ترجمه چندزبانه
  const { t } = useTranslation("common", "form");
  // dispatch برای ارسال اکشن به redux
  const dispatch = useDispatch();

  // گرفتن لیست همه schemaها از سرور (بدون pagination)
  const {
    data: schemasData,
    loading,
    error,
  } = useQuery(allSchemasNoPagedQuery);

  // تبدیل داده‌ها به آرایه‌ای از گزینه‌ها برای autocomplete
  const databaseOptions = [...(schemasData?.result ?? [])];

  // نگهداری state مربوط به دیتابیس انتخاب‌شده
  const [selectedDB, setSelectedDB] = useState<{
    id: number;
    name: string;
  } | null>(null);

  /**
   * این تابع برای مدیریت و نمایش پیام‌های موفقیت یا خطا بعد از اجرای mutation ها استفاده میشه.
   * بسته به وضعیت (در حال لود، موفق، خطا) پیام مناسب رو نشون میده.
   */
  const useMutationAlert = ({
    loading,
    data,
    error,
    successMessage,
    errorMessage,
    show,
  }: UseMutationAlertProps) => {
    useEffect(() => {
      if (loading) return; // وقتی در حال لود هست، کاری انجام نده

      if (data) {
        const response = data?.response;

        // اگر پاسخ شامل خطا بود، پیام خطا نمایش بده
        if (response?.errors?.length) {
          show({
            message: response.errors[0]?.message,
            type: "error",
            autoHideDuration: 3000,
          });
        } else {
          // در غیر اینصورت پیام موفقیت نمایش بده
          show({
            message: successMessage,
            type: "success",
            autoHideDuration: 2000,
          });
        }
      }
      setSelectedDB(null); // پس از اتمام عملیات، انتخاب رو خالی کن

      if (error) {
        // در صورت وجود خطا، پیام خطا نمایش داده می‌شود
        show({
          message: errorMessage || "عملیات با خطا مواجه شد",
          type: "error",
          autoHideDuration: 2000,
        });
      }
    }, [loading, data, error, successMessage, errorMessage, show]);
  };

  // 📌 Mutation برای افزودن schema جدید
  const [
    addNewRecord,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(addNewSchemaMutation, {
    refetchQueries: [
      {
        query: allSchemasNoPagedQuery, // بعد از افزودن، لیست دوباره از سرور گرفته میشه
      },
    ],
    awaitRefetchQueries: true,
    fetchPolicy: "no-cache",
  });

  // مدیریت پیام‌های افزودن (موفقیت/خطا)
  useMutationAlert({
    data: addData,
    loading: addLoading,
    error: addError,
    successMessage: formatString(
      t("common", "add-successfully"),
      t("form", "database")
    ),
    errorMessage: formatString(
      t("error", "failed-to-add"),
      t("form", "database")
    ),
    show,
  });

  // 📌 Mutation برای حذف schema
  const [
    deleteSchema,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useMutation(deleteSchemaMutation, {
    refetchQueries: [
      {
        query: allSchemasNoPagedQuery, // بعد از حذف، لیست دوباره به‌روزرسانی می‌شود
      },
    ],
    awaitRefetchQueries: true,
  });

  // مدیریت پیام‌های حذف (موفقیت/خطا)
  useMutationAlert({
    loading: deleteLoading,
    data: deleteData,
    error: deleteError,
    successMessage: formatString(
      t("common", "delete-successfully"),
      t("form", "database")
    ),
    errorMessage: formatString(
      t("error", "delete-content-error"),
      t("form", "database")
    ),
    show,
  });

  // تابعی برای افزودن دیتابیس جدید (در دیالوگ ثبت فرم)
  const handleAddNewDatabase = (data: SchemaType) => {
    addNewRecord({
      variables: {
        input: {
          id: 0,
          name: data.name,
          description: data.description,
        },
      },
    });
    hideDialog(); // بستن دیالوگ بعد از ثبت
  };

  // تابعی برای باز کردن دیالوگ افزودن دیتابیس جدید
  const handleAdd = () => {
    showDialog(
      `${formatString(t("common", "add-new"), t("form", "database"))}`,
      <DashboardDataBaseSelectorForm
        data={initialValues}
        onSave={handleAddNewDatabase}
        onCancel={hideDialog}
      />,
      { maxWidth: "xs" }
    );
  };

  // تابعی برای حذف دیتابیس انتخاب‌شده
  const handleDelete = () => {
    if (!selectedDB) return;

    showDialog(
      `${formatString(t("common", "delete"), t("form", "database"))}`,
      `${formatString(t("common", "are-you-sure-delet"), selectedDB?.name)}`,
      {
        maxWidth: "xs",
        confirmText: t("form", "delete"),
        cancelText: t("form", "close"),
        onConfirm: () => {
          deleteSchema({ variables: { input: { id: Number(selectedDB.id) } } });
          hideDialog();
        },
        onCancel: hideDialog,
      }
    );
  };

  // هر بار که دیتابیس انتخابی تغییر کند، آن را در redux ذخیره می‌کند
  useEffect(() => {
    if (selectedDB) {
      dispatch(setSchemaId(selectedDB.id));
    }
  }, [selectedDB]);

  // اگر در حال افزودن یا حذف هستیم، اسپینر لودینگ نمایش داده شود
  if (addLoading || deleteLoading) {
    return (
      <Box
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // بخش رابط کاربری اصلی
  return (
    <Grid container>
      <Grid>
        <Paper
          sx={{
            my: 2,
            mx: 2,
            // width: { xs: 450, sm: 580 },
            borderRadius: 1,
            transition: "all 0.3s ease",
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* فیلد انتخاب دیتابیس از لیست */}
              <Autocomplete
                options={databaseOptions}
                getOptionLabel={(option) => option.name}
                value={selectedDB}
                onChange={(_, newValue) => {
                  setSelectedDB(newValue);
                }}
                disableClearable={!!selectedDB}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("form", "database")}
                    variant="outlined"
                    sx={{ width: { md: 400, xs: 150 } }}
                  />
                )}
              />

              {/* دکمه‌های عملیات (افزودن / حذف) */}
              <Stack direction="row" spacing={0.5}>
                {/* دکمه افزودن دیتابیس جدید */}
                <IconButton
                  sx={{
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.2)" },
                  }}
                  color="success"
                  onClick={handleAdd}
                >
                  <AddCircleSharpIcon sx={{ fontSize: 30 }} />
                </IconButton>

                {/* دکمه حذف دیتابیس انتخاب‌شده */}
                <IconButton
                  sx={{
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.2)" },
                  }}
                  color="error"
                  onClick={handleDelete}
                  disabled={loading || !selectedDB}
                >
                  <DeleteSharpIcon sx={{ fontSize: 30 }} />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  );
}
