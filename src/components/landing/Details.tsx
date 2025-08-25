import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, TrendingUp } from "lucide-react";

const details = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Discover Your Next Favorite Book",
    description: "Our intelligent recommendation engine learns your preferences and suggests books you'll love, helping you expand your literary horizons effortlessly.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Track Your Reading Progress",
    description: "Monitor your reading habits with detailed statistics and visualizations. See your progress over time, identify trends, and celebrate your achievements.",
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: "AI-Powered Summaries",
    description: "Get concise, insightful summaries of books to quickly grasp key concepts or refresh your memory. Perfect for busy readers or when you need a quick recap.",
  },
];

export const Details = () => {
  return (
    <section id="details" className="container mx-auto px-4 md:px-6 py-12 md:py-24 bg-background rounded-lg shadow-lg">
      <div className="grid gap-8 md:grid-cols-3">
        {details.map((detail, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6">
            <CardContent className="flex flex-col items-center p-0">
              {detail.icon}
              <h3 className="text-2xl font-bold mt-4">{detail.title}</h3>
              <p className="text-muted-foreground mt-2">{detail.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};