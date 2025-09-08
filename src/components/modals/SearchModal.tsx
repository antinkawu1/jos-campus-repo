import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Download, Filter } from "lucide-react";
import { searchMaterials, getMaterials, incrementMaterialDownload } from "@/lib/localStorage";
import type { Material } from "@/lib/localStorage";
import { Badge } from "@/components/ui/badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [results, setResults] = useState<Material[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    
    try {
      let searchResults: Material[] = [];
      
      if (query.trim()) {
        searchResults = searchMaterials(query);
      } else {
        searchResults = getMaterials();
      }

      // Apply filters
      if (type && type !== "all") {
        searchResults = searchResults.filter(material => 
          material.type.toLowerCase() === type.toLowerCase()
        );
      }

      if (year && year !== "all") {
        searchResults = searchResults.filter(material => 
          material.year.toString() === year
        );
      }

      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownload = (materialId: string) => {
    incrementMaterialDownload(materialId);
    // Update local results
    setResults(prev => prev.map(m => 
      m.id === materialId ? { ...m, downloads: m.downloads + 1 } : m
    ));
  };

  const clearFilters = () => {
    setQuery("");
    setType("");
    setYear("");
    setResults([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search
          </DialogTitle>
          <DialogDescription>
            Search and filter academic materials in the repository.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/50">
            <div>
              <Label htmlFor="search-query">Search Query</Label>
              <Input
                id="search-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Keywords, title, author..."
              />
            </div>

            <div>
              <Label htmlFor="search-type">Material Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="research paper">Research Paper</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="thesis">Thesis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="search-year">Publication Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Any year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Year</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Actions */}
          <div className="flex items-center gap-2">
            <Button onClick={handleSearch} disabled={isSearching} className="flex-1">
              {isSearching ? (
                <>
                  <Search className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <Badge variant="secondary">{results.length} found</Badge>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((material) => (
                  <div key={material.id} className="p-4 border rounded-lg hover:shadow-elegant transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{material.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {material.author} • {material.year}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-university-teal">
                            {material.type}
                          </Badge>
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
              </div>
            </div>
          )}

          {results.length === 0 && isSearching === false && (query || type || year) && (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No materials found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};