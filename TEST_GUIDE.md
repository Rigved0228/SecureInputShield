# SecureInputShield - Testing Guide

## How to Test Security Features

### 1. Basic Form Submission Test

- Fill out all fields with normal data
- Click "Submit Securely"
- You should see a success message and sanitized results below

### 2. XSS Prevention Test

Try entering these in any field:

```
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
javascript:alert('XSS')
```

**Expected Result:** The malicious code should be stripped/encoded and displayed safely

### 3. SQL Injection Prevention Test

Try entering these in the message field:

```
'; DROP TABLE users; --
' OR '1'='1
admin'--
```

**Expected Result:** The input should be sanitized and stored safely without affecting the system

### 4. Input Validation Test

- **Name:** Try entering numbers or special characters
- **Email:** Try entering invalid email formats like "notanemail"
- **Phone:** Try entering letters or too many characters
- **Message:** Try entering less than 10 or more than 500 characters

**Expected Result:** Form should show validation errors before submission

### 5. Rate Limiting Test

- Submit the form 6 times quickly (within 1 minute)
- On the 6th attempt, you should get a "Too many requests" error

### 6. Character Limit Test

- In the message field, type more than 500 characters
- Watch the character counter turn orange after 450 characters
- Form should prevent submission if over 500 characters

## Success Indicators

✅ **Form submits successfully** with normal data
✅ **Malicious scripts are neutralized** (displayed as plain text)
✅ **Validation errors appear** for invalid inputs
✅ **Rate limiting activates** after 5 submissions
✅ **Character counter works** and prevents long messages
✅ **Sanitized data displays** in results section after submission

## Quick Test Checklist

1. [ ] Normal form submission works
2. [ ] XSS attempts are blocked
3. [ ] SQL injection attempts are sanitized
4. [ ] Email validation works
5. [ ] Phone validation works
6. [ ] Message length validation works
7. [ ] Rate limiting kicks in after 5 submissions
8. [ ] Results show sanitized data
