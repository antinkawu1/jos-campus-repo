// localStorage utilities for managing app data
import { initializeSampleUsers } from './sampleData';

export interface Project {
  id: string;
  title: string;
  description: string;
  studentId: string;
  supervisorId?: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  files: ProjectFile[];
  citations: Citation[];
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string; // In real app, this would be a file URL
  uploadedAt: string;
}

export interface Material {
  id: string;
  title: string;
  author: string;
  type: 'book' | 'journal' | 'article' | 'thesis' | 'conference-paper';
  year: string;
  description: string;
  keywords: string[];
  fileUrl?: string;
  uploadedBy: string;
  downloads: number;
  createdAt: string;
}

export interface Citation {
  id: string;
  materialId: string;
  projectId: string;
  studentId: string;
  isValidated: boolean;
  validatedBy?: string;
  validationNotes?: string;
  createdAt: string;
}

export interface Supervision {
  id: string;
  studentId: string;
  supervisorId: string;
  status: 'active' | 'completed' | 'inactive';
  createdAt: string;
}

// Project Management
export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const getProjects = (): Project[] => {
  return JSON.parse(localStorage.getItem('projects') || '[]');
};

export const getProjectsByStudent = (studentId: string): Project[] => {
  return getProjects().filter(project => project.studentId === studentId);
};

export const getProjectsBySupervisor = (supervisorId: string): Project[] => {
  return getProjects().filter(project => project.supervisorId === supervisorId);
};

export const deleteProject = (projectId: string): void => {
  const projects = getProjects().filter(p => p.id !== projectId);
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'files' | 'citations'>): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...projectData,
    id: crypto.randomUUID(),
    files: [],
    citations: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  projects.push(newProject);
  localStorage.setItem('projects', JSON.stringify(projects));
  return newProject;
};

// Material Management
export const saveMaterial = (material: Material): void => {
  const materials = getMaterials();
  const existingIndex = materials.findIndex(m => m.id === material.id);
  
  if (existingIndex >= 0) {
    materials[existingIndex] = material;
  } else {
    materials.push(material);
  }
  
  localStorage.setItem('materials', JSON.stringify(materials));
};

export const getMaterials = (): Material[] => {
  return JSON.parse(localStorage.getItem('materials') || '[]');
};

export const searchMaterials = (query: string): Material[] => {
  const materials = getMaterials();
  const searchTerm = query.toLowerCase();
  
  return materials.filter(material => 
    material.title.toLowerCase().includes(searchTerm) ||
    material.author.toLowerCase().includes(searchTerm) ||
    material.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)) ||
    material.description.toLowerCase().includes(searchTerm)
  );
};

export const incrementMaterialDownload = (materialId: string): void => {
  const materials = getMaterials();
  const materialIndex = materials.findIndex(m => m.id === materialId);
  
  if (materialIndex >= 0) {
    materials[materialIndex].downloads += 1;
    localStorage.setItem('materials', JSON.stringify(materials));
  }
};

export const deleteMaterial = (materialId: string): void => {
  const materials = getMaterials().filter(m => m.id !== materialId);
  localStorage.setItem('materials', JSON.stringify(materials));
};

// Citation Management
export const saveCitation = (citation: Citation): void => {
  const citations = getCitations();
  const existingIndex = citations.findIndex(c => c.id === citation.id);
  
  if (existingIndex >= 0) {
    citations[existingIndex] = citation;
  } else {
    citations.push(citation);
  }
  
  localStorage.setItem('citations', JSON.stringify(citations));
};

export const getCitations = (): Citation[] => {
  return JSON.parse(localStorage.getItem('citations') || '[]');
};

export const getCitationsByProject = (projectId: string): Citation[] => {
  return getCitations().filter(citation => citation.projectId === projectId);
};

export const getCitationsBySupervisor = (supervisorId: string): Citation[] => {
  const supervisions = getSupervisions().filter(s => s.supervisorId === supervisorId);
  const studentIds = supervisions.map(s => s.studentId);
  return getCitations().filter(citation => studentIds.includes(citation.studentId));
};

// Supervision Management
export const saveSupervision = (supervision: Supervision): void => {
  const supervisions = getSupervisions();
  const existingIndex = supervisions.findIndex(s => s.id === supervision.id);
  
  if (existingIndex >= 0) {
    supervisions[existingIndex] = supervision;
  } else {
    supervisions.push(supervision);
  }
  
  localStorage.setItem('supervisions', JSON.stringify(supervisions));
};

export const getSupervisions = (): Supervision[] => {
  return JSON.parse(localStorage.getItem('supervisions') || '[]');
};

export const getStudentsBySupervisor = (supervisorId: string): string[] => {
  return getSupervisions()
    .filter(s => s.supervisorId === supervisorId && s.status === 'active')
    .map(s => s.studentId);
};

// Initialize with sample data
export const initializeSampleData = (): void => {
  // Initialize sample users
  initializeSampleUsers();
  
  // Only initialize materials if no data exists
  if (getMaterials().length === 0) {
    const sampleMaterials: Material[] = [
      {
        id: '1',
        title: 'Advanced Data Structures and Algorithms',
        author: 'Dr. Johnson Smith',
        type: 'book',
        year: '2023',
        description: 'Comprehensive guide to advanced data structures including trees, graphs, and hash tables.',
        keywords: ['data structures', 'algorithms', 'computer science', 'programming'],
        downloads: 234,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Machine Learning Applications in Agriculture',
        author: 'Prof. Mary Adebayo',
        type: 'journal',
        year: '2024',
        description: 'Research on applying machine learning techniques to improve agricultural productivity.',
        keywords: ['machine learning', 'agriculture', 'AI', 'farming', 'productivity'],
        downloads: 156,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Sustainable Development in Nigeria',
        author: 'Dr. Ibrahim Hassan',
        type: 'article',
        year: '2023',
        description: 'Analysis of sustainable development practices and challenges in Nigeria.',
        keywords: ['sustainable development', 'Nigeria', 'environment', 'policy'],
        downloads: 89,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    
    sampleMaterials.forEach(saveMaterial);
  }
};