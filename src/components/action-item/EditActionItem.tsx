import React from "react";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import NextLink from "next/link";
import { Link } from "@mui/material";
import { TbEdit } from "react-icons/tb";
import { useTranslation } from "@/providers/translation";

type Props = IconButtonProps & {
  href: string;
  tooltip?: string;       
  icon?: React.ReactNode; 
};

const EditActionItem: React.FC<Props> = ({ href, children, tooltip, icon, ...props }) => {
  const { t } = useTranslation("common", "form");

  return (
    <Link href={href} component={NextLink} underline="none" color="inherit">
      <Tooltip title={tooltip || t("form", "edit")} arrow>
        <IconButton {...props}>{children || icon || <TbEdit size={"18px"} />}</IconButton>
      </Tooltip>
    </Link>
  );
};

export default EditActionItem;
