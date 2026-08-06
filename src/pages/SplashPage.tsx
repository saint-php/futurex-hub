import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import FeatureGrid from "../components/home/FeatureGrid";
import CTASection from "../components/home/CTASection";

export default function SplashPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <CTASection />
    </main>
  );
}