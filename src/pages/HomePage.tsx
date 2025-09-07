import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Users, ShieldCheck, User } from "lucide-react";
import { useState } from "react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const userTypes = [
    {
      title: "Student Portal",
      description: "Search for project topics, materials, and upload your completed projects",
      icon: <BookOpen className="h-8 w-8" />,
      link: "/student",
      variant: "university" as const
    },
    {
      title: "Staff Portal", 
      description: "Supervise students, validate sources, and manage project submissions",
      icon: <Users className="h-8 w-8" />,
      link: "/staff",
      variant: "accent" as const
    },
    {
      title: "Admin Portal",
      description: "Upload materials, manage users, and oversee the repository system",
      icon: <ShieldCheck className="h-8 w-8" />,
      link: "/admin", 
      variant: "cream" as const
    }
  ];

  const handleGuestSearch = () => {
    if (searchQuery.trim()) {
      // For now, redirect to guest search page with query
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">University of Jos</h1>
                <p className="text-sm text-muted-foreground">Students' Project Repository System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to UniJos
              <span className="block text-university-teal">Project Repository</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your central hub for academic excellence. Search project topics, access research materials, 
              and collaborate with supervisors in our comprehensive repository system.
            </p>
            <div className="flex items-center gap-2 max-w-md mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search topics, materials, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGuestSearch()}
                  className="pl-10"
                />
              </div>
              <Button variant="university" onClick={handleGuestSearch}>
                Search
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <User className="inline h-4 w-4 mr-1" />
              Guest access • No login required for search
            </p>
          </div>
        </div>
      </section>

      {/* User Portals */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Choose Your Portal</h3>
            <p className="text-lg text-muted-foreground">
              Access role-specific features designed for your academic needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {userTypes.map((userType, index) => (
              <Card key={index} className="text-center hover:shadow-university transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary-light text-university-teal">
                      {userType.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{userType.title}</CardTitle>
                  <CardDescription className="text-base">
                    {userType.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    asChild 
                    variant={userType.variant}
                    className="w-full"
                  >
                    <Link to={userType.link}>
                      Access Portal
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Discipline and Excellence in Research
            </h3>
            <p className="text-lg text-muted-foreground">
              Empowering academic growth through organized research and collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Comprehensive Search",
                description: "Find relevant project topics and research materials quickly"
              },
              {
                title: "Source Validation", 
                description: "Supervisors can verify and approve student citations"
              },
              {
                title: "Project Upload",
                description: "Submit completed projects for review and archival"
              },
              {
                title: "Resource Management",
                description: "Admins maintain updated academic resources and materials"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Logo size="sm" className="brightness-0 invert" />
            <div>
              <p className="font-semibold">University of Jos</p>
              <p className="text-sm opacity-80">Discipline and Excellence</p>
            </div>
          </div>
          <p className="text-sm opacity-70">
            © 2024 University of Jos Students' Project Repository System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;