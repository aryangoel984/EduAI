import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Wand2, Eye, Save } from "lucide-react";
import { insertAssessmentSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertAssessment } from "@shared/schema";

const questionTypes = [
  { id: "Multiple Choice", label: "Multiple Choice" },
  { id: "Short Answer", label: "Short Answer" },
  { id: "Essay", label: "Essay" },
  { id: "Fill in the Blanks", label: "Fill in the Blanks" }
];

export default function AssessmentBuilder() {
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(["Multiple Choice", "Short Answer"]);
  const [previewQuestion, setPreviewQuestion] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertAssessment>({
    resolver: zodResolver(insertAssessmentSchema),
    defaultValues: {
      title: "",
      subject: "",
      grade: "",
      duration: 60,
      totalQuestions: 20,
      difficulty: "medium",
      questionTypes: ["Multiple Choice", "Short Answer"],
      createdBy: 1, // In a real app, get from auth context
      status: "draft"
    }
  });

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: InsertAssessment) => {
      const response = await apiRequest("POST", "/api/assessments", {
        ...data,
        questionTypes: selectedQuestionTypes
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      toast({
        title: "Assessment Created",
        description: "Your assessment has been successfully created.",
      });
      form.reset();
      setSelectedQuestionTypes(["Multiple Choice", "Short Answer"]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create assessment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const generatePreview = () => {
    const formData = form.getValues();
    setPreviewQuestion({
      id: 1,
      type: "multiple_choice",
      question: `Sample ${formData.subject} question: This is a ${formData.difficulty} difficulty question about ${formData.subject}.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 1,
      points: formData.difficulty === "hard" ? 3 : formData.difficulty === "medium" ? 2 : 1
    });
  };

  const onSubmit = (data: InsertAssessment) => {
    createAssessmentMutation.mutate(data);
  };

  const handleQuestionTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedQuestionTypes(prev => [...prev, typeId]);
    } else {
      setSelectedQuestionTypes(prev => prev.filter(id => id !== typeId));
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Assessment Builder Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Create New Assessment</CardTitle>
            <Button
              type="button"
              variant="outline"
              onClick={generatePreview}
              className="bg-edu-green text-white hover:bg-edu-green/90"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              AI Generate Preview
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assessment Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Algebra Quiz 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grade Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Grade 6">Grade 6</SelectItem>
                            <SelectItem value="Grade 7">Grade 7</SelectItem>
                            <SelectItem value="Grade 8">Grade 8</SelectItem>
                            <SelectItem value="Grade 9">Grade 9</SelectItem>
                            <SelectItem value="Grade 10">Grade 10</SelectItem>
                            <SelectItem value="Grade 11">Grade 11</SelectItem>
                            <SelectItem value="Grade 12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="300"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalQuestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Questions</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Question Types</Label>
                  <div className="flex flex-wrap gap-4 mt-3">
                    {questionTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedQuestionTypes.includes(type.id)}
                          onCheckedChange={(checked) =>
                            handleQuestionTypeChange(type.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={type.id} className="text-sm">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {previewQuestion && (
                  <Card className="border-edu-blue/20 bg-edu-blue/5">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-edu-blue">
                        <Eye className="h-5 w-5" />
                        <span>Generated Question Preview</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-l-4 border-edu-blue pl-4">
                        <p className="font-medium text-edu-dark mb-3">
                          <strong>Question 1:</strong> {previewQuestion.question}
                        </p>
                        <div className="space-y-2 text-sm text-edu-gray">
                          {previewQuestion.options.map((option: string, index: number) => (
                            <p key={index} className={index === previewQuestion.correctAnswer ? "font-medium text-edu-green" : ""}>
                              {String.fromCharCode(65 + index)}) {option}
                            </p>
                          ))}
                        </div>
                        <p className="text-xs text-edu-green mt-3">
                          ✓ Correct Answer: {String.fromCharCode(65 + previewQuestion.correctAnswer)}) {previewQuestion.options[previewQuestion.correctAnswer]}
                        </p>
                        <p className="text-xs text-edu-gray mt-1">Points: {previewQuestion.points}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={createAssessmentMutation.isPending}
                    className="bg-edu-blue hover:bg-edu-blue/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {createAssessmentMutation.isPending ? "Creating..." : "Create Assessment"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-edu-gray">Active Assessments</span>
              <span className="font-semibold text-edu-dark">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-edu-gray">Completed This Week</span>
              <span className="font-semibold text-edu-dark">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-edu-gray">Average Score</span>
              <span className="font-semibold text-edu-green">82%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-edu-gray">Auto-Graded</span>
              <span className="font-semibold text-edu-blue">98%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Algebra Quiz 1", subject: "Math", grade: "Grade 10", status: "Active", statusColor: "text-edu-green bg-edu-green/10" },
              { title: "Biology Test", subject: "Science", grade: "Grade 11", status: "Completed", statusColor: "text-edu-gray bg-gray-100" },
              { title: "History Essay", subject: "History", grade: "Grade 12", status: "Grading", statusColor: "text-edu-coral bg-edu-coral/10" }
            ].map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-edu-dark text-sm">{assessment.title}</p>
                  <p className="text-xs text-edu-gray">{assessment.subject} • {assessment.grade}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${assessment.statusColor}`}>
                  {assessment.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
