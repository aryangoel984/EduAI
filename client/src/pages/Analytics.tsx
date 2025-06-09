import RiskDashboard from "@/components/analytics/RiskDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  Target,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-2">
                Analytics & Risk Prediction
              </h1>
              <p className="text-lg text-edu-gray">
                AI-powered insights to identify at-risk students and track performance trends across your institution.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select defaultValue="month">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="risk" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="risk" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk Prediction</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Engagement</span>
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Assessments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="risk" className="space-y-6">
            <RiskDashboard />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Analytics */}
            <div className="grid lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Avg. Score</h4>
                    <Target className="h-5 w-5 text-edu-green" />
                  </div>
                  <p className="text-2xl font-bold text-edu-green">82.5%</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Top Performers</h4>
                    <TrendingUp className="h-5 w-5 text-edu-blue" />
                  </div>
                  <p className="text-2xl font-bold text-edu-blue">156</p>
                  <p className="text-xs text-edu-gray mt-1">Students above 90%</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Improvement Rate</h4>
                    <TrendingUp className="h-5 w-5 text-edu-purple" />
                  </div>
                  <p className="text-2xl font-bold text-edu-purple">78%</p>
                  <p className="text-xs text-edu-gray mt-1">Students improving</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Grade Distribution</h4>
                    <PieChart className="h-5 w-5 text-edu-coral" />
                  </div>
                  <p className="text-2xl font-bold text-edu-coral">B+</p>
                  <p className="text-xs text-edu-gray mt-1">Most common grade</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="h-5 w-5 text-edu-blue" />
                    <span>Performance Trends by Subject</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-edu-blue/5 to-edu-green/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                      <p className="text-edu-gray">Performance Trends Chart</p>
                      <p className="text-sm text-edu-gray">Subject-wise performance over time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-edu-green" />
                    <span>Grade Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-edu-green/5 to-edu-purple/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-edu-green/50 mx-auto mb-4" />
                      <p className="text-edu-gray">Grade Distribution Chart</p>
                      <p className="text-sm text-edu-gray">A, B, C, D, F distribution</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            {/* Engagement Analytics */}
            <div className="grid lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Daily Active Users</h4>
                    <Users className="h-5 w-5 text-edu-blue" />
                  </div>
                  <p className="text-2xl font-bold text-edu-blue">1,247</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 12% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Avg. Session Time</h4>
                    <Calendar className="h-5 w-5 text-edu-green" />
                  </div>
                  <p className="text-2xl font-bold text-edu-green">24m</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 3m from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Course Completion</h4>
                    <Target className="h-5 w-5 text-edu-purple" />
                  </div>
                  <p className="text-2xl font-bold text-edu-purple">89%</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 7% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">AI Tutor Usage</h4>
                    <TrendingUp className="h-5 w-5 text-edu-coral" />
                  </div>
                  <p className="text-2xl font-bold text-edu-coral">3,582</p>
                  <p className="text-xs text-edu-gray mt-1">Sessions this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-edu-blue" />
                    <span>Daily Engagement Patterns</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-edu-blue/5 to-edu-coral/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                      <p className="text-edu-gray">Engagement Patterns Chart</p>
                      <p className="text-sm text-edu-gray">Peak usage hours and patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-edu-green" />
                    <span>Feature Usage Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-edu-green/5 to-edu-purple/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-12 w-12 text-edu-green/50 mx-auto mb-4" />
                      <p className="text-edu-gray">Feature Usage Chart</p>
                      <p className="text-sm text-edu-gray">AI Tutor, Assessments, Dashboard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-6">
            {/* Assessment Analytics */}
            <div className="grid lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Total Assessments</h4>
                    <Target className="h-5 w-5 text-edu-blue" />
                  </div>
                  <p className="text-2xl font-bold text-edu-blue">188</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Completion Rate</h4>
                    <TrendingUp className="h-5 w-5 text-edu-green" />
                  </div>
                  <p className="text-2xl font-bold text-edu-green">94%</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Avg. Score</h4>
                    <Target className="h-5 w-5 text-edu-purple" />
                  </div>
                  <p className="text-2xl font-bold text-edu-purple">78.5%</p>
                  <p className="text-xs text-edu-gray mt-1">↑ 2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-edu-gray">Auto-Graded</h4>
                    <BarChart3 className="h-5 w-5 text-edu-coral" />
                  </div>
                  <p className="text-2xl font-bold text-edu-coral">98%</p>
                  <p className="text-xs text-edu-gray mt-1">Automated grading rate</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-edu-blue" />
                    <span>Assessment Performance by Subject</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-edu-blue/5 to-edu-green/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                      <p className="text-edu-gray">Subject Performance Chart</p>
                      <p className="text-sm text-edu-gray">Math, Science, English, History</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="h-5 w-5 text-edu-green" />
                    <span>Assessment Difficulty vs Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-edu-green/5 to-edu-purple/5 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-edu-green/50 mx-auto mb-4" />
                      <p className="text-edu-gray">Difficulty Analysis Chart</p>
                      <p className="text-sm text-edu-gray">Easy, Medium, Hard performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Assessments Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessment Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Algebra Quiz 1", subject: "Mathematics", completed: 28, average: 85, difficulty: "Medium" },
                    { title: "Physics Lab Test", subject: "Physics", completed: 22, average: 78, difficulty: "Hard" },
                    { title: "English Essay", subject: "English", completed: 30, average: 82, difficulty: "Medium" },
                    { title: "Chemistry Basics", subject: "Chemistry", completed: 25, average: 91, difficulty: "Easy" }
                  ].map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-edu-dark">{assessment.title}</p>
                        <p className="text-sm text-edu-gray">{assessment.subject} • {assessment.difficulty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-edu-dark">{assessment.average}%</p>
                        <p className="text-sm text-edu-gray">{assessment.completed} completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
