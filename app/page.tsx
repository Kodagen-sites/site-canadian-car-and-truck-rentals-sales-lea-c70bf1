import Hero from "@/components/sections/Hero";
import ServiceGrid from "@/components/sections/ServiceGrid";
import Benefits from "@/components/sections/Benefits";
import Process from "@/components/sections/Process";
import InventoryTeaser from "@/components/sections/InventoryTeaser";
import CtaBlock from "@/components/sections/CtaBlock";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <Benefits />
      <Process />
      <InventoryTeaser />
      <CtaBlock />
    </>
  );
}
