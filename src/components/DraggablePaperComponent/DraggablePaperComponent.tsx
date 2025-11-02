import { Paper, PaperProps } from "@mui/material";
import React, { useRef } from "react";
import Draggable from "react-draggable";

const DraggablePaperComponent: React.FC<PaperProps> = (props) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef} // اضافه شد
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
};

export default DraggablePaperComponent;
