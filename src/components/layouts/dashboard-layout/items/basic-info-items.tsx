import React from "react";
import { ListItem } from "./types";
import { MdMap, MdLocationCity, MdCategory } from "react-icons/md";
import { FaRulerCombined, FaTags } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";

export const basicInfoItems: ListItem[] = [
  {
    textKey: "provinces",
    icon: <MdMap  fontSize={18} />,
    to: "/base-info/dashboard/provinces",
  },
  {
    textKey: "cities",
    icon: <MdLocationCity  fontSize={18} />,
    to: "/base-info/dashboard/cities",
  },
  {
    textKey: "tags",
    icon: <FaTags  fontSize={18} />,
    to: "/base-info/dashboard/tags",
  },
  {
    textKey: "colors",
    icon: <IoColorPalette  fontSize={18} />,
    to: "/base-info/dashboard/colors",
  },
  {
    textKey: "product-categories",
    icon: <MdCategory  fontSize={18} />,
    to: "/base-info/dashboard/product-categories",
  },
 {
    textKey: "units",
    icon: <FaRulerCombined  fontSize={18} />,
    to: "/base-info/dashboard/units",
  },
];
