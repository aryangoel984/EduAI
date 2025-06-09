import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  BookOpen, 
  ChevronRight, 
  Download,
  Lightbulb,
  TrendingDown
} from "lucide-react";
import { getRiskColor } from "@/lib/utils";
import type { User, StudentProgress } from "@shared/schema";

// Mock data for demonstration - in real app, this would come from API
const mockRiskData = {
  atRiskStudents: [
    {
      id: 1,
      name: "Alex Morgan",
      grade: "Grade 10",
      subject: "Mathematics",
      riskLevel: "high",
      engagementScore: 32,
      averageScore: 45,
      trend: "declining",
      lastActivity: "2 days ago"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      grade: "Grade 11",
      subject: "Physics",
      riskLevel: "medium",
      engagementScore: 65,
      averageScore: 68,
      trend: "stable",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      name: "Michael Roberts",
      grade: "Grade 9",
      subject: "English",
      riskLevel: "low",
      engagementScore: 85,
      averageScore: 78,
      trend: "improving",
      lastActivity: "3 hours ago"
    }
  ],
  metrics: {
    atRiskCount: 23,
    classAverage: 78.5,
    engagementRate: 85,
    interventions: 8,
    trendDirection: "up"
  }
};

export default function RiskDashboard() {
  const { data: students = [], isLoading } = useQuery<User[]>({
    queryKey: ["/api/users", { role: "student" }],
  });

  const metrics = mockRiskData.metrics;
  const atRiskStudents = mockRiskData.atRiskStudents;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300"></div>;
    }
  };

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="pt-6">
              <div className="h-16 bg-gray-200 rounded"></div>
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
              <h4 className="text-sm font-medium text-edu-gray">At-Risk Students</h4>
              <AlertTriangle className="h-5 w-5 text-edu-coral" />
            </div>
            <p className="text-2xl font-bold text-edu-coral">{metrics.atRiskCount}</p>
            <p className="text-xs text-edu-gray mt-1">↑ 12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Class Average</h4>
              <TrendingUp className="h-5 w-5 text-edu-green" />
            </div>
            <p className="text-2xl font-bold text-edu-green">{metrics.classAverage}%</p>
            <p className="text-xs text-edu-gray mt-1">↑ 3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Engagement Rate</h4>
              <Users className="h-5 w-5 text-edu-blue" />
            </div>
            <p className="text-2xl font-bold text-edu-blue">{metrics.engagementRate}%</p>
            <p className="text-xs text-edu-gray mt-1">↓ 2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-edu-gray">Interventions</h4>
              <BookOpen className="h-5 w-5 text-edu-purple" />
            </div>
            <p className="text-2xl font-bold text-edu-purple">{metrics.interventions}</p>
            <p className="text-xs text-edu-gray mt-1">Active this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Trends Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Student Performance Trends</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-edu-gray hover:text-edu-blue">
                  Week
                </Button>
                <Button size="sm" className="bg-edu-blue text-white">
                  Month
                </Button>
                <Button variant="ghost" size="sm" className="text-edu-gray hover:text-edu-blue">
                  Quarter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Chart Placeholder */}
              <div className="h-64 bg-gradient-to-r from-edu-blue/5 to-edu-green/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                  <p className="text-edu-gray">Performance Trend Chart</p>
                  <p className="text-sm text-edu-gray">Recharts integration required</p>
                </div>
              </div>
              
              {/* Chart Legend */}
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-edu-green rounded-full"></div>
                  <span className="text-sm text-edu-gray">High Performers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-edu-blue rounded-full"></div>
                  <span className="text-sm text-edu-gray">Average</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-edu-coral rounded-full"></div>
                  <span className="text-sm text-edu-gray">At-Risk</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* At-Risk Students List */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Priority Students</CardTitle>
              <Button variant="ghost" size="sm" className="text-edu-blue">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {atRiskStudents.map((student) => (
                <div
                  key={student.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${getRiskBadgeColor(student.riskLevel)}`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm font-medium">
                      {getInitials(student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-edu-dark text-sm truncate">
                        {student.name}
                      </p>
                      {getTrendIcon(student.trend)}
                    </div>
                    <p className="text-xs text-edu-gray">{student.grade} • {student.subject}</p>
                    <div className="flex items-center mt-2">
                      <Progress 
                        value={student.engagementScore} 
                        className="w-16 h-1 mr-2"
                      />
                      <Badge className={`text-xs ${getRiskBadgeColor(student.riskLevel)}`}>
                        {student.riskLevel} risk
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Intervention Recommendations */}
          <Card className="mt-6 bg-edu-purple/5 border-edu-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center text-edu-purple">
                <Lightbulb className="h-5 w-5 mr-2" />
                Recommended Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-edu-gray">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-edu-purple rounded-full mt-2 flex-shrink-0"></div>
                  <span>Schedule 1-on-1 tutoring sessions for high-risk students</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-edu-purple rounded-full mt-2 flex-shrink-0"></div>
                  <span>Adjust learning pace for struggling learners</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-edu-purple rounded-full mt-2 flex-shrink-0"></div>
                  <span>Increase engagement through gamification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-edu-purple rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide additional practice materials</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
