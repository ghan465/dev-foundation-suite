import { useState } from "react";
import { TaskStats } from "@/components/TaskStats";
import { TaskCard } from "@/components/TaskCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Filter } from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockTasks = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new product landing page",
    priority: "high" as const,
    status: "in-progress" as const,
    dueDate: "2024-01-15",
    project: "Website Redesign"
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment",
    priority: "medium" as const,
    status: "todo" as const,
    dueDate: "2024-01-20",
    project: "DevOps"
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all endpoints with examples",
    priority: "medium" as const,
    status: "completed" as const,
    dueDate: "2024-01-10",
    project: "Backend"
  },
  {
    id: "4",
    title: "Review pull requests",
    description: "Code review for authentication module",
    priority: "low" as const,
    status: "todo" as const,
    dueDate: "2024-01-12",
    project: "Backend"
  }
];

const Dashboard = () => {
  const [tasks] = useState(mockTasks);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in-progress").length,
    overdue: tasks.filter(t => new Date(t.dueDate || "") < new Date() && t.status !== "completed").length
  };

  const recentTasks = tasks.slice(0, 3);
  const upcomingTasks = tasks
    .filter(t => t.status !== "completed")
    .sort((a, b) => new Date(a.dueDate || "").getTime() - new Date(b.dueDate || "").getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and manage your tasks efficiently</p>
        </div>

        <TaskStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-gradient-card shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Recent Tasks</h2>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Upcoming Deadlines</h2>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/50">
                  <div>
                    <h3 className="font-medium text-card-foreground">{task.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {task.project}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Due {new Date(task.dueDate || "").toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge 
                    variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-8 p-6 bg-gradient-card shadow-soft">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Ready for Backend Integration</h3>
            <p className="text-muted-foreground mb-4">
              Connect to Supabase to enable real task management, user authentication, and data persistence.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">✓ Task CRUD Operations</Badge>
              <Badge variant="outline">✓ User Authentication</Badge>
              <Badge variant="outline">✓ Real-time Updates</Badge>
              <Badge variant="outline">✓ API Documentation</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;