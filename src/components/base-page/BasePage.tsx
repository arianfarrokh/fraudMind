import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client"; 
import {
  Box,
  Breakpoint,
  Container,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import SnackbarError from "../snack-bar/SnackbarError";
import { useTranslation } from "@/providers/translation";
import { useThemeContext } from "@/theme/ThemeContext";
import { useRouter } from "next/navigation";
import { removeLocalStorageToken } from "@/auth/localStorageToken";
import Loading from "../loading/Loading";

type Props = {
  loading?: boolean;
  pageTitle: string;
  PageIcon?: React.ReactNode;
  maxWidth?: Breakpoint | false;
  ActionButton?: React.ReactNode;
  error?:
    | Error 
    | {
        code: string;
        message: string;
      }[]
    | null;
};

const BasePage: React.FC<PropsWithChildren<Props>> = ({
  loading,
  pageTitle,
  PageIcon,
  maxWidth = "lg",
  ActionButton,
  error,
  children,
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<
    string | React.ReactNode | null
  >(null);
  const { t } = useTranslation("error");
  const { mode } = useThemeContext();

  useEffect(() => {
    if (!error) return;

    
    if (CombinedGraphQLErrors.is(error)) {
      let hasAuthError = false;
      const messages = error.errors.map((err, idx) => {
        const code = err?.extensions?.code;
        if (code === "AUTH_NOT_AUTHENTICATED") {
          hasAuthError = true;
          return <div key={idx}>{t("error", "AUTH_NOT_AUTHENTICATED")}</div>;
        }
        if (code === "AUTH_NOT_AUTHORIZED") {
          hasAuthError = true;
          return <div key={idx}>{t("error", "AUTH_NOT_AUTHORIZED")}</div>;
        }
        return <div key={idx}>{t("error", "UNKNOWN_ERROR")}</div>;
      });

      setErrorMessage(messages);

      if (hasAuthError) {
        setTimeout(() => {
          removeLocalStorageToken();
          router.push("/login");
        }, 2000);
      }
      return;
    }

    //  Protocol errors
    if (CombinedProtocolErrors.is(error)) {
      const messages = error.errors.map((err, idx) => (
        <div key={idx}>{err.message}</div>
      ));
      setErrorMessage(messages);
      return;
    }

    //  Network or generic errors
    if (error instanceof Error) {
      setErrorMessage(<div>{error.message}</div>);
      return;
    }

    //  Custom error array
    if (Array.isArray(error)) {
      setErrorMessage(error.map((err, idx) => <div key={idx}>{err.message}</div>));
    }
  }, [error, router, t]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 12, sm: 13, md: 14 },
        bgcolor:
          mode === "light" ? "var(--color-grey)" : "var(--color-charcoal)",
        minHeight: "100vh",
        fontFamily: "var(--font-main)",
        transition: "background-color 0.3s ease",
        position: "relative",
      }}
    >
      {loading && <Loading text={t("common", "loading")} />}

      <Container
        maxWidth={maxWidth}
        sx={{
          bgcolor:
            mode === "light"
              ? "var(--color-white)"
              : "var(--color-charcoal-light)",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "0.2px solid #ccc",
          p: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          transition: "all 0.3s ease",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            bgcolor:
              mode === "light"
                ? "linear-gradient(90deg, var(--color-yellow), #ffb84d)"
                : "linear-gradient(90deg, var(--color-charcoal), #4a4f54)",
            p: 2,
            borderRadius: "8px",
            mb: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {PageIcon && (
              <Box
                sx={{
                  color:
                    mode === "light"
                      ? "var(--color-black)"
                      : "var(--color-yellow)",
                  "& svg": { fontSize: 28 },
                }}
              >
                {PageIcon}
              </Box>
            )}
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color:
                  mode === "light"
                    ? "var(--color-black)"
                    : "var(--color-yellow)",
              }}
            >
              {pageTitle}
            </Typography>
          </Stack>
          {ActionButton && <Box>{ActionButton}</Box>}
        </Stack>

        <Divider
          sx={{
            mb: 3,
            bgcolor: "var(--color-yellow)",
            height: "2px",
            borderRadius: "2px",
          }}
        />

        <SnackbarError message={errorMessage} />

        <Box
          sx={{
            p: { xs: 1, sm: 2 },
            bgcolor:
              mode === "light" ? "var(--color-white)" : "var(--color-charcoal)",
            borderRadius: "8px",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default BasePage;
