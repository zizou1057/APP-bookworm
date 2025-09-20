import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
          Never Lose Track of a Book Again
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          BookWorm helps you organize your reading life. Effortlessly manage your reading list, track your progress, and rediscover the joy of reading.
        </p>
        <div className="mt-6 flex gap-4 justify-center md:justify-start">
          <Button size="lg" asChild>
            <Link to="/signup">Get Started for Free</Link>
          </Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/placeholder.svg"
          alt="App Preview"
          className="w-full max-w-md rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};