import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  companyName: text("company_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  businessName: text("business_name").notNull(),
  industry: text("industry").notNull(),
  employeeCount: text("employee_count").notNull(),
  securityMeasures: text("security_measures").array(),
  primaryConcerns: text("primary_concerns").array(),
  contactInfo: jsonb("contact_info").notNull(),
  reportType: text("report_type").notNull(),
  securityScore: integer("security_score"),
  matrixData: jsonb("matrix_data"),
  findings: jsonb("findings"),
  recommendations: jsonb("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const earlyAccessSubmissions = pgTable("early_access_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  phone: text("phone").notNull(),
  companySize: text("company_size").notNull(),
  industry: text("industry").notNull(),
  interestedIn: text("interested_in").array(),
  investmentLevel: text("investment_level").notNull(),
  additionalInfo: text("additional_info"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  companyName: true,
  role: true,
});

export const insertAssessmentSchema = z.object({
  userId: z.number().optional(),
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().min(1, "Industry is required"),
  employeeCount: z.string().min(1, "Employee count is required"),
  securityMeasures: z.array(z.string()),
  primaryConcerns: z.array(z.string()),
  contactInfo: z.object({
    name: z.string(),
    email: z.string().email("Invalid email format"),
    phone: z.string(),
  }),
  reportType: z.enum(["preliminary", "comprehensive"]),
  securityScore: z.number().optional(),
  matrixData: z.any().optional(),
  findings: z.any().optional(),
  recommendations: z.any().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
