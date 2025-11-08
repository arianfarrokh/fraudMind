"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Collapse,
  Tooltip,
  Divider,
  CircularProgress,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DataGridViewServer from "@/components/data-grid/DataGridViewServer";
import { DeleteActionItem } from "@/components";
import { useFieldColumns } from "./columns";
import { useTranslation } from "@/providers/translation";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  addNewColumnMutation,
  addNewTableMutation,
  allTablesQuery,
  deleteColumnMutation,
  deleteTableMutation,
} from "./graphql";
import { useDialog } from "@/providers/dialog-provider/DialogProvider";
import { formatString } from "@/utils";
import AddTableForm from "./AddTableForm";
import AddColumnTableForm from "./AddColumnTableForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Link from "next/link";
import { useAlert } from "@/providers/alert-provider/AlertProvider";
import CustomPaginate from "@/components/pagination/CustomPaginate";
import { BsDatabaseCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import { useThemeContext } from "@/theme/ThemeContext";
import SelectSchema from "@/components/SelectSchema";

const initialTableValues: FraudMindTableType = {
  id: 0,
  name: "",
  fraudMindColumns: [],
};
const initialColumnTableValues: FraudMindColumnType = {
  id: 0,
  name: "",
  title: "",
  columnType: "BIG_INT",
  tableId: 0,
  isNullable: false,
  description: "",
  isUnique: false,
  columnIndex: 0,
};

// ---------- main component ----------
const TablesPage = () => {
  const [page, setPage] = React.useState(1); // current page number (1-based)
  const [pageSize, setPageSize] = React.useState(5); // rows per page

  const [expandedTableId, setExpandedTableId] = useState<number | null>(null);
  const { show, hide } = useDialog();
  const { show: showAlert } = useAlert();
  const { t } = useTranslation("common", "form");

  const { schemaId } = useSelector((store: RootState) => store.fraudMindSchema);

  const { mode } = useThemeContext();

  const {
    data,
    loading: queryLoading,
    error: queryError,
    refetch,
  } = useQuery(allTablesQuery, {
    variables: {
      first: pageSize,
      // after: currentAfter,
      where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
    },
    //!hanle error
  });

  const totalCount = data?.result.totalCount ?? 0;
  let pageCount = Math.ceil(totalCount / pageSize);

  // add new table mutation
  const [addNewTable] = useMutation(addNewTableMutation, {
    // update: (...) => { ... }  کامنت کن
    refetchQueries: [
      {
        query: allTablesQuery,
        variables: {
          where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
    onError: (error) => {
      showAlert({
        type: "error",
        message:
          error.message ||
          formatString(t("error", "failed-to-load"), t("form", "tables")),
        autoHideDuration: 3000,
      });
    },
  });
  // add new column mutation
  const [addNewColumn] = useMutation(addNewColumnMutation, {
    // update: (...) => { ... }  کامنت کن
    refetchQueries: [
      {
        query: allTablesQuery,
        variables: {
          where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
      showAlert({
        type: "success",
        message: formatString(
          t("common", "add-successfully"),
          t("form", "column")
        ),
        autoHideDuration: 3000,
      });
    },
    onError: (error) => {
      showAlert({
        type: "error",
        message:
          error.message ||
          formatString(t("error", "failed-to-add"), t("form", "column")),
        autoHideDuration: 3000,
      });
    },
  });

  const [deleteRecord] = useMutation(deleteTableMutation, {
    onCompleted: () => {
      hide();
      showAlert({
        type: "success",
        message: formatString(
          t("common", "delete-successfully"),
          t("form", "table")
        ),
        autoHideDuration: 3000,
      });
      // دستی refetch با variables کامل
      refetch({
        first: pageSize,
        where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
      });
    },
    onError: (error) => {
      showAlert({
        type: "error",
        message:
          error.message ||
          formatString(t("error", "failed-to-delete"), t("form", "table")),
        autoHideDuration: 3000,
      });
    },
  });

  const [
    deleteColumn,
    {
      data: deleteColumnData,
      error: deleteErrorColumn,
      loading: deleteLoadingColumn,
    },
  ] = useMutation(deleteColumnMutation, {
    refetchQueries: [
      {
        query: allTablesQuery,
        variables: {
          where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
      showAlert({
        type: "success",
        message: formatString(
          t("common", "delete-successfully"),
          t("form", "column")
        ),
        autoHideDuration: 3000,
      });
    },
    onError: (error) => {
      showAlert({
        type: "error",
        message:
          error.message ||
          formatString(t("error", "failed-to-delete"), t("form", "column")),
        autoHideDuration: 3000,
      });
    },
  });

  const handleDeleteColumn = (id: ID) => {
    show(
      formatString(t("common", "deletee"), t("form", "column")),
      formatString(t("form", "delete-content-dialog"), t("form", "column")),
      {
        maxWidth: "xs",
        confirmText: t("common", "delete"),
        cancelText: t("common", "cancel"),
        titleTextAlign: "center",
        onConfirm: () => {
          deleteColumn({
            variables: {
              input: {
                id: id as ID,
              },
            },
          });
          hide();
        },
        onCancel: hide,
      }
    );
  };

  const fieldColumns = useFieldColumns(handleDeleteColumn);

  const handleAddNewTable = (data: FraudMindTableType) => {
    addNewTable({
      variables: {
        input: {
          id: 0,
          fraudMindSchemaId: schemaId,
          name: data.name,
          description: data.description,
          columns: [],
        },
      },
    });

    // refetch();
    // loadData();
    // hide();
  };

  const handleAddTable = () => {
    show(
      `${formatString(t("common", "add-new"), t("form", "database"))}`,
      <AddTableForm
        data={initialTableValues}
        onSave={handleAddNewTable}
        onCancel={hide}
      />,
      { maxWidth: "xs" }
    );
  };

  // field

  const handleAddNewColumnTable = (data: FraudMindColumnType) => {
    addNewColumn({
      variables: {
        input: {
          id: 0, // معمولاً 0 یا null برای create
          name: data.name,
          title: data.title,
          description: data.description || "",
          columnType: data.columnType,
          columnIndex: data.columnIndex,
          fraudMindTableId: data.tableId,
          isNullable: data.isNullable,
          isUnique: data.isUnique,
        },
      },
    });
    // console.log(data);
    // loadData();
    hide();
  };

  const handleAddColumnTable = (table: FraudMindTableType) => {
    const columnIndex = table.fraudMindColumns.length;
    show(
      `${formatString(t("common", "add-new"), t("form", "database"))}`,
      <AddColumnTableForm
        data={{ ...initialColumnTableValues, tableId: table.id, columnIndex }}
        onSave={handleAddNewColumnTable}
        onCancel={hide}
      />,
      { maxWidth: "xs" }
    );
  };

  const handleDeleteTable = (tableId: ID) => {
    show(
      // "حذف جدول",
      formatString(t("common", "delete"), t("form", "table")),
      formatString(t("form", "delete-content-dialog"), t("form", "table")),
      {
        maxWidth: "xs",
        confirmText: t("common", "delete"),
        cancelText: t("common", "cancel"),
        titleTextAlign: "center",
        onConfirm: () => {
          deleteRecord({
            variables: {
              input: {
                id: tableId as ID,
              },
            },
          });
          hide();
        },
        onCancel: hide,
      }
    );
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    pageNumber: number
  ) => {
    setPage(pageNumber);

    console.log(pageNumber);
    const startCursor = btoa((pageSize * (pageNumber - 1) - 1).toString());

    console.log(startCursor);

    refetch({
      after: startCursor,
      first: pageSize,
    });
  };

  useEffect(() => {
    setPage(1);
    refetch({
      after: null,
      first: pageSize,
    });
  }, [schemaId]);

  // if (queryLoading) {
  //   return (
  //     <Box
  //       p={4}
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="60vh"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  // حالت خطای کوئری
  if (queryError) {
    showAlert({
      type: "error",
      message: queryError.message,
      autoHideDuration: 3000,
    });
  }

  if (!schemaId) {
    return <SelectSchema />;
  }

  return (
    <Box p={4} dir="rtl">
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          {t("form", "tables")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTable}
          disabled={!schemaId}
          sx={{ background: "var(--color-sideblue)" }}
        >
          {formatString(t("common", "add-new"), t("form", "table"))}
        </Button>
      </Stack>

      {/* Tables */}
      {queryLoading && (
        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor={"rgba(0,0,0, .5)"}
        >
          <CircularProgress />
        </Box>
      )}
      <Stack spacing={2}>
        {data?.result.nodes?.map((table) => (
          <Card
            key={table.id}
            sx={{
              borderRadius: 3,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack
                  onClick={() =>
                    setExpandedTableId(
                      expandedTableId === table.id ? null : table.id
                    )
                  }
                  sx={{
                    cursor: "pointer",
                    flex: 1,
                    transition: "background-color 0.2s ease",
                  }}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <IconButton
                    onClick={() =>
                      setExpandedTableId(
                        expandedTableId === table.id ? null : table.id
                      )
                    }
                  >
                    {expandedTableId === table.id ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                  <Stack>
                    <Typography variant="h6" fontSize={"1.1rem"}>
                      {table.name}
                    </Typography>
                    <Typography
                      fontSize={".7rem"}
                      color="textDisabled"
                      variant="body2"
                    >
                      {table.description}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <DeleteActionItem
                    rowId={table.id}
                    onClick={() => handleDeleteTable(table.id)}
                  />
                  {/* <EditActionItem
                    onClick={() => {
                      setEditingTable(table);
                      setNewTableName(table.name);
                      setOpenAddTableDialog(true);
                    }}
                    href={""}
                  /> */}
                  <Tooltip title={t("common", "upload")} arrow>
                    <IconButton
                      LinkComponent={Link}
                      href={`/dashboard/tables/${table.id}`}
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </Tooltip>

                  <IconButton
                    color="secondary"
                    onClick={() => handleAddColumnTable(table)}
                  >
                    <PlaylistAddIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <Divider />

              {/* Collapsible Field Table */}
              <Collapse in={expandedTableId === table.id}>
                {table.fraudMindColumns.length > 0 ? (
                  <Box sx={{ height: "auto", mt: 2 }}>
                    <DataGridViewServer
                      rows={table.fraudMindColumns}
                      columns={fieldColumns}
                      // totalCount={table.fraudMindColumns.length}
                      loading={false}
                      gridPaginationModel={{ page: 0, pageSize: 5 }}
                      sortingMode="client"
                      filterMode="client"
                      paginationMode="client"
                    />
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, ml: 5 }}
                  >
                    {formatString(
                      t("common", "no-item-added"),
                      t("form", "field")
                    )}
                  </Typography>
                )}
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </Stack>
      {/* handle paginate */}
      {schemaId && (totalCount ?? 0) > pageSize && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CustomPaginate
            onChange={handleChangePage}
            page={page}
            pageCount={pageCount}
            queryLoading={queryLoading}
            color="secondary"
            shape="circular"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default TablesPage;
