import { PROJECT_DESCRIPTION, PROJECT_TITLE } from "@/utils/constant";
import { Metadata } from "next";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: `${PROJECT_TITLE} | جداول`,
  description: PROJECT_DESCRIPTION,
};
