import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ClipboardList, Bell, BarChart, Users, Cloud } from "lucide-react";

const features = [
  {
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
    title: "Comprehensive Lecture Tracking",
    description: "Never miss a detail. Keep a meticulous record of every lecture, including topics covered, key takeaways, and follow-up actions. You can even attach files and links for future reference.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Advanced Book Management",
    description: "Go beyond a simple reading list. Organize your books by course or subject, track your reading progress chapter by chapter, and compile a personal library of quotes and summaries.",
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: "Intelligent Smart Reminders",
    description: "Stay ahead of your schedule. Set customizable reminders for upcoming lectures, reading deadlines, and important study sessions. Our smart system ensures you're always prepared.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: "Progress Analytics",
    description: "Visualize your academic journey. Get insightful analytics on your study habits, track time spent on subjects, and see your progress over the semester to stay motivated and on track.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Collaborative Study Groups",
    description: "Learning is better together. Create study groups, share notes and resources with classmates, and collaborate on projects in real-time, all within the app.",
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "Seamless Cross-Platform Sync",
    description: "Access your study materials anytime, anywhere. Your data is securely synced across all your devices, so you can switch from your laptop to your phone without missing a beat.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-secondary/50 rounded-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Features for Academic Excellence</h2>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          LecRead is packed with tools designed to streamline your studies, enhance your learning, and help you achieve your academic goals.
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