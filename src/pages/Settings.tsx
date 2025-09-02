import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Database, Bell, Shield, User, Zap, FileText } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-card shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">Backend Integration</h2>
                <p className="text-muted-foreground">Connect to Supabase for full functionality</p>
              </div>
            </div>
            
            <div className="bg-accent/50 border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground">Supabase Integration</h3>
                  <p className="text-sm text-muted-foreground">Connect to enable backend features</p>
                </div>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  Not Connected
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Features Available After Connection:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Real-time task updates
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    User authentication & profiles
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Database className="h-4 w-4 text-primary" />
                    Persistent data storage
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 text-primary" />
                    Auto-generated API documentation
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">API Features:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">GET</Badge>
                    /api/tasks - List all tasks
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">POST</Badge>
                    /api/tasks - Create new task
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">PUT</Badge>
                    /api/tasks/:id - Update task
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">DELETE</Badge>
                    /api/tasks/:id - Delete task
                  </div>
                </div>
              </div>
            </div>

            <Button className="mt-4 bg-gradient-primary hover:opacity-90 text-white shadow-glow">
              Connect to Supabase
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">Profile Settings</h2>
                <p className="text-muted-foreground">Manage your personal information</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <Button variant="outline" className="mt-4">
                Save Changes
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">Notifications</h2>
                <p className="text-muted-foreground">Configure how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Task Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming due dates</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Project Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications when project status changes</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;