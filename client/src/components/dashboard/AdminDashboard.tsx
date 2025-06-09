import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  GraduationCap, 
  ClipboardCheck, 
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Server,
  Activity,
  UserPlus,
  Settings,
  Download,
  Shield,
  Database,
  Zap
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { User, Assessment } from "@shared/schema";

interface AdminDashboardProps {
  userId: number;
}

export default function AdminDashboard({ userId }: AdminDashboardProps) {
  const { data: allUsers = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const { data: allAssessments = [], isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ["/api/assessments"],
  });

  // Calculate user statistics
  const userStats = {
    total: allUsers.length,
    students: allUsers.filter(u => u.role === 'student').length,
    educators: allUsers.filter(u => u.role === 'educator').length,
    admins: allUsers.filter(u => u.role === 'admin').length
  };

  // Mock data for system metrics
  const systemMetrics = {
    serverUptime: "99.9%",
    activeUsers: 1247,
    totalSessions: 3582,
    storageUsed: 78,
    cpuUsage: 45,
    memoryUsage: 62,
    networkTraffic: "2.3 GB",
    errorRate: "0.02%"
  };

  const recentActivities = [
    {
      id: 1,
      type: "user_registration",
      message: "New educator registered: Dr. Sarah Wilson",
      time: "2 hours ago",
      severity: "info"
    },
    {
      id: 2,
      type: "system_alert",
      message: "High memory usage detected on Server 2",
      time: "4 hours ago",
      severity: "warning"
    },
    {
      id: 3,
      type: "assessment_created",
      message: "Large assessment created: Physics Final Exam (500 students)",
      time: "6 hours ago",
      severity: "info"
    },
    {
      id: 4,
      type: "security",
      message: "Security scan completed - No threats detected",
      time: "8 hours ago",
      severity: "success"
    }
  ];

  const topInstitutions = [
    { name: "Lincoln High School", students: 250, educators: 18, growth: "+12%" },
    { name: "Global University", students: 180, educators: 15, growth: "+8%" },
    { name: "Oak Valley School", students: 120, educators: 12, growth: "+15%" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200";
      case "warning":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <UserPlus className="h-4 w-4" />;
      case "system_alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "assessment_created":
        return <ClipboardCheck className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  if (usersLoading || assessmentsLoading) {
    return (
      <div className="grid lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Total Users</h4>
              <Users className="h-5 w-5 text-edu-blue" />
            </div>
            <p className="text-2xl font-bold text-edu-dark">{userStats.total}</p>
            <p className="text-xs text-edu-gray mt-1">↑ 8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Active Students</h4>
              <GraduationCap className="h-5 w-5 text-edu-green" />
            </div>
            <p className="text-2xl font-bold text-edu-green">{userStats.students}</p>
            <p className="text-xs text-edu-gray mt-1">↑ 15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Educators</h4>
              <BookOpen className="h-5 w-5 text-edu-purple" />
            </div>
            <p className="text-2xl font-bold text-edu-purple">{userStats.educators}</p>
            <p className="text-xs text-edu-gray mt-1">↑ 5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Assessments</h4>
              <ClipboardCheck className="h-5 w-5 text-edu-coral" />
            </div>
            <p className="text-2xl font-bold text-edu-coral">{allAssessments.length}</p>
            <p className="text-xs text-edu-gray mt-1">↑ 22% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5 text-edu-blue" />
              <span>System Health</span>
            </CardTitle>
            <Badge className="bg-green-100 text-green-700">
              All Systems Operational
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-edu-gray">CPU Usage</span>
                    <span className="font-medium text-edu-dark">{systemMetrics.cpuUsage}%</span>
                  </div>
                  <Progress value={systemMetrics.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-edu-gray">Memory Usage</span>
                    <span className="font-medium text-edu-dark">{systemMetrics.memoryUsage}%</span>
                  </div>
                  <Progress value={systemMetrics.memoryUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-edu-gray">Storage Used</span>
                    <span className="font-medium text-edu-dark">{systemMetrics.storageUsed}%</span>
                  </div>
                  <Progress value={systemMetrics.storageUsed} className="h-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-edu-blue/5 rounded-lg">
                  <Zap className="h-8 w-8 text-edu-blue mx-auto mb-2" />
                  <p className="text-lg font-bold text-edu-dark">{systemMetrics.serverUptime}</p>
                  <p className="text-xs text-edu-gray">Uptime</p>
                </div>
                
                <div className="text-center p-4 bg-edu-green/5 rounded-lg">
                  <Activity className="h-8 w-8 text-edu-green mx-auto mb-2" />
                  <p className="text-lg font-bold text-edu-dark">{systemMetrics.activeUsers}</p>
                  <p className="text-xs text-edu-gray">Active Users</p>
                </div>
                
                <div className="text-center p-4 bg-edu-purple/5 rounded-lg">
                  <Database className="h-8 w-8 text-edu-purple mx-auto mb-2" />
                  <p className="text-lg font-bold text-edu-dark">{systemMetrics.networkTraffic}</p>
                  <p className="text-xs text-edu-gray">Network Traffic</p>
                </div>
                
                <div className="text-center p-4 bg-edu-coral/5 rounded-lg">
                  <Shield className="h-8 w-8 text-edu-coral mx-auto mb-2" />
                  <p className="text-lg font-bold text-edu-dark">{systemMetrics.errorRate}</p>
                  <p className="text-xs text-edu-gray">Error Rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-edu-green" />
              <span>Recent Activities</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className={`p-3 rounded-lg border ${getSeverityColor(activity.severity)}`}>
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-edu-dark">{activity.message}</p>
                    <p className="text-xs text-edu-gray mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Institutions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-edu-blue" />
              <span>Top Institutions</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {topInstitutions.map((institution, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-edu-blue/10 rounded-full flex items-center justify-center">
                    <span className="text-edu-blue font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-edu-dark">{institution.name}</p>
                    <p className="text-sm text-edu-gray">
                      {institution.students} students • {institution.educators} educators
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {institution.growth}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-edu-purple" />
              <span>Admin Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-edu-blue hover:bg-edu-blue/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Institution
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Review Assessments
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
