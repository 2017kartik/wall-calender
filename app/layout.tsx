import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wall Calendar",
  description: "Interactive wall calendar with date range selection and notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
