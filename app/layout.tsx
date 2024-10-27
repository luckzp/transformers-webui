import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Aside from "./components/aside";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Transformers WebUI",
  description: "Power by Transformers.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <Aside />
        <AntdRegistry>{children}</AntdRegistry>
      </body>
      <GoogleAnalytics gaId="G-2QDW4HK465" />
    </html>
  );
}
