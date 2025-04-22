import { users, type User, type InsertUser, type Assessment, type InsertAssessment, assessments } from "@shared/schema";
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
        fullName: insertUser.fullName ?? null,
        email: insertUser.email ?? null,
        companyName: insertUser.companyName ?? null,
        role: insertUser.role ?? "user",
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
        userId: insertAssessment.userId ?? null,
        businessName: insertAssessment.businessName,
        industry: insertAssessment.industry,
        employeeCount: insertAssessment.employeeCount,
        securityMeasures: insertAssessment.securityMeasures,
        primaryConcerns: insertAssessment.primaryConcerns,
        contactInfo: insertAssessment.contactInfo,
        reportType: insertAssessment.reportType,
        securityScore,
        matrixData: insertAssessment.matrixData ?? null,
        findings: insertAssessment.findings ?? null,
        recommendations: insertAssessment.recommendations ?? null
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
        userId: updatedAssessment.userId ?? existingAssessment.userId,
        businessName: updatedAssessment.businessName,
        industry: updatedAssessment.industry,
        employeeCount: updatedAssessment.employeeCount,
        securityMeasures: updatedAssessment.securityMeasures,
        primaryConcerns: updatedAssessment.primaryConcerns,
        contactInfo: updatedAssessment.contactInfo,
        reportType: updatedAssessment.reportType,
        securityScore,
        matrixData: updatedAssessment.matrixData ?? existingAssessment.matrixData,
        findings: updatedAssessment.findings ?? existingAssessment.findings,
        recommendations: updatedAssessment.recommendations ?? existingAssessment.recommendations,
        updatedAt: new Date()
      })
      .where(eq(assessments.id, id))
      .returning();
    
    return assessment;
  }

  async deleteAssessment(id: number): Promise<boolean> {
    const result = await db
      .delete(assessments)
      .where(eq(assessments.id, id));
    
    return result.count > 0;
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

export const storage = new DatabaseStorage();
