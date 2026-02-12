export const students = [
  {
    id: 1,
    loginId: "STU2024001",
    name: "John Doe",
    email: "john.doe@student.edu",
    rollNumber: "CS2024001",
    department: "Computer Science",
    year: "3rd Year",
    avatar: "https://i.pravatar.cc/150?img=1",
    registeredEvents: [1, 2, 4, 6],
    bio: "Passionate about technology and innovation. Love participating in hackathons and tech events."
  },
  {
    id: 2,
    loginId: "STU2024002",
    name: "Jane Smith",
    email: "jane.smith@student.edu",
    rollNumber: "EC2024045",
    department: "Electronics",
    year: "2nd Year",
    avatar: "https://i.pravatar.cc/150?img=5",
    registeredEvents: [2, 3, 5, 7],
    bio: "Cultural enthusiast and sports lover. Actively involved in college activities."
  }
];

export const admins = [
  {
    id: 1,
    name: "Dr. Robert Brown",
    email: "robert.brown@college.edu",
    designation: "Event Coordinator",
    avatar: "https://i.pravatar.cc/150?img=6",
    department: "Student Affairs"
  }
];

// Mock current user (student)
export const currentUser = students[0];

// Mock admin user
export const currentAdmin = admins[0];

export const getUserRegisteredEvents = (userId) => {
  const user = students.find(s => s.id === userId);
  return user ? user.registeredEvents : [];
};
