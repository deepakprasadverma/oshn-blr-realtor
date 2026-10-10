import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import AdvancedSearchFilter from "../components/AdvancedSearchFilter";
import LocalitiesSection from "../components/LocalitiesSection";
import BuyersRoute from "../components/BuyersRoute";
import EmiCalculator from "../components/EmiCalculator";
import BuildersShowcase from "../components/BuildersShowcase";
import InTheNews from "../components/InTheNews";
import CompanyStats from "../components/CompanyStats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <SearchSection />
      <AdvancedSearchFilter />
      <LocalitiesSection />
      <BuyersRoute />
      <EmiCalculator />
      <BuildersShowcase />
      <InTheNews />
      <CompanyStats />
      <Testimonials />
      <CTA />
      <Contact />
    </div>
  );
}