'use client';
import React, { PropsWithChildren, createContext, useContext, useState, useEffect, useMemo } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { CacheProvider } from "@emotion/react";
import { faIR } from "@mui/x-data-grid/locales";
import { faIR as faIRDate } from "@mui/x-date-pickers/locales";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export default function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Read theme from localStorage after mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setMode(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
    setMounted(true);
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  // Memoize the theme to prevent recreation on every render
  const theme = useMemo(() => {
    return createTheme(
      {
        direction: "rtl",
        palette: {
          mode,
          primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
          secondary: { main: mode === "light" ? "#dc004e" : "#f48fb1" },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#f5f5f5" : "#1d1d1d",
          },
        },
        typography: {
          fontFamily: '"IranYekan", "IRANSans", sans-serif',
          allVariants: {
            color: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#fff",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === "light" ? "#f5f5f5" : "#121212",
                color: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#fff",
                fontFamily: '"IranYekan", "IRANSans", Arial, sans-serif',
              },
            },
          },
        },
      },
      faIR,
      faIRDate
    );
  }, [mode]);

  // RTL cache
  const rtlCache = useMemo(
    () =>
      createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    []
  );

  // Only render children after mount to avoid SSR issues
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
            <CssBaseline />
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}
