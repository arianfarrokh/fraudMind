import "@/app/globals.css";
import type { Metadata } from "next";
import RootProvider from "@/providers/RootProvider";

export const metadata: Metadata = {
  title: "Fraud Mind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
