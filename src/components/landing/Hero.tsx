import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Unlock a World of Stories with BookWorm
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Your personal reading companion. Track your progress, discover new books, and connect with a community of readers.
          </p>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/login">Get Started for Free</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <img
          src="/placeholder.svg"
          alt="BookWorm App Screenshot"
          className="rounded-lg shadow-xl mt-12"
          width={800}
          height={600}
          style={{
            aspectRatio: "800/600",
            objectFit: "cover",
          }}
        />
      </div>
    </section>
  );
};