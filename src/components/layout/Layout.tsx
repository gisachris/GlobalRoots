import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { usePageTransition } from "../../utils/animation";
import { PageTransition } from "../../utils/pageTransition";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  usePageTransition();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <main className="flex-grow">
          <PageTransition key={location.pathname}>{children}</PageTransition>
        </main>
      </div>
      <Footer />
    </div>
  );
};
