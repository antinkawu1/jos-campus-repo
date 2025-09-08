import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSuccess = () => {
    onClose();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        {isLogin ? (
          <LoginForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
};