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
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { TbEdit } from "react-icons/tb";
import DialogComponent from "@/components/dialog-component/DialogComponent";
import DataGridViewServer from "@/components/data-grid/DataGridViewServer";
import {
  DeleteActionItem,
  // EditActionItem,
  FullWidthTextField,
} from "@/components";
import { useFieldColumns } from "./columns";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "@/providers/translation";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
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
};

// ---------- main component ----------
const TablesPage = () => {
  const [expandedTableId, setExpandedTableId] = useState<number | null>(null);
  const { show, hide } = useDialog();
  const { t } = useTranslation("common", "form");

  const { schemaId } = useSelector((store: RootState) => store.fraudMindSchema);

  const { data, loading, error } = useQuery(allTablesQuery, {
    variables: {
      where: { and: [{ schemaId: { eq: schemaId } }] },
    },
  });

  // add new table mutation
  const [addNewTable] = useMutation(addNewTableMutation, {
    // update: (...) => { ... }  کامنت کن
    refetchQueries: [
      {
        query: allTablesQuery,
        variables: {
          where: { and: [{ schemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
  });
  // add new column mutation
  const [addNewColumn] = useMutation(addNewColumnMutation, {
    // update: (...) => { ... }  کامنت کن
    refetchQueries: [
      {
        query: allTablesQuery,
        variables: {
          where: { and: [{ schemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
  });

  const [
    deleteRecord,
    { data: deleteData, error: deleteError, loading: deleteLoading },
  ] = useMutation(deleteTableMutation, {
    refetchQueries: [
      {
        query: allTablesQuery,
        variables: {
          where: { and: [{ schemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
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
          where: { and: [{ schemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
  });

  // const loadData = () => {
  //   loadTableData({
  //     variables: {
  //       where: {
  //         and: [
  //           {
  //             schemaId: {
  //               eq: schemaId,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });
  // };

  // useEffect(
  //   () => {
  //     loadData();
  //   },
  //   [
  //    schemaId
  //   ]
  // );

  const handleDeleteColumn = (id: ID) => {
    show(
      "حذف جدول",
      formatString(t("form", "delete-content-dialog"), t("form", "table")),
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
          schemaId: 2,
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
          tableId: data.tableId,
          isNullable: data.isNullable,
          isUnique: data.isUnique,
        },
      },
    });
    // console.log(data);
    // loadData();
    hide();
  };

  const handleAddColumnTable = (tableId: ID) => {
    show(
      `${formatString(t("common", "add-new"), t("form", "database"))}`,
      <AddColumnTableForm
        data={{ ...initialColumnTableValues, tableId }}
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

  return (
    <Box p={4} dir="rtl">
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          {t("form", "tables")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTable}
        >
          {formatString(t("common", "add-new"), t("form", "table"))}
        </Button>
      </Stack>

      {/* Tables */}
      <Stack spacing={2}>
        {data?.result.nodes?.map((table) => (
          <Card
            onClick={() =>
              setExpandedTableId(expandedTableId === table.id ? null : table.id)
            }
            key={table.id}
            sx={{
              borderRadius: 3,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
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
                <Stack direction="row" spacing={1} alignItems="center">
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
                    <Typography variant="h6">{table.name}</Typography>
                    <Typography color="textDisabled" variant="body2">
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
                  {/* hey chatgpt i want this IconButton below to get the id  of the table and go to another page */}
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
                    onClick={() => handleAddColumnTable(table.id)}
                  >
                    <PlaylistAddIcon />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Collapsible Field Table */}
              <Collapse in={expandedTableId === table.id}>
                {table.fraudMindColumns.length > 0 ? (
                  <Box sx={{ height: "auto", mt: 2 }}>
                    <DataGridViewServer
                      rows={table.fraudMindColumns}
                      columns={fieldColumns}
                      totalCount={table.fraudMindColumns.length}
                      loading={false}
                      gridPaginationModel={{ page: 0, pageSize: 5 }}
                      sortingMode="client"
                      filterMode="client"
                    />
                  </Box>
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2, ml: 5 }}
                  >
                    {/* هیچ فیلدی اضافه نشده  */}
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
    </Box>
  );
};

export default TablesPage;
