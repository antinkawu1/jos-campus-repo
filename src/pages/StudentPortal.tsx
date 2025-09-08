import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Search, Upload, BookOpen, ArrowLeft, User, FileText, Download, LogOut, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { UploadProjectModal } from "@/components/modals/UploadProjectModal";
import { SearchModal } from "@/components/modals/SearchModal";
import { MessageModal } from "@/components/modals/MessageModal";
import { getMaterials, searchMaterials, getProjectsByStudent, incrementMaterialDownload } from "@/lib/localStorage";
import type { Material, Project } from "@/lib/localStorage";

const StudentPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    // Load materials
    const allMaterials = getMaterials();
    setMaterials(allMaterials);
    setFilteredMaterials(allMaterials.slice(0, 5)); // Show latest 5

    // Load user's projects if authenticated
    if (user && user.id) {
      const userProjects = getProjectsByStudent(user.id);
      setProjects(userProjects);
    }
  }, [user]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchMaterials(searchQuery);
      setFilteredMaterials(results);
    } else {
      setFilteredMaterials(materials.slice(0, 5));
    }
  };

  const handleDownload = (materialId: string) => {
    incrementMaterialDownload(materialId);
    // Update local state
    setMaterials(prev => prev.map(m => 
      m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m
    ));
    setFilteredMaterials(prev => prev.map(m => 
      m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m
    ));
  };

  const refreshProjects = () => {
    if (user && user.id) {
      const userProjects = getProjectsByStudent(user.id);
      setProjects(userProjects);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
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
                <h1 className="text-xl font-bold text-foreground">Student Portal</h1>
                <p className="text-sm text-muted-foreground">Research • Submit • Collaborate</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="university" size="sm" onClick={() => setShowAuthDialog(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated && (
          <Card className="mb-8 border-university-teal bg-primary-light">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-university-teal mb-2">
                  Login Required
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  To access full student features including project uploads and supervisor collaboration, 
                  please log in with your student account.
                </p>
                <Button variant="university" size="sm" onClick={() => setShowAuthDialog(true)}>
                  Login Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Academic Materials
            </CardTitle>
            <CardDescription>
              Find books, journals, articles, and project topics relevant to your research
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by topic, author, keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="university" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Materials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Materials
              </CardTitle>
              <CardDescription>
                Latest academic resources added to the repository
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredMaterials.map((material) => (
                <div key={material.id} className="p-4 border rounded-lg hover:shadow-elegant transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{material.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {material.author} • {material.year}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="bg-primary-light px-2 py-1 rounded text-university-teal">
                          {material.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {material.downloads} downloads
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(material.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Projects */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Projects
                  </CardTitle>
                  <CardDescription>
                    Track your project submissions and supervisor feedback
                  </CardDescription>
                </div>
                <Button variant="university" size="sm" onClick={() => setShowUploadModal(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{project.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'draft' 
                        ? 'bg-gray-100 text-gray-800' 
                        : project.status === 'submitted'
                        ? 'bg-blue-100 text-blue-800'
                        : project.status === 'under-review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : project.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              
              {projects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No projects yet. Upload your first project to get started!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Search className="h-8 w-8 mx-auto mb-4 text-university-teal" />
              <h3 className="font-semibold mb-2">Advanced Search</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Use filters to find specific research materials
              </p>
              <Button variant="outline" size="sm" onClick={() => setShowSearchModal(true)}>
                Search Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Upload className="h-8 w-8 mx-auto mb-4 text-university-teal" />
              <h3 className="font-semibold mb-2">Submit Project</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your completed project for review
              </p>
              <Button variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>
                Upload
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <User className="h-8 w-8 mx-auto mb-4 text-university-teal" />
              <h3 className="font-semibold mb-2">Contact Supervisor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Communicate with your project supervisor
              </p>
              <Button variant="outline" size="sm" onClick={() => setShowMessageModal(true)}>
                Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
      />
      
      <UploadProjectModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)}
        onProjectUploaded={refreshProjects}
      />
      
      <SearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />
      
      <MessageModal 
        isOpen={showMessageModal} 
        onClose={() => setShowMessageModal(false)} 
      />
    </div>
  );
};

export default StudentPortal;