import { Antonio, League_Spartan } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

import ThemeSetter from "./components/ThemeSetter";
import { ClientProviders } from "./providers";

import data from "./data.json";
import { LocalizedStringProvider } from "react-aria-components/i18n";
import Link from "./components/navigation/Link";
import MobileMenu from "./components/navigation/MobileMenu";

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
        <LocalizedStringProvider locale="en" />
        <ClientProviders>
          <nav className={styles.navbar}>
            <span className={styles.logo}>the planets</span>

            <ul className={styles.list}>
              {data.map((planet) => (
                <li className={styles.listItem} key={planet.name}>
                  <Link href={`/${planet.name}`}>{planet.name}</Link>
                </li>
              ))}
            </ul>

            <MobileMenu />
          </nav>
          {children}
        </ClientProviders>
        <ThemeSetter />
      </body>
    </html>
  );
}
