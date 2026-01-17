import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Testimonials } from "@/components/landing/Testimonials";
import { Details } from "@/components/landing/Details";
import { CallToAction } from "@/components/landing/CallToAction"; // Import the new component

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Details />
        <Testimonials />
        <CallToAction /> {/* Add the new CallToAction component here */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;