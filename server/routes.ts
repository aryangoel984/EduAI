import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertChatMessageSchema, 
  insertAssessmentSchema,
  insertStudentAssessmentSchema,
  insertStudentProgressSchema,
  insertInterventionSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const { role } = req.query;
      if (role && typeof role === 'string') {
        const users = await storage.getUsersByRole(role);
        res.json(users);
      } else {
        res.status(400).json({ message: "Role parameter required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, you'd use proper session management
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Chat routes
  app.get("/api/chat/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      
      // Generate AI response if message is from user
      if (!messageData.isAI) {
        const aiResponse = generateAIResponse(messageData.message, messageData.subject);
        const aiMessage = await storage.createChatMessage({
          userId: messageData.userId,
          message: aiResponse,
          isAI: true,
          subject: messageData.subject,
        });
        res.json({ userMessage: message, aiMessage });
      } else {
        res.json({ userMessage: message });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Assessment routes
  app.get("/api/assessments", async (req, res) => {
    try {
      const { createdBy } = req.query;
      const assessments = await storage.getAssessments(
        createdBy ? parseInt(createdBy as string) : undefined
      );
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      
      // Generate questions if not provided
      if (!assessmentData.questions) {
        assessmentData.questions = generateAssessmentQuestions(
          assessmentData.subject,
          assessmentData.totalQuestions,
          assessmentData.difficulty,
          assessmentData.questionTypes
        );
      }
      
      const assessment = await storage.createAssessment(assessmentData);
      res.status(201).json(assessment);
    } catch (error) {
      res.status(400).json({ message: "Invalid assessment data" });
    }
  });

  app.put("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const assessment = await storage.updateAssessment(id, updates);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update assessment" });
    }
  });

  // Student Assessment routes
  app.get("/api/student-assessments/:studentId", async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const assessments = await storage.getStudentAssessments(studentId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student assessments" });
    }
  });

  app.post("/api/student-assessments", async (req, res) => {
    try {
      const data = insertStudentAssessmentSchema.parse(req.body);
      const studentAssessment = await storage.createStudentAssessment(data);
      res.status(201).json(studentAssessment);
    } catch (error) {
      res.status(400).json({ message: "Invalid student assessment data" });
    }
  });

  // Student Progress routes
  app.get("/api/student-progress/:studentId", async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const progress = await storage.getStudentProgress(studentId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student progress" });
    }
  });

  app.post("/api/student-progress", async (req, res) => {
    try {
      const data = insertStudentProgressSchema.parse(req.body);
      const progress = await storage.createStudentProgress(data);
      res.status(201).json(progress);
    } catch (error) {
      res.status(400).json({ message: "Invalid student progress data" });
    }
  });

  // Intervention routes
  app.get("/api/interventions", async (req, res) => {
    try {
      const { studentId, educatorId } = req.query;
      const interventions = await storage.getInterventions(
        studentId ? parseInt(studentId as string) : undefined,
        educatorId ? parseInt(educatorId as string) : undefined
      );
      res.json(interventions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch interventions" });
    }
  });

  app.post("/api/interventions", async (req, res) => {
    try {
      const data = insertInterventionSchema.parse(req.body);
      const intervention = await storage.createIntervention(data);
      res.status(201).json(intervention);
    } catch (error) {
      res.status(400).json({ message: "Invalid intervention data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions for generating AI responses and assessment questions
function generateAIResponse(userMessage: string, subject?: string): string {
  const responses = {
    mathematics: [
      "I'd be happy to help with your math question! Let me break this down step by step.",
      "Great question! Mathematics is all about understanding patterns. Let's explore this together.",
      "I can see you're working on an interesting problem. Let me guide you through the solution.",
    ],
    physics: [
      "Physics is fascinating! Let's explore the fundamental principles behind your question.",
      "I love helping with physics problems. Let's start with the basic concepts.",
      "That's a great physics question! Let me explain the underlying principles.",
    ],
    chemistry: [
      "Chemistry is all about understanding how atoms and molecules interact. Let's dive in!",
      "Excellent chemistry question! Let's explore the molecular level to understand this.",
      "I'm excited to help with chemistry! Let's break down the chemical processes involved.",
    ],
  };

  const subjectResponses = subject && responses[subject as keyof typeof responses] 
    ? responses[subject as keyof typeof responses]
    : [
      "That's a thoughtful question! Let me help you understand this concept better.",
      "I'm here to help you learn! Let's work through this together.",
      "Great question! Learning is all about curiosity, and I'm here to guide you.",
    ];

  return subjectResponses[Math.floor(Math.random() * subjectResponses.length)];
}

function generateAssessmentQuestions(
  subject: string,
  totalQuestions: number,
  difficulty: string,
  questionTypes: string[]
): any[] {
  const questions = [];
  
  for (let i = 0; i < totalQuestions; i++) {
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    if (questionType === "Multiple Choice") {
      questions.push({
        id: i + 1,
        type: "multiple_choice",
        question: `${subject} question ${i + 1}: This is a sample ${difficulty} difficulty question.`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: 0,
        points: difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 1,
      });
    } else if (questionType === "Short Answer") {
      questions.push({
        id: i + 1,
        type: "short_answer",
        question: `${subject} question ${i + 1}: Provide a brief explanation for this ${difficulty} concept.`,
        points: difficulty === "hard" ? 5 : difficulty === "medium" ? 3 : 2,
      });
    }
  }
  
  return questions;
}
