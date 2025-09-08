import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { initializeSampleData } from "@/lib/localStorage";
import HomePage from "./pages/HomePage";
import StudentPortal from "./pages/StudentPortal";
import StaffPortal from "./pages/StaffPortal";
import AdminPortal from "./pages/AdminPortal";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Initialize sample data on app load
    initializeSampleData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student" element={<StudentPortal />} />
      <Route path="/staff" element={<StaffPortal />} />
      <Route path="/admin" element={<AdminPortal />} />
      <Route path="/search" element={<SearchPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
