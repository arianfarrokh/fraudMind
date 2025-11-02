import React from "react";
import { ListItem as ListItemType } from "./items/types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "@/providers/translation";
import Link from "next/link";
import { useThemeContext } from "@/theme/ThemeContext";

type Props = {
  listItems: ListItemType[];
  onCloseDrawer: React.ReactEventHandler<object>;
};

const MenuListItems: React.FC<Props> = ({ listItems, onCloseDrawer }) => {
  const { t } = useTranslation("form");
  const { mode } = useThemeContext();

  return (
    <>
      {listItems.map((item, index) => (
        <ListItem
          key={index}
          // disablePadding
          sx={{
            display: "block",
            color: "var(--color-yellow)",
          }}
        >
          <ListItemButton
            onClick={onCloseDrawer}
            LinkComponent={Link}
            href={item.to ?? "/"}
            disabled={!item.to}
            sx={{
              minHeight: 26,
              py:0,
              my:0,
              px: 2.5,
              ml: 1,
              color: "var(--color-white)",
              "&:hover": {
                bgcolor: "var(--color-hover-black)",
                color: "var(--color-white)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  mode === "dark"
                    ? "var(--color-white)"
                    : "var(--color-yellow)",
                minWidth: 40,
                "&:hover": { color: "var(--color-white)" },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              //@ts-expect-error - ignore translation key type check
              primary={t("form", item.textKey)}
              primaryTypographyProps={{
                sx: {
                  fontSize: "0.8rem",
                  color:
                    mode === "light"
                      ? "var(--color-white)"
                      : "var(--color-yellow)",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

export default MenuListItems;
