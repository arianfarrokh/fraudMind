"use client";

import React, { PropsWithChildren } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {  AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { CacheProvider } from "@emotion/react";
import { faIR } from "@mui/x-data-grid/locales";
import { faIR as FaIRDate} from '@mui/x-date-pickers/locales'

export const RTLThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend:true
  });
  const RTLTheme = createTheme(
    {
      direction: "rtl",
      typography: {   fontFamily: '"IranYekan", "IRANSans", Arial, sans-serif', },
    },
    faIR,
    FaIRDate
  );
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={RTLTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
