// Vercel serverless function for the backend API
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage for Vercel deployment
const storage = {
  users: new Map(),
  chatMessages: new Map(),
  assessments: new Map(),
  studentAssessments: new Map(),
  studentProgress: new Map(),
  interventions: new Map(),
  currentId: 1
};

// Initialize demo data
function initializeData() {
  storage.users.set(1, {
    id: 1,
    username: "student1",
    email: "student@example.com",
    password: "password123",
    role: "student",
    name: "Alex Johnson",
    grade: "10",
    subjects: null,
    createdAt: new Date()
  });

  storage.users.set(2, {
    id: 2,
    username: "teacher1",
    email: "teacher@example.com",
    password: "password123",
    role: "educator",
    name: "Sarah Wilson",
    grade: null,
    subjects: ["Mathematics", "Physics"],
    createdAt: new Date()
  });

  storage.users.set(3, {
    id: 3,
    username: "admin1",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    name: "David Chen",
    grade: null,
    subjects: null,
    createdAt: new Date()
  });

  storage.currentId = 4;
}

initializeData();

// API Routes
app.get('/api/users', (req, res) => {
  const { role } = req.query;
  if (!role) {
    return res.status(400).json({ message: 'Role parameter required' });
  }
  
  const users = Array.from(storage.users.values()).filter(user => user.role === role);
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = storage.users.get(id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

app.get('/api/chat/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const messages = Array.from(storage.chatMessages.values())
    .filter(msg => msg.userId === userId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
  res.json(messages);
});

app.post('/api/chat', (req, res) => {
  const { userId, message, subject } = req.body;
  
  // Create user message
  const userMessage = {
    id: storage.currentId++,
    userId: parseInt(userId),
    message,
    isAI: false,
    subject: subject || null,
    createdAt: new Date()
  };
  
  storage.chatMessages.set(userMessage.id, userMessage);
  
  // Generate AI response
  const aiResponse = {
    id: storage.currentId++,
    userId: parseInt(userId),
    message: generateAIResponse(message, subject),
    isAI: true,
    subject: subject || null,
    createdAt: new Date()
  };
  
  storage.chatMessages.set(aiResponse.id, aiResponse);
  
  res.json({ userMessage, aiResponse });
});

app.get('/api/assessments', (req, res) => {
  const assessments = Array.from(storage.assessments.values());
  res.json(assessments);
});

app.post('/api/assessments', (req, res) => {
  const assessment = {
    id: storage.currentId++,
    ...req.body,
    status: req.body.status || 'draft',
    questionTypes: req.body.questionTypes || [],
    questions: req.body.questions || {},
    createdAt: new Date()
  };
  
  storage.assessments.set(assessment.id, assessment);
  res.json(assessment);
});

app.get('/api/student-assessments/:studentId', (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const assessments = Array.from(storage.studentAssessments.values())
    .filter(sa => sa.studentId === studentId);
  
  res.json(assessments);
});

app.get('/api/student-progress/:studentId', (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const progress = Array.from(storage.studentProgress.values())
    .filter(sp => sp.studentId === studentId);
  
  res.json(progress);
});

function generateAIResponse(userMessage, subject) {
  const responses = [
    `Great question about ${subject || 'this topic'}! Let me help you understand this concept better.`,
    `I can see you're working on ${subject || 'an important topic'}. Here's how I would approach this...`,
    `That's an excellent question! In ${subject || 'this subject'}, we often see patterns like...`,
    `Let me break this down for you step by step. The key concept here is...`,
    `I understand what you're asking. This is a common question in ${subject || 'this area'}, and here's my explanation...`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = app;