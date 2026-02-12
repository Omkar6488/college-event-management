export const events = [
  {
    id: 1,
    title: "Annual Tech Fest 2026",
    description: "Join us for the biggest technical festival of the year featuring workshops, competitions, and tech talks from industry leaders.",
    fullDescription: "The Annual Tech Fest 2026 is a three-day extravaganza celebrating innovation, technology, and creativity. Participate in coding competitions, robotics challenges, hackathons, and attend inspiring talks from tech industry leaders. Network with fellow students, showcase your projects, and win exciting prizes worth over $10,000!",
    date: "2026-03-15",
    endDate: "2026-03-17",
    time: "09:00 AM",
    venue: "Main Auditorium & Tech Campus",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    organizer: "Tech Club",
    organizerEmail: "techclub@college.edu",
    maxParticipants: 500,
    registeredCount: 342,
    speakers: [
      { name: "Dr. Sarah Johnson", designation: "CTO, TechCorp", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "Rajesh Kumar", designation: "AI Researcher, MIT", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Emily Chen", designation: "Founder, StartupHub", avatar: "https://i.pravatar.cc/150?img=9" }
    ],
    agenda: [
      { time: "09:00 AM - 10:00 AM", title: "Inauguration Ceremony", description: "Welcome speech and event overview" },
      { time: "10:00 AM - 12:00 PM", title: "Keynote: Future of AI", description: "By Dr. Sarah Johnson" },
      { time: "12:00 PM - 01:00 PM", title: "Lunch Break", description: "Networking opportunity" },
      { time: "01:00 PM - 04:00 PM", title: "Hackathon Begins", description: "24-hour coding challenge" },
      { time: "04:00 PM - 05:30 PM", title: "Workshop: Web3 Development", description: "Hands-on session" }
    ],
    featured: true,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Cultural Fiesta 2026",
    description: "Experience the diversity of cultures through music, dance, drama, and fashion shows in our grand cultural celebration.",
    fullDescription: "Cultural Fiesta 2026 brings together students from all backgrounds to celebrate the rich tapestry of cultures through various performing arts. Witness spectacular dance performances, melodious music concerts, thought-provoking drama, and stunning fashion shows. This is your chance to showcase your talent or simply enjoy the vibrant celebration of diversity.",
    date: "2026-02-20",
    endDate: "2026-02-22",
    time: "05:00 PM",
    venue: "Open Air Theatre",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=400&fit=crop",
    organizer: "Cultural Committee",
    organizerEmail: "culture@college.edu",
    maxParticipants: 1000,
    registeredCount: 876,
    speakers: [
      { name: "Priya Sharma", designation: "Classical Dancer", avatar: "https://i.pravatar.cc/150?img=10" },
      { name: "Michael Adams", designation: "Theatre Director", avatar: "https://i.pravatar.cc/150?img=14" }
    ],
    agenda: [
      { time: "05:00 PM - 06:00 PM", title: "Opening Ceremony", description: "Welcome dance performance" },
      { time: "06:00 PM - 07:30 PM", title: "Music Concert", description: "Live band performances" },
      { time: "07:30 PM - 08:00 PM", title: "Break", description: "Refreshments" },
      { time: "08:00 PM - 09:30 PM", title: "Drama Performance", description: "Original student production" },
      { time: "09:30 PM - 10:30 PM", title: "Fashion Show", description: "Ethnic and modern fusion" }
    ],
    featured: true,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Sports Championship Week",
    description: "Inter-college sports competition featuring cricket, football, basketball, athletics, and more.",
    fullDescription: "Sports Championship Week brings together athletic talent from across the region. Compete in various indoor and outdoor sports, showcase your athletic prowess, and bring glory to your team. With professional coaching, state-of-the-art facilities, and exciting prizes, this championship promises to be thrilling.",
    date: "2026-04-01",
    endDate: "2026-04-07",
    time: "07:00 AM",
    venue: "Sports Complex",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
    organizer: "Sports Department",
    organizerEmail: "sports@college.edu",
    maxParticipants: 800,
    registeredCount: 654,
    speakers: [
      { name: "Coach James Wilson", designation: "National Level Coach", avatar: "https://i.pravatar.cc/150?img=11" },
      { name: "Sania Verma", designation: "Olympic Athlete", avatar: "https://i.pravatar.cc/150?img=23" }
    ],
    agenda: [
      { time: "07:00 AM - 09:00 AM", title: "Morning Athletics", description: "Track and field events" },
      { time: "09:00 AM - 12:00 PM", title: "Team Sports", description: "Cricket and Football matches" },
      { time: "12:00 PM - 01:00 PM", title: "Lunch", description: "" },
      { time: "01:00 PM - 04:00 PM", title: "Basketball Tournament", description: "Quarter finals" },
      { time: "04:00 PM - 06:00 PM", title: "Swimming Championship", description: "Various categories" }
    ],
    featured: false,
    status: "upcoming"
  },
  {
    id: 4,
    title: "Hackathon 2026: Code for Change",
    description: "36-hour intensive hackathon to solve real-world problems using technology. Win prizes worth $15,000!",
    fullDescription: "Code for Change is more than just a hackathon - it's an opportunity to make a real impact. Work in teams to develop innovative solutions for social, environmental, and educational challenges. Get mentorship from industry experts, access to cutting-edge tools, and a chance to pitch your ideas to venture capitalists. Top projects will receive funding for further development.",
    date: "2026-03-25",
    endDate: "2026-03-26",
    time: "06:00 PM",
    venue: "Innovation Center",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    organizer: "Coding Club",
    organizerEmail: "codingclub@college.edu",
    maxParticipants: 200,
    registeredCount: 187,
    speakers: [
      { name: "Alex Thompson", designation: "Senior Software Engineer, Google", avatar: "https://i.pravatar.cc/150?img=13" },
      { name: "Neha Patel", designation: "Product Manager, Microsoft", avatar: "https://i.pravatar.cc/150?img=16" }
    ],
    agenda: [
      { time: "06:00 PM - 07:00 PM", title: "Registration & Team Formation", description: "Check-in and networking" },
      { time: "07:00 PM - 08:00 PM", title: "Problem Statements Reveal", description: "Theme announcement" },
      { time: "08:00 PM onwards", title: "Hacking Begins", description: "36 hours of coding" },
      { time: "Day 2, 08:00 PM", title: "Project Submissions", description: "Final submissions" },
      { time: "Day 2, 09:00 PM", title: "Pitching & Judging", description: "Present to judges" }
    ],
    featured: true,
    status: "upcoming"
  },
  {
    id: 5,
    title: "Literary Fest: Words & Wisdom",
    description: "A celebration of literature featuring book readings, poetry slams, creative writing workshops, and author interactions.",
    fullDescription: "Words & Wisdom Literary Fest celebrates the power of written and spoken word. Engage with renowned authors, participate in poetry slams, attend creative writing workshops, and share your own literary creations. Whether you're an aspiring writer or a passionate reader, this fest offers something for everyone.",
    date: "2026-02-28",
    endDate: "2026-03-01",
    time: "10:00 AM",
    venue: "Library Auditorium",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    organizer: "Literary Society",
    organizerEmail: "litclub@college.edu",
    maxParticipants: 300,
    registeredCount: 234,
    speakers: [
      { name: "Vikram Seth", designation: "Renowned Author", avatar: "https://i.pravatar.cc/150?img=7" },
      { name: "Maya Anderson", designation: "Poet & Writer", avatar: "https://i.pravatar.cc/150?img=20" }
    ],
    agenda: [
      { time: "10:00 AM - 11:30 AM", title: "Author Interaction", description: "Q&A with Vikram Seth" },
      { time: "11:30 AM - 01:00 PM", title: "Creative Writing Workshop", description: "Interactive session" },
      { time: "01:00 PM - 02:00 PM", title: "Lunch", description: "" },
      { time: "02:00 PM - 04:00 PM", title: "Poetry Slam", description: "Open mic for all" },
      { time: "04:00 PM - 05:30 PM", title: "Book Launch & Discussion", description: "New release discussion" }
    ],
    featured: false,
    status: "upcoming"
  },
  {
    id: 6,
    title: "Entrepreneurship Summit 2026",
    description: "Learn from successful entrepreneurs, pitch your startup ideas, and network with investors and mentors.",
    fullDescription: "The Entrepreneurship Summit brings together aspiring entrepreneurs, successful business leaders, investors, and mentors for two days of inspiration, learning, and networking. Attend keynotes, panel discussions, pitch competitions, and one-on-one mentorship sessions. Whether you have a startup idea or are already building one, this summit will provide valuable insights and connections.",
    date: "2026-04-10",
    endDate: "2026-04-11",
    time: "09:00 AM",
    venue: "Conference Hall",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    organizer: "Entrepreneurship Cell",
    organizerEmail: "ecell@college.edu",
    maxParticipants: 250,
    registeredCount: 198,
    speakers: [
      { name: "Ravi Sharma", designation: "CEO, InnovateTech", avatar: "https://i.pravatar.cc/150?img=8" },
      { name: "Lisa Wang", designation: "Venture Capitalist", avatar: "https://i.pravatar.cc/150?img=24" },
      { name: "Arjun Mehta", designation: "Serial Entrepreneur", avatar: "https://i.pravatar.cc/150?img=15" }
    ],
    agenda: [
      { time: "09:00 AM - 10:30 AM", title: "Keynote: Building Unicorns", description: "By Ravi Sharma" },
      { time: "10:30 AM - 12:00 PM", title: "Panel: Funding Your Startup", description: "VCs and Angels discuss" },
      { time: "12:00 PM - 01:00 PM", title: "Networking Lunch", description: "" },
      { time: "01:00 PM - 03:00 PM", title: "Pitch Competition", description: "Present your ideas" },
      { time: "03:00 PM - 05:00 PM", title: "Mentorship Sessions", description: "One-on-one guidance" }
    ],
    featured: true,
    status: "upcoming"
  },
  {
    id: 7,
    title: "Photography Workshop: Capturing Moments",
    description: "Professional photography workshop covering basics to advanced techniques, with hands-on practice sessions.",
    fullDescription: "Learn the art and craft of photography from professional photographers. This workshop covers camera basics, composition, lighting, post-processing, and specialized techniques. Bring your camera (or smartphone) and get hands-on practice with immediate feedback. Perfect for beginners and intermediate photographers looking to improve their skills.",
    date: "2026-03-05",
    endDate: "2026-03-05",
    time: "02:00 PM",
    venue: "Media Center",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=400&fit=crop",
    organizer: "Photography Club",
    organizerEmail: "photoclub@college.edu",
    maxParticipants: 50,
    registeredCount: 43,
    speakers: [
      { name: "David Martinez", designation: "Professional Photographer", avatar: "https://i.pravatar.cc/150?img=17" }
    ],
    agenda: [
      { time: "02:00 PM - 03:00 PM", title: "Introduction to Photography", description: "Camera basics and settings" },
      { time: "03:00 PM - 04:30 PM", title: "Composition & Lighting", description: "Theory and examples" },
      { time: "04:30 PM - 05:00 PM", title: "Break", description: "" },
      { time: "05:00 PM - 06:30 PM", title: "Hands-on Practice", description: "Outdoor photo walk" },
      { time: "06:30 PM - 07:00 PM", title: "Review & Feedback", description: "Critique session" }
    ],
    featured: false,
    status: "upcoming"
  },
  {
    id: 8,
    title: "Annual Alumni Meet 2026",
    description: "Reconnect with alumni, hear success stories, network, and celebrate the college legacy together.",
    fullDescription: "The Annual Alumni Meet is a celebration of our college community's achievements and connections. Hear inspiring success stories from distinguished alumni, network with professionals across industries, participate in fun activities, and relive your college memories. This is also an opportunity for current students to connect with alumni mentors.",
    date: "2026-01-15",
    endDate: "2026-01-15",
    time: "11:00 AM",
    venue: "College Campus",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop",
    organizer: "Alumni Relations",
    organizerEmail: "alumni@college.edu",
    maxParticipants: 600,
    registeredCount: 543,
    speakers: [
      { name: "Dr. Amit Verma", designation: "Alumni, Batch 2000", avatar: "https://i.pravatar.cc/150?img=19" },
      { name: "Sunita Kapoor", designation: "Alumni, Batch 2005", avatar: "https://i.pravatar.cc/150?img=22" }
    ],
    agenda: [
      { time: "11:00 AM - 12:00 PM", title: "Registration & Welcome", description: "Check-in and networking" },
      { time: "12:00 PM - 01:30 PM", title: "Alumni Talk Series", description: "Success stories" },
      { time: "01:30 PM - 02:30 PM", title: "Lunch", description: "Networking lunch" },
      { time: "02:30 PM - 04:00 PM", title: "Campus Tour & Activities", description: "Relive memories" },
      { time: "04:00 PM - 05:00 PM", title: "Closing Ceremony", description: "Group photo and farewell" }
    ],
    featured: false,
    status: "past"
  }
];

export const categories = [
  { id: 1, name: "All", value: "all", color: "bg-gray-500" },
  { id: 2, name: "Technical", value: "Technical", color: "bg-blue-500" },
  { id: 3, name: "Cultural", value: "Cultural", color: "bg-purple-500" },
  { id: 4, name: "Sports", value: "Sports", color: "bg-green-500" },
  { id: 5, name: "Workshop", value: "Workshop", color: "bg-yellow-500" }
];

export const getFeaturedEvents = () => events.filter(event => event.featured);
export const getUpcomingEvents = () => events.filter(event => event.status === "upcoming");
export const getPastEvents = () => events.filter(event => event.status === "past");
export const getEventById = (id) => events.find(event => event.id === parseInt(id));
export const getEventsByCategory = (category) => 
  category === "all" ? events : events.filter(event => event.category === category);
