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
  collapsed: boolean;
};

const SideMenu: React.FC<Props> = ({ open, onCloseDrawer, collapsed }) => {
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
          background:
            mode === "dark" ? "var(--color-sideblue)" : "var(--color-sidegray)",
          color: "var(--color-charcoal)",
          width: collapsed ? 80 : 200,
          transition: "width 0.1s ease-out",
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
        {/* <IconButton
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
        </IconButton> */}
      </Toolbar>
      <Box
        sx={{
          px: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <MenuList onCloseDrawer={onCloseDrawer} collapsed={collapsed} />
      </Box>
    </Drawer>
  );
};

export default SideMenu;
