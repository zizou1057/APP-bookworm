import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const detailsData = [
  {
    title: "Track Every Detail",
    description: "Log your reading progress with precision. Note the page you're on, jot down thoughts as they come, and save those unforgettable quotes. BookWorm keeps all your reading notes organized.",
    image: "/placeholder.svg",
    reverse: false,
  },
  {
    badge: "AI-Powered",
    title: "Discover Your Next Favorite",
    description: "Our smart recommendation engine helps you find books you'll love. Based on your reading history and favorite genres, we'll suggest hidden gems and popular new releases.",
    image: "/placeholder.svg",
    reverse: true,
  },
  {
    title: "Visualize Your Reading Journey",
    description: "See your reading habits come to life with beautiful charts and stats. Track how many books you've read, your pace, and which genres you explore the most over time.",
    image: "/placeholder.svg",
    reverse: false,
  },
];

export const Details = () => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Amazing details, amazing books.
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Every feature is designed to enrich your reading experience, from the smallest note to the biggest discovery.
          </p>
        </div>
        <div className="space-y-16 md:space-y-24">
          {detailsData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                item.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg shadow-lg w-full max-w-md"
                />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                <Button variant="link" className="p-0 h-auto text-base">Learn More</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};