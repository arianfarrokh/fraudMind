"use client";
import React, { useEffect, useState } from "react";
import { DeleteActionItem } from "@/components";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Card,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDialog } from "@/providers/dialog-provider/DialogProvider";
import { useTranslation } from "@/providers/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  addNewScenarioMutation,
  AllScenariosQuery,
  deleteScenarioMutation,
  updateScenarioMutation,
} from "./graphql";
import { formatString } from "@/utils";
import AddScenarioForm from "./AddScenarioForm";
import { RiGooglePlayFill } from "react-icons/ri";
import ScenarioPanel from "./ScenarioPanel";
import ScenarioRunDialog from "./ScenarioRunDialog";
import { useAlert } from "@/providers/alert-provider/AlertProvider";
import CustomPaginate from "@/components/pagination/CustomPaginate";
import { motion } from "framer-motion";
import { BsDatabaseCheck } from "react-icons/bs";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useThemeContext } from "@/theme/ThemeContext";
import SelectSchema from "@/components/SelectSchema";
import NoResults from "@/components/NoResults";

const initialScenarioValue: ScenarioType = {
  id: 0,
  name: "",
  description: "",
  sqlText: "",
  fraudMindSchemaId: 0,
};

// ---------- main component ----------
const ScenariosPage = () => {
  const [expandedScenarioId, setExpandedScenarioId] = useState<number | null>(
    null
  );

  const [page, setPage] = React.useState(1); // current page number (1-based)
  const [pageSize, setPageSize] = React.useState(5); // rows per page

  const { show: showDialog, hide } = useDialog();
  const { show } = useAlert();
  const { t } = useTranslation("common", "form");
  const { mode } = useThemeContext();

  const { schemaId } = useSelector((store: RootState) => store.fraudMindSchema);

  const { data, loading, error, refetch } = useQuery(AllScenariosQuery, {
    variables: {
      first: pageSize,
      where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
    },
  });

  const totalCount = data?.result.totalCount ?? 0;
  let pageCount = Math.ceil(totalCount / pageSize);
  // --------------ADD SCENARIO MUTATION---------------------
  const [
    addNewScenario,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(addNewScenarioMutation, {
    refetchQueries: [
      {
        query: AllScenariosQuery,
        variables: {
          where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
  });
  // -----------USEMUTATIONALERT FOR ALERTS-------------
  const useMutationAlert = ({
    loading,
    data,
    error,
    successMessage,
    errorMessage,
    show,
  }: UseMutationAlertProps) => {
    useEffect(() => {
      if (loading) return;

      if (data) {
        const response = data?.response;

        if (response?.errors?.length) {
          show({
            message: response.errors[0]?.message,
            type: "error",
            autoHideDuration: 3000,
          });
        } else {
          show({
            message: successMessage,
            type: "success",
            autoHideDuration: 2000,
          });
        }
      }

      if (error) {
        show({
          message: errorMessage || "عملیات با خطا مواجه شد",
          type: "error",
          autoHideDuration: 2000,
        });
      }
    }, [loading, data, error, successMessage, errorMessage, show]);
  };

  useMutationAlert({
    loading: addLoading,
    data: addData,
    error: addError,
    successMessage: formatString(
      t("common", "add-successfully"),
      t("form", "scenario")
    ),
    errorMessage: formatString(
      t("error", "failed-to-add"),
      t("form", "scenario")
    ),
    show,
  });
  // ----------UPDATE SCENARIO MUTATION---------------------
  const [updateScenario] = useMutation(updateScenarioMutation, {
    refetchQueries: [
      {
        query: AllScenariosQuery,
        variables: {
          where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
  });
  const handleExecuteScenario = async (scenario: ScenarioType) => {
    try {
      await updateScenario({
        variables: {
          input: {
            id: scenario.id,
            fraudMindSchemaId: schemaId,
            name: scenario.name,
            description: scenario.description,
            sqlText: scenario.sqlText,
          },
        },
      });
    } catch (err) {
      console.error("Error updating scenario before execution:", err);
    }

    showDialog(
      `${scenario.name}`,
      <ScenarioRunDialog scenarioId={scenario.id} />,
      { maxWidth: "xl" }
    );
  };

  // ----------DELETE SCENARIO MUTATION---------------------

  const [
    deleteScenario,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(deleteScenarioMutation, {
    refetchQueries: [
      {
        query: AllScenariosQuery,
        variables: {
          where: { and: [{ fraudMindSchemaId: { eq: schemaId } }] },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      hide();
    },
  });

  useMutationAlert({
    loading: deleteLoading,
    data: deleteData,
    error: deleteError,
    successMessage: formatString(
      t("common", "delete-successfully"),
      t("form", "scenario")
    ),
    errorMessage: formatString(
      t("error", "failed-to-add"),
      t("form", "scenario")
    ),
    show,
  });
  //-----------FUNCTION ADD SCENARIO------------------
  const handleAddNewScenario = (data: ScenarioType) => {
    addNewScenario({
      variables: {
        input: {
          id: 0,
          fraudMindSchemaId: schemaId,
          name: data.name,
          description: data.description,
          sqlText: "test",
        },
      },
    });
  };

  const handleAddScenario = () => {
    showDialog(
      `${formatString(t("common", "add-new"), t("form", "scenario"))}`,
      <AddScenarioForm
        data={{ ...initialScenarioValue, fraudMindSchemaId: schemaId }}
        onSave={handleAddNewScenario}
        onCancel={hide}
      />,
      { maxWidth: "xs" }
    );
  };
  //-----------FUNCTION DELETE SCENARIO------------------

  const handleDeleteScenario = (scenarioId: ID) => {
    showDialog(
      // "حذف جدول",
      formatString(t("common", "deletee"), t("form", "scenario")),
      formatString(t("form", "delete-content-dialog"), t("form", "scenario")),
      {
        maxWidth: "xs",
        confirmText: t("common", "delete"),
        cancelText: t("common", "cancel"),
        titleTextAlign: "center",
        onConfirm: () => {
          deleteScenario({
            variables: {
              input: {
                id: scenarioId,
              },
            },
          });
          hide();
        },
        onCancel: hide,
      }
    );
  };
  //-----------FUNCTION EXEQUTE SCENARIO------------------

  const handleExequteScenario = (scenario: ScenarioType) => {
    showDialog(
      `${scenario.name}`,
      <ScenarioRunDialog scenarioId={scenario.id} />,
      {
        maxWidth: "xl",
      }
    );
  };
  //-----------FUNCTION UPDATE SCENARIO------------------

  const handleUpdateScenario = (scenario: ScenarioType) => {
    updateScenario({
      variables: {
        input: {
          id: scenario.id,
          fraudMindSchemaId: schemaId,
          name: scenario.name,
          description: scenario.description,
          sqlText: scenario.sqlText,
        },
      },
    });
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

  //----------EFFECT LOADING--------------------------

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

  if (!schemaId) {
    return <SelectSchema />;
  }
  if (data?.result?.nodes?.length === 0 && !loading) {
    return <NoResults />;
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
          {t("form", "scenario")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddScenario}
          disabled={!schemaId}
          sx={{ background: "var(--color-sideblue)" }}
        >
          {formatString(t("common", "add-new"), t("form", "scenario"))}
        </Button>
      </Stack>

      <Stack spacing={2}>
        {data?.result.nodes?.map((scenario) => (
          <Card
            key={scenario.id}
            sx={{
              borderRadius: 3,

              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              p={1}
            >
              <Stack
                direction="row"
                spacing={1}
                flex={1}
                alignItems="center"
                onClick={() =>
                  setExpandedScenarioId(
                    expandedScenarioId === scenario.id ? null : scenario.id
                  )
                }
                sx={{ cursor: "pointer" }}
              >
                <IconButton
                  onClick={() =>
                    setExpandedScenarioId(
                      expandedScenarioId === scenario.id ? null : scenario.id
                    )
                  }
                >
                  {expandedScenarioId === scenario.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
                <Stack>
                  <Typography variant="h6">{scenario.name}</Typography>
                  <Typography color="textDisabled" variant="body2">
                    {scenario.description}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1}>
                <DeleteActionItem
                  rowId={scenario.id}
                  onClick={() => handleDeleteScenario(scenario.id)}
                />

                <IconButton
                  color="secondary"
                  onClick={() => handleExecuteScenario(scenario)}
                >
                  <RiGooglePlayFill />
                </IconButton>
              </Stack>
            </Stack>
            <Divider />
            <Collapse in={expandedScenarioId === scenario.id}>
              <CardContent>
                {/* Collapsible Field Scenario */}
                <ScenarioPanel
                  scenario={scenario}
                  onSave={handleUpdateScenario}
                />
              </CardContent>
            </Collapse>
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
            queryLoading={loading}
            color="secondary"
            shape="circular"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default ScenariosPage;
