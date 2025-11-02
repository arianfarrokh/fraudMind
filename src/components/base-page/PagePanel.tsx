import React, { PropsWithChildren } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MdExpandMore } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { useThemeContext } from "@/theme/ThemeContext";

type Props = PropsWithChildren & {
  title: string;
  titleColor?: string;
  actionButtons?: React.ReactNode;
};

const PagePanel: React.FC<Props> = ({
  title,
  actionButtons,
  children,
  titleColor,
}) => {
  const { mode } = useThemeContext();
  return (
    <React.Fragment>
      <Accordion
        defaultExpanded
        sx={{
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          overflow: "hidden",
          mb: 2,
          bgcolor: "var(--color-white)",
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          sx={{
            backgroundColor: "var(--color-yellow)",
            px: 2,
            py: 0.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <FaTableList
              style={{
                color:
                  mode === "light"
                    ? "var(--color-black)"
                    : "var(--color-white)",
              }}
            />
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color={titleColor}
            >
              {title}
            </Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            px: 2,
            py: 1.5,
            bgcolor:
              mode === "light" ? "var(--color-white)" : "var(--color-black)",
          }}
        >
          {children}
        </AccordionDetails>
      </Accordion>

      {actionButtons && (
        <Card
          sx={{
            borderRadius: 2,
            bgcolor: "var(--color-white)",
            boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              py: 1,
              px: 2,
            }}
          >
            {actionButtons}
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default PagePanel;
