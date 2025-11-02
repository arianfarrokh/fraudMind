"use client";

import {
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { FaEye, FaEyeSlash, FaUserSecret } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/providers/translation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { setLocalStorageToken } from "@/auth/localStorageToken";
import { FullWidthTextField } from "@/components";
import { useMutation } from "@apollo/client/react";
import { LOGIN_BY_USERNAME } from "./graphql";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation("common", "enum", "error", "form");

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [loginByUserName, { loading }] =
    useMutation<LoginResponse>(LOGIN_BY_USERNAME);

  const validationSchema = yup.object({
    username: yup.string().required(t("error", "required-field")),
    password: yup.string().required(t("error", "required-field")),
  });

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      try {
        const { data } = await loginByUserName({
          variables: {
            input: {
              userName: values.username,
              password: values.password,
            },
          },
        });

        const result = data?.loginByUserName?.result;

        if (result?.success && result?.token) {
          setLocalStorageToken(result.token);
          router.push("/dashboard");
        } else {
          setServerError(result?.message || t("error", "invalid-login"));
        }
      } catch (err) {
        setServerError(t("error", "NETWORK_ERROR"));
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Grid
      container
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "flex-start",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/images/security5.jpg")',
          backgroundSize: "100%", // کمی زوم‌شده اول کار
          backgroundPosition: "center 60%",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.9)", // کمی تیره‌تر برای خوانایی
          transform: "scale(1.1)",
          opacity: 0,
          transition: "transform 3s ease-out, opacity 2s ease-out",
          zIndex: -1,
          animation: "zoomFade 3s ease-out forwards",
        },
        "@keyframes zoomFade": {
          "0%": { transform: "scale(1.1)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      }}
    >
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          display: "flex",
          padding: { xs: 1, md: 5 },
          alignItems: "center",
          backgroundColor: "rgba(200, 200, 200, 0.1)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            flexGrow: 1,
            textAlign: "left",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            marginBottom={5}
            sx={{
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              color: "#fff",
              textAlign: "center",
            }}
          >
            {t("form", "login-to-user")}
          </Typography>

          {serverError && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                color: "#fff",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            >
              {serverError}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, md: 4 },
              mt: 2,
            }}
          >
            {/* 🔹 نام کاربری */}
            <FullWidthTextField
              label="نام کاربری"
              name="username"
              variant="standard"
              formik={formik}
              fullWidth
              autoComplete="off"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <FaUserSecret color="#fff" fontSize={20} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& label": { color: "#fff" },
                "& input": { color: "#fff" },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                  "&:before, &:after": { borderBottom: "1px solid #fff" },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "1px solid #fff",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ffcccc",
                  fontSize: "16px",
                },
              }}
            />

            {/* 🔹 رمز عبور */}
            <FullWidthTextField
              label="کلمه عبور"
              name="password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              formik={formik}
              fullWidth
              autoComplete="new-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        sx={{ color: "#fff" }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                "& label": { color: "#fff" },
                "& input": { color: "#fff" },
                "& .MuiInputBase-root": {
                  backgroundColor: "transparent",
                  "&:before, &:after": { borderBottom: "1px solid #fff" },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "1px solid #fff",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#ffcccc",
                  fontSize: "16px",
                },
              }}
            />

            {/* 🔘 دکمه ورود */}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: 2,
                backgroundColor: "#7F0924FF",
                mt: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.2 },
                fontSize: { xs: "0.85rem", md: "1rem" },
                fontWeight: 500,
                color: "#fff",
                "&:hover": { backgroundColor: "#BB0C35FF" },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  transform: "translateX(-5px)",
                }}
              >
                {loading ? t("common", "loading") : t("common", "enter")}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
