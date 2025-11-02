"use client";
import React, { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import DashboardHeader from "./dashboardHeader";
import DashboardDataBaseSelector from "./dashboard-database-selector/DashboardDataBaseSelector";

const drawerWidth = 200;

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box minHeight="100vh" position="relative">
      <span id="back-to-top-anchor" />
      <DashboardHeader />
      <Box
        component="main"
        sx={{
          pt: "64px",
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <DashboardDataBaseSelector />

        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
