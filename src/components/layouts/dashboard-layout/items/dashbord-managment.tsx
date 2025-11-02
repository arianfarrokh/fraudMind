import { ListItem } from "./types";
import { FcStatistics } from "react-icons/fc";
import { FaChartLine } from "react-icons/fa";
import { PiUserSoundFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";




export const dashbordmanagmentItems: ListItem[] = [
  {
    textKey: "General-statistics",
    to: "/base-info/dashboard/", 
    icon: <FcStatistics size={18} />,
  },
  {
   textKey: "Sales-chart",
   icon: <FaChartLine  fontSize={18} />,
   to: "/under-constructor",
 },
  {
    textKey: "Buyer-satisfaction",
    icon: <PiUserSoundFill size={18} />,
    to: "/under-constructor", 
  },
  {
    textKey: "notification",
    icon: <IoIosNotifications size={18} />,
    to: "/under-constructor", 
  },
];