"use client";
import React, { useEffect } from "react";
import {
  Grid,
  Paper,
  CardContent,
  Stack,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
//! dont delet this comment
// import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import {
  addNewSchemaMutation,
  //! dont delet this comment
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

const initialValues: SchemaType = {
  id: 0,
  name: "",
  description: "",
};

export default function DashboardDataBaseSelector() {
  const { show, hide } = useDialog();
  const { t } = useTranslation("common", "form");

  const dispatch = useDispatch();

  const [selectedDB, setSelectedDB] = React.useState<{
    id: number;
    name: string;
  } | null>(null);

  const {
    data: schemasData,
    loading,
    error,
    refetch,
  } = useQuery(allSchemasNoPagedQuery);

  const [addNewRecord] = useMutation(addNewSchemaMutation, {
    onCompleted: () => refetch(),
    fetchPolicy: "no-cache",
  });
  //! dont delet this comment
  // const [update] = useMutation(updateSchemaMutation, {
  //   onCompleted: () => refetch(),
  //   fetchPolicy: "no-cache",
  // });

  const [deleteSchema] = useMutation(deleteSchemaMutation, {
    onCompleted: () => refetch(),
  });

  const dataBases = schemasData?.result ?? [];

  const handleAddNewDatabase = (data: SchemaType) => {
    addNewRecord({
      variables: {
        input: {
          name: data.name,
          description: data.description,
        },
      },
    });
    hide();
  };
  //! dont delet this comment
  // const handleEditDatabase = (data: SchemaType) => {
  //   update({
  //     variables: {
  //       input: {
  //         id: data.id,
  //         name: data.name,
  //         description: data.description,
  //       },
  //     },
  //   });
  //   hide();
  // };

  const handleAdd = () => {
    show(
      `${formatString(t("common", "add-new"), t("form", "database"))}`,
      <DashboardDataBaseSelectorForm
        data={initialValues}
        onSave={handleAddNewDatabase}
        onCancel={hide}
      />,
      { maxWidth: "xs" }
    );
  };
  //! dont delet this comment
  // const handleEdit = () => {
  //   if (!selectedDB) return;
  //   show(
  //     `${formatString(t("common" , "edit") , t("form" , "database"))}`,
  //     <DashboardDataBaseSelectorForm
  //       data={selectedDB}
  //       onSave={handleEditDatabase}
  //       onCancel={hide}
  //     />,
  //     { maxWidth: "xs" }
  //   );
  // };

  const handleDelete = () => {
    if (!selectedDB) return;
    show(
      `${formatString(t("common", "delete"), t("form", "database"))}`,
      `${formatString(t("common", "are-you-sure-delet"), selectedDB?.name)}`,
      {
        maxWidth: "xs",
        confirmText: t("form", "delete"),
        cancelText: t("form", "close"),
        onConfirm: () => {
          deleteSchema({ variables: { input: { id: Number(selectedDB.id) } } });
          hide();
        },
        onCancel: hide,
      }
    );
  };

  useEffect(() => {
    if (selectedDB) {
      dispatch(setSchemaId(selectedDB.id));
    }
  }, [selectedDB]);

  return (
    <Grid container>
      <Grid>
        <Paper
          sx={{
            my: 2,
            mx: 2,
            width: { xs: 450, sm: 580 },
            borderRadius: 1,
            transition: "all 0.3s ease",
          }}
        >
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Autocomplete
                options={dataBases}
                getOptionLabel={(option: any) => option.name || ""}
                value={selectedDB}
                onChange={(_, newValue) => setSelectedDB(newValue)}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      width: 400,
                    }}
                    {...params}
                    label={t("form", "database")}
                    variant="outlined"
                  />
                )}
              />
              <Stack direction="row" spacing={0.5}>
                <IconButton color="success" onClick={handleAdd}>
                  <AddCircleSharpIcon sx={{ fontSize: 30 }} />
                </IconButton>
                {
                  //! dont delet this comment
                  /* 
                <IconButton
                  color="primary"
                  onClick={handleEdit}
                  disabled={loading || !selectedDB}
                >
                  <EditSharpIcon sx={{ fontSize: 30 }} />
                </IconButton> */
                }
                <IconButton
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
