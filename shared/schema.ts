import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  securityPreferences: text("security_preferences").array(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).pick({
  fullName: true,
  email: true,
  phone: true,
  message: true,
  securityPreferences: true,
}).extend({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be less than 50 characters").regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  email: z.string().email("Please enter a valid email address").max(100, "Email must be less than 100 characters"),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters"),
  securityPreferences: z.array(z.enum(["newsletter", "alerts", "2fa"])).optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;
