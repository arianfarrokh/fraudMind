import React from "react";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { GiCargoCrane } from "react-icons/gi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Link from "next/link";
import { useTranslation } from "@/providers/translation";
import { useThemeContext } from "@/theme/ThemeContext";

const LandingPageComponent = () => {
  const { t } = useTranslation("form");
  const { mode, toggleColorMode } = useThemeContext();

  const getColor = (light: string, dark: string) =>
    mode === "light" ? `var(${light})` : `var(${dark})`;

  const getHoverStyle = () => ({
    bgcolor: mode === "light" ? "#c77700ff" : "var(--color-hover-black)",
    color: mode === "light" ? "var(--color-black)" : "var(--color-yellow)",
  });
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('images/landing-page-img.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <AppBar
        sx={{
          bgcolor: getColor("--color-yellow", "--color-charcoal"),
          color: getColor("--color-black", "--color-yellow"),
        }}
        position="static"
      >
        <Toolbar>
          <Stack flexGrow={1} spacing={0.5} direction={"row"}>
            <Button
              variant="contained"
              sx={{ fontSize: "1.2rem" }}
              color="inherit"
              LinkComponent={Link}
              href="/login"
            >
              {t("form", "login")}
            </Button>
            <Button
              variant="contained"
              sx={{ fontSize: "1.2rem" }}
              color="inherit"
            >
              {t("form", "sign-up")}
            </Button>
          </Stack>
          <IconButton
            onClick={toggleColorMode}
            sx={{
              bgcolor: getColor("--color-charcoal", "--color-yellow"),
              color: getColor("--color-yellow", "--color-black"),
              "&:hover": getHoverStyle(),
              borderRadius: "20px",
              p: 1.25,
              mr: 1,
              transition: "all 0.3s ease",
            }}
          >
            {mode === "light" ? (
              <MdDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </IconButton>
          <Link href={"/"}>
            <IconButton
              size="medium"
              sx={{
                bgcolor: getColor("--color-charcoal", "--color-yellow"),
                color: getColor("--color-yellow", "--color-black"),
                "&:hover": getHoverStyle(),
                borderRadius: "20px",
              }}
            >
              <GiCargoCrane />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default LandingPageComponent;
