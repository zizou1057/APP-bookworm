import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const detailsData = [
  {
    title: "Track Every Detail",
    description: "Log your reading progress with precision. Note the page you're on, jot down thoughts as they come, and save those unforgettable quotes. BookWorm keeps all your reading notes organized.",
    image: "/placeholder.svg",
    imageAlt: "A person writing notes in a book.",
    order: "default",
  },
  {
    title: "Discover Your Next Favorite",
    description: "Our smart recommendation engine helps you find books you'll love. Based on your reading history and favorite genres, we'll suggest hidden gems and popular new releases.",
    image: "/placeholder.svg",
    imageAlt: "A collection of books on a shelf.",
    order: "reverse",
  },
  {
    title: "Visualize Your Reading Journey",
    description: "See your reading habits come to life with beautiful charts and stats. Track how many books you've read, your pace, and which genres you explore the most over time.",
    image: "/placeholder.svg",
    imageAlt: "A chart showing reading statistics.",
    order: "default",
  },
];

export const Details = () => {
  return (
    <section className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Amazing details, amazing books.</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Every feature is designed to enrich your reading experience, from the smallest note to the biggest discovery.
        </p>
      </div>
      <div className="space-y-16">
        {detailsData.map((detail) => (
          <div key={detail.title} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className={`flex justify-center ${detail.order === 'reverse' ? 'md:order-last' : ''}`}>
              <img
                src={detail.image}
                alt={detail.imageAlt}
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold">{detail.title}</h3>
              <p className="text-muted-foreground">{detail.description}</p>
              <Button variant="link" asChild className="px-0">
                <Link to="#">Learn More</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};