import { BookCheck, Target, Users, Zap } from "lucide-react";

const featuresData = [
  {
    icon: <BookCheck className="h-8 w-8" />,
    title: "Track Progress",
    description: "Log your reading sessions and see how far you've come in your literary journey.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "AI Recommendations",
    description: "Our smart algorithm suggests books you'll love based on your reading history.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community",
    description: "Connect with fellow readers, join discussions, and share your favorite books.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Personal Notes",
    description: "Jot down your thoughts and reflections on every book you read.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Amazing details, amazing books
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            BookWorm is designed to enhance your reading experience from start to finish.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};