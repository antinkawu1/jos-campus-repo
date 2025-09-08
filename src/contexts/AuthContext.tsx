import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  studentId?: string;
  staffId?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole, additionalData?: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email, password, and role
      const foundUser = users.find((u: User & { password: string }) => 
        u.email === email && u.password === password && u.role === role
      );

      if (!foundUser) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or role mismatch",
          variant: "destructive"
        });
        return false;
      }

      // Remove password from user object before saving to state
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole,
    additionalData?: any
  ): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (users.find((u: User) => u.email === email)) {
        toast({
          title: "Registration Failed",
          description: "User with this email already exists",
          variant: "destructive"
        });
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role,
        createdAt: new Date().toISOString(),
        ...additionalData
      };

      // Save to users array
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto-login the new user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Registration Successful",
        description: `Welcome to UniJos Repository, ${name}!`
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An error occurred during registration",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};