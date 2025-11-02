import { ListItem } from "./types";
import { BsBoxSeam} from "react-icons/bs";
import { MdFeaturedPlayList } from "react-icons/md";

export const productManagementItems: ListItem[] = [
  {
    textKey: "products",
    to: "/base-info/dashboard/product-management/product", 
    icon: <BsBoxSeam size={18} />,
  },
   {
    textKey: "features",
    icon: <MdFeaturedPlayList  fontSize={18} />,
    to: "/base-info/dashboard/product-management/features",
  }
];
