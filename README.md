# 🎓 College Event Management System

<div align="center">

![College Event Management](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16.16-FF0080?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, AI-powered college event management platform with stunning animations and seamless user experience**

[Live Demo](https://your-app.vercel.app) • [Report Bug](https://github.com/yourusername/college-event-management/issues) • [Request Feature](https://github.com/yourusername/college-event-management/issues)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Certificate Verification** - No verification codes needed! Smart matching using student details
- **Unique Student Login IDs** - Each student gets a unique ID (format: STU2024XXX)
- **Event Discovery** - Browse and search through 200+ college events
- **Interactive Dashboards** - Separate dashboards for students and admins
- **Digital Certificates** - Automated certificate generation and management
- **Real-time Updates** - Live event status and registration tracking

### 🎨 Modern UI/UX
- **Parallax Scrolling** - Smooth scroll-based animations on homepage
- **30+ Floating Particles** - Dynamic background particles with physics
- **3D Transform Effects** - Interactive hover effects on cards
- **Gradient Animations** - Smooth color transitions and shimmer effects
- **Dark Mode Support** - Beautiful dark theme throughout the app
- **Mobile Responsive** - Fully optimized for all screen sizes

### 🔒 Security & Verification
- **AI Verification Algorithm** - Weighted scoring system matches certificates by:
  - Student Name (3 points)
  - Event Name (2 points)
  - Roll Number (2 points)
  - Login ID (3 points)
  - Event Date (1 point)
- **Minimum Score Required** - 4/11 points needed for valid match
- **Secure Data Management** - Protected student and certificate information

---

## 🚀 Tech Stack

### Frontend Framework
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router 6.20.0** - Client-side routing and navigation
- **Vite 5.0.8** - Lightning-fast build tool and dev server

### Styling & Animation
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Framer Motion 10.16.16** - Production-ready animation library
  - `useScroll` - Scroll-based animations
  - `useTransform` - Value transformations
  - `useSpring` - Spring physics
  - `useInView` - Viewport detection

### Icons & UI Components
- **Lucide React 0.294.0** - Beautiful, consistent icons
- Custom components with Framer Motion animations

### Development Tools
- **PostCSS & Autoprefixer** - CSS processing
- **ESLint** - Code quality
- **Git** - Version control

---

## 📦 Installation

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/college-event-management.git
   cd college-event-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (default: port 3000) |
| `npm run build` | Build for production (outputs to `/dist`) |
| `npm run preview` | Preview production build locally |

---

## 📁 Project Structure

```
college-event-management/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── EventCard.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── LandingPage.jsx          # New impressive homepage
│   │   ├── EventsPage.jsx
│   │   ├── CertificateVerificationPage.jsx  # AI verification
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentProfilePage.jsx
│   │   └── AdminDashboard.jsx
│   ├── data/            # Mock data
│   │   ├── events.js
│   │   ├── users.js     # Contains student loginId
│   │   └── certificates.js  # AI verification functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🎨 Key Features Breakdown

### 1. **Revolutionary Landing Page**
- **Hero Section**
  - Animated gradient background (3 layers)
  - 30 floating particles with random movement
  - Parallax scrolling effects
  - Giant animated heading
  - 4 stats cards with 3D hover effects
  - Smooth scroll indicator

- **Feature Section**
  - 6 feature cards with unique gradients
  - Lightning Fast Registration
  - AI-Powered Verification
  - Secure & Trusted
  - Digital Certificates
  - Personalized Recommendations
  - Progress Tracking

- **How It Works** - 4-step process visualization
- **Featured Events** - Grid of upcoming events
- **AI Verification CTA** - Purple gradient section
- **Testimonials** - User reviews with ratings
- **Final CTA** - Get started section

### 2. **AI Certificate Verification**
- **No Verification Codes** - Uses AI matching instead
- **Form Fields**: Student Name, Event Name, Event Date, Roll Number, Login ID
- **Sample Data Buttons** - Quick testing with pre-filled data
- **Animated Results** - Success/failure with detailed analysis
- **Multiple Matches** - Shows all matching certificates
- **Download & Share** - Certificate actions for verified documents

### 3. **Student Dashboard**
- Overview statistics (events attended, upcoming, certificates)
- Quick actions (register, verify, profile)
- Registered events timeline
- Certificates tab with login ID display
- AI verification button (no code needed)

### 4. **Student Profile**
- Personal information display
- Certificate showcase with login ID
- Copy verification details
- AI verify button
- Download certificate option

---

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub** (see instructions below)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration

3. **Configure Build Settings** (Auto-detected)
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 📝 Environment Variables

Create a `.env` file in the root directory (for future API integration):

```env
# API Configuration (when backend is ready)
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME="College Event Management"
VITE_APP_VERSION=1.0.0
```

**Note**: Currently using mock data in `/src/data/`. No environment variables needed for deployment.

---

## 🎯 AI Verification Algorithm

The system uses a sophisticated weighted scoring algorithm:

```javascript
// Scoring System
nameMatch:  3 points (exact match, case-insensitive)
eventMatch: 2 points (includes/fuzzy matching)
rollMatch:  2 points (exact match)
loginMatch: 3 points (exact match)
dateMatch:  1 point (exact match)

// Total: 11 possible points
// Minimum required: 4 points for valid match
```

**Example Verification:**
```javascript
Input: {
  studentName: "John Doe",
  eventName: "Tech Fest",
  rollNumber: "21BCS001",
  loginId: "STU2024001",
  eventDate: "2024-03-15"
}

Match Result:
✅ Name Match (+3)
✅ Event Match (+2)
✅ Roll Match (+2)
✅ Login ID Match (+3)
✅ Date Match (+1)
Total Score: 11/11 ✅ VERIFIED
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling
- Vercel for seamless deployment
- Lucide for beautiful icons

---

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for college events

</div>

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common UI components
│   ├── events/         # Event-related components
│   └── layout/         # Layout components
├── pages/              # Page components
├── data/               # Mock data
├── utils/              # Utility functions
├── App.jsx             # Main App component
└── main.jsx            # Entry point
```

## Features Overview

### Landing Page
- Hero section with animated background
- Featured events carousel
- Call-to-action buttons

### Events Page
- Grid/List view toggle
- Search and filter functionality
- Category-based filtering
- Interactive event cards

### Event Details
- Full event information
- Banner images
- Agenda timeline
- Speaker/organizer information

### Student Dashboard
- Registered events overview
- Upcoming events
- Past events history
- Profile summary

### Admin Dashboard
- Create event form
- Manage events table
- Analytics cards
- Edit/Delete functionality (UI only)

## Note

This is a **frontend-only** implementation. Backend APIs, authentication, and database integration are not included but the code structure is ready for future integration.

## License

MIT
