import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ClipboardList, Bell } from "lucide-react";

const features = [
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: "Lecture Tracking",
    description: "Keep a detailed record of every lecture you attend. Add notes, topics, and follow-up actions.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Book Management",
    description: "Organize your reading list, track your progress, and save important quotes and summaries.",
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: "Smart Reminders",
    description: "Set reminders for upcoming lectures, reading deadlines, and study sessions so you never miss a thing.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-secondary/50 rounded-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Everything You Need to Succeed</h2>
        <p className="mt-2 text-muted-foreground">
          Discover the features that make LecRead the perfect study companion.
        </p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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