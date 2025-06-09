import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import EducatorDashboard from "@/components/dashboard/EducatorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  BookOpen, 
  Shield, 
  Bell,
  Settings,
  User,
  Calendar,
  Target
} from "lucide-react";
import type { User } from "@shared/schema";

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState<"student" | "educator" | "admin">("student");
  
  // In a real app, you'd get the current user from authentication context
  const currentUserId = 1;

  const { data: currentUser } = useQuery<User>({
    queryKey: ["/api/users/" + currentUserId],
    enabled: !!currentUserId,
  });

  const roleConfigs = {
    student: {
      icon: GraduationCap,
      label: "Student View",
      color: "bg-edu-blue text-white",
      description: "Track your learning progress and upcoming assignments"
    },
    educator: {
      icon: BookOpen,
      label: "Educator View", 
      color: "bg-edu-green text-white",
      description: "Manage classes, monitor student progress, and create assessments"
    },
    admin: {
      icon: Shield,
      label: "Admin View",
      color: "bg-edu-purple text-white", 
      description: "System overview, user management, and institutional analytics"
    }
  };

  const notifications = [
    {
      id: 1,
      type: "info",
      message: "New AI tutor features are now available",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "warning",
      message: "Physics assignment due tomorrow",
      time: "4 hours ago"
    },
    {
      id: 3,
      type: "success",
      message: "Weekly progress report generated",
      time: "1 day ago"
    }
  ];

  const quickStats = {
    student: [
      { label: "Courses Enrolled", value: "6", icon: BookOpen },
      { label: "Assignments Due", value: "3", icon: Calendar },
      { label: "Average Score", value: "85%", icon: Target },
      { label: "AI Sessions", value: "24", icon: GraduationCap }
    ],
    educator: [
      { label: "Active Classes", value: "4", icon: BookOpen },
      { label: "Total Students", value: "128", icon: GraduationCap },
      { label: "Assessments Created", value: "15", icon: Target },
      { label: "At-Risk Students", value: "8", icon: Calendar }
    ],
    admin: [
      { label: "Total Users", value: "2,547", icon: User },
      { label: "Active Institutions", value: "45", icon: BookOpen },
      { label: "System Uptime", value: "99.9%", icon: Shield },
      { label: "Monthly Sessions", value: "18.2K", icon: Target }
    ]
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-2">
                Dashboard
              </h1>
              <p className="text-lg text-edu-gray">
                Welcome back! Here's your personalized overview.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-edu-coral text-white">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Role Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5 text-edu-blue" />
              <span>View Dashboard As</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(roleConfigs).map(([role, config]) => {
                const IconComponent = config.icon;
                const isSelected = selectedRole === role;
                
                return (
                  <Button
                    key={role}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      isSelected ? config.color : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedRole(role as typeof selectedRole)}
                  >
                    <IconComponent className="h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium">{config.label}</p>
                      <p className={`text-xs ${isSelected ? "text-white/80" : "text-edu-gray"}`}>
                        {config.description}
                      </p>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {quickStats[selectedRole].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">{stat.label}</h4>
                    <IconComponent className="h-5 w-5 text-edu-blue" />
                  </div>
                  <p className="text-2xl font-bold text-edu-dark">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Dashboard Content */}
          <div className="lg:col-span-3">
            {selectedRole === "student" && <StudentDashboard userId={currentUserId} />}
            {selectedRole === "educator" && <EducatorDashboard userId={currentUserId} />}
            {selectedRole === "admin" && <AdminDashboard userId={currentUserId} />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-edu-coral" />
                  <span>Recent Notifications</span>
                </CardTitle>
                <Badge className="bg-edu-coral text-white">{notifications.length}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-edu-dark mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-edu-gray">{notification.time}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedRole === "student" && (
                  <>
                    <Button className="w-full justify-start bg-edu-blue hover:bg-edu-blue/90" size="sm">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start AI Tutor Session
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Take Practice Quiz
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Schedule
                    </Button>
                  </>
                )}
                
                {selectedRole === "educator" && (
                  <>
                    <Button className="w-full justify-start bg-edu-green hover:bg-edu-green/90" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Create Assessment
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View Student Progress
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Class
                    </Button>
                  </>
                )}
                
                {selectedRole === "admin" && (
                  <>
                    <Button className="w-full justify-start bg-edu-purple hover:bg-edu-purple/90" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="bg-gradient-to-br from-edu-blue/5 to-edu-purple/5 border-edu-blue/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-edu-blue">
                  <BookOpen className="h-5 w-5" />
                  <span>Need Help?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-edu-gray">
                  Get the most out of your EduAI experience with our comprehensive guides and support.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    📚 User Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    💬 Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    🎥 Video Tutorials
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
