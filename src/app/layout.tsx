import RootLayout from "@/components/layouts/root-layout/RootLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>{children}</RootLayout>
  );
}
