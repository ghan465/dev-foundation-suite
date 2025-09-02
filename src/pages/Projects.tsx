import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Calendar, CheckCircle } from "lucide-react";

// Mock data - will be replaced with Supabase data
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    progress: 65,
    totalTasks: 12,
    completedTasks: 8,
    dueDate: "2024-02-15",
    team: ["Alice", "Bob", "Charlie"],
    status: "in-progress" as const
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile application for iOS and Android platforms",
    progress: 30,
    totalTasks: 20,
    completedTasks: 6,
    dueDate: "2024-04-30",
    team: ["Dave", "Eve", "Frank", "Grace"],
    status: "in-progress" as const
  },
  {
    id: "3",
    name: "API Documentation",
    description: "Comprehensive documentation for all API endpoints",
    progress: 100,
    totalTasks: 8,
    completedTasks: 8,
    dueDate: "2024-01-10",
    team: ["Alice", "Dave"],
    status: "completed" as const
  },
  {
    id: "4",
    name: "DevOps Infrastructure",
    description: "Set up CI/CD pipelines and cloud infrastructure",
    progress: 45,
    totalTasks: 15,
    completedTasks: 7,
    dueDate: "2024-03-20",
    team: ["Bob", "Charlie", "Eve"],
    status: "in-progress" as const
  }
];

const Projects = () => {
  const activeProjects = mockProjects.filter(p => p.status !== "completed");
  const completedProjects = mockProjects.filter(p => p.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
            <p className="text-muted-foreground">Organize tasks into projects and track progress</p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 text-white shadow-glow">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-card shadow-soft text-center">
            <div className="text-3xl font-bold text-primary mb-2">{mockProjects.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card shadow-soft text-center">
            <div className="text-3xl font-bold text-warning mb-2">{activeProjects.length}</div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card shadow-soft text-center">
            <div className="text-3xl font-bold text-success mb-2">{completedProjects.length}</div>
            <div className="text-sm text-muted-foreground">Completed Projects</div>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Active Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeProjects.map((project) => (
              <Card key={project.id} className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {project.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-card-foreground">Progress</span>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">
                      {project.completedTasks}/{project.totalTasks} tasks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Due {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {project.team.length} members
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {completedProjects.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Completed Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedProjects.map((project) => (
                <Card key={project.id} className="p-6 bg-gradient-card shadow-soft opacity-75">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground mb-2">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <Badge className="bg-success text-success-foreground ml-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm text-muted-foreground">
                          {project.totalTasks} tasks completed
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {project.team.length} members
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Archive
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;