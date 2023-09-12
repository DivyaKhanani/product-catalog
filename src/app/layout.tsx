"use client";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import StoreProvider from "@/store/StoreProvider";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

interface IRootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <div className="min-h-full">
          <StoreProvider>
            <Navbar />
            <main>
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <ToastContainer position="bottom-right" />
          </StoreProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;