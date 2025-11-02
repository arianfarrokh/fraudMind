"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from "@emotion/react";
import Link from "next/link";
import { useTranslation } from "@/providers/translation";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation("common");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // انیمیشن برای چشمک زدن آیکون‌ها
  const pulse = keyframes`
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  `;

  // انیمیشن برای محو شدن متن
  const fadeIn = keyframes`
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  `;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--color-charcoal)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid>
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <ConstructionIcon
              sx={{
                fontSize: isMobile ? 60 : 80,
                color: "var(--color-yellow)",
                animation: `${pulse} 2s infinite`,
              }}
            />
            <ErrorIcon
              sx={{
                fontSize: isMobile ? 60 : 80,
                color: "var(--color-yellow)",
                animation: `${pulse} 2s infinite`,
              }}
            />
          </Box>
        </Grid>
        <Grid>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            align="center"
            color="error"
            sx={{
              fontWeight: "bold",
              animation: `${fadeIn} 1s ease-in-out`,
              mb: 2,
            }}
          >
            {t("common", "not-found-page-404")}
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            align="center"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            {t("common", "not-found-page-description")}
          </Typography>
        </Grid>
        <Grid>
          <Button
            component={Link}
            href="/dashboard"
            variant="contained"
            sx={{
              bgcolor: "var(--color-yellow)",
              color: "white",
              "&:hover": { bgcolor: "yellow.700" },
            }}
          >
            {t("common", "back-to-home-page")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFoundPage;
