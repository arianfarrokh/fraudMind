import { useTranslation } from "@/providers/translation";
import { useThemeContext } from "@/theme/ThemeContext";
import { formatString } from "@/utils";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { BsDatabaseCheck } from "react-icons/bs";

const SelectSchema = () => {
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
        bgcolor: mode === "light" ? "#f5f5f5" : "#3c4a63",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <BsDatabaseCheck fontSize={35} color="text.secondary" />
        <Typography
          variant="h5"
          color="text.secondary"
          fontWeight="medium"
          sx={{
            px: 2,
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
            {formatString(t("common" , "select-desired") , t("form" , "scheama"))}
          {/* پایگاه داده مورد نظر را انتخاب کنید */}
        </Typography>
      </motion.div>
    </Box>
  );
};

export default SelectSchema;
