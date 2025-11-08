"use client";

import { useTranslation } from "@/providers/translation";
import { useThemeContext } from "@/theme/ThemeContext";
import {
  Box,
  Grid,
  keyframes,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
// import {
//   BarChart,
//   barElementClasses,
//   chartsTooltipClasses,
//   LineChart,
//   ScatterChart,
// } from "@mui/x-charts";
// import { axisClasses } from "@mui/x-charts/ChartsAxis";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { FaUserSecret } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { TbMilitaryRank } from "react-icons/tb";
import { GrFormView } from "react-icons/gr";

export default function Home() {
  const { mode } = useThemeContext();
  const { t } = useTranslation("common", "form", "enum", "error");

  const theme = useTheme();

  // * ---------------------------- first chart------------------------------
  const [chart1, setChart1] = React.useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [
      {
        name: "کل تراکنش ها",
        data: [50, 10, 20, 50, 40, 55, 12],
      },
      {
        name: "تراکنش های مشکوک",
        data: [2, 60, 10, 30, 20, 65, 10],
      },
      {
        name: "تاکنش های تایید شده تقلب",
        data: [5, 25, 30, 2, 55, 60, 23],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#008efba8", "#0036e7ff", "#0d774bff"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
        labels: {
          show: false, // 👈 فقط نمایش تاریخ‌ها خاموش می‌شه
        },
      },
      tooltip: {
        // x: {
        //   format: "dd/MM/yy HH:mm",
        // },
      },
    },
  });
  React.useEffect(() => {
    setChart1((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        chart: {
          ...prev.options.chart,
          background: mode === "dark" ? "#323547" : "#fff",
        },
        xaxis: {
          ...prev.options.xaxis,
          labels: { style: { colors: mode === "dark" ? "#fff" : "#000" } },
        },
        yaxis: {
          ...prev.options.yaxis,
          labels: { style: { colors: mode === "dark" ? "#fff" : "#000" } },
        },
        legend: {
          ...prev.options.legend,
          labels: { colors: mode === "dark" ? "#fff" : "#000" },
        },
        tooltip: {
          theme: mode === "dark" ? "dark" : "light",
        },
        grid: {
          borderColor: mode === "dark" ? "#fffefeff" : "#e0e0e0",
        },
      },
    }));
  }, [mode]);

  // * ------------------------------ second chart---------------------------------

  const [chart2, setChart2] = React.useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [
      {
        name: "Servings",
        data: [44, 55, 41, 67, 22, 43],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false, // ✅ زوم غیرفعال
        },
        toolbar: {
          show: false, // ✅ آیکون‌ها حذف می‌شن
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"], // alternating row colors
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
          style: {
            colors: "#333", // رنگ متن برچسب‌ها
          },
        },
        categories: [
          "سناریو یک",
          "سناریو دو",
          "سناریو سه",
          "سناریو چهار",
          "سناریو پنج",
          "سناریو شش",
        ],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: undefined,
          style: {
            color: "#555",
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
      },
    },
  });

  React.useEffect(() => {
    setChart2((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        chart: {
          ...prev.options.chart,
          background: mode === "dark" ? "#323547" : "#fff", // 🌓 پس‌زمینه چارت
        },
        xaxis: {
          ...prev.options.xaxis,
          labels: {
            ...prev.options.xaxis?.labels,
            style: {
              colors: mode === "dark" ? "#fff" : "#333", // 🧾 رنگ برچسب‌های محور X
            },
          },
          axisBorder: {
            color: mode === "dark" ? "#555" : "#ccc",
          },
          axisTicks: {
            color: mode === "dark" ? "#555" : "#ccc",
          },
        },
        yaxis: {
          ...prev.options.yaxis,
          labels: {
            style: {
              colors: mode === "dark" ? "#ffffffff" : "#333", // رنگ برچسب‌های محور Y
            },
          },
        },
        grid: {
          ...prev.options.grid,
          row: {
            colors:
              mode === "dark"
                ? ["rgba(255, 255, 255, 0)", "rgba(30, 30, 30, 0)"]
                : ["#fff", "#f2f2f2"],
          },
        },
        tooltip: {
          ...prev.options.tooltip,
          theme: mode === "dark" ? "dark" : "light", // 🎨 تم تول‌تیپ
        },
        legend: {
          ...prev.options.legend,
          labels: {
            colors: mode === "dark" ? "#eee" : "#333",
          },
        },
      },
    }));
  }, [mode]);

  // * -------------------------------- third chart------------------------------
  const [chart3, setChart3] = React.useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [76, 67, 61, 90],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "16px",
            formatter: function (seriesName: string, opts: any) {
              return `${seriesName}: ${
                opts.w.globals.series[opts.seriesIndex]
              }`;
            },
          } as any, // 👈 چون barLabels در تایپ رسمی ApexOptions نیست، باید cast کنیم
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: [
        "سناریو غیر عادی",
        "ورود آی پی مشکوک",
        "چند حساب مشابه",
        "رفتار رباتی",
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  });

  // تشخیص اندازه صفحه نمایش با useMediaQuery
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // تنظیم عرض و ارتفاع به‌صورت پویا
  const chartWidth = isSmallScreen ? 250 : isMediumScreen ? 400 : 600;
  const chartHeight = isSmallScreen ? 200 : isMediumScreen ? 250 : 400;

  const fadeIn = keyframes`
     0% { opacity: 0; transform: translateY(20px); }
     100% { opacity: 1; transform: translateY(0); }
   `;

  const params = {
    xAxis: [{ data: [1, 2, 3, 5, 8, 10] }],
    series: [{ data: [2, 5.5, 2, 8.5, 1.5, 5] }],
    axisHighlight: { x: "line" },
    colors: ["#457b9d"],
  } as const;

  const barChartsParams = {
    xAxis: [{ data: ["آهن", "ابزار", "گچ", "سیمان", "سنگ"] }],
    series: [{ data: [55, 30, 22, 11, 25], stack: "1" }],
    hideLegend: false,
    colors: ["#457b9d"],
  };

  return (
    <>
      <Box
        sx={{
          animation: `${fadeIn} 1s ease-in-out`,
        }}
      >
        <Typography variant="h5" fontWeight="bold" my={5} ml={2}>
          داشبورد
        </Typography>
        {/* //!----------------------------------card headears---------------------------------------- */}
        <Grid container justifyContent={"center"} spacing={2} mb={2}>
          {/* //* -----------------------first card------------------------------------------------ */}
          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 3,
              }}
            >
              <Stack direction={"row"}>
                <GrFormView size={25} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, ml: 1 }}
                >
                  میزان بازدید
                </Typography>
              </Stack>

              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                4,400,000
              </Typography>
              <Box
                sx={{
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  color: "success.main",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <TrendingUp size={16} /> +12%
              </Box>
            </Paper>
          </Grid>

          {/* //* ------------------------second card------------------------------------------------ */}

          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 3,
                minHeight: 120,
              }}
            >
              <Stack direction={"row"}>
                <TbMilitaryRank size={20} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, ml: 1 }}
                >
                  نرخ بازگشت
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                8.4%
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                  color: "error.main",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <TrendingDown size={16} /> -3.2%
              </Box>
            </Paper>
          </Grid>

          {/* //*-------------------------third card------------------------------------------------ */}
          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 3,
              }}
            >
              <Stack direction={"row"}>
                <FcSalesPerformance size={20} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, ml: 1 }}
                >
                  فروش امروز
                </Typography>
              </Stack>

              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                1,280,000 تومان
              </Typography>
              <Box
                sx={{
                  gap: 0.5,
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  color: "success.main",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <TrendingUp size={16} /> +6.8%
              </Box>
            </Paper>
          </Grid>

          {/* //*----------------------four card------------------------------------------------ */}
          <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 3,
              }}
            >
              <Stack direction={"row"}>
                <FaUserSecret size={18} />
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, ml: 1 }}
                >
                  کاربران فعال
                </Typography>
              </Stack>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                12,430
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                  color: "error.main",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <TrendingDown size={16} /> -1.7%
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h5" fontWeight="bold" mb={2} ml={2}></Typography>
        <Grid container justifyContent={"center"} spacing={2}>
          {/* //! --------------------------------------------first chart------------------------------------------------ */}
          <Grid size={8}>
            <Paper
              sx={{
                py: 1.5,
                mx: 2,
                my: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"} px={2} py={2}>
                روند تراکنش‌ها و موارد مشکوک در ۲۴ ساعت گذشته
              </Typography>
              <Box>
                <Box id="chart">
                  <ReactApexChart
                    options={chart1.options}
                    series={chart1.series}
                    type="area"
                    height={350}
                  />
                </Box>
                <div id="html-dist"></div>
              </Box>
            </Paper>
          </Grid>
          {/* //! -------------------------------------------------second chart------------------------------------------------ */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Paper
              sx={{
                m: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"} px={2} py={2}>
                نرخ کشف تقلب در سناریوها
              </Typography>
              <Box>
                <Box id="chart" pb={3}>
                  <ReactApexChart
                    options={chart2.options}
                    series={chart2.series}
                    type="bar"
                    height={350}
                  />
                </Box>
                <div id="html-dist"></div>
              </Box>
            </Paper>
          </Grid>
          {/* //! --------------------------------------------------third chart------------------------------------------------ */}
          <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
            <Paper
              sx={{
                m: 2,
              }}
            >
              <Typography variant="h6" fontWeight={"bold"} px={2} py={2}>
                توزیع تقلب بر اساس نوع سناریو
              </Typography>
              <Box>
                <Box id="chart">
                  <ReactApexChart
                    options={chart3.options}
                    series={chart3.series}
                    type="radialBar"
                    height={390}
                  />
                </Box>
                <div id="html-dist"></div>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
