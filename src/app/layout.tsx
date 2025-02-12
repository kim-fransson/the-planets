import { Antonio, League_Spartan } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

import ThemeSetter from "./components/ThemeSetter";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
});

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${antonio.variable} ${spartan.variable}`}>
        <ThemeSetter />
        <header className={styles.header}>
          <span className={styles.logo}>the planets</span>
        </header>
        {children}
      </body>
    </html>
  );
}
