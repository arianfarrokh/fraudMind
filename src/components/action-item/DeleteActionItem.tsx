import React from "react";
import { IconButton, Tooltip} from "@mui/material";
import { TbTrash } from "react-icons/tb";
import { useTranslation } from "@/providers/translation";

type Props = {
  onClick: () => void;
  rowId:number;
};

const DeleteActionItem: React.FC<Props> = ({ onClick , rowId }) => {
  const {t}= useTranslation("common")
  return (
    <><Tooltip title={t("common","delete")} arrow>
      <IconButton key={rowId} color="error" onClick={onClick}>
        <TbTrash />
      </IconButton>
    </Tooltip>
    </>
  );
};

export default DeleteActionItem;
