"use client";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, DragEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTranslation } from "@/providers/translation";
import { DataGridViewServer } from "@/components/data-grid";
import { PagePanel } from "@/components";
import { useUploadDataColumns } from "./columns";
import { useDialog } from "@/providers/dialog-provider/DialogProvider";
import { useMutation } from "@apollo/client/react";
import { uploadDataMutation } from "./graphql";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useThemeContext } from "@/theme/ThemeContext";
import { useParams } from "next/navigation";

const UploadData = () => {
  const columns = useUploadDataColumns();
  const { mode } = useThemeContext();
  const { id } = useParams();

  const [uploadData, { loading: uploading }] = useMutation(uploadDataMutation);

  //   usedialog
  const { show: showDialog, hide } = useDialog();

  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const { t } = useTranslation("common", "error", "form");

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const ext = droppedFile.name.split(".").pop()?.toLowerCase();
      if (["csv", "txt", "unl"].includes(ext || "")) {
        setFile(droppedFile);
      } else {
        showDialog(
          t("error", "invalid-file"),
          <Box textAlign={"center"}>{t("error", "only-csv-txt-unl")}</Box>,
          {
            onConfirm: () => hide(),
            confirmText: t("common", "understand"),
            titleTextAlign: "center",
          }
        );
      }
    }
  };

  //*handle File Select
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase();
      if (["csv", "txt", "unl"].includes(ext || "")) {
        setFile(selectedFile);
      } else {
        showDialog(
          t("error", "invalid-file"),
          <Box textAlign={"center"}>{t("error", "only-csv-txt-unl")}</Box>,
          {
            onConfirm: () => hide(),
            confirmText: t("common", "understand"),
            titleTextAlign: "center",
          }
        );
      }
    }
  };

  //*handle file upload
  const handleFileUpload = async () => {
    if (!file) return;

    try {
      // ساخت ورودی برای Mutation
      await uploadData({
        variables: {
          input: {
            uploadFile: file,
            kind: "DATA_CSV",
            tableId: Number(id),
          },
        },
      });

      showDialog(
        t("common", "success"),
        <Box textAlign="center">
          {t("common", "file-uploaded-successfully")}
        </Box>,
        {
          onConfirm: hide,
          confirmText: t("common", "ok"),
          titleTextAlign: "center",
        }
      );

      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      showDialog(
        t("error", "upload-failed"),
        <Box textAlign="center">{t("error", "try-again-later")}</Box>,
        {
          onConfirm: hide,
          confirmText: t("common", "understand"),
          titleTextAlign: "center",
        }
      );
    }
  };

  if (uploading) {
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

  return (
    <Box
      px={5}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <Box display="flex" justifyContent={"flex-end"} mb={2}>
        {/* <Button color="warning" variant="outlined">
          {t("common", "Back")}
        </Button> */}
        <Tooltip title={t("common", "back")}>
          <IconButton
            LinkComponent={Link}
            sx={{
              color: mode === "dark" ? "black" : "white",
              bgcolor: mode === "light" ? "#74a2beff" : "#ccc",

              "&:hover":
                mode === "light"
                  ? {
                      bgcolor: "#336788ff",
                      color: "whitesmoke",
                    }
                  : {
                      bgcolor: "#336788ff",
                      color: "white",
                    },
            }}
            href="/dashboard/tables"
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider sx={{ m: 2 }} />

      <Typography mt={1} variant="h5">
        {t("common", "upload data")}
      </Typography>
      <Divider sx={{ m: 2 }} />
      <Box
        sx={{
          border: "2px dashed",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          textAlign: "center",
          bgcolor: isDragging ? "action.hover" : "transparent",
          borderColor: isDragging ? "primary" : "grey",
          borderRadius: 4,
          p: 4,
        }}
      >
        <CloudUploadIcon />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {t("common", "Drop your filled .csv here")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t("common", "or click to select a file")}
        </Typography>
        <Button variant="contained" component="label">
          {t("common", "Select File")}
          <input
            type="file"
            accept=".csv,.txt,.unl"
            hidden
            onChange={handleFileSelect}
          />
        </Button>
        {file && (
          <Box mt={2} textAlign="center">
            <Typography variant="body1" color="success.main">
              📄 {file.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {(file.size / 1024).toFixed(2)} KB
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleFileUpload}
              disabled={!file}
            >
              {t("common", "Upload")}
            </Button>
          </Box>
        )}
      </Box>
      <Box mt={5}>
        <PagePanel titleColor="white" title={t("common", "Past uploads")}>
          <DataGridViewServer
            columns={columns}
            loading={false}
            gridPaginationModel={{ page: 0, pageSize: 5 }}
            onPageChanged={() => {}}
            onSortModelChange={() => {}}
            onFilterModelChange={() => {}}
          />
        </PagePanel>
      </Box>
    </Box>
  );
};

export default UploadData;
