import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Brain, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Award
} from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";
import type { StudentProgress, StudentAssessment, ChatMessage } from "@shared/schema";

interface StudentDashboardProps {
  userId: number;
}

export default function StudentDashboard({ userId }: StudentDashboardProps) {
  const { data: progress = [], isLoading: progressLoading } = useQuery<StudentProgress[]>({
    queryKey: ["/api/student-progress/" + userId],
    enabled: !!userId,
  });

  const { data: assessments = [], isLoading: assessmentsLoading } = useQuery<StudentAssessment[]>({
    queryKey: ["/api/student-assessments/" + userId],
    enabled: !!userId,
  });

  const { data: recentMessages = [], isLoading: messagesLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/" + userId],
    enabled: !!userId,
  });

  // Mock data for demonstration - replace with real API data
  const mockData = {
    upcomingTasks: [
      {
        id: 1,
        title: "Physics Assignment",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        priority: "high",
        subject: "Physics"
      },
      {
        id: 2,
        title: "Math Quiz Review",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: "medium",
        subject: "Mathematics"
      },
      {
        id: 3,
        title: "Reading Assignment",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        priority: "low",
        subject: "English"
      }
    ],
    achievements: [
      { id: 1, title: "Math Streak", description: "7 days in a row", icon: "🔥" },
      { id: 2, title: "Quick Learner", description: "Completed 5 lessons", icon: "⚡" },
      { id: 3, title: "Helper", description: "Asked great questions", icon: "🎯" }
    ],
    weeklyStats: {
      lessonsCompleted: 12,
      timeSpent: 8.5, // hours
      averageScore: 85,
      streak: 5
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  if (progressLoading || assessmentsLoading || messagesLoading) {
    return (
      <div className="grid lg:grid-cols-3 gap-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="h-24 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-edu-blue" />
            <span>My Learning Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {progress.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-8 w-8 text-edu-gray/50 mx-auto mb-2" />
              <p className="text-sm text-edu-gray">No progress data yet</p>
              <p className="text-xs text-edu-gray/70">Start learning to see your progress</p>
            </div>
          ) : (
            progress.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-edu-gray">{item.subject}</span>
                  <span className={`font-medium ${getProgressColor(item.progress)}`}>
                    {item.progress}%
                  </span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))
          )}
          
          {progress.length === 0 && (
            <>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-edu-gray">Mathematics</span>
                  <span className="font-medium text-edu-blue">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-edu-gray">Physics</span>
                  <span className="font-medium text-edu-green">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-edu-gray">Chemistry</span>
                  <span className="font-medium text-edu-purple">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
            </>
          )}
          
          <div className="mt-6 p-4 bg-edu-blue/5 rounded-lg">
            <p className="text-sm font-medium text-edu-dark mb-1">Next Milestone</p>
            <p className="text-xs text-edu-gray">Complete Chapter 5 in Mathematics</p>
            <div className="mt-2">
              <Progress value={60} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-edu-green" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentMessages.length === 0 && assessments.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 text-edu-gray/50 mx-auto mb-2" />
              <p className="text-sm text-edu-gray">No recent activity</p>
              <p className="text-xs text-edu-gray/70">Start learning to see your activity</p>
            </div>
          ) : (
            <>
              {/* Recent Assessment */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-edu-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-edu-green h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-edu-dark">Completed Quiz: Algebra Basics</p>
                  <p className="text-xs text-edu-gray">Score: 18/20 • 2 hours ago</p>
                </div>
              </div>
              
              {/* Recent AI Tutor Session */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-edu-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="text-edu-blue h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-edu-dark">AI Tutor Session</p>
                  <p className="text-xs text-edu-gray">Physics: Motion & Forces • 1 day ago</p>
                </div>
              </div>
              
              {/* Recent Lesson */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-edu-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-edu-purple h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-edu-dark">Lesson Completed</p>
                  <p className="text-xs text-edu-gray">Chemistry: Atomic Structure • 2 days ago</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-edu-coral" />
            <span>Upcoming Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockData.upcomingTasks.map((task) => (
            <div key={task.id} className={`flex items-center justify-between p-3 rounded-lg border ${getPriorityColor(task.priority)}`}>
              <div>
                <p className="font-medium text-edu-dark text-sm">{task.title}</p>
                <p className="text-xs text-edu-gray">
                  Due {formatDate(task.dueDate)} • {task.subject}
                </p>
              </div>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
          ))}
          
          <Button className="w-full mt-4 bg-edu-blue hover:bg-edu-blue/90">
            View All Tasks
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-edu-purple" />
            <span>This Week's Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-edu-blue/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-8 w-8 text-edu-blue" />
              </div>
              <p className="text-2xl font-bold text-edu-dark">{mockData.weeklyStats.lessonsCompleted}</p>
              <p className="text-sm text-edu-gray">Lessons Completed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-edu-green/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-8 w-8 text-edu-green" />
              </div>
              <p className="text-2xl font-bold text-edu-dark">{mockData.weeklyStats.timeSpent}h</p>
              <p className="text-sm text-edu-gray">Time Spent</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-edu-coral/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-8 w-8 text-edu-coral" />
              </div>
              <p className="text-2xl font-bold text-edu-dark">{mockData.weeklyStats.averageScore}%</p>
              <p className="text-sm text-edu-gray">Average Score</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-edu-purple/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-8 w-8 text-edu-purple" />
              </div>
              <p className="text-2xl font-bold text-edu-dark">{mockData.weeklyStats.streak}</p>
              <p className="text-sm text-edu-gray">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <p className="font-medium text-edu-dark text-sm">{achievement.title}</p>
                <p className="text-xs text-edu-gray">{achievement.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
