import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import ServiceGrid from "@/components/sections/ServiceGrid";
import FleetClasses from "@/components/sections/FleetClasses";
import Benefits from "@/components/sections/Benefits";
import InventoryTeaser from "@/components/sections/InventoryTeaser";
import MotionBeam from "@/components/sections/MotionBeam";
import CtaBlock from "@/components/sections/CtaBlock";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <HeroScrollVideo />
        <ServiceGrid />
        <FleetClasses />
        <Benefits />
        <MotionBeam />
        <InventoryTeaser />
        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
