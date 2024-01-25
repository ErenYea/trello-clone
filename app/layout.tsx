import type { Metadata } from "next";
import "./globals.css";
import Modal from "@/components/Modal";

export const metadata: Metadata = {
  title: "Trello Clone",
  description: "Generated by Hamza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#F5F6F8]">
        {children}
        <Modal />
      </body>
    </html>
  );
}
