import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, SortAsc } from "lucide-react";

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
  },
  {
    id: "5",
    title: "Update user interface",
    description: "Improve accessibility and mobile responsiveness",
    priority: "high" as const,
    status: "todo" as const,
    dueDate: "2024-01-18",
    project: "Frontend"
  },
  {
    id: "6",
    title: "Database optimization",
    description: "Optimize queries and add indexes",
    priority: "medium" as const,
    status: "in-progress" as const,
    dueDate: "2024-01-25",
    project: "Backend"
  }
];

const Tasks = () => {
  const [tasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || task.status === filterStatus;
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate || "").getTime() - new Date(b.dueDate || "").getTime();
      }
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.title.localeCompare(b.title);
    });

  const statusCounts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === "todo").length,
    "in-progress": tasks.filter(t => t.status === "in-progress").length,
    completed: tasks.filter(t => t.status === "completed").length
  };

  return (
    <div className="min-h-screen bg-gradient-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Tasks</h1>
            <p className="text-muted-foreground">Manage and organize all your tasks</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                filterStatus === status ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => setFilterStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")} ({count})
            </Badge>
          ))}
        </div>

        <Card className="p-6 mb-8 bg-gradient-card shadow-soft">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <Card className="p-12 text-center bg-gradient-card shadow-soft">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== "all" || filterPriority !== "all"
                ? "Try adjusting your filters or search terms"
                : "Create your first task to get started"
              }
            </p>
            <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Tasks;