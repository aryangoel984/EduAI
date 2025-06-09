import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'student', 'educator', 'admin'
  name: text("name").notNull(),
  grade: text("grade"), // For students
  subjects: text("subjects").array(), // For educators
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  isAI: boolean("is_ai").notNull().default(false),
  subject: text("subject"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  grade: text("grade").notNull(),
  duration: integer("duration").notNull(), // in minutes
  totalQuestions: integer("total_questions").notNull(),
  difficulty: text("difficulty").notNull(),
  questionTypes: text("question_types").array(),
  questions: jsonb("questions"), // Array of question objects
  createdBy: integer("created_by").notNull(),
  status: text("status").notNull().default("draft"), // 'draft', 'active', 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const studentAssessments = pgTable("student_assessments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  assessmentId: integer("assessment_id").notNull(),
  score: integer("score"),
  maxScore: integer("max_score"),
  answers: jsonb("answers"), // Student's answers
  completedAt: timestamp("completed_at"),
  startedAt: timestamp("started_at").defaultNow(),
});

export const studentProgress = pgTable("student_progress", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  subject: text("subject").notNull(),
  progress: integer("progress").notNull().default(0), // percentage
  lastActivity: timestamp("last_activity").defaultNow(),
  engagementScore: integer("engagement_score").default(100),
  riskLevel: text("risk_level").default("low"), // 'low', 'medium', 'high'
});

export const interventions = pgTable("interventions", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  educatorId: integer("educator_id").notNull(),
  type: text("type").notNull(), // 'tutoring', 'pace_adjustment', 'engagement'
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'in_progress', 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export const insertStudentAssessmentSchema = createInsertSchema(studentAssessments).omit({
  id: true,
  startedAt: true,
});

export const insertStudentProgressSchema = createInsertSchema(studentProgress).omit({
  id: true,
  lastActivity: true,
});

export const insertInterventionSchema = createInsertSchema(interventions).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type StudentAssessment = typeof studentAssessments.$inferSelect;
export type InsertStudentAssessment = z.infer<typeof insertStudentAssessmentSchema>;
export type StudentProgress = typeof studentProgress.$inferSelect;
export type InsertStudentProgress = z.infer<typeof insertStudentProgressSchema>;
export type Intervention = typeof interventions.$inferSelect;
export type InsertIntervention = z.infer<typeof insertInterventionSchema>;
