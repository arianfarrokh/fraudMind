"use client";
import React from "react";
import { DialogProps } from "../../providers/dialog-provider/types";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import DraggablePaperComponent from "../DraggablePaperComponent/DraggablePaperComponent";

const DialogComponent: React.FC<DialogProps> = ({
  open,
  onCancel,
  onConfirm,
  maxWidth,
  title,
  content,
  cancelText,
  confirmText,
  titleTextAlign
}) => {
  return (
    <Dialog PaperComponent={DraggablePaperComponent} open={open} onClose={onCancel} maxWidth={maxWidth} fullWidth>
      <DialogTitle id="draggable-dialog-title" textAlign={titleTextAlign}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        {cancelText && onCancel && (
          <Button variant="contained" color="error" onClick={onCancel}>
            {cancelText}
          </Button>
        )}
        {confirmText && onConfirm && (
          <Button variant="contained" color="success" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
