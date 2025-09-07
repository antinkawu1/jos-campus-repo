import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Search, Upload, BookOpen, ArrowLeft, User, FileText, Download } from "lucide-react";

const StudentPortal = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const recentMaterials = [
    {
      title: "Advanced Data Structures and Algorithms",
      type: "Book",
      author: "Dr. Johnson Smith",
      year: "2023",
      downloads: 234
    },
    {
      title: "Machine Learning Applications in Agriculture",
      type: "Journal Article", 
      author: "Prof. Mary Adebayo",
      year: "2024",
      downloads: 156
    },
    {
      title: "Sustainable Development in Nigeria",
      type: "Research Paper",
      author: "Dr. Ibrahim Hassan", 
      year: "2023",
      downloads: 89
    }
  ];

  const myProjects = [
    {
      title: "IoT-Based Smart Irrigation System",
      status: "In Progress",
      supervisor: "Dr. Sarah Johnson",
      lastUpdated: "2 days ago"
    },
    {
      title: "Mobile Health App for Rural Communities", 
      status: "Under Review",
      supervisor: "Prof. Michael Brown",
      lastUpdated: "1 week ago"
    }
  ];

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
              <span className="text-sm text-muted-foreground">Welcome, Student</span>
              <Button variant="university" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login Required
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Authentication Notice */}
        <Card className="mb-8 border-university-teal bg-primary-light">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-university-teal mb-2">
                Authentication Required
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                To access full student features including project uploads and supervisor collaboration, 
                you'll need to connect this app to Supabase for secure authentication.
              </p>
              <Button variant="university" size="sm">
                Setup Authentication
              </Button>
            </div>
          </CardContent>
        </Card>

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
              <Button variant="university">
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
              {recentMaterials.map((material, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-elegant transition-shadow">
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
                    <Button variant="ghost" size="sm">
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
                <Button variant="university" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Project
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {myProjects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{project.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'In Progress' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Supervisor: {project.supervisor}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last updated: {project.lastUpdated}
                  </p>
                </div>
              ))}
              
              {myProjects.length === 0 && (
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
              <Button variant="outline" size="sm">
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
              <Button variant="outline" size="sm">
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
              <Button variant="outline" size="sm">
                Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;