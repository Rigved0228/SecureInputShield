# Secure User Input Form - Security Demonstration Application

## Overview

This is a full-stack web security demonstration application built with React, Express, and PostgreSQL. The application showcases proper implementation of security best practices for handling user input, specifically focusing on preventing XSS attacks, SQL injection, and implementing proper input validation and sanitization.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

- **Frontend**: React with TypeScript, styled using Tailwind CSS and shadcn/ui components
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Build System**: Vite for frontend bundling, esbuild for server compilation
- **Deployment**: Configured for Replit with autoscale deployment

## Key Components

### Frontend Architecture
- **React with TypeScript**: Type-safe component development
- **shadcn/ui Components**: Pre-built, accessible UI components with Radix UI primitives
- **TanStack Query**: Server state management and API data fetching
- **React Hook Form**: Form handling with Zod validation
- **Wouter**: Lightweight client-side routing

### Backend Architecture
- **Express.js**: RESTful API server
- **Drizzle ORM**: Type-safe database queries with PostgreSQL
- **Input Sanitization**: DOMPurify for XSS prevention
- **Rate Limiting**: In-memory rate limiting for form submissions
- **Validation**: Zod schema validation on both client and server

### Database Schema
- **Users Table**: Basic user authentication (username, password)
- **Form Submissions Table**: Secure storage of form data with metadata (IP, user agent, timestamps)

### Security Features
- **XSS Prevention**: Output encoding and input sanitization using DOMPurify
- **SQL Injection Prevention**: Parameterized queries through Drizzle ORM
- **Input Validation**: Client and server-side validation with Zod schemas
- **Rate Limiting**: 5 submissions per minute per IP address
- **Data Sanitization**: All user inputs are sanitized before storage and display

## Data Flow

1. **User Input**: Form data is collected through React Hook Form with real-time validation
2. **Client Validation**: Zod schemas validate data structure and format on the frontend
3. **API Request**: TanStack Query manages the POST request to `/api/form-submission`
4. **Server Validation**: Express middleware validates and sanitizes input data
5. **Rate Limiting**: Server checks submission frequency per IP address
6. **Database Storage**: Drizzle ORM safely stores sanitized data in PostgreSQL
7. **Response**: Server returns sanitized data and submission confirmation
8. **UI Update**: Frontend displays success message and sanitized submission results

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack Query for server state
- **Validation**: Zod for schema validation, @hookform/resolvers for form integration

### Backend Dependencies
- **Server Framework**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless for PostgreSQL connection
- **Security**: DOMPurify for input sanitization, connect-pg-simple for sessions
- **Validation**: Zod for schema validation, zod-validation-error for error formatting

### Development Dependencies
- **Build Tools**: Vite, esbuild, TypeScript
- **Development**: tsx for TypeScript execution, @replit/* packages for Replit integration

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: `npm run dev` starts both frontend and backend in development mode
- **Build Process**: `npm run build` compiles both frontend (Vite) and backend (esbuild)
- **Production**: `npm run start` runs the compiled server serving static frontend files
- **Database**: PostgreSQL database provisioned through Replit's database service
- **Auto-scaling**: Configured for Replit's autoscale deployment target

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment specification (development/production)
- **Port Configuration**: Server runs on port 5000, mapped to external port 80

## Changelog

```
Changelog:
- June 25, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```