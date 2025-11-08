"use client";
import React, { PropsWithChildren, useState } from "react";
import { Box } from "@mui/material";
import DashboardHeader from "./dashboardHeader";
import DashboardDataBaseSelector from "./dashboard-database-selector/DashboardDataBaseSelector";

const drawerWidth = 200;
const drawerWidthCollapsed = 80;

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box minHeight="100vh" position="relative">
      <span id="back-to-top-anchor" />
      <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <Box
        component="main"
        sx={{
          pt: "64px",
          ml: {
            lg: collapsed ? `${drawerWidthCollapsed}px` : `${drawerWidth}px`,
          },
          transition: "margin 0.1s ease-out",
        }}
      >
        <DashboardDataBaseSelector />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
