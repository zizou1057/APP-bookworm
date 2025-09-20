import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Book Club President",
    avatar: "/placeholder.svg",
    testimonial: "BookWorm has revolutionized how our book club operates. Sharing notes and keeping track of our reading list has never been easier. A must-have for any serious reader!",
  },
  {
    name: "Michael B.",
    role: "Avid Reader",
    avatar: "/placeholder.svg",
    testimonial: "I've tried every reading tracker out there, and BookWorm is by far the most intuitive and beautifully designed. The analytics are a fantastic touch!",
  },
  {
    name: "Jessica L.",
    role: "Librarian",
    avatar: "/placeholder.svg",
    testimonial: "As a librarian, I recommend BookWorm to all my patrons. It's a fantastic tool for encouraging reading and helping people discover new books.",
  },
  {
    name: "David R.",
    role: "Student",
    avatar: "/placeholder.svg",
    testimonial: "This app is a lifesaver for my literature classes. I can keep all my notes, quotes, and progress in one place. It makes studying so much more organized.",
  },
  {
    name: "Emily C.",
    role: "Author",
    avatar: "/placeholder.svg",
    testimonial: "I love seeing how readers engage with books on BookWorm. The community features are wonderful for connecting with fellow book lovers.",
  },
  {
    name: "Chris P.",
    role: "Casual Reader",
    avatar: "/placeholder.svg",
    testimonial: "I wasn't a big reader before, but BookWorm's goal-setting and reminders have helped me build a consistent reading habit. It's simple and effective.",
  },
  {
    name: "Amanda S.",
    role: "Book Blogger",
    avatar: "/placeholder.svg",
    testimonial: "The AI recommendations are scarily accurate! I've found so many hidden gems through this app. It's an essential tool for my blog.",
  },
  {
    name: "Kevin H.",
    role: "Dad & Reader",
    avatar: "/placeholder.svg",
    testimonial: "I use BookWorm to track the books I read with my kids. It's a great way to create a digital scrapbook of our reading journey together.",
  },
  {
    name: "Laura W.",
    role: "Professor",
    avatar: "/placeholder.svg",
    testimonial: "The cross-platform sync is seamless. I can update my reading progress on my phone during my commute and pick it up on my laptop at home.",
  },
  {
    name: "Brian M.",
    role: "Tech Enthusiast",
    avatar: "/placeholder.svg",
    testimonial: "A beautifully crafted app with a clean UI and powerful features. The developers have clearly put a lot of thought into the user experience.",
  },
  {
    name: "Rachel G.",
    role: "World Traveler",
    avatar: "/placeholder.svg",
    testimonial: "BookWorm is my constant travel companion. I can manage my digital and physical books from anywhere in the world. It's perfect for my lifestyle.",
  },
  {
    name: "Steven K.",
    role: "Retiree",
    avatar: "/placeholder.svg",
    testimonial: "I've rediscovered my love for reading in retirement, and BookWorm has been instrumental. It's easy to use and helps me keep track of my ever-growing list.",
  },
  {
    name: "Megan F.",
    role: "High School Teacher",
    avatar: "/placeholder.svg",
    testimonial: "I encourage all my students to use BookWorm. It fosters a sense of accomplishment and makes reading feel more like a game than a chore.",
  },
  {
    name: "Tom N.",
    role: "Entrepreneur",
    avatar: "/placeholder.svg",
    testimonial: "The analytics help me understand my reading habits, which has surprisingly improved my focus and productivity in other areas of my life.",
  },
  {
    name: "Olivia P.",
    role: "Graphic Designer",
    avatar: "/placeholder.svg",
    testimonial: "I'm a very visual person, and I just love the design of this app. Creating custom shelves and seeing the book covers is so satisfying.",
  },
  {
    name: "Daniel L.",
    role: "Podcast Host",
    avatar: "/placeholder.svg",
    testimonial: "I use BookWorm to prep for my book review podcast. It keeps all my thoughts and key points organized and easily accessible.",
  },
  {
    name: "Chloe T.",
    role: "University Student",
    avatar: "/placeholder.svg",
    testimonial: "The team features are great for group projects. We can share sources and notes on books we're all reading for a class. Super helpful!",
  },
  {
    name: "James W.",
    role: "Software Engineer",
    avatar: "/placeholder.svg",
    testimonial: "From a technical standpoint, this app is solid. It's fast, bug-free, and the sync works flawlessly. Impressive work.",
  },
  {
    name: "Sophia H.",
    role: "New Mom",
    avatar: "/placeholder.svg",
    testimonial: "Finding time to read is tough as a new mom, but BookWorm's reminders and progress tracking keep me motivated to squeeze in a few pages whenever I can.",
  },
  {
    name: "Ethan R.",
    role: "Poet",
    avatar: "/placeholder.svg",
    testimonial: "I use it to track poetry collections. The ability to add notes and tags for specific poems within a book is a feature I haven't found anywhere else.",
  },
];

export const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(6); // Cambiado de 9 a 6

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Carga 6 más cada vez
  };

  return (
    <section className="py-12 md:py-24 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Read what our customers say
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, visibleCount).map((testimonial, index) => (
            <Card key={index} className="bg-card text-card-foreground p-6 flex flex-col">
              <div className="flex-grow">
                <Quote className="w-8 h-8 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{testimonial.testimonial}</p>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {visibleCount < testimonials.length && (
          <div className="text-center mt-12">
            <Button variant="outline" onClick={handleViewMore}>
              View More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};