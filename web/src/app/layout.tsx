import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ProgressBar } from "@/components/common/ProgressBar";

const geistSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Mock Interview - Luyện tập phỏng vấn cùng AI",
  description: "Nền tảng phỏng vấn AI giúp bạn cải thiện kỹ năng phỏng vấn và tăng cơ hội được tuyển dụng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-center" richColors />
        <ProgressBar />
      </body>
    </html>
  );
}
