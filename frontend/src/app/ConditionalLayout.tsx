"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if the current path is an admin route
  const isAdminRoute = pathname?.startsWith('/dashboard') || pathname?.startsWith('/login');
  
  if (isAdminRoute) {
    // For admin routes, don't show header/footer
    return <>{children}</>;
  }
  
  // For regular routes, show header and footer
  return (
    <>
      <Header />
      {children}
      <a
        href="https://wa.me/+919205992676"
        target="_blank"
        rel="noopener noreferrer"
        className="size-12 rounded-full fixed bottom-5 right-5 bg-slate-200 cursor-pointer shadow-2xl flex items-center justify-center hover:bg-slate-100 transition-colors"
      >
        <FaWhatsapp size={28} color="green" />
      </a>
      <Footer />
    </>
  );
}
