import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <Toaster />
      <Sonner />
    </div>
  );
};

export default Layout;