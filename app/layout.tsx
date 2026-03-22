import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Platinum",
  description: "หน้าร้าน Platinum สไตล์ Y2K โมเดิร์นสำหรับอีคอมเมิร์ซ"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
