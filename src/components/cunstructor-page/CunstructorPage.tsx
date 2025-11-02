"use client";

import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import HardHatIcon from "@mui/icons-material/Engineering";
import { keyframes } from "@emotion/react";
import { useTranslation } from "@/providers/translation";

const UnderConstructionPage: React.FC = () => {
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
        {/* آیکون‌های ساخت‌وساز */}
        <Grid>
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            {/* <ConstructionIcon
              sx={{
                fontSize: isMobile ? 60 : 80,
                color: "#ff9900",
                animation: `${pulse} 2s infinite`,
              }}
            /> */}
            <HardHatIcon
              sx={{
                color: "var(--color-yellow)",
                fontSize: isMobile ? 90 : 100,
                animation: `${pulse} 2s infinite`,
              }}
            />
          </Box>
        </Grid>
        {/* متن اصلی */}
        <Grid>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            align="center"
            sx={{
              fontWeight: "bold",
              color: "yellow.600",
              animation: `${fadeIn} 1s ease-in-out`,
              mb: 2,
            }}
          >
            {t("common", "under-cunstructor")}
          </Typography>
        </Grid>
        <Grid>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            align="center"
            sx={{ mb: 2, color: "var(--color-charcoal-light" }}
          >
            {t("common", "coming-soon")}
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="body1" align="center" color="text.secondary">
            {t("common", "user-cunstructor-message")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnderConstructionPage;
