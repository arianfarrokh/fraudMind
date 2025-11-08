import { useTranslation } from "@/providers/translation";
import { useThemeContext } from "@/theme/ThemeContext";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { formatString } from "@/utils";

const NoResults = () => {
  const { mode } = useThemeContext();
  const { t } = useTranslation("form", "common");

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <DescriptionOutlinedIcon
          sx={{
            fontSize: 90,
            color: "text.disabled",
            mb: 2,
            filter: "drop-shadow(0 0 6px rgba(0,0,0,0.08))",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: 400 }}
        >
          {formatString(t("common", "no-results"), t("form", "scenario2"))}
          {/* هیچ سناریویی ایجاد نشده است */}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default NoResults;
