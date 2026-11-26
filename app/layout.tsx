import type { Metadata, Viewport } from "next";
import { ColorSchemeScript } from "@mantine/core";
import { AppProviders, ServiceWorkerRegistration } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ubique Prayer",
  description: "함께 기도하는 공간",
  appleWebApp: { capable: true, title: "Ubique Prayer" },
  icons: { apple: "/icons/prayer-180.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3b7556",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <AppProviders>
          <ServiceWorkerRegistration />
          <div className="app-shell">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
