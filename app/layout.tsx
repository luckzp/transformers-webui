import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Aside from "./components/aside";
import ClientLayout from "./ClientLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "Transformers WebUI",
  description: "Powered by Transformers.js",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId="710434249488-aei4ud4vfoglsk0pk818ebjal0elfepc.apps.googleusercontent.com">
          <div className="flex">
            <Aside />
            <AntdRegistry>
              <ClientLayout>{children}</ClientLayout>
            </AntdRegistry>
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
