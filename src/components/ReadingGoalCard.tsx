import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Calendar, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ReadingGoal {
  target_pages: number;
  period: string;
  created_at: string;
}

export const ReadingGoalCard = () => {
  const [goal, setGoal] = useState<ReadingGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReadingGoal();
  }, []);

  const fetchReadingGoal = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("reading_goals")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      setGoal(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardHeader>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  if (!goal) {
    return null;
  }

  const daysInPeriod = goal.period === "week" ? 7 : 30;
  const pagesPerDay = Math.round(goal.target_pages / daysInPeriod);

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-primary" />
          Tu Meta de Lectura
        </CardTitle>
        <CardDescription>
          {goal.period === "week" ? "Esta semana" : "Este mes"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">{pagesPerDay}</p>
            <p className="text-sm text-muted-foreground">páginas por día</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{goal.target_pages}</p>
            <p className="text-sm text-muted-foreground">páginas objetivo</p>
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>
            {goal.period === "week" 
              ? `En 7 días` 
              : `En 30 días`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};