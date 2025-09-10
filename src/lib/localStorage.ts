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
      // Computer Science Materials
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
      },
      {
        id: '4',
        title: 'Database Management Systems: Theory and Practice',
        author: 'Prof. Sarah Johnson',
        type: 'book',
        year: '2023',
        description: 'Complete reference for modern database design and implementation.',
        keywords: ['database', 'SQL', 'DBMS', 'data management'],
        downloads: 445,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Artificial Intelligence in Healthcare',
        author: 'Dr. Michael Chen',
        type: 'journal',
        year: '2024',
        description: 'Exploring AI applications in medical diagnosis and treatment.',
        keywords: ['AI', 'healthcare', 'medical', 'diagnosis'],
        downloads: 298,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Software Engineering Best Practices',
        author: 'Prof. David Wilson',
        type: 'book',
        year: '2023',
        description: 'Industry standards and methodologies for software development.',
        keywords: ['software engineering', 'agile', 'development', 'methodology'],
        downloads: 367,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '7',
        title: 'Cybersecurity Fundamentals',
        author: 'Dr. Lisa Brown',
        type: 'book',
        year: '2024',
        description: 'Essential concepts in information security and cyber defense.',
        keywords: ['cybersecurity', 'security', 'encryption', 'network security'],
        downloads: 521,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '8',
        title: 'Web Development with React and Node.js',
        author: 'Prof. James Taylor',
        type: 'book',
        year: '2024',
        description: 'Modern web development using React frontend and Node.js backend.',
        keywords: ['web development', 'React', 'Node.js', 'JavaScript'],
        downloads: 612,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '9',
        title: 'Mobile App Development with Flutter',
        author: 'Dr. Emily Davis',
        type: 'book',
        year: '2024',
        description: 'Cross-platform mobile app development using Flutter framework.',
        keywords: ['mobile development', 'Flutter', 'Dart', 'cross-platform'],
        downloads: 389,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '10',
        title: 'Cloud Computing Architecture',
        author: 'Prof. Robert Lee',
        type: 'book',
        year: '2023',
        description: 'Designing scalable cloud-based systems and infrastructure.',
        keywords: ['cloud computing', 'AWS', 'Azure', 'architecture'],
        downloads: 445,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Engineering Materials
      {
        id: '11',
        title: 'Structural Analysis in Civil Engineering',
        author: 'Prof. Ahmed Musa',
        type: 'book',
        year: '2023',
        description: 'Advanced methods for analyzing structural systems and loads.',
        keywords: ['structural analysis', 'civil engineering', 'construction', 'mechanics'],
        downloads: 234,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '12',
        title: 'Renewable Energy Systems Design',
        author: 'Dr. Fatima Abdullahi',
        type: 'journal',
        year: '2024',
        description: 'Design principles for solar, wind, and hydroelectric systems.',
        keywords: ['renewable energy', 'solar power', 'wind energy', 'sustainability'],
        downloads: 456,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '13',
        title: 'Materials Science and Engineering',
        author: 'Prof. John Okafor',
        type: 'book',
        year: '2023',
        description: 'Properties and applications of engineering materials.',
        keywords: ['materials science', 'engineering', 'metallurgy', 'composites'],
        downloads: 378,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '14',
        title: 'Electrical Circuit Analysis',
        author: 'Dr. Grace Okwu',
        type: 'book',
        year: '2024',
        description: 'Fundamental principles of electrical circuit analysis and design.',
        keywords: ['electrical engineering', 'circuits', 'electronics', 'analysis'],
        downloads: 567,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '15',
        title: 'Mechanical Design and Manufacturing',
        author: 'Prof. Peter Nwankwo',
        type: 'book',
        year: '2023',
        description: 'Principles of mechanical system design and manufacturing processes.',
        keywords: ['mechanical engineering', 'design', 'manufacturing', 'CAD'],
        downloads: 423,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Business and Management
      {
        id: '16',
        title: 'Strategic Management in Nigerian Context',
        author: 'Prof. Adaora Eze',
        type: 'book',
        year: '2024',
        description: 'Strategic planning and management practices for Nigerian businesses.',
        keywords: ['strategic management', 'business', 'Nigeria', 'planning'],
        downloads: 298,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '17',
        title: 'Digital Marketing Strategies',
        author: 'Dr. Kemi Adebayo',
        type: 'book',
        year: '2024',
        description: 'Modern digital marketing techniques and social media strategies.',
        keywords: ['digital marketing', 'social media', 'advertising', 'branding'],
        downloads: 512,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '18',
        title: 'Financial Management Principles',
        author: 'Prof. Tunde Bakare',
        type: 'book',
        year: '2023',
        description: 'Core concepts in corporate finance and investment analysis.',
        keywords: ['finance', 'investment', 'corporate finance', 'analysis'],
        downloads: 389,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '19',
        title: 'Entrepreneurship and Innovation',
        author: 'Dr. Blessing Okoro',
        type: 'book',
        year: '2024',
        description: 'Building successful startups and fostering innovation culture.',
        keywords: ['entrepreneurship', 'innovation', 'startup', 'business development'],
        downloads: 445,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '20',
        title: 'Human Resource Management',
        author: 'Prof. Chioma Uche',
        type: 'book',
        year: '2023',
        description: 'Modern HR practices and organizational behavior.',
        keywords: ['human resources', 'management', 'organizational behavior', 'leadership'],
        downloads: 334,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Sciences
      {
        id: '21',
        title: 'Advanced Organic Chemistry',
        author: 'Prof. Moses Danladi',
        type: 'book',
        year: '2024',
        description: 'Comprehensive study of organic chemical reactions and mechanisms.',
        keywords: ['organic chemistry', 'reactions', 'mechanisms', 'synthesis'],
        downloads: 267,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '22',
        title: 'Molecular Biology Techniques',
        author: 'Dr. Ruth Yakubu',
        type: 'journal',
        year: '2024',
        description: 'Modern techniques in molecular biology and genetic analysis.',
        keywords: ['molecular biology', 'genetics', 'DNA', 'laboratory techniques'],
        downloads: 398,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '23',
        title: 'Physics of Semiconductor Devices',
        author: 'Prof. Daniel Gyang',
        type: 'book',
        year: '2023',
        description: 'Physical principles underlying semiconductor device operation.',
        keywords: ['semiconductor physics', 'electronics', 'quantum mechanics', 'devices'],
        downloads: 456,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '24',
        title: 'Environmental Chemistry and Pollution',
        author: 'Dr. Mary Pam',
        type: 'article',
        year: '2024',
        description: 'Chemical processes in environmental systems and pollution control.',
        keywords: ['environmental chemistry', 'pollution', 'environmental science', 'remediation'],
        downloads: 223,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '25',
        title: 'Mathematical Methods in Physics',
        author: 'Prof. Joseph Dung',
        type: 'book',
        year: '2023',
        description: 'Advanced mathematical techniques for physics applications.',
        keywords: ['mathematical physics', 'calculus', 'differential equations', 'physics'],
        downloads: 345,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Medical and Health Sciences
      {
        id: '26',
        title: 'Clinical Pathology and Diagnostics',
        author: 'Dr. Stella Pwajok',
        type: 'book',
        year: '2024',
        description: 'Modern approaches to clinical diagnosis and pathological analysis.',
        keywords: ['clinical pathology', 'diagnostics', 'medicine', 'laboratory medicine'],
        downloads: 412,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '27',
        title: 'Public Health in Developing Countries',
        author: 'Prof. Emmanuel Choji',
        type: 'journal',
        year: '2024',
        description: 'Public health challenges and solutions in developing nations.',
        keywords: ['public health', 'developing countries', 'epidemiology', 'health policy'],
        downloads: 289,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '28',
        title: 'Pharmacology and Drug Development',
        author: 'Dr. Rebecca Dung',
        type: 'book',
        year: '2023',
        description: 'Principles of pharmacology and modern drug discovery processes.',
        keywords: ['pharmacology', 'drug development', 'medicine', 'therapeutics'],
        downloads: 356,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Agriculture and Food Science
      {
        id: '29',
        title: 'Sustainable Agriculture Practices',
        author: 'Prof. Yakubu Dogon-Yaro',
        type: 'book',
        year: '2024',
        description: 'Sustainable farming techniques for improved productivity.',
        keywords: ['sustainable agriculture', 'farming', 'crop production', 'sustainability'],
        downloads: 378,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '30',
        title: 'Food Science and Technology',
        author: 'Dr. Hawa Muazu',
        type: 'book',
        year: '2023',
        description: 'Food processing, preservation, and safety technologies.',
        keywords: ['food science', 'food technology', 'food safety', 'processing'],
        downloads: 445,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Social Sciences and Humanities
      {
        id: '31',
        title: 'Nigerian Political Economy',
        author: 'Prof. Samson Mancha',
        type: 'book',
        year: '2024',
        description: 'Analysis of Nigeria\'s political and economic systems.',
        keywords: ['political economy', 'Nigeria', 'politics', 'economics'],
        downloads: 234,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '32',
        title: 'African Literature and Culture',
        author: 'Dr. Joy Kwanga',
        type: 'book',
        year: '2023',
        description: 'Collection of contemporary African literary works and cultural studies.',
        keywords: ['African literature', 'culture', 'humanities', 'literature'],
        downloads: 198,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '33',
        title: 'Educational Psychology',
        author: 'Prof. Comfort Dogo',
        type: 'book',
        year: '2024',
        description: 'Psychological principles in educational settings and learning.',
        keywords: ['educational psychology', 'learning', 'education', 'psychology'],
        downloads: 312,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '34',
        title: 'Sociology of Development',
        author: 'Dr. Philip Dachung',
        type: 'book',
        year: '2023',
        description: 'Sociological perspectives on development and social change.',
        keywords: ['sociology', 'development', 'social change', 'society'],
        downloads: 267,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Research Papers and Theses
      {
        id: '35',
        title: 'Impact of Climate Change on Agriculture in Northern Nigeria',
        author: 'Ibrahim Sani (MSc Thesis)',
        type: 'thesis',
        year: '2024',
        description: 'Research on climate change effects on agricultural productivity.',
        keywords: ['climate change', 'agriculture', 'Nigeria', 'research'],
        downloads: 156,
        uploadedBy: 'student@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '36',
        title: 'Blockchain Technology in Supply Chain Management',
        author: 'Grace Okechukwu (PhD Dissertation)',
        type: 'thesis',
        year: '2024',
        description: 'Application of blockchain in improving supply chain transparency.',
        keywords: ['blockchain', 'supply chain', 'technology', 'management'],
        downloads: 289,
        uploadedBy: 'student@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '37',
        title: 'Mental Health Awareness Among University Students',
        author: 'Fatima Bello (BSc Project)',
        type: 'thesis',
        year: '2023',
        description: 'Study on mental health awareness and support systems.',
        keywords: ['mental health', 'students', 'psychology', 'awareness'],
        downloads: 198,
        uploadedBy: 'student@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '38',
        title: 'Renewable Energy Potential in Plateau State',
        author: 'John Mallo (MSc Thesis)',
        type: 'thesis',
        year: '2024',
        description: 'Assessment of solar and wind energy potential in Plateau State.',
        keywords: ['renewable energy', 'Plateau State', 'solar energy', 'wind energy'],
        downloads: 234,
        uploadedBy: 'student@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '39',
        title: 'Digital Banking Adoption in Nigeria',
        author: 'Blessing Choji (MBA Project)',
        type: 'thesis',
        year: '2024',
        description: 'Analysis of factors affecting digital banking adoption.',
        keywords: ['digital banking', 'fintech', 'adoption', 'Nigeria'],
        downloads: 345,
        uploadedBy: 'student@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      // Technical Reports and Conference Papers
      {
        id: '40',
        title: 'Laboratory Safety Guidelines for Research',
        author: 'University Safety Committee',
        type: 'conference-paper',
        year: '2024',
        description: 'Comprehensive safety guidelines for laboratory work.',
        keywords: ['safety', 'laboratory', 'guidelines', 'research'],
        downloads: 567,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '41',
        title: 'Research Methodology in Academic Writing',
        author: 'Graduate School',
        type: 'conference-paper',
        year: '2023',
        description: 'Guidelines for conducting academic research.',
        keywords: ['research methodology', 'academic writing', 'research', 'guidelines'],
        downloads: 678,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '42',
        title: 'Student Academic Policies and Procedures',
        author: 'Academic Affairs Office',
        type: 'article',
        year: '2024',
        description: 'Complete guide to academic policies and procedures.',
        keywords: ['academic policies', 'procedures', 'students', 'guidelines'],
        downloads: 789,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      // Recent Journal Articles
      {
        id: '43',
        title: 'Artificial Intelligence in Education: Opportunities and Challenges',
        author: 'Dr. Samuel Pwaveno',
        type: 'journal',
        year: '2024',
        description: 'Comprehensive review of AI applications in educational settings.',
        keywords: ['artificial intelligence', 'education', 'technology', 'learning'],
        downloads: 423,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '44',
        title: 'Nanotechnology Applications in Medicine',
        author: 'Prof. Martha Dalyop',
        type: 'journal',
        year: '2024',
        description: 'Recent advances in medical nanotechnology applications.',
        keywords: ['nanotechnology', 'medicine', 'healthcare', 'innovation'],
        downloads: 356,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '45',
        title: 'Internet of Things in Smart Cities',
        author: 'Dr. Victor Pam',
        type: 'article',
        year: '2024',
        description: 'IoT implementation strategies for smart city development.',
        keywords: ['IoT', 'smart cities', 'urban planning', 'technology'],
        downloads: 298,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      // Additional Materials
      {
        id: '46',
        title: 'Quantum Computing Fundamentals',
        author: 'Prof. Bitrus Shuaibu',
        type: 'book',
        year: '2024',
        description: 'Introduction to quantum computing principles and applications.',
        keywords: ['quantum computing', 'physics', 'computing', 'quantum mechanics'],
        downloads: 445,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '47',
        title: 'Data Analytics for Business Intelligence',
        author: 'Dr. Rahila Muhammad',
        type: 'book',
        year: '2024',
        description: 'Using data analytics for business decision making.',
        keywords: ['data analytics', 'business intelligence', 'data science', 'analysis'],
        downloads: 567,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '48',
        title: 'Robotics and Automation Engineering',
        author: 'Prof. Sunday Gyang',
        type: 'book',
        year: '2023',
        description: 'Principles of robotics design and industrial automation.',
        keywords: ['robotics', 'automation', 'engineering', 'manufacturing'],
        downloads: 389,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '49',
        title: 'Biomedical Engineering Applications',
        author: 'Dr. Esther Davou',
        type: 'journal',
        year: '2024',
        description: 'Modern applications of engineering in medical devices.',
        keywords: ['biomedical engineering', 'medical devices', 'healthcare', 'technology'],
        downloads: 234,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '50',
        title: 'Geoinformatics and Remote Sensing',
        author: 'Prof. Yakubu Kigbu',
        type: 'book',
        year: '2024',
        description: 'Geographic information systems and remote sensing techniques.',
        keywords: ['GIS', 'remote sensing', 'geoinformatics', 'mapping'],
        downloads: 312,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '51',
        title: 'Green Chemistry and Sustainable Processes',
        author: 'Dr. Comfort Pwantu',
        type: 'article',
        year: '2024',
        description: 'Environmentally friendly chemical processes and green chemistry.',
        keywords: ['green chemistry', 'sustainability', 'environmental chemistry', 'processes'],
        downloads: 278,
        uploadedBy: 'staff@unijos.edu.ng',
        createdAt: new Date().toISOString()
      },
      {
        id: '52',
        title: 'Financial Technology and Digital Banking',
        author: 'Prof. Godwin Pam',
        type: 'book',
        year: '2024',
        description: 'Impact of fintech on traditional banking systems.',
        keywords: ['fintech', 'digital banking', 'financial technology', 'innovation'],
        downloads: 456,
        uploadedBy: 'admin',
        createdAt: new Date().toISOString()
      }
    ];
    
    sampleMaterials.forEach(saveMaterial);
    
    // Initialize sample projects - updating interface fields first
    const currentProjects = getProjects();
    if (currentProjects.length === 0) {
      const sampleProjectsData = [
        {
          title: 'AI-Powered Student Performance Prediction System',
          description: 'Development of a machine learning system to predict student academic performance based on various factors.',
          studentId: '1',
          supervisorId: '2',
          status: 'under-review' as const
        },
        {
          title: 'Solar Energy Management System for Rural Communities',
          description: 'Design and implementation of a smart solar energy management system for off-grid rural communities.',
          studentId: '1',
          supervisorId: '2',
          status: 'approved' as const
        },
        {
          title: 'Blockchain-Based Voting System',
          description: 'Secure electronic voting system using blockchain technology for transparent elections.',
          studentId: '1',
          supervisorId: '2',
          status: 'under-review' as const
        },
        {
          title: 'Mobile Health App for Diabetes Management',
          description: 'Cross-platform mobile application for diabetes patients to track glucose levels and medication.',
          studentId: '1',
          supervisorId: '2',
          status: 'draft' as const
        },
        {
          title: 'Smart Irrigation System Using IoT',
          description: 'Internet of Things based automated irrigation system for precision agriculture.',
          studentId: '1',
          supervisorId: '2',
          status: 'submitted' as const
        },
        {
          title: 'E-Learning Platform for Remote Education',
          description: 'Comprehensive e-learning management system with video conferencing and assessment tools.',
          studentId: '1',
          supervisorId: '2',
          status: 'approved' as const
        },
        {
          title: 'Waste Management Optimization Using Machine Learning',
          description: 'ML algorithms to optimize waste collection routes and recycling processes.',
          studentId: '1',
          supervisorId: '2',
          status: 'under-review' as const
        },
        {
          title: 'Cryptocurrency Price Prediction Model',
          description: 'Deep learning model for predicting cryptocurrency price movements using sentiment analysis.',
          studentId: '1',
          supervisorId: '2',
          status: 'draft' as const
        },
        {
          title: 'Automated Traffic Management System',
          description: 'AI-powered traffic light control system to reduce congestion in urban areas.',
          studentId: '1',
          supervisorId: '2',
          status: 'submitted' as const
        },
        {
          title: 'Telemedicine Platform for Rural Healthcare',
          description: 'Web-based telemedicine platform connecting rural patients with urban healthcare providers.',
          studentId: '1',
          supervisorId: '2',
          status: 'approved' as const
        },
        {
          title: 'Smart Home Energy Monitoring System',
          description: 'IoT-based system for monitoring and optimizing household energy consumption.',
          studentId: '1',
          supervisorId: '2',
          status: 'under-review' as const
        },
        {
          title: 'Natural Language Processing for Local Languages',
          description: 'NLP tools and models for processing Nigerian local languages.',
          studentId: '1',
          supervisorId: '2',
          status: 'draft' as const
        },
        {
          title: 'Drone-Based Crop Monitoring System',
          description: 'Autonomous drone system for monitoring crop health using computer vision.',
          studentId: '1',
          supervisorId: '2',
          status: 'submitted' as const
        },
        {
          title: 'Digital Library Management System',
          description: 'Comprehensive digital library system with advanced search and recommendation features.',
          studentId: '1',
          supervisorId: '2',
          status: 'approved' as const
        },
        {
          title: 'Augmented Reality Education App',
          description: 'AR application for interactive learning in science and engineering subjects.',
          studentId: '1',
          supervisorId: '2',
          status: 'under-review' as const
        },
        {
          title: 'Water Quality Monitoring Network',
          description: 'Sensor network for real-time monitoring of water quality parameters.',
          studentId: '1',
          supervisorId: '2',
          status: 'draft' as const
        },
        {
          title: 'Cloud-Based Hospital Management System',
          description: 'Scalable cloud-based system for managing hospital operations and patient records.',
          studentId: '1',
          supervisorId: '2',
          status: 'submitted' as const
        },
        {
          title: 'Machine Learning for Medical Image Analysis',
          description: 'Deep learning models for automated analysis of medical imaging data.',
          studentId: '1',
          supervisorId: '2',
          status: 'approved' as const
        },
        {
          title: 'Smart Parking Management System',
          description: 'IoT-enabled parking management with mobile app integration.',
          studentId: '1',
          supervisorId: '2',
          status: 'under-review' as const
        },
        {
          title: 'Biometric Authentication Security System',
          description: 'Multi-modal biometric authentication system for enhanced security.',
          studentId: '1',
          supervisorId: '2',
          status: 'draft' as const
        }
      ];
      
      sampleProjectsData.forEach(projectData => {
        const project: Project = {
          id: Math.random().toString(36).substr(2, 9),
          ...projectData,
          files: [],
          citations: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        saveProject(project);
      });
    }
    
    // Initialize sample citations - fixing to match Citation interface
    if (getCitations().length === 0) {
      const sampleCitations: Omit<Citation, 'id' | 'createdAt'>[] = [
        {
          materialId: '1',
          projectId: getProjects()[0]?.id || '1',
          studentId: '1',
          isValidated: true,
          validatedBy: '2',
          validationNotes: 'Good source for data structures research'
        },
        {
          materialId: '2',
          projectId: getProjects()[0]?.id || '1',
          studentId: '1',
          isValidated: true,
          validatedBy: '2'
        },
        {
          materialId: '12',
          projectId: getProjects()[1]?.id || '2',
          studentId: '1',
          isValidated: true,
          validatedBy: '2',
          validationNotes: 'Relevant for solar energy project'
        },
        {
          materialId: '36',
          projectId: getProjects()[2]?.id || '3',
          studentId: '1',
          isValidated: false
        }
      ];
      
      sampleCitations.forEach(saveCitation);
    }
    
    // Initialize sample supervisions - fixing to match Supervision interface
    if (getSupervisions().length === 0) {
      const sampleSupervisions: Omit<Supervision, 'id' | 'createdAt'>[] = [
        {
          supervisorId: '2',
          studentId: '1',
          status: 'active'
        }
      ];
      
      sampleSupervisions.forEach(saveSupervision);
    }
  }
};