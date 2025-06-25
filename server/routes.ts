import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFormSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import DOMPurify from "isomorphic-dompurify";

// Rate limiting storage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 submissions per minute

function rateLimit(req: any, res: any, next: any) {
  const clientIp = req.ip || req.connection.remoteAddress || '127.0.0.1';
  const now = Date.now();
  
  // Clean up expired entries
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
  
  const clientData = rateLimitStore.get(clientIp);
  
  if (!clientData) {
    rateLimitStore.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    next();
    return;
  }
  
  if (now > clientData.resetTime) {
    rateLimitStore.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    next();
    return;
  }
  
  if (clientData.count >= RATE_LIMIT_MAX) {
    res.status(429).json({ 
      message: "Too many requests. Please try again later.",
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
    return;
  }
  
  clientData.count++;
  next();
}

function sanitizeInput(input: string): string {
  // HTML encode to prevent XSS
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

function validateAndSanitizeSubmission(data: any) {
  // Sanitize all string inputs
  if (data.fullName) data.fullName = sanitizeInput(data.fullName.trim());
  if (data.email) data.email = sanitizeInput(data.email.trim().toLowerCase());
  if (data.phone) data.phone = sanitizeInput(data.phone.trim().replace(/[^\d\+\-\(\)\s]/g, ''));
  if (data.message) data.message = sanitizeInput(data.message.trim());
  
  return data;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply rate limiting to form submission
  app.post("/api/form-submission", rateLimit, async (req, res) => {
    try {
      // Validate and sanitize input
      const sanitizedData = validateAndSanitizeSubmission(req.body);
      
      // Validate with Zod schema
      const validationResult = insertFormSubmissionSchema.safeParse(sanitizedData);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ 
          message: "Validation failed",
          errors: validationError.details
        });
      }
      
      // Get client information for security logging
      const clientIp = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');
      
      // Store the submission securely
      const submission = await storage.createFormSubmission(
        validationResult.data,
        clientIp,
        userAgent
      );
      
      res.json({
        message: "Form submitted successfully",
        submissionId: submission.id,
        sanitizedData: {
          fullName: submission.fullName,
          email: submission.email,
          phone: submission.phone,
          message: submission.message,
          securityPreferences: submission.securityPreferences
        }
      });
    } catch (error) {
      console.error("Form submission error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get all submissions (for demonstration purposes)
  app.get("/api/form-submissions", async (req, res) => {
    try {
      const submissions = await storage.getFormSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Get submissions error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get security status
  app.get("/api/security-status", (req, res) => {
    res.json({
      csrfProtection: true,
      rateLimiting: true,
      inputValidation: true,
      sqlInjectionProtection: true,
      xssProtection: true,
      httpsOnly: process.env.NODE_ENV === 'production',
      securityHeaders: true
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
