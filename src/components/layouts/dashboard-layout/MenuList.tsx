"use client";
import React from "react";
import { useTranslation } from "@/providers/translation";
import {
  Box,
  Button,
  List,
  ListItem,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useThemeContext } from "@/theme/ThemeContext";
import TableChartIcon from "@mui/icons-material/TableChart";
import SettingsIcon from "@mui/icons-material/Settings";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";

type Props = {
  onCloseDrawer: React.ReactEventHandler<object>;
  collapsed?: boolean;
};

const MenuList: React.FC<Props> = ({ onCloseDrawer, collapsed = false }) => {
  const { t } = useTranslation("common");
  const { mode } = useThemeContext();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const textColor =
    mode === "dark" ? "var(--color-white)" : "var(--color-yellow)";

  const menuItems = [
    {
      label: t("common", "dashboard"),
      icon: <DashboardIcon />,
      href: "/dashboard",
    },
    {
      label: t("common", "tables"),
      icon: <TableChartIcon />,
      href: "/dashboard/tables",
    },
    {
      label: t("common", "scenarios"),
      icon: <GppMaybeIcon />,
      href: "/dashboard/scenarios",
    },
  ];

  const handleMenuClick = () => {
    if (!isDesktop) {
      // فقط در موبایل drawer بسته بشه
      onCloseDrawer({} as any);
    }
  };

  return (
    <>
      <List
        sx={{
          color: textColor,
          flexGrow: 1,
          px: collapsed ? 0.5 : 1.5,
          transition: "all 0.3s ease",
        }}
      >
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            sx={{ mb: 0.5, width: "100%" }}
          >
            <Tooltip
              title={collapsed ? item.label : ""}
              placement="right"
              arrow
            >
              <Link href={item.href}>
                <Button
                  startIcon={item.icon}
                  onClick={handleMenuClick}
                  sx={{
                    justifyContent: collapsed ? "center" : "flex-start",
                    textTransform: "none",
                    color: textColor,
                    fontSize: "1rem",
                    width: collapsed ? "56px" : "100%",
                    minWidth: 0,
                    px: collapsed ? 1.5 : 2,
                    borderRadius: "10px",
                    "& .MuiButton-startIcon": {
                      mr: collapsed ? 0 : 1.5,
                    },
                    "&:hover": {
                      bgcolor:
                        mode === "dark"
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {!collapsed && item.label}
                </Button>
              </Link>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* Bottom Settings */}
      <Box
        sx={{
          p: collapsed ? 0.5 : 2,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.3s ease",
        }}
      >
        <Tooltip
          title={collapsed ? t("common", "settings") : ""}
          placement="right"
          arrow
        >
          <Button
            startIcon={<SettingsIcon />}
            sx={{
              justifyContent: collapsed ? "center" : "flex-start",
              textTransform: "none",
              color: textColor,
              fontSize: "1rem",
              width: collapsed ? "56px" : "100%",
              minWidth: 0,
              px: collapsed ? 1.5 : 2,
              "& .MuiButton-startIcon": {
                mr: collapsed ? 0 : 1.5,
              },
              "&:hover": {
                bgcolor:
                  mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {!collapsed && t("common", "settings")}
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default MenuList;
