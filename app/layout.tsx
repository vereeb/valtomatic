import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bridge Exchange",
  description: "Non-custodial fiat-crypto átváltó felület vázlata",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hu"><body>{children}</body></html>;
}
