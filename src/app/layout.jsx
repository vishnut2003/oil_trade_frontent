import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header"
import { Viewport } from 'next';

const poppins = Poppins({ weight: '500', subsets: ["latin"] });

export const metadata = {
  title: "Trade Oil",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex">
          <div className="min-w-60 h-screen max-h-screen shadow-xl p-4 overflow-auto">
            <Sidebar />
          </div>
          <div className="grow h-screen max-h-screen bg-slate-100">
            <Header />
            <div className="p-3">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
