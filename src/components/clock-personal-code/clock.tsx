"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles"; 

type ClockProps = {
  showSeconds?: boolean;
  hour12?: boolean;
};

const Clock = ({ showSeconds = true, hour12 = false }: ClockProps) => {
  const [now, setNow] = useState<Date>(() => new Date());
  const [today, setToday] = useState<string>("");

  const theme = useTheme(); 
  const isDark = theme.palette.mode === "dark";

  // آپدیت ساعت
  useEffect(() => {
    const timer = setInterval(
      () => setNow(new Date()),
      showSeconds ? 1000 : 30_000
    );
    return () => clearInterval(timer);
  }, [showSeconds]);

  // ساعت
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12,
    timeZone: "Asia/Tehran",
  };
  const formattedTime = new Intl.DateTimeFormat("fa-IR", timeOptions).format(
    now
  );

  // تاریخ شمسی (YYYY/MM/DD)
  useEffect(() => {
    const updateDate = () => {
      const formatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long", 
        calendar: "persian",
        timeZone: "Asia/Tehran",
      });

      const parts = formatter.formatToParts(new Date());
      const year = parts.find((p) => p.type === "year")?.value;
      const month = parts.find((p) => p.type === "month")?.value;
      const day = parts.find((p) => p.type === "day")?.value;
      const weekday = parts.find((p) => p.type === "weekday")?.value;

      setToday(`${weekday}  ${year}/${month}/${day} `);
    };

    updateDate();
    const dateTimer = setInterval(updateDate, 60_000);
    return () => clearInterval(dateTimer);
  }, []);

  return (
    <Card
      sx={{
        borderRadius:3,
        width:{xs:200 , sm:200 , md:300 , lg:400},
        textAlign: "center",
        bgcolor: isDark ? "grey.900" : "grey.50", 
      }}
    >
      <CardContent>
        <Typography
          fontWeight="bold"
          sx={{
            fontSize:{xs:"2rem" , sm:"2rem" , md:"2.5rem" , lg:"3rem"},
            p:5,
            color: theme.palette.text.primary, 
          }}
        >
          {formattedTime}

          <Typography
            sx={{
              fontSize:{xs:"1.2rem" , sm:"1.3rem" , md:"1.5rem" , lg:"1.7rem"},
              color: theme.palette.text.secondary, 
            }}
          >
            {today}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Clock;

