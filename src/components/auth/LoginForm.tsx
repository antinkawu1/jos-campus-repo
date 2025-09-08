import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export const LoginForm = ({ onToggleMode, onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password, role);
    if (success && onSuccess) {
      onSuccess();
    }
    
    setIsLoading(false);
  };

  // Demo credentials
  const demoCredentials = [
    { role: 'student' as UserRole, email: 'student@unijos.edu.ng', name: 'John Doe' },
    { role: 'staff' as UserRole, email: 'staff@unijos.edu.ng', name: 'Dr. Sarah Johnson' },
    { role: 'admin' as UserRole, email: 'admin@unijos.edu.ng', name: 'Admin User' }
  ];

  const fillDemoCredentials = (demoRole: UserRole) => {
    const demo = demoCredentials.find(d => d.role === demoRole);
    if (demo) {
      setEmail(demo.email);
      setPassword('password123');
      setRole(demo.role);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Access your UniJos Repository portal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="staff">Staff/Supervisor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading} variant="university">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="text-sm text-center text-muted-foreground">
            Demo Credentials (password: password123)
          </div>
          <div className="grid gap-2">
            {demoCredentials.map((demo) => (
              <Button
                key={demo.role}
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials(demo.role)}
                className="text-xs"
              >
                {demo.role.charAt(0).toUpperCase() + demo.role.slice(1)}: {demo.email}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="link" onClick={onToggleMode} className="text-sm">
            Don't have an account? Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};