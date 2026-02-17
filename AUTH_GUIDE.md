# 🔐 Authentication Guide

## Overview

The Loksewa Portal now supports two authentication methods:
1. **Email/Password** - Custom registration and login
2. **Google OAuth** - Quick login with Google account

---

## Features

### ✅ User Registration
- Create new account with email and password
- Full name, email, and password required
- Password must be at least 6 characters
- Email validation
- Duplicate email prevention
- Secure password hashing with bcryptjs

### ✅ User Login
- Login with email and password
- Login with Google OAuth
- Session management with NextAuth
- Automatic redirect to dashboard after login

### ✅ Security
- Passwords hashed with bcrypt (10 salt rounds)
- JWT-based session management
- Protected routes
- Secure credential validation

---

## Demo Account

For testing purposes, a demo account is pre-configured:

```
Email: demo@loksewa.com
Password: demo123
```

---

## User Flow

### Registration Flow
```
1. Click "New user? Create an account"
2. Fill in:
   - Full Name
   - Email
   - Password (min 6 characters)
3. Click "Create Account"
4. Success message appears
5. Automatically switched to login form
6. Login with new credentials
```

### Login Flow
```
1. Enter email and password
2. Click "Login"
3. Redirected to dashboard
```

### Google OAuth Flow
```
1. Click "Continue with Google"
2. Select Google account
3. Redirected to dashboard
```

---

## API Endpoints

### POST /api/register

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

400 - Missing fields:
```json
{
  "error": "All fields are required"
}
```

400 - Short password:
```json
{
  "error": "Password must be at least 6 characters"
}
```

400 - Invalid email:
```json
{
  "error": "Invalid email format"
}
```

409 - Duplicate email:
```json
{
  "error": "User with this email already exists"
}
```

---

## File Structure

```
lib/
├── auth.ts              # NextAuth configuration
└── users.ts             # User management functions

app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts # NextAuth API routes
│   └── register/
│       └── route.ts     # Registration API
└── login/
    └── page.tsx         # Login/Register page
```

---

## User Storage

Currently using **in-memory storage** for simplicity. Users are stored in an array.

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;      // Hashed
  createdAt: string;
}
```

### Available Functions

**lib/users.ts:**
```typescript
// Create new user
createUser(name: string, email: string, password: string): Promise<User | null>

// Authenticate user
authenticateUser(email: string, password: string): Promise<User | null>

// Get user by email
getUserByEmail(email: string): User | undefined

// Get user by ID
getUserById(id: string): User | undefined

// Get all users
getAllUsers(): User[]
```

---

## Security Features

### Password Hashing
```typescript
import bcrypt from 'bcryptjs';

// Hash password on registration
const hashedPassword = await bcrypt.hash(password, 10);

// Verify password on login
const isValid = await bcrypt.compare(password, user.password);
```

### Session Management
- JWT-based sessions
- Secure token storage
- Automatic session refresh
- Session expiry handling

### Input Validation
- Email format validation
- Password length validation
- Required field validation
- SQL injection prevention (when using database)

---

## Upgrading to Database

To use a real database (MongoDB, PostgreSQL, etc.), update `lib/users.ts`:

### MongoDB Example
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('loksewa');
const users = db.collection('users');

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await users.insertOne({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date(),
  });
  
  return result;
}
```

### PostgreSQL Example
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function createUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await pool.query(
    'INSERT INTO users (name, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [name, email.toLowerCase(), hashedPassword]
  );
  
  return result.rows[0];
}
```

---

## Environment Variables

No additional environment variables needed for basic auth.

For production, consider adding:
```env
# Session secret (already configured)
NEXTAUTH_SECRET=your_secret_here

# Database (if using)
DATABASE_URL=your_database_url_here
MONGODB_URI=your_mongodb_uri_here

# Email service (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## Testing

### Test Registration
1. Go to `/login`
2. Click "New user? Create an account"
3. Fill in form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Create Account"
5. Should see success message
6. Should switch to login form

### Test Login
1. Enter credentials:
   - Email: test@example.com
   - Password: test123
2. Click "Login"
3. Should redirect to dashboard

### Test Demo Account
1. Use demo credentials:
   - Email: demo@loksewa.com
   - Password: demo123
2. Should login successfully

### Test Google OAuth
1. Click "Continue with Google"
2. Select Google account
3. Should redirect to dashboard

---

## Error Handling

### Common Errors

**"Invalid email or password"**
- Check email spelling
- Check password
- Ensure account exists

**"User with this email already exists"**
- Email already registered
- Try logging in instead
- Use different email

**"Password must be at least 6 characters"**
- Password too short
- Use longer password

**"All fields are required"**
- Fill in all form fields
- Don't leave any field empty

---

## Customization

### Change Password Requirements
Edit `app/api/register/route.ts`:
```typescript
if (password.length < 8) {  // Change from 6 to 8
  return NextResponse.json(
    { error: "Password must be at least 8 characters" },
    { status: 400 }
  );
}
```

### Add Password Strength Validation
```typescript
const hasUpperCase = /[A-Z]/.test(password);
const hasLowerCase = /[a-z]/.test(password);
const hasNumber = /\d/.test(password);
const hasSpecialChar = /[!@#$%^&*]/.test(password);

if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
  return NextResponse.json(
    { error: "Password must contain uppercase, lowercase, number, and special character" },
    { status: 400 }
  );
}
```

### Add Email Verification
1. Install nodemailer
2. Generate verification token
3. Send email with verification link
4. Verify token on callback

---

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Remember me option
- [ ] Two-factor authentication (2FA)
- [ ] Social login (Facebook, Twitter)
- [ ] Account settings page
- [ ] Profile picture upload
- [ ] Password change functionality
- [ ] Account deletion
- [ ] Login history

---

## Troubleshooting

### Users not persisting after server restart
**Cause**: Using in-memory storage
**Solution**: Implement database storage

### Password not working
**Cause**: Password hashing issue
**Solution**: Check bcryptjs installation

### Google OAuth not working
**Cause**: Missing credentials
**Solution**: Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local

### Session not persisting
**Cause**: Missing NEXTAUTH_SECRET
**Solution**: Generate and add NEXTAUTH_SECRET to .env.local

---

## Support

For issues or questions:
1. Check this guide
2. Review error messages
3. Check browser console
4. Verify environment variables
5. Test with demo account

---

**Authentication system is now ready! 🎉**

Users can register, login, and access the portal with their own accounts.
