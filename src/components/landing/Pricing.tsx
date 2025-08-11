import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, User, Building, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const pricingPlans = {
  monthly: [
    {
      title: "Hobbyist",
      description: "For individuals and casual readers.",
      price: "$9",
      features: ["Track up to 50 books", "Basic reading analytics", "Community access", "Email support"],
      icon: <User className="h-8 w-8" />,
    },
    {
      title: "Pro",
      description: "For avid readers and book clubs.",
      price: "$19",
      features: ["Unlimited book tracking", "Advanced analytics", "Create book clubs", "Priority support"],
      isPopular: true,
      icon: <Rocket className="h-8 w-8" />,
    },
    {
      title: "Library",
      description: "For institutions and large groups.",
      price: "$49",
      features: ["Everything in Pro", "Multi-user management", "Dedicated account manager", "Custom integrations"],
      icon: <Building className="h-8 w-8" />,
    },
  ],
  annually: [
    {
      title: "Hobbyist",
      description: "For individuals and casual readers.",
      price: "$90",
      features: ["Track up to 50 books", "Basic reading analytics", "Community access", "Email support"],
      icon: <User className="h-8 w-8" />,
    },
    {
      title: "Pro",
      description: "For avid readers and book clubs.",
      price: "$190",
      features: ["Unlimited book tracking", "Advanced analytics", "Create book clubs", "Priority support"],
      isPopular: true,
      icon: <Rocket className="h-8 w-8" />,
    },
    {
      title: "Library",
      description: "For institutions and large groups.",
      price: "$490",
      features: ["Everything in Pro", "Multi-user management", "Dedicated account manager", "Custom integrations"],
      icon: <Building className="h-8 w-8" />,
    },
  ],
};

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const plans = isAnnual ? pricingPlans.annually : pricingPlans.monthly;

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            Choose the plan that's right for you. All plans come with a 14-day free trial.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span>Monthly</span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span>Annually (Save 20%)</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.title} className={cn("flex flex-col", plan.isPopular ? "bg-background text-foreground border-secondary shadow-2xl" : "bg-primary-foreground/10 text-primary-foreground")}>
              <CardHeader className="relative">
                {plan.isPopular && (
                  <Badge variant="secondary" className="absolute top-0 right-4 -mt-3">Popular</Badge>
                )}
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", plan.isPopular ? "bg-secondary text-secondary-foreground" : "bg-primary-foreground/20")}>
                    {plan.icon}
                  </div>
                  <div>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription className={cn(plan.isPopular ? "text-muted-foreground" : "text-primary-foreground/70")}>{plan.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={cn("text-sm", plan.isPopular ? "text-muted-foreground" : "text-primary-foreground/70")}>/ {isAnnual ? "year" : "month"}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className={cn("h-5 w-5", plan.isPopular ? "text-secondary" : "text-primary-foreground/80")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" variant={plan.isPopular ? "secondary" : "default"}>Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};