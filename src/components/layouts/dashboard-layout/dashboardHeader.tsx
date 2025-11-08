import { useThemeContext } from "@/theme/ThemeContext";
import { IoMenu, IoNotifications } from "react-icons/io5";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTranslation } from "@/providers/translation";
import SideMenu from "./Sidebar";
import LogOutDialog from "@/components/action-item/LogOutDialog";
import { useRouter } from "next/navigation";
import { removeLocalStorageToken } from "@/auth/localStorageToken";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

export default function DashboardHeader({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { t } = useTranslation("common");
  const { mode, toggleColorMode } = useThemeContext();
  const menuAppbar = React.useId();
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleToggleDrawer = () => {
    if (window.innerWidth < 1024) {
      setOpen(!open);
    } else {
      setCollapsed(!collapsed); // اینجا از setCollapsed استفاده می‌کنیم
    }
  };

  // فقط برای بستن در موبایل
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => setLogoutDialogOpen(true);
  const handleLogoutConfirm = () => {
    router.push("/");
    setLogoutDialogOpen(false);
    removeLocalStorageToken();
  };
  const handleLogoutCancel = () => setLogoutDialogOpen(false);

  const getColor = (light: string, dark: string) =>
    mode === "light" ? `var(${light})` : `var(${dark})`;

  const getHoverStyle = () => ({
    bgcolor:
      mode === "light" ? "var(--color-gray2)" : "var(--color-charcoal-light)",
    color: mode === "light" ? "var(--color-charcoal)" : "var(--color-charcoal)",
  });

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: getColor("--color-gray", "--color-charcoal-light"),
          color: getColor("--color-black", "--color-yellow"),
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            pr: "12px",
            pl: "12px",
            minHeight: "48px !important", // ارتفاع کمتر از حالت پیش‌فرض (۶۴px)
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box display={{ xs: "flex" }}>
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                sx={{
                  // marginRight: "36px",
                  bgcolor: getColor("--color-gray", "--color-yellow"),
                  color: getColor("--color-black", "--color-black"),
                  "&:hover": getHoverStyle(),
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                {isMobile ? (
                  <MenuIcon sx={{ fontSize: 13 }} />
                ) : (
                  <MenuOpenIcon
                    sx={{
                      fontSize: 16,
                      transform: !collapsed ? "scaleX(-1)" : "none",
                      transition: "transform 0.6 ease",
                    }}
                  />
                )}
              </IconButton>
            </Box>
            <Link href={"/dashboard"}>
              <Button
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  fontSize: { xs: "0.6rem", md: "0.7rem" },
                  color: getColor("--color-charcoal", "--color-white"),
                }}
              >
                {t("common", "fraudMind")}
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Tooltip title={t("common", "notifications")}>
              <IconButton
                size="large"
                aria-label="notifications"
                sx={{
                  bgcolor: getColor("--color-gray", "--color-charcoal-light"),
                  color: getColor("--color-darkgray", "--color-white"),
                  "&:hover": getHoverStyle(),
                  p: 1,
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                }}
              >
                <Badge color="error">
                  <IoNotifications size={13} />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip
              title={
                mode === "light"
                  ? t("common", "switch-to-dark")
                  : t("common", "switch-to-light")
              }
            >
              <IconButton
                onClick={toggleColorMode}
                sx={{
                  bgcolor: getColor("--color-gray", "--color-charcoal-light"),
                  color: getColor("--color-darkgray", "--color-white"),
                  "&:hover": getHoverStyle(),
                  borderRadius: "10px",
                  // p: 1.1,
                  transition: "all 0.3s ease",
                }}
              >
                {mode === "light" ? (
                  <NightsStayIcon sx={{ fontSize: 14 }} />
                ) : (
                  <LightModeIcon sx={{ fontSize: 14 }} />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={t("common", "logout")}>
              <IconButton
                sx={{
                  bgcolor: getColor("--color-gray", "--color-charcoal-light"),
                  color: getColor("--color-darkgray", "--color-white"),
                  "&:hover": getHoverStyle(),
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                }}
                onClick={handleOpenUserMenu}
              >
                <EmojiPeopleIcon
                  sx={{
                    fontSize: 14,
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  bgcolor: getColor("--color-charcoal", "--color-charcoal"),
                  color: getColor("--color-yellow", "--color-black"),
                  minWidth: 180,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
              }}
              id={menuAppbar}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleLogout}
                sx={{
                  "&:hover": getHoverStyle(),
                  padding: "12px 16px",
                  transition: "all 0.2s ease",
                }}
              >
                <Typography color={getColor("--color-yellow", "--color-black")}>
                  {t("common", "logout")}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <LogOutDialog
        open={logoutDialogOpen}
        handleLogoutConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        title={t("common", "logout")}
        message={t("common", "are-you-sure-logout")}
      />
      <SideMenu
        open={open}
        onCloseDrawer={handleCloseDrawer} // ✅ فقط برای موبایل
        collapsed={collapsed}
      />
    </React.Fragment>
  );
}
