import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { getMaterials, searchMaterials, incrementMaterialDownload } from "@/lib/localStorage";
import type { Material } from "@/lib/localStorage";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filterType, setFilterType] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [materials, setMaterials] = useState<Material[]>([]);

  // Load materials from localStorage
  useEffect(() => {
    const allMaterials = getMaterials();
    setMaterials(allMaterials);
  }, []);

  const filteredResults = materials.filter(material => {
    const matchesSearch = !searchQuery || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || material.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesYear = filterYear === 'all' || material.year.toString() === filterYear;
    
    return matchesSearch && matchesType && matchesYear;
  });

  const handleDownload = (materialId: string) => {
    incrementMaterialDownload(materialId);
    // Update local state
    setMaterials(prev => prev.map(m => 
      m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m
    ));
  };

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
              {filteredResults.map((material) => (
                <Card key={material.id} className="hover:shadow-university transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{material.title}</h3>
                          <Badge variant="outline">{material.type}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {material.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {material.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {material.downloads} downloads
                          </span>
                        </div>

                        <p className="text-foreground mb-3 leading-relaxed">
                          {material.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {material.keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <Button 
                          variant="university" 
                          size="sm"
                          onClick={() => handleDownload(material.id)}
                        >
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