import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import AssessmentBuilder from "@/components/assessment/AssessmentBuilder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Plus, Search, Filter, Eye, Edit, Trash2, Users, Clock, Target } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Assessment } from "@shared/schema";

export default function Assessments() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: assessments = [], isLoading } = useQuery<Assessment[]>({
    queryKey: ["/api/assessments"],
  });

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === "all" || assessment.subject === filterSubject;
    const matchesStatus = filterStatus === "all" || assessment.status === filterStatus;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-edu-green/10 text-edu-green border-edu-green/20";
      case "completed":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "draft":
        return "bg-edu-blue/10 text-edu-blue border-edu-blue/20";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-2">
                Assessment Management
              </h1>
              <p className="text-lg text-edu-gray">
                Create, manage, and analyze automated assessments with AI-powered generation.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-6 text-sm text-edu-gray">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-edu-green rounded-full"></div>
                  <span>Active: 24</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-edu-blue rounded-full"></div>
                  <span>Draft: 8</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Completed: 156</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <ClipboardCheck className="h-4 w-4" />
              <span>Manage Assessments</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create New</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-edu-gray h-4 w-4" />
                      <Input
                        placeholder="Search assessments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterSubject} onValueChange={setFilterSubject}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Assessments List */}
            <div className="grid gap-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <ClipboardCheck className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                  <p className="text-edu-gray">Loading assessments...</p>
                </div>
              ) : filteredAssessments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <ClipboardCheck className="h-12 w-12 text-edu-gray/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-edu-dark mb-2">No Assessments Found</h3>
                    <p className="text-edu-gray mb-4">
                      {searchTerm || filterSubject !== "all" || filterStatus !== "all"
                        ? "Try adjusting your filters to see more results."
                        : "Create your first assessment to get started."}
                    </p>
                    <Button 
                      className="bg-edu-blue hover:bg-edu-blue/90"
                      onClick={() => setShowCreateForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Assessment
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredAssessments.map((assessment) => (
                  <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-semibold text-edu-dark">{assessment.title}</h3>
                            <Badge className={getStatusColor(assessment.status || "draft")}>
                              {assessment.status || "draft"}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-edu-gray">
                              <div className="w-2 h-2 bg-edu-blue rounded-full"></div>
                              <span>{assessment.subject} • {assessment.grade}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-edu-gray">
                              <Clock className="h-4 w-4" />
                              <span>{assessment.duration} minutes</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-edu-gray">
                              <Target className="h-4 w-4" />
                              <span>{assessment.totalQuestions} questions</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-edu-gray">
                            <span>Difficulty: {assessment.difficulty}</span>
                            <span>•</span>
                            <span>Created: {formatDate(assessment.createdAt)}</span>
                            <span>•</span>
                            <span>Types: {assessment.questionTypes?.join(", ")}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <AssessmentBuilder />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-edu-gray">Total Assessments</p>
                      <p className="text-2xl font-bold text-edu-dark">188</p>
                    </div>
                    <ClipboardCheck className="h-8 w-8 text-edu-blue" />
                  </div>
                  <p className="text-xs text-edu-gray mt-2">↑ 12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-edu-gray">Avg. Completion Rate</p>
                      <p className="text-2xl font-bold text-edu-green">94%</p>
                    </div>
                    <Target className="h-8 w-8 text-edu-green" />
                  </div>
                  <p className="text-xs text-edu-gray mt-2">↑ 3% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-edu-gray">Active Students</p>
                      <p className="text-2xl font-bold text-edu-purple">1,247</p>
                    </div>
                    <Users className="h-8 w-8 text-edu-purple" />
                  </div>
                  <p className="text-xs text-edu-gray mt-2">↑ 18% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-edu-gray">Avg. Score</p>
                      <p className="text-2xl font-bold text-edu-coral">78.5%</p>
                    </div>
                    <Target className="h-8 w-8 text-edu-coral" />
                  </div>
                  <p className="text-xs text-edu-gray mt-2">↑ 2% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-edu-blue/5 to-edu-green/5 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Target className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                    <p className="text-edu-gray">Performance analytics chart</p>
                    <p className="text-sm text-edu-gray">Integrate with charting library</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
