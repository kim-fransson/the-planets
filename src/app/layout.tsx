import type { Metadata } from "next";
import { Antonio, League_Spartan } from "next/font/google";
import "./globals.css";
import ThemeSetter from "./components/ThemeSetter";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
});

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Planets",
  description: "8-page fact site for all planets in our solar system.",
  icons: {
    icon: [
      {
        url: "/favicons/galaxy.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${antonio.variable} ${spartan.variable}`}>
        <ThemeSetter />
        {children}
      </body>
    </html>
  );
}
