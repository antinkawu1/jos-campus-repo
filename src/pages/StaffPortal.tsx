import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, Users, CheckCircle, AlertTriangle, User, FileCheck, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StaffPortal = () => {
  // Mock data for demonstration
  const supervisedStudents = [
    {
      name: "John Adebayo",
      studentId: "2020/CS/001",
      project: "IoT-Based Smart Irrigation System",
      status: "In Progress",
      lastSubmission: "3 days ago",
      pendingActions: 2
    },
    {
      name: "Mary Johnson",
      studentId: "2020/CS/045", 
      project: "Mobile Health App for Rural Communities",
      status: "Under Review",
      lastSubmission: "1 week ago",
      pendingActions: 1
    },
    {
      name: "Ibrahim Hassan",
      studentId: "2020/CS/089",
      project: "E-Learning Platform for Primary Schools", 
      status: "Approved",
      lastSubmission: "2 weeks ago",
      pendingActions: 0
    }
  ];

  const recentSubmissions = [
    {
      student: "John Adebayo",
      type: "Chapter 3 - Methodology",
      submitted: "2 hours ago",
      status: "pending"
    },
    {
      student: "Mary Johnson", 
      type: "Literature Review Update",
      submitted: "1 day ago",
      status: "reviewed"
    },
    {
      student: "Ibrahim Hassan",
      type: "Final Defense Presentation",
      submitted: "3 days ago", 
      status: "approved"
    }
  ];

  const sourceValidations = [
    {
      student: "John Adebayo",
      source: "IEEE Journal of Smart Agriculture",
      citation: "Smith, J. (2023). IoT Applications in Modern Farming",
      status: "pending",
      submitted: "1 day ago"
    },
    {
      student: "Mary Johnson",
      source: "WHO Health Technology Assessment",
      citation: "WHO. (2024). Mobile Health Technologies in Developing Countries",
      status: "validated", 
      submitted: "3 days ago"
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
                <h1 className="text-xl font-bold text-foreground">Staff Portal</h1>
                <p className="text-sm text-muted-foreground">Supervise • Validate • Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, Staff</span>
              <Button variant="accent" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login Required
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Authentication Notice */}
        <Card className="mb-8 border-university-red bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-university-red mb-2">
                Authentication Required
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                To access staff features including student supervision and source validation, 
                you'll need to connect this app to Supabase for secure authentication.
              </p>
              <Button variant="accent" size="sm">
                Setup Authentication
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-university-teal" />
              <h3 className="text-2xl font-bold">{supervisedStudents.length}</h3>
              <p className="text-sm text-muted-foreground">Students Supervised</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <h3 className="text-2xl font-bold">
                {supervisedStudents.reduce((sum, student) => sum + student.pendingActions, 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Pending Actions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <FileCheck className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="text-2xl font-bold">{recentSubmissions.length}</h3>
              <p className="text-sm text-muted-foreground">Recent Submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-university-teal" />
              <h3 className="text-2xl font-bold">{sourceValidations.length}</h3>
              <p className="text-sm text-muted-foreground">Source Validations</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Supervised Students */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Supervised Students
              </CardTitle>
              <CardDescription>
                Students under your supervision and their project progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supervisedStudents.map((student, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-elegant transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.studentId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {student.pendingActions > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {student.pendingActions} pending
                        </Badge>
                      )}
                      <Badge variant={
                        student.status === 'Approved' ? 'default' :
                        student.status === 'Under Review' ? 'secondary' : 'outline'
                      }>
                        {student.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{student.project}</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Last submission: {student.lastSubmission}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Project
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                Recent Submissions
              </CardTitle>
              <CardDescription>
                Latest project submissions requiring your review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{submission.student}</h4>
                      <p className="text-sm text-muted-foreground">{submission.type}</p>
                    </div>
                    <Badge variant={
                      submission.status === 'approved' ? 'default' :
                      submission.status === 'reviewed' ? 'secondary' : 'outline'
                    }>
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Submitted: {submission.submitted}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="university" size="sm">
                      Review
                    </Button>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Source Validations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Source Validation Requests
            </CardTitle>
            <CardDescription>
              Student citations and sources requiring validation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sourceValidations.map((validation, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{validation.student}</h4>
                      <Badge variant={validation.status === 'validated' ? 'default' : 'outline'}>
                        {validation.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {validation.source}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      "{validation.citation}"
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Submitted: {validation.submitted}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {validation.status === 'pending' && (
                      <>
                        <Button variant="university" size="sm">
                          Validate
                        </Button>
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                      </>
                    )}
                    {validation.status === 'validated' && (
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffPortal;