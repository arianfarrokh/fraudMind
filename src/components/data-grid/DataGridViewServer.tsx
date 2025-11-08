import React, { FC, useEffect, useState } from "react";
import {
  DataGrid,
  DataGridProps,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { OnPageChangedProps } from ".";
import { useThemeContext } from "@/theme/ThemeContext";
import { faIRDataGrid } from "@/locales/faIRDataGrid";

type Props = DataGridProps & {
  loading?: boolean;
  disableAggregation?: boolean;
  disableRowGrouping?: boolean;
  showQuickFilter?: boolean;
  totalCount?: number;
  gridPaginationModel?: GridPaginationModel;
  onPageChanged?: (paginationModel: OnPageChangedProps) => void;
  onSortModelChange?: (sortModel: GridSortModel) => void;
  onFilterModelChange?: (filterModel: GridFilterModel) => void;
  onControlShowTask?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DataGridViewServer: FC<Props> = ({
  loading = false,
  density = "compact",
  totalCount,
  gridPaginationModel = { page: 0, pageSize: 10 },
  onPageChanged,
  onSortModelChange,
  onFilterModelChange,
  rows,
  columns,
  ...rest
}) => {
  const { mode } = useThemeContext();
  const [paginationModelState, setPaginationModelState] =
    useState<GridPaginationModel>(gridPaginationModel);

  useEffect(() => {
    if (!onPageChanged) return;
    onPageChanged(paginationModelState);
  }, [onPageChanged, paginationModelState]);

  useEffect(() => {
    setPaginationModelState(gridPaginationModel);
  }, [gridPaginationModel]);

  return (
    <Box
      sx={{
        p: 2,
        fontFamily: "var(--font-main)",
        color: mode === "light" ? "var(--color-black)" : "var(--color-yellow)",
        bgcolor: mode === "light" ? "var(--color-white)" : "var(--color-red)",
        borderRadius: "6px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        border: `2px solid ${"var(--color-red)"}`,
        // Target DataGrid children
        "& .MuiDataGrid-columnHeaders": {
          bgcolor:
            mode === "light" ? "rgba(255,153,0,0.1)" : "rgba(57,62,66,0.8)",
          color: mode === "light" ? "var(--color-black)" : "var(--color-white)",
          fontWeight: "bold",
        },
        "& .MuiDataGrid-row": {
          bgcolor:
            mode === "light" ? "var(--color-white)" : "var(--color-charcoal)",
          transition: "background-color 0.3s ease",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${mode === "light" ? "#f0f0f0" : "#4a4f54"}`,
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: `1px solid var(--color-yellow)`,
          "& .MuiTablePagination-root, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel, & .MuiTablePagination-actions ":
            {
              color:
                mode === "light" ? "var(--color-black)" : "var(--color-white)",
            },
          "& .MuiTablePagination-select": {
            "& .MuiSelect-root": {
              color:
                mode === "light" ? "var(--color-black)" : "var(--color-yellow)",
            },
            "& .MuiSelect-icon": {
              color:
                mode === "light" ? "var(--color-black)" : "var(--color-yellow)",
            },
          },
        },
      }}
    >
      <DataGrid
        localeText={faIRDataGrid}
        loading={loading}
        density={density}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[5, 10, 25, 100]}
        rowCount={
          rest.paginationMode === "client" ? undefined : totalCount || 0
        }
        sortingMode="server"
        filterMode="server"
        paginationMode="server"
        paginationModel={paginationModelState}
        onPaginationModelChange={setPaginationModelState}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "linear-progress",
          },
        }}
        {...rest}
      />
    </Box>
  );
};

export default DataGridViewServer;
