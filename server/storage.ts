import { 
  users, 
  chatMessages, 
  assessments, 
  studentAssessments, 
  studentProgress, 
  interventions,
  type User, 
  type InsertUser,
  type ChatMessage,
  type InsertChatMessage,
  type Assessment,
  type InsertAssessment,
  type StudentAssessment,
  type InsertStudentAssessment,
  type StudentProgress,
  type InsertStudentProgress,
  type Intervention,
  type InsertIntervention
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsersByRole(role: string): Promise<User[]>;

  // Chat methods
  getChatMessages(userId: number, limit?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Assessment methods
  getAssessments(createdBy?: number): Promise<Assessment[]>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: number, assessment: Partial<Assessment>): Promise<Assessment | undefined>;

  // Student Assessment methods
  getStudentAssessments(studentId: number): Promise<StudentAssessment[]>;
  getStudentAssessment(studentId: number, assessmentId: number): Promise<StudentAssessment | undefined>;
  createStudentAssessment(studentAssessment: InsertStudentAssessment): Promise<StudentAssessment>;
  updateStudentAssessment(id: number, studentAssessment: Partial<StudentAssessment>): Promise<StudentAssessment | undefined>;

  // Student Progress methods
  getStudentProgress(studentId: number): Promise<StudentProgress[]>;
  getStudentProgressBySubject(studentId: number, subject: string): Promise<StudentProgress | undefined>;
  createStudentProgress(progress: InsertStudentProgress): Promise<StudentProgress>;
  updateStudentProgress(id: number, progress: Partial<StudentProgress>): Promise<StudentProgress | undefined>;

  // Intervention methods
  getInterventions(studentId?: number, educatorId?: number): Promise<Intervention[]>;
  createIntervention(intervention: InsertIntervention): Promise<Intervention>;
  updateIntervention(id: number, intervention: Partial<Intervention>): Promise<Intervention | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private chatMessages: Map<number, ChatMessage>;
  private assessments: Map<number, Assessment>;
  private studentAssessments: Map<number, StudentAssessment>;
  private studentProgress: Map<number, StudentProgress>;
  private interventions: Map<number, Intervention>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.assessments = new Map();
    this.studentAssessments = new Map();
    this.studentProgress = new Map();
    this.interventions = new Map();
    this.currentId = 1;

    // Initialize with some demo data
    this.initializeData();
  }

  private initializeData() {
    // Create demo users
    const demoUsers = [
      { username: "student1", email: "student1@demo.com", password: "password", role: "student", name: "Alex Morgan", grade: "Grade 10" },
      { username: "educator1", email: "educator1@demo.com", password: "password", role: "educator", name: "Dr. Sarah Johnson", subjects: ["Mathematics", "Physics"] },
      { username: "admin1", email: "admin1@demo.com", password: "password", role: "admin", name: "John Admin" },
    ];

    demoUsers.forEach(user => {
      const id = this.currentId++;
      this.users.set(id, { ...user, id, createdAt: new Date() });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => user.role === role);
  }

  async getChatMessages(userId: number, limit = 50): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.userId === userId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))
      .slice(-limit);
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentId++;
    const message: ChatMessage = { ...insertMessage, id, createdAt: new Date() };
    this.chatMessages.set(id, message);
    return message;
  }

  async getAssessments(createdBy?: number): Promise<Assessment[]> {
    const allAssessments = Array.from(this.assessments.values());
    if (createdBy) {
      return allAssessments.filter(assessment => assessment.createdBy === createdBy);
    }
    return allAssessments;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentId++;
    const assessment: Assessment = { ...insertAssessment, id, createdAt: new Date() };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async updateAssessment(id: number, updates: Partial<Assessment>): Promise<Assessment | undefined> {
    const existing = this.assessments.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.assessments.set(id, updated);
    return updated;
  }

  async getStudentAssessments(studentId: number): Promise<StudentAssessment[]> {
    return Array.from(this.studentAssessments.values())
      .filter(sa => sa.studentId === studentId);
  }

  async getStudentAssessment(studentId: number, assessmentId: number): Promise<StudentAssessment | undefined> {
    return Array.from(this.studentAssessments.values())
      .find(sa => sa.studentId === studentId && sa.assessmentId === assessmentId);
  }

  async createStudentAssessment(insertStudentAssessment: InsertStudentAssessment): Promise<StudentAssessment> {
    const id = this.currentId++;
    const studentAssessment: StudentAssessment = { 
      ...insertStudentAssessment, 
      id, 
      startedAt: new Date() 
    };
    this.studentAssessments.set(id, studentAssessment);
    return studentAssessment;
  }

  async updateStudentAssessment(id: number, updates: Partial<StudentAssessment>): Promise<StudentAssessment | undefined> {
    const existing = this.studentAssessments.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.studentAssessments.set(id, updated);
    return updated;
  }

  async getStudentProgress(studentId: number): Promise<StudentProgress[]> {
    return Array.from(this.studentProgress.values())
      .filter(sp => sp.studentId === studentId);
  }

  async getStudentProgressBySubject(studentId: number, subject: string): Promise<StudentProgress | undefined> {
    return Array.from(this.studentProgress.values())
      .find(sp => sp.studentId === studentId && sp.subject === subject);
  }

  async createStudentProgress(insertProgress: InsertStudentProgress): Promise<StudentProgress> {
    const id = this.currentId++;
    const progress: StudentProgress = { 
      ...insertProgress, 
      id, 
      lastActivity: new Date() 
    };
    this.studentProgress.set(id, progress);
    return progress;
  }

  async updateStudentProgress(id: number, updates: Partial<StudentProgress>): Promise<StudentProgress | undefined> {
    const existing = this.studentProgress.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates, lastActivity: new Date() };
    this.studentProgress.set(id, updated);
    return updated;
  }

  async getInterventions(studentId?: number, educatorId?: number): Promise<Intervention[]> {
    let interventions = Array.from(this.interventions.values());
    
    if (studentId) {
      interventions = interventions.filter(i => i.studentId === studentId);
    }
    
    if (educatorId) {
      interventions = interventions.filter(i => i.educatorId === educatorId);
    }
    
    return interventions;
  }

  async createIntervention(insertIntervention: InsertIntervention): Promise<Intervention> {
    const id = this.currentId++;
    const intervention: Intervention = { 
      ...insertIntervention, 
      id, 
      createdAt: new Date() 
    };
    this.interventions.set(id, intervention);
    return intervention;
  }

  async updateIntervention(id: number, updates: Partial<Intervention>): Promise<Intervention | undefined> {
    const existing = this.interventions.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.interventions.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
