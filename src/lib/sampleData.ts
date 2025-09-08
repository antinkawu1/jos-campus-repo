// Initialize sample users for demo purposes
export const initializeSampleUsers = (): void => {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
  if (existingUsers.length === 0) {
    const sampleUsers = [
      {
        id: '1',
        email: 'student@unijos.edu.ng',
        password: 'password123',
        name: 'John Doe',
        role: 'student',
        department: 'Computer Science',
        studentId: 'CS/2020/001',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'staff@unijos.edu.ng',
        password: 'password123',
        name: 'Dr. Sarah Johnson',
        role: 'staff',
        department: 'Computer Science',
        staffId: 'STAFF/CS/001',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        email: 'admin@unijos.edu.ng',
        password: 'password123',
        name: 'Admin User',
        role: 'admin',
        department: 'Administration',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }
};