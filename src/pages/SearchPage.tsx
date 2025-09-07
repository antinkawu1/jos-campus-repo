import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, ArrowLeft, BookOpen, Calendar, User } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filterType, setFilterType] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: "Advanced Data Structures and Algorithms in Computer Science",
      author: "Dr. Johnson Smith",
      type: "Book",
      year: "2023",
      abstract: "Comprehensive guide covering advanced algorithmic techniques, data structure optimization, and practical implementation strategies for modern software development.",
      downloads: 234,
      pages: 456,
      publisher: "Academic Press",
      tags: ["Computer Science", "Algorithms", "Data Structures"]
    },
    {
      id: 2,
      title: "Machine Learning Applications in Agricultural Development",
      author: "Prof. Mary Adebayo",
      type: "Journal Article",
      year: "2024",
      abstract: "This research explores the implementation of machine learning techniques in optimizing crop yield, pest detection, and sustainable farming practices in Nigerian agriculture.",
      downloads: 156,
      pages: 23,
      publisher: "Journal of Agricultural Technology",
      tags: ["Machine Learning", "Agriculture", "Sustainability"]
    },
    {
      id: 3,
      title: "Sustainable Development Goals and Economic Growth in Nigeria",
      author: "Dr. Ibrahim Hassan",
      type: "Research Paper",
      year: "2023",
      abstract: "Analysis of Nigeria's progress toward achieving the UN Sustainable Development Goals and their correlation with economic indicators and policy implementation.",
      downloads: 89,
      pages: 45,
      publisher: "Development Studies Review",
      tags: ["Economics", "Development", "Policy"]
    },
    {
      id: 4,
      title: "IoT-Based Smart City Infrastructure: A Nigerian Perspective",
      author: "Dr. Sarah Okafor",
      type: "Conference Paper",
      year: "2024",
      abstract: "Examination of Internet of Things implementation strategies for smart city development in Nigeria, focusing on infrastructure challenges and solutions.",
      downloads: 67,
      pages: 12,
      publisher: "IEEE Conference Proceedings",
      tags: ["IoT", "Smart Cities", "Infrastructure"]
    },
    {
      id: 5,
      title: "Climate Change Impact on Water Resources in Northern Nigeria",
      author: "Prof. Ahmad Bello",
      type: "Research Report",
      year: "2023",
      abstract: "Comprehensive study on the effects of climate change on water availability, quality, and management in the northern regions of Nigeria.",
      downloads: 145,
      pages: 78,
      publisher: "Environmental Research Institute",
      tags: ["Climate Change", "Water Resources", "Environment"]
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || result.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesYear = filterYear === 'all' || result.year === filterYear;
    
    return matchesSearch && matchesType && matchesYear;
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

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
                <h1 className="text-xl font-bold text-foreground">Guest Search</h1>
                <p className="text-sm text-muted-foreground">Find academic materials and resources</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Academic Repository
            </CardTitle>
            <CardDescription>
              Search through books, journals, research papers, and project materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, author, keywords, or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="university">
                  Search
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Material Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="book">Books</SelectItem>
                    <SelectItem value="journal">Journal Articles</SelectItem>
                    <SelectItem value="research">Research Papers</SelectItem>
                    <SelectItem value="conference">Conference Papers</SelectItem>
                    <SelectItem value="report">Reports</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>

                {(filterType !== 'all' || filterYear !== 'all') && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setFilterType('all');
                      setFilterYear('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Search Results
              {searchQuery && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  for "{searchQuery}"
                </span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredResults.length} results found
            </p>
          </div>

          {filteredResults.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button variant="university" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <Card key={result.id} className="hover:shadow-university transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{result.title}</h3>
                          <Badge variant="outline">{result.type}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {result.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {result.year}
                          </span>
                          <span>{result.pages} pages</span>
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {result.downloads} downloads
                          </span>
                        </div>

                        <p className="text-foreground mb-3 leading-relaxed">
                          {result.abstract}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Published by: {result.publisher}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <Button variant="university" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Login Prompt */}
        <Card className="mt-8 border-university-teal bg-primary-light">
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold text-university-teal mb-2">
              Want to upload your own materials?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Students, staff, and admins can log in to access additional features including project uploads, 
              supervision tools, and material management.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="university" size="sm" asChild>
                <Link to="/student">Student Portal</Link>
              </Button>
              <Button variant="accent" size="sm" asChild>
                <Link to="/staff">Staff Portal</Link>
              </Button>
              <Button variant="cream" size="sm" asChild>
                <Link to="/admin">Admin Portal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;