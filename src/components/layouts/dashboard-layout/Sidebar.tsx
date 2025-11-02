"use client";
import React from "react";
import {
  Divider,
  IconButton,
  Drawer,
  Toolbar,
  useTheme,
  Box,
  useMediaQuery,
} from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MenuList from "./MenuList";
import { useThemeContext } from "@/theme/ThemeContext";

type Props = {
  open: boolean;
  onCloseDrawer: () => void;
};

const SideMenu: React.FC<Props> = ({ open, onCloseDrawer }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Drawer
      open={open}
      variant={isDesktop ? "permanent" : "temporary"}
      // onOpen={onCloseDrawer}
      onClose={onCloseDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          bgcolor:
            mode === "dark"
              ? "var(--color-charcoal-light)"
              : "var(--color-charcoal)",
          color: "var(--color-yellow)",
          width: 200,
          height: "100vh",
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton
          onClick={onCloseDrawer}
          sx={{
            color:
              mode === "light" ? "var(--color-yellow)" : "var(--color-white)",
            "&:hover": {
              color: "var(--color-white)",
              bgcolor: "var(--color-hover-black)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {theme.direction === "rtl" ? <FaChevronRight /> : <FaChevronLeft />}
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: "var(--color-yellow)" }} />

      <Box
        sx={{
          px: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <MenuList onCloseDrawer={onCloseDrawer} />
      </Box>
    </Drawer>
  );
};

export default SideMenu;
