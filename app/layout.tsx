import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valtomatic — Hamarosan",
  description: "Váltás fiat és crypto között, gyorsan, egyszerűen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hu"><body>{children}</body></html>;
}
