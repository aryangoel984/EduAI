import AITutorChat from "@/components/chat/AITutorChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, Languages, Users, MessageSquare, BookOpen } from "lucide-react";

export default function AITutor() {
  // In a real app, you'd get the current user ID from authentication context
  const currentUserId = 1;

  const features = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "AI adjusts to your learning style and pace"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Get help whenever you need it"
    },
    {
      icon: Languages,
      title: "Multi-Languages",
      description: "Learn in your preferred language"
    },
    {
      icon: Users,
      title: "Personalized",
      description: "Customized explanations for each student"
    }
  ];

  const subjects = [
    { name: "Mathematics", sessions: 156, color: "bg-edu-blue" },
    { name: "Physics", sessions: 89, color: "bg-edu-green" },
    { name: "Chemistry", sessions: 73, color: "bg-edu-purple" },
    { name: "Biology", sessions: 62, color: "bg-edu-coral" },
    { name: "English", sessions: 45, color: "bg-orange-500" },
    { name: "History", sessions: 31, color: "bg-indigo-500" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-edu-dark mb-4">
            AI-Powered Personal Tutor
          </h1>
          <p className="text-lg text-edu-gray max-w-2xl mx-auto">
            Get instant, personalized help with any subject. Our AI tutor adapts to your learning style and provides explanations tailored just for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <AITutorChat userId={currentUserId} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-edu-blue" />
                  <span>AI Tutor Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-edu-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-edu-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-edu-dark text-sm">{feature.title}</h4>
                      <p className="text-xs text-edu-gray">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subject Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-edu-green" />
                  <span>Subject Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${subject.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-edu-dark">{subject.name}</span>
                    </div>
                    <span className="text-xs text-edu-gray">{subject.sessions} sessions</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gradient-to-br from-edu-blue/5 to-edu-purple/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-edu-purple" />
                  <span>Quick Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-edu-gray">
                  <h4 className="font-semibold text-edu-dark mb-1">Be specific</h4>
                  <p>Ask detailed questions for better answers</p>
                </div>
                <div className="text-sm text-edu-gray">
                  <h4 className="font-semibold text-edu-dark mb-1">Show your work</h4>
                  <p>Share what you've tried so far</p>
                </div>
                <div className="text-sm text-edu-gray">
                  <h4 className="font-semibold text-edu-dark mb-1">Ask follow-ups</h4>
                  <p>Don't hesitate to ask for clarification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
