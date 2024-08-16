import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";

const montserrat = Montserrat({ weight: '500', subsets: ["latin"] });

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
      <body className={montserrat.className}>
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <div className="grow h-screen max-h-screen overflow-auto bg-slate-100">
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
