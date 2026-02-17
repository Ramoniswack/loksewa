import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

// Simple in-memory storage (in production, use a database)
let users: User[] = [];

// Initialize with a demo user
if (users.length === 0) {
  users.push({
    id: '1',
    name: 'Demo User',
    email: 'demo@loksewa.com',
    password: bcrypt.hashSync('demo123', 10),
    createdAt: new Date().toISOString(),
  });
}

export async function createUser(name: string, email: string, password: string): Promise<User | null> {
  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return null;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  return newUser;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    return null;
  }

  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getAllUsers(): User[] {
  return users;
}
