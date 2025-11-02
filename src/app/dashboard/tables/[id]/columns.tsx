"use client";

import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "@/providers/translation";

export interface UploadDataRow {
  startedAt: string;
  completedAt: string;
  recordsReceived: number;
  numberOfRecordsIngested: number;
  status: string;
}

export const useUploadDataColumns = (): GridColDef<UploadDataRow>[] => {
  const { t } = useTranslation("form");

  const columns: GridColDef<UploadDataRow>[] = [
    {
      field: "startedAt",
      headerName: t("form", "startedAt"),
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueFormatter: ({ value }) =>
        value ? new Date(value).toLocaleString() : "",
    },
    {
      field: "completedAt",
      headerName: t("form", "completedAt"),
      flex: 1,
      align: "center",
      headerAlign: "center",
      valueFormatter: ({ value }) =>
        value ? new Date(value).toLocaleString() : "",
    },
    {
      field: "recordsReceived",
      headerName: t("form", "recordsReceived"),
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numberOfRecordsIngested",
      headerName: t("form", "numberOfRecordsIngested"),
      flex: 1,
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: t("form", "status"),
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  return columns;
};
