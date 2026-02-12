// Certificate data structure - AI-based verification using certificate details
export const certificates = [
  {
    id: "CERT2026001",
    studentId: 1,
    studentLoginId: "STU2024001",
    studentName: "John Doe",
    studentRollNumber: "CS2024001",
    eventId: 1,
    eventName: "Annual Tech Fest 2026",
    eventDate: "2026-03-15",
    achievementType: "Winner", // Winner, Runner-up, Participation, Special Recognition
    position: "1st Place",
    category: "Hackathon Challenge",
    issuedDate: "2026-03-18",
    issuedBy: "Dr. Robert Brown",
    designation: "Event Coordinator",
    description: "For outstanding performance and innovative solution in the 24-hour Hackathon Challenge",
    verified: true,
    skills: ["Problem Solving", "Team Leadership", "Full Stack Development"]
  },
  {
    id: "CERT2026002",
    studentId: 1,
    studentLoginId: "STU2024001",
    studentName: "John Doe",
    studentRollNumber: "CS2024001",
    eventId: 2,
    eventName: "Cultural Fiesta 2026",
    eventDate: "2026-02-20",
    achievementType: "Participation",
    position: null,
    category: "Drama Competition",
    issuedDate: "2026-02-23",
    issuedBy: "Dr. Robert Brown",
    designation: "Event Coordinator",
    description: "For active participation in Cultural Fiesta 2026",
    verified: true,
    skills: ["Team Collaboration", "Creative Expression"]
  },
  {
    id: "CERT2026003",
    studentId: 2,
    studentLoginId: "STU2024002",
    studentName: "Jane Smith",
    studentRollNumber: "EC2024045",
    eventId: 3,
    eventName: "Inter-College Sports Meet 2026",
    eventDate: "2026-02-25",
    achievementType: "Runner-up",
    position: "2nd Place",
    category: "Basketball - Women's Team",
    issuedDate: "2026-02-28",
    issuedBy: "Dr. Robert Brown",
    designation: "Event Coordinator",
    description: "For exceptional performance and sportsmanship in the Inter-College Basketball Tournament",
    verified: true,
    skills: ["Teamwork", "Leadership", "Athletic Excellence"]
  },
  {
    id: "CERT2026004",
    studentId: 2,
    studentLoginId: "STU2024002",
    studentName: "Jane Smith",
    studentRollNumber: "EC2024045",
    eventId: 5,
    eventName: "Innovation Summit 2026",
    eventDate: "2026-03-05",
    achievementType: "Special Recognition",
    position: "Best Innovation Award",
    category: "IoT Project Showcase",
    issuedDate: "2026-03-08",
    issuedBy: "Dr. Robert Brown",
    designation: "Event Coordinator",
    description: "For presenting an innovative IoT solution for smart campus management",
    verified: true,
    skills: ["Innovation", "IoT", "Problem Solving", "Presentation"]
  },
  {
    id: "CERT2026005",
    studentId: 1,
    studentLoginId: "STU2024001",
    studentName: "John Doe",
    studentRollNumber: "CS2024001",
    eventId: 4,
    eventName: "Workshop: AI & Machine Learning",
    eventDate: "2026-02-28",
    achievementType: "Participation",
    position: null,
    category: "Workshop Completion",
    issuedDate: "2026-03-01",
    issuedBy: "Dr. Robert Brown",
    designation: "Event Coordinator",
    description: "For successful completion of AI & Machine Learning workshop",
    verified: true,
    skills: ["Machine Learning", "Python", "Data Science"]
  }
];

// Helper functions
export const getCertificatesByStudentId = (studentId) => {
  return certificates.filter(cert => cert.studentId === studentId);
};

export const getCertificateByLoginId = (loginId) => {
  return certificates.filter(cert => cert.studentLoginId === loginId);
};

export const getCertificateById = (id) => {
  return certificates.find(cert => cert.id === id);
};

export const getCertificatesByRollNumber = (rollNumber) => {
  return certificates.filter(cert => cert.studentRollNumber === rollNumber);
};

export const getStudentAchievementStats = (studentId) => {
  const studentCerts = getCertificatesByStudentId(studentId);
  return {
    total: studentCerts.length,
    wins: studentCerts.filter(c => c.achievementType === "Winner").length,
    runnerUp: studentCerts.filter(c => c.achievementType === "Runner-up").length,
    participation: studentCerts.filter(c => c.achievementType === "Participation").length,
    specialRecognition: studentCerts.filter(c => c.achievementType === "Special Recognition").length,
    skills: [...new Set(studentCerts.flatMap(c => c.skills || []))]
  };
};

// AI-based certificate verification using details matching
export const verifyCertificateByDetails = (searchData) => {
  const { studentName, eventName, eventDate, rollNumber, loginId } = searchData;
  
  // Search certificates using AI-like fuzzy matching
  const results = certificates.filter(cert => {
    const nameMatch = cert.studentName.toLowerCase() === studentName?.toLowerCase();
    const eventMatch = cert.eventName.toLowerCase().includes(eventName?.toLowerCase() || '');
    const dateMatch = !eventDate || cert.eventDate === eventDate;
    const rollMatch = !rollNumber || cert.studentRollNumber === rollNumber;
    const loginMatch = !loginId || cert.studentLoginId === loginId;
    
    // Calculate match score
    let score = 0;
    if (nameMatch) score += 3;
    if (eventMatch) score += 2;
    if (dateMatch) score += 1;
    if (rollMatch) score += 2;
    if (loginMatch) score += 3;
    
    // Return true if score is high enough (minimum 4 points)
    return score >= 4;
  });
  
  if (results.length === 0) {
    return { valid: false, message: "No matching certificates found in database", certificates: [] };
  }
  
  if (results.length > 1) {
    return { valid: true, message: `Found ${results.length} matching certificates`, certificates: results };
  }
  
  return { valid: true, message: "Certificate verified successfully", certificates: results };
};
