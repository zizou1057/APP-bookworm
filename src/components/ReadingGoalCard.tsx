import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Calendar, PlusCircle } from "lucide-react";
import { ReadingGoal } from "@/types";
import { Button } from "./ui/button";

interface ReadingGoalCardProps {
  goal: ReadingGoal | null;
  loading: boolean;
  onSetGoalClick: () => void;
}

export const ReadingGoalCard = ({ goal, loading, onSetGoalClick }: ReadingGoalCardProps) => {
  if (loading) {
    return (
      <Card>
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
    return (
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
        <CardHeader className="flex-row items-center gap-4">
          <Target className="h-8 w-8 text-muted-foreground" />
          <div>
            <CardTitle>Establece una Meta de Lectura</CardTitle>
            <CardDescription>Mantente motivado estableciendo un objetivo semanal o mensual.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={onSetGoalClick} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Establecer Meta
          </Button>
        </CardContent>
      </Card>
    );
  }

  const daysInPeriod = goal.period === "week" ? 7 : 30;
  const pagesPerDay = goal.target_pages > 0 && daysInPeriod > 0 ? Math.round(goal.target_pages / daysInPeriod) : 0;

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