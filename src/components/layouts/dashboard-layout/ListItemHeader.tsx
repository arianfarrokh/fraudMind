import React from "react";
import { Box, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { useThemeContext } from "@/theme/ThemeContext";

type Props = {
  label: string;
  open: boolean;
  Icon: IconType;
  onClick: React.ReactEventHandler<HTMLDivElement>;
};

const ListItemHeader: React.FC<Props> = ({ label, open, Icon, onClick }) => {
  const { mode } = useThemeContext();

  return (
    <ListItemButton onClick={onClick} color="">
      <ListItemIcon sx={{ color: "inherit", mt: 2 }}>
        <Icon fontSize={22} />
      </ListItemIcon>

      <Typography
        sx={{
          fontSize: "1.1rem",
          mt: 2,
          color:
            mode === "light" ? "var(--color-white)" : "var(--color-yellow)",
        }} // Use CSS variable
      >
        {label}
      </Typography>
      <Box sx={{ marginLeft: "auto", mt: 2 }}>
        {open ? <MdExpandLess fontSize={23} /> : <MdExpandMore fontSize={23} />}
      </Box>
    </ListItemButton>
  );
};

export default ListItemHeader;
