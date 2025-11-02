"use client";
import React, { useState } from "react";
import { useTranslation } from "@/providers/translation";
import { Box, Button, List, ListItem } from "@mui/material";
import { useThemeContext } from "@/theme/ThemeContext";
import TableChartIcon from "@mui/icons-material/TableChart";
import MenuListItems from "./MenuListItems";
import SettingsIcon from "@mui/icons-material/Settings";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import Link from "next/link"; // ✅ import Link

type Props = {
  onCloseDrawer: React.ReactEventHandler<object>;
};

const MenuList: React.FC<Props> = ({ onCloseDrawer }) => {
  const { t } = useTranslation("common");

  const [openMenu, setMenuOpen] = useState({
    dashboardmanagment: false,
    basicInfo: false,
    productManagement: false,
    userManagment: false,
    ordersAndFinancial: false,
    logesticInventory: false,
    systemSetting: false,
    analysisReport: false,
    campainsDiscounts: false,
  });

  const handleToggleMenu = (menu: keyof typeof openMenu) => {
    setMenuOpen({
      ...openMenu,
      [menu]: !openMenu[menu],
    });
  };

  const { mode } = useThemeContext();

  return (
    <>
      <List
        sx={{
          color: mode === "dark" ? "var(--color-white)" : "var(--color-yellow)",
          flexGrow: 1,
        }}
      >
        <ListItem>
          <Link href="/dashboard/tables">
            <Button
              startIcon={<TableChartIcon />}
              fullWidth
              sx={{
                fontSize: "1.1rem",
                color: "white",
                justifyContent: "start",
                textTransform: "none",
              }}
              onClick={onCloseDrawer}
            >
              {t("common", "tables")}
            </Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/dashboard/scenarios" >
            <Button
              startIcon={<GppMaybeIcon />}
              fullWidth
              sx={{
                fontSize: "1.1rem",
                color: "white",
                justifyContent: "start",
                textTransform: "none",
              }}
              onClick={onCloseDrawer}
            >
              {t("common", "scenarios")}
            </Button>
          </Link>
        </ListItem>
      </List>
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
          <Button
            startIcon={<SettingsIcon />}
            fullWidth
            sx={{
              fontSize: "1rem",
              color: "white",
              justifyContent: "center",
            }}
            // onClick={onCloseDrawer}
          >
            {t("common", "settings")}
          </Button>
      </Box>
    </>
  );
};

export default MenuList;
