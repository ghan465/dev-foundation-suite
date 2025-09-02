import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

export function TaskStats({ stats }: TaskStatsProps) {
  const completionRate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const statCards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: CheckCircle,
      color: "text-primary",
      bg: "bg-accent"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "text-success",
      bg: "bg-success/10"
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10"
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: AlertCircle,
      color: "text-destructive",
      bg: "bg-destructive/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-200">
            <div className="flex items-center">
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
      
      <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-200 lg:col-span-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-card-foreground">{completionRate.toFixed(1)}%</p>
            </div>
          </div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}