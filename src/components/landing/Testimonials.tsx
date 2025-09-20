const testimonialsData = [
  {
    quote: "BookWorm has completely changed the way I read. Keeping track of my progress and notes has never been easier.",
    name: "Alex Johnson",
    title: "Avid Reader",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "The AI recommendations are spot on! I've discovered so many new authors and genres I wouldn't have found otherwise.",
    name: "Samantha Lee",
    title: "Book Club President",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "I love the community features. Discussing books with other readers adds a whole new layer to my reading experience.",
    name: "Michael Chen",
    title: "Literature Student",
    avatar: "/placeholder-user.jpg",
  },
  {
    quote: "As a busy professional, BookWorm helps me make the most of my reading time. It's simple, intuitive, and powerful.",
    name: "Jessica Williams",
    title: "CEO, Tech Solutions",
    avatar: "/placeholder-user.jpg",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-12 md:py-24 bg-muted/50 dark:bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Readers Are Saying
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Join a community of passionate readers who are taking their reading to the next level.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow">
              <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};