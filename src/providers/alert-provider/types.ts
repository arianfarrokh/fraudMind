// export interface AlertProps {
//   message: string;
//   duration: number;
//   severity?: 'success' | 'error' | 'warning' | 'info';
// }

import { AlertProps } from "@mui/material";
import React from "react";


export interface AlertComponentProps extends AlertProps {
  onClose?: () => void;
  duration?:number
  message: string | React.ReactNode

}
