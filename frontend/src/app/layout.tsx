import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./component/Header";
import Footer from "./component/Footer";
import ConditionalLayout from "./ConditionalLayout";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shivananda Marketing Pvt. Ltd.",
  description: "Shivananda",
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
