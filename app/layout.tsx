import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Aside from "./components/aside";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Transformers WebUI",
  description:
    "Interactive web interface for running Transformers.js models. Perform machine learning tasks directly in your browser.",
  keywords: "transformers.js, machine learning, AI, web interface, browser ML",
  icons: {
    icon: "/logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
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
