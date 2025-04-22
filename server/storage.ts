import { users, type User, type InsertUser, type Assessment, type InsertAssessment, assessments } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Assessment operations
  getAllAssessments(): Promise<Assessment[]>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: number, assessment: InsertAssessment): Promise<Assessment | undefined>;
  deleteAssessment(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessments: Map<number, Assessment>;
  private userId: number;
  private assessmentId: number;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.userId = 1;
    this.assessmentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date().toISOString();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(createdAt)
    };
    this.users.set(id, user);
    return user;
  }

  // Assessment operations
  async getAllAssessments(): Promise<Assessment[]> {
    return Array.from(this.assessments.values());
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.assessmentId++;
    const now = new Date();
    
    // Calculate a security score based on security measures
    const securityScore = this.calculateSecurityScore(insertAssessment);
    
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      securityScore,
      createdAt: now,
      updatedAt: now
    };
    
    this.assessments.set(id, assessment);
    return assessment;
  }

  async updateAssessment(id: number, updatedAssessment: InsertAssessment): Promise<Assessment | undefined> {
    const existingAssessment = this.assessments.get(id);
    
    if (!existingAssessment) {
      return undefined;
    }
    
    // Calculate security score
    const securityScore = this.calculateSecurityScore(updatedAssessment);
    
    const assessment: Assessment = {
      ...existingAssessment,
      ...updatedAssessment,
      id,
      securityScore,
      updatedAt: new Date()
    };
    
    this.assessments.set(id, assessment);
    return assessment;
  }

  async deleteAssessment(id: number): Promise<boolean> {
    if (!this.assessments.has(id)) {
      return false;
    }
    
    return this.assessments.delete(id);
  }
  
  private calculateSecurityScore(assessment: InsertAssessment): number {
    // This is a simple algorithm to calculate a security score
    // In a real implementation, this would be more sophisticated
    
    // Base score
    let score = 40;
    
    // Add points for each security measure (max 30 points)
    if (assessment.securityMeasures) {
      score += Math.min(assessment.securityMeasures.length * 3, 30);
    }
    
    // Subtract points for each primary concern (max 20 points penalty)
    if (assessment.primaryConcerns) {
      score -= Math.min(assessment.primaryConcerns.length * 2, 20);
    }
    
    // Add points for matrix data completeness (max 20 points)
    if (assessment.matrixData) {
      score += 20;
    }
    
    // Add points for comprehensive report type (10 points)
    if (assessment.reportType === "comprehensive") {
      score += 10;
    }
    
    // Ensure the score is between 0 and 100
    return Math.max(0, Math.min(score, 100));
  }
}

export const storage = new MemStorage();
