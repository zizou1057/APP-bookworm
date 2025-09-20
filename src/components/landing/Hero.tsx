import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Track Your Reading, Discover New Books
          </h1>
          <p className="text-lg text-muted-foreground">
            BookWorm is the ultimate companion for book lovers. Organize your library, track your reading progress, and get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link to="/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/hero-image.svg"
            alt="A person reading a book"
            className="max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </section>
  );
};