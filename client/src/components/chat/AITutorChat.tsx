import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Send, MoreVertical } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { formatTime } from "@/lib/utils";
import type { ChatMessage } from "@shared/schema";

interface AITutorChatProps {
  userId: number;
}

export default function AITutorChat({ userId }: AITutorChatProps) {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("mathematics");
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/" + userId],
    enabled: !!userId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: { userId: number; message: string; subject: string }) => {
      const response = await apiRequest("POST", "/api/chat", messageData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/" + userId] });
      setMessage("");
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendMessageMutation.mutate({
      userId,
      message: message.trim(),
      subject,
    });
  };

  if (isLoading) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-8 w-8 text-edu-blue mx-auto mb-2 animate-pulse" />
          <p className="text-edu-gray">Loading chat...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-edu-blue rounded-full flex items-center justify-center">
              <Brain className="text-white h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Tutor</CardTitle>
              <p className="text-sm text-edu-gray">Online • {subject}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-edu-blue/50 mx-auto mb-4" />
                <p className="text-edu-gray">Start a conversation with your AI tutor!</p>
                <p className="text-sm text-edu-gray/70 mt-1">Ask any question about {subject}</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isAI ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      msg.isAI
                        ? "bg-gray-100 text-edu-dark"
                        : "bg-edu-blue text-white"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isAI ? "text-edu-gray" : "text-white/75"
                      }`}
                    >
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
            {sendMessageMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-edu-dark max-w-xs px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-edu-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-edu-blue rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-edu-blue rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                    <span className="text-xs text-edu-gray">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your question..."
              className="flex-1"
              disabled={sendMessageMutation.isPending}
            />
            <Button
              type="submit"
              disabled={!message.trim() || sendMessageMutation.isPending}
              className="bg-edu-blue hover:bg-edu-blue/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
