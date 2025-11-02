import { PROJECT_DESCRIPTION, PROJECT_TITLE } from "@/utils/constant";
import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

/**
 * * Layout component for the "cities" section
 * ? Wraps all children pages with RootLayout (shared header, sidebar, footer, etc.)
 */
const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  return <>{children}</>;
};

export default Layout;

/**
 * * Layout component for the "cities" section
 * ? Wraps all children pages with RootLayout (shared header, sidebar, footer, etc.)
 */
export const metadata: Metadata = {
  title: `${PROJECT_TITLE} |  صفحه ورود   `,
  description: PROJECT_DESCRIPTION,
};
