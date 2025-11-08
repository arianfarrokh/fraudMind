"use client";
import React, { useMemo } from "react";
import { CircularProgress, Box, Typography, Alert, Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client/react";
import { executeScenarioQuery } from "./graphql";

interface ScenarioRunDialogProps {
  scenarioId: number;
}

const ScenarioRunDialog: React.FC<ScenarioRunDialogProps> = ({
  scenarioId,
}) => {
  // 📡 فراخوانی GraphQL
  const { data, loading, error } = useQuery(executeScenarioQuery, {
    variables: { scenarioId },
    fetchPolicy: "no-cache",
    nextFetchPolicy: "no-cache",
  });

  const serverError = data?.result?.error;

  // 📊 داده‌های برگشتی از سرور
  const columnsFromServer = data?.result?.columns || [];
  const rowsFromServer: [] = data?.result?.jsonData
    ? JSON.parse(data.result.jsonData)
    : [];

  // ⚙️ ساخت ستون‌ها بر اساس نام ستون‌ها
  const gridColumns: GridColDef[] = useMemo(
    () =>
      columnsFromServer.map<GridColDef>((col) => {
        return { field: col, headerName: col, flex: 1 };
      }),
    [columnsFromServer]
  );

  const gridRows = useMemo(() => rowsFromServer, [rowsFromServer]);

  // ⏳ حالت در حال بارگذاری
  if (loading) {
    return <CircularProgress />;
  }

  // ⚠️ حالت خطا
  if (error) {
    console.log(error);
    return <Typography>❌ خطا در دریافت داده: {error.message}</Typography>;
  }

  if (serverError) {
    return (
      <Paper sx={{ padding: 2 }}>
        <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
          ❌ اجرا سناریو با خطا مواجه شد
        </Typography>
        <Typography
          sx={{ textAlign: "center", color: "red", direction: "rtl" }}
        >
          {serverError}
        </Typography>
      </Paper>
    );
  }

  console.log(gridRows);
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        getRowId={(row) => row.id || row.ID || Math.random()}
      />
    </Box>
  );
};

export default ScenarioRunDialog;
