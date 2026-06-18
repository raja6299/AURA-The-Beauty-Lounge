import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import BridalLuxury from "@/components/home/BridalLuxury";
import OffersPromo from "@/components/home/OffersPromo";
import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Stats />
      <OffersPromo />
      <ServicesShowcase />
      <BridalLuxury />
      <Testimonials />
    </main>
  );
}
