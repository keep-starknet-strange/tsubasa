import type { Metadata } from "next";
import localFont from "next/font/local";

import Providers from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tsubasa",
  description: "Tsubasa game application",
};

const newAirportDotFont = localFont({
  src: [
    {
      path: "../font/NewAirport/NewAirport-Dot1.otf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../font/NewAirport/NewAirport-Dot2.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../font/NewAirport/NewAirport-Dot3.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../font/NewAirport/NewAirport-Dot4.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../font/NewAirport/NewAirport-Dot5.otf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-new-airport",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-green-400 text-white ${newAirportDotFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
