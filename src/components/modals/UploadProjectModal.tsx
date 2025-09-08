import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { addProject } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";

interface UploadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectUploaded?: () => void;
}

export const UploadProjectModal = ({ isOpen, onClose, onProjectUploaded }: UploadProjectModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to upload a project.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !description.trim() || !type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const newProject = {
        title: title.trim(),
        description: description.trim(),
        studentId: user.id,
        status: 'draft' as const,
      };

      addProject(newProject);

      toast({
        title: "Success",
        description: "Project uploaded successfully!",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setType("");
      setFile(null);
      
      onProjectUploaded?.();
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Project
          </DialogTitle>
          <DialogDescription>
            Submit your project for review and supervisor feedback.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your project title"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Project Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project objectives and methodology"
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Project Type *</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="final-year">Final Year Project</SelectItem>
                <SelectItem value="dissertation">Dissertation</SelectItem>
                <SelectItem value="thesis">Thesis</SelectItem>
                <SelectItem value="research">Research Project</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">Upload File (Optional)</Label>
            <div className="mt-1">
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.doc,.docx,.txt"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-university-teal hover:file:bg-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: PDF, DOC, DOCX, TXT (Max 10MB)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button type="submit" disabled={isUploading} className="flex-1">
              {isUploading ? (
                <>
                  <FileText className="h-4 w-4 mr-2 animate-pulse" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Project
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};