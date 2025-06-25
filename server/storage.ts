import { users, formSubmissions, type User, type InsertUser, type FormSubmission, type InsertFormSubmission } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createFormSubmission(submission: InsertFormSubmission, ipAddress?: string, userAgent?: string): Promise<FormSubmission>;
  getFormSubmissions(): Promise<FormSubmission[]>;
  getFormSubmission(id: number): Promise<FormSubmission | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private submissions: Map<number, FormSubmission>;
  private currentUserId: number;
  private currentSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.submissions = new Map();
    this.currentUserId = 1;
    this.currentSubmissionId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createFormSubmission(submission: InsertFormSubmission, ipAddress?: string, userAgent?: string): Promise<FormSubmission> {
    const id = this.currentSubmissionId++;
    const formSubmission: FormSubmission = {
      ...submission,
      id,
      submittedAt: new Date(),
      ipAddress: ipAddress || null,
      userAgent: userAgent || null,
    };
    this.submissions.set(id, formSubmission);
    return formSubmission;
  }

  async getFormSubmissions(): Promise<FormSubmission[]> {
    return Array.from(this.submissions.values()).sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }

  async getFormSubmission(id: number): Promise<FormSubmission | undefined> {
    return this.submissions.get(id);
  }
}

export const storage = new MemStorage();
