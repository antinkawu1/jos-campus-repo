import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, Users, CheckCircle, AlertTriangle, User, FileCheck, MessageSquare, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { MessageModal } from "@/components/modals/MessageModal";
import { getProjectsBySupervisor, getCitationsBySupervisor, saveProject } from "@/lib/localStorage";
import type { Project, Citation } from "@/lib/localStorage";
import { toast } from "@/hooks/use-toast";

const StaffPortal = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);
  
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (user && user.role === 'staff') {
      const supervisedProjects = getProjectsBySupervisor(user.id);
      setProjects(supervisedProjects);
      
      const pendingCitations = getCitationsBySupervisor(user.id);
      setCitations(pendingCitations);
    }
  }, [user]);

  const handleProjectAction = (projectId: string, action: 'approved' | 'rejected') => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const updatedProject = {
      ...project,
      status: action as Project['status'],
      updatedAt: new Date().toISOString()
    };

    saveProject(updatedProject);
    setProjects(prev => prev.map(p => p.id === projectId ? updatedProject : p));
    
    toast({
      title: `Project ${action}`,
      description: `"${project.title}" has been ${action}.`,
      variant: action === 'approved' ? 'default' : 'destructive'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-card border-b shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Logo size="md" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Staff Portal</h1>
                <p className="text-sm text-muted-foreground">Supervise • Validate • Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated && user?.role === 'staff' ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="accent" size="sm" onClick={() => setShowAuthDialog(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Staff Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated || user?.role !== 'staff' ? (
          <Card className="mb-8 border-university-red bg-red-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-university-red mb-2">
                  Staff Authentication Required
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To access staff features, please log in with your staff account.
                </p>
                <Button variant="accent" size="sm" onClick={() => setShowAuthDialog(true)}>
                  Staff Login
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Supervised Projects
                    </CardTitle>
                    <CardDescription>
                      Monitor and guide your assigned students' projects
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowMessageModal(true)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Students
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No projects assigned yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 bg-card">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{project.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={
                                project.status === 'approved' ? 'default' :
                                project.status === 'rejected' ? 'destructive' :
                                project.status === 'submitted' ? 'secondary' : 'outline'
                              }>
                                {project.status.replace('-', ' ')}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {project.submittedAt ? `Submitted ${new Date(project.submittedAt).toLocaleDateString()}` : `Created ${new Date(project.createdAt).toLocaleDateString()}`}
                              </span>
                            </div>
                          </div>
                          {project.status === 'submitted' && (
                            <div className="flex gap-2 ml-4">
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleProjectAction(project.id, 'approved')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleProjectAction(project.id, 'rejected')}
                              >
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Citation Validations
                </CardTitle>
                <CardDescription>
                  Review and validate student citations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No citations to validate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
      />
      
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
      />
    </div>
  );
};

export default StaffPortal;