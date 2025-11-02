"use client";
import { FullWidthTextField } from "@/components";
import { CustomContainer } from "@/components/containerCustom/CustomContainer";
import { Box, Grid, Tab, TextareaAutosize } from "@mui/material";
import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const ScenariosPage:React.FC = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const formik = {
    values: {},
    errors: {},
    touched: {},
    handleChange: () => {},
    handleBlur: () => {},
  };

  return (
    <CustomContainer>
      <Box
        border={"1px solid #ccc"}
        borderRadius={2}
        p={3}
        sx={{
          boxShadow: "0 0 10px pink",
        }}
      >
        <Grid container>
          <Grid size={{ xs: 6, md: 3 }}>
            <FullWidthTextField formik={formik} label={"title"} />
          </Grid>
            <Grid size={{ xs: 12 }}>
              <FullWidthTextField formik={formik} label={"description"} />
            </Grid>

          <Grid size={{ xs: 12 }}>
            <TabContext value={value}>
              <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="scenario tabs"
                  variant="scrollable"
                >
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1">
                <Box
                  component="textarea"
                  sx={{
                    width: "100%",
                    minHeight: 200,
                    resize: "vertical",
                    borderRadius: 1,
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 0 10px pink",
                    backgroundColor: "transparent",
                    direction: "rtl",
                    textAlign: "right",
                    color: "white",
                    p: 1,
                    fontSize: 14,
                    fontFamily: "inherit",
                    outline: "none",
                    "&:focus": {
                      borderColor: "white",
                    },
                  }}
                  onFocus={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.selectionStart = target.selectionEnd = 0;
                  }}
                />
              </TabPanel>

              <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Box>
    </CustomContainer>
  );
};

export default ScenariosPage;
