import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Applet Hub",
  description: "A home for small, useful web applets built with your AI agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
