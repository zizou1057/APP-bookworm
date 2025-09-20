import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookCheck, Library, Bell, BarChart, Users, Cloud } from "lucide-react";

const features = [
  {
    icon: <BookCheck className="h-8 w-8 text-primary" />,
    title: "Detailed Book Tracking",
    description: "Keep a meticulous record of every book you read. Track your progress by page or chapter, add personal notes, and save your favorite quotes all in one place.",
  },
  {
    icon: <Library className="h-8 w-8 text-primary" />,
    title: "Personal Library Management",
    description: "Organize your entire book collection. Create custom shelves, tag books by genre or mood, and easily see what you've read, what you're reading, and what's next.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Insightful Reading Analytics",
    description: "Visualize your reading habits. Get insights on your reading speed, favorite genres, and see your progress over time to stay motivated and discover new patterns.",
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "Seamless Cross-Platform Sync",
    description: "Access your reading library anytime, anywhere. Your data is securely synced across all your devices, so you can switch from your laptop to your phone without missing a beat.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-white dark:bg-muted rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features for Book Lovers</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          BookWorm is packed with tools designed to enhance your reading experience, organize your library, and help you achieve your reading goals.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              {feature.icon}
              <CardTitle className="mt-4">{feature.title}</CardTitle>
              <CardDescription className="mt-2">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};