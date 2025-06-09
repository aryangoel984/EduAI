import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  AlertTriangle,
  BookOpen,
  Calendar,
  Plus,
  Eye,
  MessageSquare,
  Target,
  Clock,
  Award
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { User, Assessment, StudentProgress } from "@shared/schema";

interface EducatorDashboardProps {
  userId: number;
}

export default function EducatorDashboard({ userId }: EducatorDashboardProps) {
  const { data: students = [], isLoading: studentsLoading } = useQuery<User[]>({
    queryKey: ["/api/users", { role: "student" }],
  });

  const { data: assessments = [], isLoading: assessmentsLoading } = useQuery<Assessment[]>({
    queryKey: ["/api/assessments", { createdBy: userId }],
    enabled: !!userId,
  });

  // Mock data for demonstration
  const mockData = {
    classStats: {
      totalStudents: 32,
      activeStudents: 28,
      averageScore: 78.5,
      completionRate: 94,
      atRiskStudents: 4
    },
    recentActivity: [
      {
        id: 1,
        studentName: "Alex Morgan",
        action: "Completed Assessment",
        details: "Algebra Quiz 1 - Score: 85%",
        time: "2 hours ago",
        type: "assessment"
      },
      {
        id: 2,
        studentName: "Sarah Johnson",
        action: "AI Tutor Session",
        details: "Physics: Motion and Forces",
        time: "4 hours ago",
        type: "tutor"
      },
      {
        id: 3,
        studentName: "Michael Roberts",
        action: "Submitted Assignment",
        details: "Chemistry Lab Report",
        time: "6 hours ago",
        type: "assignment"
      }
    ],
    upcomingClasses: [
      {
        id: 1,
        subject: "Mathematics",
        time: "10:00 AM",
        students: 25,
        room: "Room 204"
      },
      {
        id: 2,
        subject: "Physics",
        time: "2:00 PM",
        students: 22,
        room: "Lab 3"
      }
    ],
    topPerformers: [
      { name: "Emma Wilson", score: 96, subject: "Mathematics" },
      { name: "David Chen", score: 94, subject: "Physics" },
      { name: "Lisa Rodriguez", score: 92, subject: "Chemistry" }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "assessment":
        return <ClipboardCheck className="h-4 w-4 text-edu-blue" />;
      case "tutor":
        return <MessageSquare className="h-4 w-4 text-edu-green" />;
      case "assignment":
        return <BookOpen className="h-4 w-4 text-edu-purple" />;
      default:
        return <Users className="h-4 w-4 text-edu-gray" />;
    }
  };

  if (studentsLoading || assessmentsLoading) {
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
      <div className="grid lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Total Students</h4>
              <Users className="h-5 w-5 text-edu-blue" />
            </div>
            <p className="text-2xl font-bold text-edu-dark">{mockData.classStats.totalStudents}</p>
            <p className="text-xs text-edu-gray mt-1">{mockData.classStats.activeStudents} active today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Avg. Score</h4>
              <Target className="h-5 w-5 text-edu-green" />
            </div>
            <p className="text-2xl font-bold text-edu-green">{mockData.classStats.averageScore}%</p>
            <p className="text-xs text-edu-gray mt-1">↑ 3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Completion Rate</h4>
              <ClipboardCheck className="h-5 w-5 text-edu-purple" />
            </div>
            <p className="text-2xl font-bold text-edu-purple">{mockData.classStats.completionRate}%</p>
            <p className="text-xs text-edu-gray mt-1">↑ 5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">At-Risk</h4>
              <AlertTriangle className="h-5 w-5 text-edu-coral" />
            </div>
            <p className="text-2xl font-bold text-edu-coral">{mockData.classStats.atRiskStudents}</p>
            <p className="text-xs text-edu-gray mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Assessments</h4>
              <ClipboardCheck className="h-5 w-5 text-edu-blue" />
            </div>
            <p className="text-2xl font-bold text-edu-dark">{assessments.length}</p>
            <p className="text-xs text-edu-gray mt-1">Active this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Class Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-edu-blue" />
                <span>Recent Student Activity</span>
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-edu-dark text-sm">{activity.studentName}</p>
                      <span className="text-xs text-edu-gray">{activity.time}</span>
                    </div>
                    <p className="text-sm text-edu-gray">{activity.action}</p>
                    <p className="text-xs text-edu-gray/80">{activity.details}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Assessments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <ClipboardCheck className="h-5 w-5 text-edu-green" />
                <span>Active Assessments</span>
              </CardTitle>
              <Button size="sm" className="bg-edu-green hover:bg-edu-green/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {assessments.length === 0 ? (
                <div className="text-center py-8">
                  <ClipboardCheck className="h-8 w-8 text-edu-gray/50 mx-auto mb-2" />
                  <p className="text-sm text-edu-gray">No active assessments</p>
                  <p className="text-xs text-edu-gray/70">Create your first assessment</p>
                </div>
              ) : (
                assessments.slice(0, 3).map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-edu-dark text-sm">{assessment.title}</p>
                      <p className="text-xs text-edu-gray">
                        {assessment.subject} • {assessment.grade} • {assessment.totalQuestions} questions
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-edu-green/10 text-edu-green">
                        {assessment.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-edu-purple" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="p-3 bg-edu-purple/5 rounded-lg border border-edu-purple/20">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-edu-dark text-sm">{classItem.subject}</p>
                    <span className="text-xs text-edu-purple font-medium">{classItem.time}</span>
                  </div>
                  <p className="text-xs text-edu-gray">{classItem.students} students • {classItem.room}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-edu-dark text-sm">{performer.name}</p>
                    <p className="text-xs text-edu-gray">{performer.subject}</p>
                  </div>
                  <span className="text-sm font-bold text-edu-green">{performer.score}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-edu-blue hover:bg-edu-blue/90" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
