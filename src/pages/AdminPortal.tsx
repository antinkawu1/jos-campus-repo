import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, Upload, Users, BookOpen, Settings, User, BarChart3, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminPortal = () => {
  // Mock data for demonstration
  const systemStats = [
    { label: "Total Users", value: "1,247", icon: Users, trend: "+12%" },
    { label: "Materials", value: "3,456", icon: BookOpen, trend: "+8%" },
    { label: "Projects", value: "789", icon: Database, trend: "+15%" },
    { label: "Active Sessions", value: "156", icon: BarChart3, trend: "+5%" }
  ];

  const recentMaterials = [
    {
      title: "Advanced Machine Learning Techniques",
      type: "Book",
      uploadedBy: "Admin",
      date: "2024-01-15",
      status: "Active",
      downloads: 89
    },
    {
      title: "Sustainable Engineering Practices",
      type: "Journal",
      uploadedBy: "Dr. Johnson",
      date: "2024-01-14", 
      status: "Active",
      downloads: 156
    },
    {
      title: "Nigerian Economic Development Report 2024",
      type: "Research Paper",
      uploadedBy: "Prof. Adebayo",
      date: "2024-01-13",
      status: "Pending Review",
      downloads: 0
    }
  ];

  const userManagement = [
    {
      name: "Dr. Sarah Johnson",
      role: "Staff",
      department: "Computer Science", 
      status: "Active",
      lastLogin: "2 hours ago"
    },
    {
      name: "John Adebayo",
      role: "Student",
      department: "Computer Science",
      status: "Active", 
      lastLogin: "1 day ago"
    },
    {
      name: "Prof. Michael Brown",
      role: "Staff",
      department: "Engineering",
      status: "Active",
      lastLogin: "3 days ago"
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
                <h1 className="text-xl font-bold text-foreground">Admin Portal</h1>
                <p className="text-sm text-muted-foreground">Manage • Upload • Configure</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, Admin</span>
              <Button variant="cream" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login Required
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Authentication Notice */}
        <Card className="mb-8 border-yellow-400 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                Authentication Required
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                To access admin features including user management and material uploads, 
                you'll need to connect this app to Supabase for secure authentication.
              </p>
              <Button variant="cream" size="sm">
                Setup Authentication
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-green-600">{stat.trend} this month</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-university-teal" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center hover:shadow-university transition-all duration-300">
            <CardContent className="pt-6">
              <Upload className="h-12 w-12 mx-auto mb-4 text-university-teal" />
              <h3 className="text-lg font-semibold mb-2">Upload Materials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add books, journals, and research papers to the repository
              </p>
              <Button variant="university" className="w-full">
                Upload New Material
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-university transition-all duration-300">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-university-teal" />
              <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add, edit, or remove user accounts and permissions
              </p>
              <Button variant="cream" className="w-full">
                User Management
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-university transition-all duration-300">
            <CardContent className="pt-6">
              <Settings className="h-12 w-12 mx-auto mb-4 text-university-teal" />
              <h3 className="text-lg font-semibold mb-2">System Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure system preferences and repository settings
              </p>
              <Button variant="accent" className="w-full">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Materials */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Recent Materials
                  </CardTitle>
                  <CardDescription>
                    Latest materials uploaded to the repository
                  </CardDescription>
                </div>
                <Button variant="university" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMaterials.map((material, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-elegant transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Uploaded by {material.uploadedBy} • {material.date}
                      </p>
                    </div>
                    <Badge variant={material.status === 'Active' ? 'default' : 'secondary'}>
                      {material.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="bg-primary-light px-2 py-1 rounded text-university-teal">
                        {material.type}
                      </span>
                      <span>{material.downloads} downloads</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Recent user activity and account management
                  </CardDescription>
                </div>
                <Button variant="cream" size="sm">
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {userManagement.map((user, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.role} • {user.department}
                      </p>
                    </div>
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Last login: {user.lastLogin}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* System Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              System Information
            </CardTitle>
            <CardDescription>
              Repository statistics and system health
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-primary-light rounded-lg">
                <h4 className="text-lg font-semibold text-university-teal">Storage Used</h4>
                <p className="text-2xl font-bold">2.4 GB</p>
                <p className="text-sm text-muted-foreground">of 10 GB available</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="text-lg font-semibold text-green-600">Uptime</h4>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-600">Total Downloads</h4>
                <p className="text-2xl font-bold">12,456</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-600">Active Projects</h4>
                <p className="text-2xl font-bold">234</p>
                <p className="text-sm text-muted-foreground">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPortal;