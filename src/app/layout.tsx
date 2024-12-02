import "./globals.css";
import classNames from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "trueberryless",
  description: "A portfolio website for Felix Schneider",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClasses = classNames(inter.className);

  return (
    <html lang="en" className="scrollbar-hide scroll-smooth">
      <body className={bodyClasses}>{children}</body>
    </html>
  );
}
