import { cn } from "@/lib/utils";
import logo from "@/assets/unijos-logo.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-12 w-12", 
  lg: "h-16 w-16",
  xl: "h-24 w-24"
};

export const Logo = ({ className, size = "md" }: LogoProps) => {
  return (
    <img 
      src={logo} 
      alt="University of Jos Logo" 
      className={cn(
        sizeClasses[size],
        "object-contain",
        className
      )}
    />
  );
};