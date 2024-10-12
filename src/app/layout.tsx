import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fas, faTrash, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

config.autoAddCss = false;
library.add(fas, faTrash, faLocationPin);

export const metadata: Metadata = {
  title: "Location Selector",
  description: "Selecting multiple locations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto m-4`}
      >
        {children}
      </body>
    </html>
  );
}
