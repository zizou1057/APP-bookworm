import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pricingPlans = [
  {
    name: "Free",
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "For individuals just getting started with organizing their reading life.",
    features: [
      "Track up to 20 books",
      "Basic reading analytics",
      "Community forum access",
    ],
    buttonText: "Start for Free",
    variant: "outline",
    isPopular: false,
  },
  {
    name: "Pro",
    priceMonthly: "$5",
    priceYearly: "$54",
    description: "For avid readers who want to unlock their full reading potential.",
    features: [
      "Unlimited book tracking",
      "Advanced analytics & insights",
      "AI-powered recommendations",
      "Custom shelves and tags",
      "Priority email support",
    ],
    buttonText: "Upgrade to Pro",
    variant: "default",
    isPopular: true,
  },
  {
    name: "Team",
    priceMonthly: "$12",
    priceYearly: "$129",
    description: "For book clubs and groups to read and grow together.",
    features: [
      "Everything in Pro, plus:",
      "Collaborative reading lists",
      "Shared notes and discussions",
      "Admin and member roles",
      "Centralized billing",
    ],
    buttonText: "Contact Sales",
    variant: "outline",
    isPopular: false,
  },
];

export const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="bg-primary text-primary-foreground py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Choose the plan that's right for you
          </h2>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed mt-4">
            Simple, transparent pricing. No hidden fees. Ever.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <Label htmlFor="billing-cycle">Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label="Toggle billing cycle"
            className="data-[state=checked]:bg-secondary"
          />
          <Label htmlFor="billing-cycle">
            Yearly <Badge variant="secondary">Save 10%</Badge>
          </Label>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name} 
              className={cn(
                "bg-card text-card-foreground flex flex-col h-full", 
                { "border-2 border-secondary ring-4 ring-secondary/20": plan.isPopular }
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.name}
                  {plan.isPopular && <Badge variant="secondary">Most Popular</Badge>}
                </CardTitle>
                <div className="text-4xl font-bold mt-4">
                  {isYearly ? plan.priceYearly : plan.priceMonthly}
                  <span className="text-lg font-normal text-muted-foreground">
                    {plan.name !== "Free" && (isYearly ? "/year" : "/month")}
                    {plan.name === "Team" && " per user"}
                  </span>
                </div>
                <CardDescription className="mt-2 min-h-[40px]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.variant === 'default' ? 'secondary' : 'outline'}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};