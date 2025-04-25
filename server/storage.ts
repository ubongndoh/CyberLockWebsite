import { users, type User, type InsertUser, type Assessment, type InsertAssessment, assessments, earlyAccessSubmissions, type InsertEarlyAccessSubmission, type EarlyAccessSubmission } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
  
  // Early Access operations
  getAllEarlyAccessSubmissions(): Promise<EarlyAccessSubmission[]>;
  getEarlyAccessSubmission(id: number): Promise<EarlyAccessSubmission | undefined>;
  createEarlyAccessSubmission(submission: InsertEarlyAccessSubmission): Promise<EarlyAccessSubmission>;
  updateEarlyAccessSubmissionStatus(id: number, status: string): Promise<EarlyAccessSubmission | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        username: insertUser.username,
        password: insertUser.password,
        fullName: insertUser.fullName || null,
        email: insertUser.email || null,
        companyName: insertUser.companyName || null,
        role: insertUser.role || "user",
        createdAt: new Date(),
      })
      .returning();
    return user;
  }

  // Assessment operations
  async getAllAssessments(): Promise<Assessment[]> {
    return await db.select().from(assessments);
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment;
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    // Calculate security score
    const securityScore = this.calculateSecurityScore(insertAssessment);
    
    const [assessment] = await db
      .insert(assessments)
      .values({
        userId: insertAssessment.userId || null,
        businessName: insertAssessment.businessName,
        industry: insertAssessment.industry,
        employeeCount: insertAssessment.employeeCount,
        securityMeasures: insertAssessment.securityMeasures || [],
        primaryConcerns: insertAssessment.primaryConcerns || [],
        contactInfo: insertAssessment.contactInfo,
        reportType: insertAssessment.reportType,
        securityScore,
        matrixData: insertAssessment.matrixData || null,
        findings: insertAssessment.findings || null,
        recommendations: insertAssessment.recommendations || null,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return assessment;
  }

  async updateAssessment(id: number, updatedAssessment: InsertAssessment): Promise<Assessment | undefined> {
    // Check if assessment exists
    const existingAssessment = await this.getAssessment(id);
    if (!existingAssessment) {
      return undefined;
    }
    
    // Calculate security score
    const securityScore = this.calculateSecurityScore(updatedAssessment);
    
    const [assessment] = await db
      .update(assessments)
      .set({
        userId: updatedAssessment.userId || existingAssessment.userId,
        businessName: updatedAssessment.businessName,
        industry: updatedAssessment.industry,
        employeeCount: updatedAssessment.employeeCount,
        securityMeasures: updatedAssessment.securityMeasures || existingAssessment.securityMeasures,
        primaryConcerns: updatedAssessment.primaryConcerns || existingAssessment.primaryConcerns,
        contactInfo: updatedAssessment.contactInfo,
        reportType: updatedAssessment.reportType,
        securityScore,
        matrixData: updatedAssessment.matrixData || existingAssessment.matrixData,
        findings: updatedAssessment.findings || existingAssessment.findings,
        recommendations: updatedAssessment.recommendations || existingAssessment.recommendations,
        updatedAt: new Date()
      })
      .where(eq(assessments.id, id))
      .returning();
    
    return assessment;
  }

  async deleteAssessment(id: number): Promise<boolean> {
    await db
      .delete(assessments)
      .where(eq(assessments.id, id));
    
    // Check if the assessment still exists
    const assessment = await this.getAssessment(id);
    return !assessment;
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
  
  // Early Access operations
  async getAllEarlyAccessSubmissions(): Promise<EarlyAccessSubmission[]> {
    return await db.select().from(earlyAccessSubmissions);
  }

  async getEarlyAccessSubmission(id: number): Promise<EarlyAccessSubmission | undefined> {
    const [submission] = await db.select().from(earlyAccessSubmissions).where(eq(earlyAccessSubmissions.id, id));
    return submission;
  }

  async createEarlyAccessSubmission(submission: InsertEarlyAccessSubmission): Promise<EarlyAccessSubmission> {
    const [newSubmission] = await db
      .insert(earlyAccessSubmissions)
      .values({
        fullName: submission.fullName,
        email: submission.email,
        company: submission.company,
        phone: submission.phone,
        companySize: submission.companySize,
        industry: submission.industry,
        interestedIn: submission.interestedIn,
        investmentLevel: submission.investmentLevel,
        additionalInfo: submission.additionalInfo || null,
        status: submission.status || "pending",
        createdAt: new Date()
      })
      .returning();
    
    return newSubmission;
  }

  async updateEarlyAccessSubmissionStatus(id: number, status: string): Promise<EarlyAccessSubmission | undefined> {
    const existingSubmission = await this.getEarlyAccessSubmission(id);
    if (!existingSubmission) {
      return undefined;
    }
    
    const [submission] = await db
      .update(earlyAccessSubmissions)
      .set({ status })
      .where(eq(earlyAccessSubmissions.id, id))
      .returning();
    
    return submission;
  }
}

export class MockStorage implements IStorage {
  private users: User[] = [];
  private assessments: Assessment[] = [];
  private earlyAccessSubmissions: EarlyAccessSubmission[] = [];
  private userId = 1;
  private assessmentId = 1;
  private submissionId = 1;

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = {
      id: this.userId++,
      username: insertUser.username,
      password: insertUser.password,
      fullName: insertUser.fullName || null,
      email: insertUser.email || null,
      companyName: insertUser.companyName || null,
      role: insertUser.role || "user",
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  // Assessment operations
  async getAllAssessments(): Promise<Assessment[]> {
    return this.assessments;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.find(assessment => assessment.id === id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const assessment = {
      id: this.assessmentId++,
      userId: insertAssessment.userId || null,
      businessName: insertAssessment.businessName,
      industry: insertAssessment.industry,
      employeeCount: insertAssessment.employeeCount,
      securityMeasures: insertAssessment.securityMeasures || [],
      primaryConcerns: insertAssessment.primaryConcerns || [],
      contactInfo: insertAssessment.contactInfo,
      reportType: insertAssessment.reportType,
      securityScore: 70, // Mock score
      matrixData: insertAssessment.matrixData || null,
      findings: insertAssessment.findings || null,
      recommendations: insertAssessment.recommendations || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.assessments.push(assessment);
    return assessment;
  }

  async updateAssessment(id: number, updatedAssessment: InsertAssessment): Promise<Assessment | undefined> {
    const index = this.assessments.findIndex(assessment => assessment.id === id);
    if (index === -1) return undefined;

    const assessment = {
      ...this.assessments[index],
      businessName: updatedAssessment.businessName,
      industry: updatedAssessment.industry,
      employeeCount: updatedAssessment.employeeCount,
      securityMeasures: updatedAssessment.securityMeasures || [],
      primaryConcerns: updatedAssessment.primaryConcerns || [],
      contactInfo: updatedAssessment.contactInfo,
      reportType: updatedAssessment.reportType,
      securityScore: 75, // Updated mock score
      matrixData: updatedAssessment.matrixData || null,
      findings: updatedAssessment.findings || null,
      recommendations: updatedAssessment.recommendations || null,
      updatedAt: new Date()
    };
    
    this.assessments[index] = assessment;
    return assessment;
  }

  async deleteAssessment(id: number): Promise<boolean> {
    const initialLength = this.assessments.length;
    this.assessments = this.assessments.filter(assessment => assessment.id !== id);
    return initialLength > this.assessments.length;
  }

  // Early Access operations
  async getAllEarlyAccessSubmissions(): Promise<EarlyAccessSubmission[]> {
    return this.earlyAccessSubmissions;
  }

  async getEarlyAccessSubmission(id: number): Promise<EarlyAccessSubmission | undefined> {
    return this.earlyAccessSubmissions.find(submission => submission.id === id);
  }

  async createEarlyAccessSubmission(submission: InsertEarlyAccessSubmission): Promise<EarlyAccessSubmission> {
    const newSubmission = {
      id: this.submissionId++,
      fullName: submission.fullName,
      email: submission.email,
      company: submission.company,
      phone: submission.phone,
      companySize: submission.companySize,
      industry: submission.industry,
      interestedIn: submission.interestedIn,
      investmentLevel: submission.investmentLevel,
      additionalInfo: submission.additionalInfo || null,
      status: submission.status || "pending",
      createdAt: new Date()
    };
    
    this.earlyAccessSubmissions.push(newSubmission);
    return newSubmission;
  }

  async updateEarlyAccessSubmissionStatus(id: number, status: string): Promise<EarlyAccessSubmission | undefined> {
    const index = this.earlyAccessSubmissions.findIndex(submission => submission.id === id);
    if (index === -1) return undefined;

    this.earlyAccessSubmissions[index].status = status;
    return this.earlyAccessSubmissions[index];
  }
}

// Use mock storage in development, real DB storage in production
export const storage = process.env.NODE_ENV === 'development' 
  ? new MockStorage() 
  : new DatabaseStorage();
