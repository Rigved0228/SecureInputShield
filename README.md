# SecureInputShield

A modern web application demonstrating secure handling of user input to prevent common web vulnerabilities like Cross-Site Scripting (XSS) and SQL Injection attacks.

## Features

### Security Measures

- **XSS Prevention**: Input sanitization using DOMPurify with HTML entity encoding
- **SQL Injection Protection**: Parameterized queries with Drizzle ORM
- **Input Validation**: Client and server-side validation with Zod schemas
- **Rate Limiting**: 5 submissions per minute per IP address
- **Data Sanitization**: All user inputs are sanitized before storage and display

### User Interface

- Clean, responsive design with Tailwind CSS
- Real-time form validation with error messages
- Character counter for message field
- Success notifications and sanitized data display
- Mobile-friendly interface

## Tech Stack

### Frontend

- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **React Hook Form** with Zod validation
- **TanStack Query** for API state management
- **Wouter** for routing

### Backend

- **Express.js** server
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **DOMPurify** for input sanitization
- **Zod** for schema validation

### Development

- **Vite** for frontend bundling
- **esbuild** for server compilation
- **In-memory storage** for demonstration

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd secure-input-shield
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## Testing Security Features

### XSS Prevention Test

Try entering malicious scripts in any field:

```html
<script>
  alert("XSS");
</script>
<img src=x onerror=alert('XSS')> javascript:alert('XSS')
```

**Expected Result**: Scripts are sanitized and displayed as plain text

### SQL Injection Prevention Test

Try entering SQL injection attempts in the message field:

```sql
'; DROP TABLE users; --
' OR '1'='1
admin'--
```

**Expected Result**: Input is safely sanitized and stored

### Input Validation Test

- **Name**: Only letters and spaces allowed
- **Email**: Must be valid email format
- **Phone**: Must be valid phone number format
- **Message**: 10-500 characters required

### Rate Limiting Test

Submit the form more than 5 times within a minute to trigger rate limiting.

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # In-memory storage
│   └── vite.ts           # Vite configuration
├── shared/                # Shared types and schemas
│   └── schema.ts         # Database schema and validation
└── package.json          # Project dependencies
```

## API Endpoints

- `POST /api/form-submission` - Submit form data securely
- `GET /api/form-submissions` - Retrieve all submissions
- `GET /api/security-status` - Get current security configuration

## Security Implementation Details

### Input Sanitization

```typescript
function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
```

### Rate Limiting

- 5 submissions per minute per IP address
- Automatic cleanup of expired rate limit entries
- Returns 429 status code when limit exceeded

### Validation Schema

```typescript
const insertFormSubmissionSchema = createInsertSchema(formSubmissions).extend({
  fullName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  email: z.string().email().max(100),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/)
    .optional(),
  message: z.string().min(10).max(500),
});
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test security features thoroughly
5. Submit a pull request

## License

This project is for educational purposes to demonstrate web security best practices.

## Security Checklist

- [x] XSS prevention with input sanitization
- [x] SQL injection prevention with parameterized queries
- [x] Client-side input validation
- [x] Server-side input validation
- [x] Rate limiting implementation
- [x] Secure data storage
- [x] Error handling without information disclosure
- [x] CSRF protection considerations
- [x] Input length restrictions
- [x] Output encoding for safe display

## Educational Value

This application serves as a practical example of implementing multiple layers of security:

1. **Client-side validation** - First line of defense
2. **Server-side sanitization** - Clean potentially dangerous input
3. **Database protection** - Prevent SQL injection attacks
4. **Rate limiting** - Prevent abuse and DoS attacks
5. **Secure output** - Safe display of user data

Perfect for learning web security fundamentals and best practices in modern web development.
