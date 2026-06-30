import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import About from "@/components/About";
import Territorio from "@/components/Territorio";
import Products from "@/components/Products";
import ShopBadge from "@/components/ShopBadge";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";

const marqueeItems = [
  "Vinos de Finca 4 Elementos",
  "Mendoza · Valle de Uco",
  "Baja intervención",
  "Botellas numeradas a mano",
  "Edición limitada",
];

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />
      <Marquee items={marqueeItems} />
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <About />
        <Territorio />
        <Products />
        <ShopBadge />
        <ContactCTA />
      </main>
      <Footer />
      <ProgressIndicator />
    </>
  );
}
