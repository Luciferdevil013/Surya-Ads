import { useEffect } from "react";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import { initAnalytics } from "@/lib/tracking";

const Index = () => {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className="bg-hero flex min-h-screen min-h-dvh flex-col items-center px-5 pb-[calc(40px+env(safe-area-inset-bottom))] pt-7">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
