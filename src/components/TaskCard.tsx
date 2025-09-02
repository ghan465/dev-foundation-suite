import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Flag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  dueDate?: string;
  project?: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground"
};

const statusColors = {
  "todo": "border-l-muted",
  "in-progress": "border-l-primary",
  "completed": "border-l-success"
};

export function TaskCard({ task, onToggleComplete, onEdit }: TaskCardProps) {
  const [isChecked, setIsChecked] = useState(task.status === "completed");

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggleComplete?.(task.id);
  };

  return (
    <Card className={cn(
      "p-4 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-200 border-l-4",
      statusColors[task.status],
      isChecked && "opacity-70"
    )}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleToggle}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className={cn(
              "font-medium text-card-foreground",
              isChecked && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
          {task.description && (
            <p className={cn(
              "text-sm text-muted-foreground mb-3",
              isChecked && "line-through"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={cn("text-xs", priorityColors[task.priority])}
              >
                <Flag className="h-3 w-3 mr-1" />
                {task.priority}
              </Badge>
              
              {task.project && (
                <Badge variant="outline" className="text-xs">
                  {task.project}
                </Badge>
              )}
            </div>
            
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}