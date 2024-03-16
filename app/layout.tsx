"use client";


import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Analytics } from "@vercel/analytics/react"



const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html suppressHydrationWarning lang="en" dir="rtl">
      
      <head/>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          {children}
        </Providers>

        <Analytics/>
      </body>
    </html>
  );
}

import { Providers } from "./providers";import { useEffect } from "react";
import Script from "next/script";

