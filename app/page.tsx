"use client"

import { useState, useEffect, createContext } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ChevronUp,
  Download,
  Mail,
  Phone,
  Github,
  Linkedin,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Sparkles,
  Zap,
  Menu,
  Building,
  Sun,
  Moon,
} from "lucide-react"
import Image from "next/image"

// Theme Context
const ThemeContext = createContext<{
  isDark: boolean
  toggleTheme: () => void
}>({
  isDark: false,
  toggleTheme: () => {},
})

// Types
interface Project {
  id: number
  title: string
  description: string
  techStack: string[]
  github: string
  images: string[]
  fullDescription: string
  features: string[]
  category: string
  year: string
}

interface Education {
  id: number
  degree: string
  institution: string
  period: string
  achievements: string
  description: string
  gpa?: string
  location: string
  logo: string
}

interface Experience {
  id: number
  title: string
  company: string
  period: string
  type: string
  description: string
  responsibilities: string[]
  location: string
  logo: string
}

interface Achievement {
  id: number
  title: string
  category: "online" | "seminar"
  image: string
  description: string
  issuer: string
  date: string
  credentialId?: string
}

// Data
const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with modern UI/UX",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/mumphry/ecommerce",
    category: "Web Development",
    year: "2024",
    images: [
      "/placeholder.svg?height=600&width=800&text=E-commerce+Homepage",
      "/placeholder.svg?height=600&width=800&text=Product+Catalog",
      "/placeholder.svg?height=600&width=800&text=Product+Details",
      "/placeholder.svg?height=600&width=800&text=Shopping+Cart",
      "/placeholder.svg?height=600&width=800&text=Checkout+Process",
      "/placeholder.svg?height=600&width=800&text=User+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Admin+Panel",
      "/placeholder.svg?height=600&width=800&text=Order+Management",
      "/placeholder.svg?height=600&width=800&text=Analytics+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Mobile+Responsive",
    ],
    fullDescription:
      "A comprehensive e-commerce platform built with modern technologies, featuring user authentication, product management, shopping cart functionality, secure payment processing, and advanced analytics. The platform supports multiple vendors, real-time inventory management, and provides a seamless shopping experience across all devices.",
    features: [
      "User Authentication & Authorization",
      "Product Catalog Management",
      "Advanced Search & Filtering",
      "Shopping Cart & Wishlist",
      "Secure Payment Integration",
      "Order Tracking System",
      "Admin Dashboard",
      "Inventory Management",
      "Multi-vendor Support",
      "Real-time Notifications",
      "Analytics & Reporting",
      "Mobile Responsive Design",
    ],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    techStack: ["React", "Firebase", "Tailwind", "Framer Motion"],
    github: "https://github.com/mumphry/taskmanager",
    category: "Productivity",
    year: "2024",
    images: [
      "/placeholder.svg?height=600&width=800&text=Dashboard+Overview",
      "/placeholder.svg?height=600&width=800&text=Kanban+Board",
      "/placeholder.svg?height=600&width=800&text=Task+Details",
      "/placeholder.svg?height=600&width=800&text=Calendar+View",
      "/placeholder.svg?height=600&width=800&text=Team+Collaboration",
      "/placeholder.svg?height=600&width=800&text=Project+Timeline",
      "/placeholder.svg?height=600&width=800&text=Analytics+Reports",
      "/placeholder.svg?height=600&width=800&text=Settings+Panel",
      "/placeholder.svg?height=600&width=800&text=Mobile+Interface",
    ],
    fullDescription:
      "A powerful collaborative task management application with real-time synchronization, team collaboration features, and an intuitive drag-and-drop interface. Built with modern technologies to enhance productivity and streamline project workflows.",
    features: [
      "Real-time Collaboration",
      "Drag & Drop Interface",
      "Kanban Board View",
      "Calendar Integration",
      "Team Management",
      "Progress Tracking",
      "File Attachments",
      "Comment System",
      "Time Tracking",
      "Custom Labels & Tags",
      "Advanced Filtering",
      "Mobile Responsive",
    ],
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Beautiful weather app with location-based forecasts",
    techStack: ["React", "OpenWeather API", "Chart.js", "CSS3"],
    github: "https://github.com/mumphry/weather",
    category: "Data Visualization",
    year: "2023",
    images: [
      "/placeholder.svg?height=600&width=800&text=Current+Weather+Display",
      "/placeholder.svg?height=600&width=800&text=7-Day+Forecast",
      "/placeholder.svg?height=600&width=800&text=Hourly+Forecast",
      "/placeholder.svg?height=600&width=800&text=Weather+Maps",
      "/placeholder.svg?height=600&width=800&text=Location+Search",
      "/placeholder.svg?height=600&width=800&text=Weather+Alerts",
      "/placeholder.svg?height=600&width=800&text=Historical+Data",
      "/placeholder.svg?height=600&width=800&text=Settings+Preferences",
      "/placeholder.svg?height=600&width=800&text=Mobile+View",
    ],
    fullDescription:
      "A comprehensive weather dashboard providing detailed weather information, forecasts, and interactive maps with beautiful visualizations. Features location-based weather data, historical trends, and customizable alerts.",
    features: [
      "Location-based Weather",
      "7-Day Detailed Forecast",
      "Hourly Weather Updates",
      "Interactive Weather Maps",
      "Weather Alerts & Notifications",
      "Historical Weather Data",
      "Multiple Location Support",
      "Customizable Units",
      "Weather Widgets",
      "Offline Capability",
      "Beautiful Animations",
      "Responsive Design",
    ],
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    techStack: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
    github: "https://github.com/mumphry/social-dashboard",
    category: "Analytics",
    year: "2024",
    images: [
      "/placeholder.svg?height=600&width=800&text=Analytics+Overview",
      "/placeholder.svg?height=600&width=800&text=Engagement+Metrics",
      "/placeholder.svg?height=600&width=800&text=Content+Calendar",
      "/placeholder.svg?height=600&width=800&text=Audience+Insights",
      "/placeholder.svg?height=600&width=800&text=Post+Scheduler",
      "/placeholder.svg?height=600&width=800&text=Performance+Reports",
      "/placeholder.svg?height=600&width=800&text=Competitor+Analysis",
      "/placeholder.svg?height=600&width=800&text=Team+Management",
      "/placeholder.svg?height=600&width=800&text=Mobile+Interface",
    ],
    fullDescription:
      "A comprehensive social media management dashboard that provides detailed analytics, content scheduling, and team collaboration features for managing multiple social media accounts.",
    features: [
      "Multi-platform Analytics",
      "Content Scheduling",
      "Engagement Tracking",
      "Audience Demographics",
      "Performance Reports",
      "Competitor Analysis",
      "Team Collaboration",
      "Custom Dashboards",
    ],
  },
  {
    id: 5,
    title: "Learning Management System",
    description: "Educational platform with course management",
    techStack: ["Next.js", "Prisma", "Stripe", "AWS"],
    github: "https://github.com/mumphry/lms",
    category: "Education",
    year: "2023",
    images: [
      "/placeholder.svg?height=600&width=800&text=Course+Catalog",
      "/placeholder.svg?height=600&width=800&text=Video+Player",
      "/placeholder.svg?height=600&width=800&text=Student+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Quiz+System",
      "/placeholder.svg?height=600&width=800&text=Progress+Tracking",
      "/placeholder.svg?height=600&width=800&text=Discussion+Forum",
      "/placeholder.svg?height=600&width=800&text=Certificate+Generation",
      "/placeholder.svg?height=600&width=800&text=Instructor+Panel",
      "/placeholder.svg?height=600&width=800&text=Mobile+Learning",
    ],
    fullDescription:
      "A modern learning management system with video streaming, interactive quizzes, progress tracking, and certificate generation for online education.",
    features: [
      "Video Streaming",
      "Interactive Quizzes",
      "Progress Tracking",
      "Certificate Generation",
      "Discussion Forums",
      "Payment Integration",
      "Mobile Learning",
      "Analytics Dashboard",
    ],
  },
  {
    id: 6,
    title: "Cryptocurrency Tracker",
    description: "Real-time crypto portfolio management",
    techStack: ["React Native", "Redux", "CoinGecko API", "Firebase"],
    github: "https://github.com/mumphry/crypto-tracker",
    category: "Finance",
    year: "2023",
    images: [
      "/placeholder.svg?height=600&width=800&text=Portfolio+Overview",
      "/placeholder.svg?height=600&width=800&text=Market+Data",
      "/placeholder.svg?height=600&width=800&text=Price+Charts",
      "/placeholder.svg?height=600&width=800&text=News+Feed",
      "/placeholder.svg?height=600&width=800&text=Watchlist",
      "/placeholder.svg?height=600&width=800&text=Transaction+History",
      "/placeholder.svg?height=600&width=800&text=Price+Alerts",
      "/placeholder.svg?height=600&width=800&text=Settings",
      "/placeholder.svg?height=600&width=800&text=Mobile+App",
    ],
    fullDescription:
      "A comprehensive cryptocurrency tracking application with real-time price updates, portfolio management, and market analysis tools.",
    features: [
      "Real-time Price Updates",
      "Portfolio Management",
      "Price Alerts",
      "Market Analysis",
      "News Integration",
      "Transaction Tracking",
      "Watchlist Management",
      "Dark Mode Support",
    ],
  },
  {
    id: 7,
    title: "Inventory Management System",
    description: "Enterprise inventory tracking and management",
    techStack: ["Angular", "Spring Boot", "MySQL", "Docker"],
    github: "https://github.com/mumphry/inventory-system",
    category: "Enterprise",
    year: "2024",
    images: [
      "/placeholder.svg?height=600&width=800&text=Inventory+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Product+Management",
      "/placeholder.svg?height=600&width=800&text=Stock+Tracking",
      "/placeholder.svg?height=600&width=800&text=Supplier+Management",
      "/placeholder.svg?height=600&width=800&text=Reports+Analytics",
      "/placeholder.svg?height=600&width=800&text=Barcode+Scanner",
      "/placeholder.svg?height=600&width=800&text=Order+Management",
      "/placeholder.svg?height=600&width=800&text=User+Roles",
      "/placeholder.svg?height=600&width=800&text=Mobile+Scanner",
    ],
    fullDescription:
      "A robust inventory management system designed for enterprise use, featuring real-time stock tracking, automated reordering, and comprehensive reporting capabilities.",
    features: [
      "Real-time Stock Tracking",
      "Automated Reordering",
      "Barcode Integration",
      "Supplier Management",
      "Multi-location Support",
      "Advanced Reporting",
      "Role-based Access",
      "Mobile Scanner App",
    ],
  },
  {
    id: 8,
    title: "Healthcare Management Portal",
    description: "Patient and appointment management system",
    techStack: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    github: "https://github.com/mumphry/healthcare-portal",
    category: "Healthcare",
    year: "2024",
    images: [
      "/placeholder.svg?height=600&width=800&text=Patient+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Appointment+Booking",
      "/placeholder.svg?height=600&width=800&text=Medical+Records",
      "/placeholder.svg?height=600&width=800&text=Doctor+Schedule",
      "/placeholder.svg?height=600&width=800&text=Prescription+Management",
      "/placeholder.svg?height=600&width=800&text=Billing+System",
      "/placeholder.svg?height=600&width=800&text=Reports+Analytics",
      "/placeholder.svg?height=600&width=800&text=Telemedicine",
      "/placeholder.svg?height=600&width=800&text=Mobile+App",
    ],
    fullDescription:
      "A comprehensive healthcare management portal that streamlines patient care, appointment scheduling, and medical record management for healthcare providers.",
    features: [
      "Patient Registration",
      "Appointment Scheduling",
      "Medical Records Management",
      "Prescription Tracking",
      "Billing Integration",
      "Telemedicine Support",
      "Real-time Notifications",
      "HIPAA Compliance",
    ],
  },
  {
    id: 9,
    title: "Real Estate Platform",
    description: "Property listing and management platform",
    techStack: ["Next.js", "MongoDB", "Stripe", "Mapbox"],
    github: "https://github.com/mumphry/real-estate-platform",
    category: "Real Estate",
    year: "2023",
    images: [
      "/placeholder.svg?height=600&width=800&text=Property+Listings",
      "/placeholder.svg?height=600&width=800&text=Property+Details",
      "/placeholder.svg?height=600&width=800&text=Map+Integration",
      "/placeholder.svg?height=600&width=800&text=Agent+Dashboard",
      "/placeholder.svg?height=600&width=800&text=Search+Filters",
      "/placeholder.svg?height=600&width=800&text=Virtual+Tours",
      "/placeholder.svg?height=600&width=800&text=Mortgage+Calculator",
      "/placeholder.svg?height=600&width=800&text=Contact+Forms",
      "/placeholder.svg?height=600&width=800&text=Mobile+Responsive",
    ],
    fullDescription:
      "A modern real estate platform that connects buyers, sellers, and agents with advanced search capabilities, virtual tours, and integrated payment processing.",
    features: [
      "Advanced Property Search",
      "Interactive Maps",
      "Virtual Property Tours",
      "Agent Management",
      "Mortgage Calculator",
      "Payment Integration",
      "Lead Management",
      "Mobile Responsive",
    ],
  },
]

const educationData: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Engineering",
    institution: "Bulacan State University - Main",
    period: "2020 - 2024",
    achievements: "Magna Cum Laude",
    gpa: "1.53",
    location: "Malolos, Bulacan",
    logo: "/placeholder.svg?height=80&width=80&text=BSU+Logo",
    description:
      "Comprehensive program covering computer hardware, software engineering, embedded systems, and digital signal processing. Specialized in IoT development and machine learning applications.",
  },
  {
    id: 2,
    degree: "Science, Technology, Engineering, and Mathematics (STEM)",
    institution: "Sta. Lucia National High School",
    period: "2019 - 2021",
    achievements: "Valedictorian with High Honor",
    location: "Sta. Lucia, Bulacan",
    logo: "/placeholder.svg?height=80&width=80&text=SLNHS+Logo",
    description:
      "Advanced STEM curriculum focusing on mathematics, physics, chemistry, and computer science fundamentals. Led multiple science fair projects and research initiatives.",
  },
  {
    id: 3,
    degree: "Junior High School Diploma",
    institution: "Sta. Lucia National High School",
    period: "2014 - 2019",
    achievements: "with High Honor",
    location: "Sta. Lucia, Bulacan",
    logo: "/placeholder.svg?height=80&width=80&text=SLNHS+Logo",
    description:
      "Comprehensive secondary education with focus on science and mathematics. Active participant in academic competitions and student leadership programs.",
  },
  {
    id: 4,
    degree: "Elementary Diploma",
    institution: "Bulusan Elementary School",
    period: "2008 - 2014",
    achievements: "1st Honorable Mention",
    location: "Bulusan, Bulacan",
    logo: "/placeholder.svg?height=80&width=80&text=BES+Logo",
    description:
      "Foundation education with consistent academic excellence. Participated in various academic competitions and extracurricular activities.",
  },
]

const experienceData: Experience[] = [
  {
    id: 1,
    title: "Database Administrator - IT Support",
    company: "Allied Care Experts (ACE) Malolos Doctors",
    period: "June 2024 - July 2024",
    type: "Internship",
    location: "Malolos, Bulacan",
    logo: "/placeholder.svg?height=80&width=80&text=ACE+Logo",
    description:
      "Managed database systems and provided comprehensive IT support for healthcare operations, ensuring data integrity and system reliability.",
    responsibilities: [
      "Maintained and optimized MySQL databases for patient records",
      "Provided technical support for healthcare management systems",
      "Implemented data backup and recovery procedures",
      "Assisted in system upgrades and maintenance",
      "Created documentation for database procedures",
      "Collaborated with medical staff on IT requirements",
    ],
  },
  {
    id: 2,
    title: "Marketing Assistant - Graphic Designer",
    company: "Allied Care Experts (ACE) Malolos Doctors",
    period: "August 2024 - October 2024",
    type: "Part-time",
    location: "Malolos, Bulacan",
    logo: "/placeholder.svg?height=80&width=80&text=ACE+Logo",
    description:
      "Created compelling marketing materials and designed graphics for healthcare campaigns, enhancing brand visibility and patient engagement.",
    responsibilities: [
      "Designed marketing materials for healthcare campaigns",
      "Created social media graphics and promotional content",
      "Developed branding materials for medical services",
      "Collaborated with marketing team on campaign strategies",
      "Maintained brand consistency across all materials",
      "Analyzed design performance and made improvements",
    ],
  },
]

const achievements: Achievement[] = [
  // Online Courses
  {
    id: 1,
    title: "Advanced React Development",
    category: "online",
    image: "/placeholder.svg?height=600&width=800&text=React+Certificate",
    description:
      "Comprehensive course covering advanced React patterns, hooks, context API, and performance optimization techniques.",
    issuer: "Meta (Facebook)",
    date: "March 2024",
    credentialId: "REACT-ADV-2024-001",
  },
  {
    id: 2,
    title: "Full Stack JavaScript Development",
    category: "online",
    image: "/placeholder.svg?height=600&width=800&text=JavaScript+Certificate",
    description:
      "Complete full-stack development course covering Node.js, Express, MongoDB, and modern JavaScript frameworks.",
    issuer: "freeCodeCamp",
    date: "February 2024",
    credentialId: "JS-FULL-2024-002",
  },
  {
    id: 3,
    title: "Cloud Computing with AWS",
    category: "online",
    image: "/placeholder.svg?height=600&width=800&text=AWS+Certificate",
    description:
      "Comprehensive AWS cloud computing course covering EC2, S3, Lambda, and cloud architecture best practices.",
    issuer: "Amazon Web Services",
    date: "January 2024",
    credentialId: "AWS-CLOUD-2024-003",
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    category: "online",
    image: "/placeholder.svg?height=600&width=800&text=ML+Certificate",
    description:
      "Introduction to machine learning algorithms, data preprocessing, and model evaluation using Python and scikit-learn.",
    issuer: "Coursera - Stanford University",
    date: "December 2023",
    credentialId: "ML-FUND-2023-004",
  },
  {
    id: 5,
    title: "Cybersecurity Essentials",
    category: "online",
    image: "/placeholder.svg?height=600&width=800&text=Security+Certificate",
    description:
      "Comprehensive cybersecurity course covering network security, ethical hacking, and security best practices.",
    issuer: "Cisco Networking Academy",
    date: "November 2023",
    credentialId: "CYBER-ESS-2023-005",
  },
  // Seminars
  {
    id: 6,
    title: "Tech Innovation Summit 2024",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=Innovation+Summit+Certificate",
    description:
      "Participated in the annual tech innovation summit featuring emerging technologies, startup pitches, and industry networking.",
    issuer: "Philippine Software Industry Association",
    date: "May 2024",
  },
  {
    id: 7,
    title: "AI & Machine Learning Workshop",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=AI+Workshop+Certificate",
    description:
      "Hands-on workshop covering artificial intelligence applications, neural networks, and practical ML implementation.",
    issuer: "University of the Philippines",
    date: "April 2024",
  },
  {
    id: 8,
    title: "Blockchain Technology Conference",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=Blockchain+Conference+Certificate",
    description:
      "Conference on blockchain technology, cryptocurrency, smart contracts, and decentralized applications.",
    issuer: "Blockchain Association of the Philippines",
    date: "March 2024",
  },
  {
    id: 9,
    title: "DevOps and CI/CD Best Practices",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=DevOps+Seminar+Certificate",
    description:
      "Seminar on DevOps methodologies, continuous integration, continuous deployment, and automation tools.",
    issuer: "Google Cloud Philippines",
    date: "February 2024",
  },
  {
    id: 10,
    title: "UI/UX Design Thinking Workshop",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=UIUX+Workshop+Certificate",
    description:
      "Interactive workshop on user experience design, design thinking methodology, and prototyping techniques.",
    issuer: "Design Thinking Philippines",
    date: "January 2024",
  },
  {
    id: 11,
    title: "Mobile App Development Bootcamp",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=Mobile+Bootcamp+Certificate",
    description: "Intensive bootcamp covering React Native, Flutter, and mobile app deployment strategies.",
    issuer: "Mobile Developers Philippines",
    date: "December 2023",
  },
  {
    id: 12,
    title: "Data Science and Analytics Summit",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=Data+Science+Certificate",
    description: "Summit on data science methodologies, big data analytics, and business intelligence applications.",
    issuer: "Data Science Society Philippines",
    date: "November 2023",
  },
  {
    id: 13,
    title: "Agile Development Methodology",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=Agile+Methodology+Certificate",
    description: "Comprehensive seminar on Agile development practices, Scrum framework, and project management.",
    issuer: "Agile Alliance Philippines",
    date: "October 2023",
  },
  {
    id: 14,
    title: "Software Testing and Quality Assurance",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=QA+Testing+Certificate",
    description:
      "Seminar on software testing methodologies, automated testing tools, and quality assurance best practices.",
    issuer: "Quality Assurance Institute",
    date: "September 2023",
  },
  {
    id: 15,
    title: "Internet of Things (IoT) Workshop",
    category: "seminar",
    image: "/placeholder.svg?height=600&width=800&text=IoT+Workshop+Certificate",
    description: "Hands-on workshop on IoT development, sensor integration, and smart device programming.",
    issuer: "IoT Philippines Community",
    date: "August 2023",
  },
]

const skills = [
  {
    name: "C++",
    icon: "💻",
    color: "from-purple-500 to-indigo-600",
    darkColor: "from-purple-600 to-indigo-700",
    hoverAnimation: "code",
  },
  {
    name: "Python",
    icon: "🐍",
    color: "from-green-500 to-emerald-600",
    darkColor: "from-green-600 to-emerald-700",
    hoverAnimation: "snake",
  },
  {
    name: "Java",
    icon: "☕",
    color: "from-orange-500 to-red-600",
    darkColor: "from-orange-600 to-red-700",
    hoverAnimation: "coffee",
  },
  {
    name: "HTML",
    icon: "🌐",
    color: "from-blue-500 to-cyan-600",
    darkColor: "from-blue-600 to-cyan-700",
    hoverAnimation: "web",
  },
  {
    name: "CSS",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    darkColor: "from-pink-600 to-rose-700",
    hoverAnimation: "paint",
  },
  {
    name: "JavaScript",
    icon: "⚡",
    color: "from-yellow-500 to-amber-600",
    darkColor: "from-yellow-600 to-amber-700",
    hoverAnimation: "lightning",
  },
  {
    name: "FlutterFlow",
    icon: "📱",
    color: "from-indigo-500 to-purple-600",
    darkColor: "from-indigo-600 to-purple-700",
    hoverAnimation: "mobile",
  },
  {
    name: "Git",
    icon: "🔧",
    color: "from-gray-500 to-slate-600",
    darkColor: "from-gray-600 to-slate-700",
    hoverAnimation: "tools",
  },
  {
    name: "GitHub",
    icon: "🐙",
    color: "from-slate-600 to-gray-700",
    darkColor: "from-slate-700 to-gray-800",
    hoverAnimation: "octopus",
  },
  {
    name: "MySQL",
    icon: "🗄️",
    color: "from-teal-500 to-cyan-600",
    darkColor: "from-teal-600 to-cyan-700",
    hoverAnimation: "database",
  },
]

// Animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.3,
    },
  },
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
}

const navItems = [
  { name: "Home", href: "#home", effect: "slide" },
  { name: "About", href: "#about", effect: "bounce" },
  { name: "Projects", href: "#projects", effect: "rotate" },
  { name: "Achievements", href: "#achievements", effect: "pulse" },
  { name: "Contact me", href: "#contact", effect: "shake" },
]

// Floating Particles Component
const FloatingParticles = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${
            isDark ? "bg-gradient-to-r from-purple-400 to-pink-400" : "bg-gradient-to-r from-blue-400 to-cyan-400"
          }`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated Background Component
const AnimatedBackground = ({ isDark }: { isDark: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gradient-to-r from-blue-400 to-cyan-400"
        }`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          isDark ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-pink-400 to-rose-400"
        }`}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-15 ${
          isDark ? "bg-gradient-to-r from-teal-500 to-cyan-500" : "bg-gradient-to-r from-emerald-400 to-teal-400"
        }`}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -180, -360],
          x: [-50, 30, -50],
          y: [-50, 20, -50],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Modal states
  const [showEducationModal, setShowEducationModal] = useState(false)
  const [showExperienceModal, setShowExperienceModal] = useState(false)
  const [showProjectsModal, setShowProjectsModal] = useState(false)
  const [showAchievementsModal, setShowAchievementsModal] = useState(false)

  // Selected items
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  // Image navigation
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const toggleTheme = () => setIsDark(!isDark)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""))
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))
    }
  }

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setShowProjectsModal(false)
  }

  // Navigation effects
  const getNavEffect = (effect: string) => {
    switch (effect) {
      case "slide":
        return {
          x: [0, 10, 0],
          transition: { duration: 0.3 },
        }
      case "bounce":
        return {
          y: [0, -10, 0],
          transition: { duration: 0.4, type: "spring" },
        }
      case "rotate":
        return {
          rotate: [0, 360],
          transition: { duration: 0.6 },
        }
      case "pulse":
        return {
          scale: [1, 1.1, 1],
          transition: { duration: 0.3 },
        }
      case "shake":
        return {
          x: [0, -5, 5, -5, 5, 0],
          transition: { duration: 0.5 },
        }
      default:
        return {}
    }
  }

  // Skill hover animations
  const getSkillHoverAnimation = (animationType: string) => {
    switch (animationType) {
      case "snake":
        return {
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, -5, 5, 0],
          transition: { duration: 1.5, ease: "easeInOut" },
        }
      case "coffee":
        return {
          y: [0, -10, 0],
          rotate: [0, 15, -15, 0],
          transition: { duration: 1, ease: "easeInOut" },
        }
      case "lightning":
        return {
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          transition: { duration: 0.8, ease: "easeInOut" },
        }
      case "paint":
        return {
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          transition: { duration: 1.2, ease: "easeInOut" },
        }
      case "web":
        return {
          scale: [1, 1.1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          transition: { duration: 1.5, ease: "easeInOut" },
        }
      case "mobile":
        return {
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 1, ease: "easeInOut" },
        }
      case "octopus":
        return {
          rotate: [0, -20, 20, -10, 10, 0],
          scale: [1, 1.2, 1],
          transition: { duration: 1.5, ease: "easeInOut" },
        }
      case "database":
        return {
          scale: [1, 0.9, 1.1, 1],
          y: [0, -5, 5, 0],
          transition: { duration: 1, ease: "easeInOut" },
        }
      case "tools":
        return {
          rotate: [0, 45, -45, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 1, ease: "easeInOut" },
        }
      default:
        return {
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.8, ease: "easeInOut" },
        }
    }
  }

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      : "bg-gradient-to-br from-blue-50 via-white to-purple-50",
    text: isDark ? "text-white" : "text-gray-900",
    nav: isDark ? "bg-slate-900/90 border-purple-500/30" : "bg-white/90 border-blue-200/50",
    card: isDark ? "bg-slate-800/80 border-purple-500/30" : "bg-white/80 border-blue-200/50",
    modal: isDark ? "bg-slate-800" : "bg-white",
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-all duration-500`}
      >
        {/* Animated Background */}
        <AnimatedBackground isDark={isDark} />
        <FloatingParticles isDark={isDark} />

        {/* Navigation Bar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 ${themeClasses.nav} backdrop-blur-md border-b shadow-2xl transition-all duration-500`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Brand Name */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center cursor-pointer"
                onClick={() => scrollToSection("#home")}
              >
                <motion.span
                  className={`text-2xl font-bold bg-gradient-to-r ${
                    isDark ? "from-purple-400 to-pink-400" : "from-blue-600 to-purple-600"
                  } bg-clip-text text-transparent`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  merfi_wipz
                </motion.span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className={`ml-2 ${isDark ? "text-purple-400" : "text-blue-500"}`}
                >
                  <Sparkles size={20} />
                </motion.div>
              </motion.div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full ${
                  isDark
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-500"
                } shadow-lg transition-all duration-300`}
              >
                <motion.div animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.5 }}>
                  {isDark ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
                </motion.div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={getNavEffect(item.effect)}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"
                    } font-medium transition-colors duration-300 group`}
                  >
                    {item.name}
                    <motion.div
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${
                        isDark ? "from-purple-400 to-pink-400" : "from-blue-500 to-purple-500"
                      } group-hover:w-full transition-all duration-300`}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`md:hidden p-2 rounded-lg bg-gradient-to-r ${
                  isDark ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"
                } text-white shadow-lg`}
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`md:hidden ${themeClasses.nav} backdrop-blur-md border-t ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
              >
                <div className="px-4 py-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block w-full text-left px-4 py-3 ${
                        isDark
                          ? "text-gray-300 hover:text-white hover:bg-purple-900/50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-blue-50"
                      } rounded-lg font-medium transition-all duration-300`}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center w-full mt-4 p-3 rounded-lg bg-gradient-to-r ${
                      isDark ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"
                    } text-white shadow-lg transition-all duration-300`}
                  >
                    <motion.div animate={{ rotate: isDark ? 180 : 0 }} transition={{ duration: 0.5 }} className="mr-2">
                      {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.div>
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Hero Background */}
          <div className="absolute inset-0">
            <motion.div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900"
                  : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
              }`}
              style={{ y: backgroundY }}
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Geometric Patterns */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-32 h-32 border ${
                    isDark ? "border-purple-400/30" : "border-white/30"
                  } rounded-full`}
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    rotate: 360,
                  }}
                  transition={{
                    duration: Math.random() * 20 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
                duration: 1.2,
              }}
              className="mb-8"
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${
                    isDark ? "from-purple-400 to-pink-400" : "from-cyan-400 to-blue-500"
                  } opacity-75`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white/30 backdrop-blur-sm">
                  <Image
                    src="/placeholder.svg?height=144&width=144&text=Profile"
                    alt="Mumphry Caparas"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </div>
                <motion.div
                  className={`absolute -top-2 -right-2 w-8 h-8 ${
                    isDark ? "bg-pink-500" : "bg-yellow-400"
                  } rounded-full flex items-center justify-center`}
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Sparkles size={16} className={isDark ? "text-white" : "text-yellow-800"} />
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.3,
              }}
              className={`text-5xl md:text-8xl font-bold mb-4 bg-gradient-to-r ${
                isDark ? "from-white via-purple-200 to-pink-200" : "from-white via-cyan-200 to-blue-200"
              } bg-clip-text text-transparent`}
            >
              Hi, I'm{" "}
              <motion.span
                className={`inline-block bg-gradient-to-r ${
                  isDark ? "from-purple-300 to-pink-300" : "from-cyan-300 to-blue-300"
                } bg-clip-text text-transparent`}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                    "0 0 40px rgba(168, 85, 247, 0.8)",
                    "0 0 20px rgba(168, 85, 247, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Mumphry Caparas
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`text-2xl md:text-3xl mb-4 ${isDark ? "text-purple-100" : "text-blue-100"} font-light`}
            >
              a Computer Engineer
            </motion.p>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-2xl"
              >
                ☕
              </motion.span>
              <p className={`text-lg ${isDark ? "text-purple-200" : "text-blue-200"}`}>Powered by coffee & curiosity</p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className={isDark ? "text-pink-400" : "text-yellow-400"} size={20} />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                onClick={() => scrollToSection("#contact")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    isDark ? "from-purple-400 to-pink-500" : "from-cyan-400 to-blue-500"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={false}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Let's Connect
                </span>
              </motion.button>

              <motion.a
                href="https://drive.google.com/your-cv-link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                <Download
                  size={24}
                  className="relative z-10 group-hover:text-purple-600 transition-colors duration-300"
                />
                <span className="relative z-10 group-hover:text-purple-600 transition-colors duration-300">
                  Download CV
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-4 relative">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900"
                : "bg-gradient-to-b from-blue-50 via-white to-purple-50"
            }`}
          />
          <AnimatedBackground isDark={isDark} />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", damping: 20 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="order-2 md:order-1">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`text-5xl font-bold mb-8 bg-gradient-to-r ${
                    isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                  } bg-clip-text text-transparent`}
                >
                  About Me
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed mb-8`}
                >
                  Fresh Computer Engineering graduate passionate about clean code, creative problem-solving, and
                  user-centered design. Willing to learn, explore new technologies, and build digital experiences that
                  make a difference.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-4"
                >
                  {["Problem Solver", "Creative Thinker", "Team Player", "Tech Enthusiast"].map((trait, index) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`px-4 py-2 bg-gradient-to-r ${
                        isDark ? "from-purple-500 to-pink-500" : "from-cyan-500 to-blue-500"
                      } text-white rounded-full text-sm font-semibold cursor-pointer shadow-lg`}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, type: "spring", damping: 20, delay: 0.2 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="relative group">
                  <motion.div
                    className={`absolute -inset-4 bg-gradient-to-r ${
                      isDark ? "from-purple-400 to-pink-500" : "from-cyan-400 to-blue-500"
                    } rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 1, -1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                  <div
                    className={`relative w-96 h-96 mx-auto rounded-3xl overflow-hidden shadow-2xl border ${
                      isDark ? "border-purple-500/30" : "border-blue-200/50"
                    }`}
                  >
                    <Image
                      src="/placeholder.svg?height=384&width=384&text=About+Photo"
                      alt="About Mumphry"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-4 relative">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-900"
                : "bg-gradient-to-br from-purple-50 via-white to-cyan-50"
            }`}
          />
          <AnimatedBackground isDark={isDark} />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold text-center mb-20 bg-gradient-to-r ${
                isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
              } bg-clip-text text-transparent`}
            >
              Technical Skills
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={staggerItem}
                  whileHover={{
                    scale: 1.1,
                    y: -10,
                    rotateY: 10,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer relative"
                >
                  <div
                    className={`relative bg-gradient-to-br ${
                      isDark ? skill.darkColor : skill.color
                    } p-8 rounded-3xl shadow-2xl backdrop-blur-sm border ${
                      isDark ? "border-purple-500/20" : "border-white/20"
                    } hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                  >
                    <motion.div
                      className={`absolute inset-0 ${
                        isDark ? "bg-white/10" : "bg-white/20"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      initial={false}
                    />

                    {/* Interactive Icon Animation */}
                    <motion.div
                      className="text-5xl mb-4 relative z-10"
                      animate={getSkillHoverAnimation("default")}
                      whileHover={getSkillHoverAnimation(skill.hoverAnimation)}
                    >
                      {skill.icon}

                      {/* Special animations for specific skills */}
                      {skill.name === "Python" && (
                        <motion.div
                          className="absolute -top-2 -right-2 text-2xl opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0, rotate: -90 }}
                          whileHover={{
                            scale: 1,
                            rotate: 0,
                            x: [0, 10, -10, 5, -5, 0],
                            y: [0, -5, 5, -3, 3, 0],
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        >
                          🦷
                        </motion.div>
                      )}

                      {skill.name === "JavaScript" && (
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          animate={{
                            boxShadow: [
                              "0 0 0px rgba(255, 193, 7, 0)",
                              "0 0 20px rgba(255, 193, 7, 0.8)",
                              "0 0 0px rgba(255, 193, 7, 0)",
                            ],
                          }}
                          transition={{ duration: 0.5, repeat: 3 }}
                        />
                      )}

                      {skill.name === "Java" && (
                        <motion.div
                          className="absolute -top-1 -right-1 text-lg opacity-0 group-hover:opacity-100"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 15, -15, 0],
                          }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                        >
                          ☕
                        </motion.div>
                      )}
                    </motion.div>

                    <h3 className="font-bold text-white text-lg group-hover:text-yellow-200 transition-colors duration-300 relative z-10">
                      {skill.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Education & Experience Section */}
        <section id="education" className="py-32 px-4 relative">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
                : "bg-gradient-to-br from-white via-blue-50 to-purple-50"
            }`}
          />
          <AnimatedBackground isDark={isDark} />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Education Section */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r ${
                    isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                  } bg-clip-text text-transparent`}
                >
                  Education
                </motion.h2>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {educationData.slice(0, 2).map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      variants={staggerItem}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group"
                    >
                      <div
                        className={`relative ${themeClasses.card} backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${
                            isDark ? "from-purple-500/10 to-pink-500/10" : "from-blue-500/10 to-cyan-500/10"
                          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          initial={false}
                        />
                        <div className="relative z-10 flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className={`p-2 bg-gradient-to-r ${
                                isDark ? "from-purple-500 to-pink-500" : "from-cyan-500 to-blue-500"
                              } rounded-full mb-3`}
                            >
                              <GraduationCap className="text-white" size={20} />
                            </motion.div>
                            <div
                              className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                                isDark ? "border-purple-500 bg-purple-900" : "border-blue-500 bg-blue-100"
                              }`}
                            >
                              <Image
                                src={edu.logo || "/placeholder.svg"}
                                alt={`${edu.institution} logo`}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-lg font-bold ${
                                isDark
                                  ? "text-white group-hover:text-purple-200"
                                  : "text-gray-900 group-hover:text-blue-600"
                              } transition-colors duration-300 mb-1 line-clamp-2`}
                            >
                              {edu.degree}
                            </h3>
                            <p className={`${isDark ? "text-purple-300" : "text-blue-600"} font-semibold mb-2 text-sm`}>
                              {edu.institution}
                            </p>
                            <div
                              className={`flex items-center gap-3 mb-2 ${isDark ? "text-gray-400" : "text-gray-600"} text-xs`}
                            >
                              <div className="flex items-center gap-1">
                                <Calendar size={12} />
                                <span>{edu.period}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin size={12} />
                                <span>{edu.location}</span>
                              </div>
                            </div>
                            <div
                              className={`bg-gradient-to-r ${
                                isDark
                                  ? "from-purple-500 to-pink-500 border-purple-400"
                                  : "from-cyan-500 to-blue-500 border-blue-400"
                              } text-white px-3 py-1 rounded-full text-xs font-semibold inline-block border`}
                            >
                              {edu.achievements}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center mt-8"
                >
                  <motion.button
                    onClick={() => setShowEducationModal(true)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 bg-gradient-to-r ${
                      isDark
                        ? "from-purple-500 to-pink-500 border-purple-400"
                        : "from-cyan-500 to-blue-500 border-blue-400"
                    } text-white rounded-full font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 border`}
                  >
                    View All Education
                  </motion.button>
                </motion.div>
              </div>

              {/* Experience Section */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r ${
                    isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                  } bg-clip-text text-transparent`}
                >
                  Experience
                </motion.h2>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {experienceData.slice(0, 1).map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      variants={staggerItem}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="group"
                    >
                      <div
                        className={`relative ${themeClasses.card} backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${
                            isDark ? "from-purple-500/10 to-pink-500/10" : "from-blue-500/10 to-cyan-500/10"
                          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          initial={false}
                        />
                        <div className="relative z-10">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className={`p-2 bg-gradient-to-r ${
                                  isDark ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"
                                } rounded-full mb-3`}
                              >
                                <Building className="text-white" size={20} />
                              </motion.div>
                              <div
                                className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                                  isDark ? "border-purple-500 bg-purple-900" : "border-blue-500 bg-blue-100"
                                }`}
                              >
                                <Image
                                  src={exp.logo || "/placeholder.svg"}
                                  alt={`${exp.company} logo`}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3
                                    className={`text-lg font-bold ${
                                      isDark
                                        ? "text-white group-hover:text-purple-200"
                                        : "text-gray-900 group-hover:text-blue-600"
                                    } transition-colors duration-300 mb-1 line-clamp-2`}
                                  >
                                    {exp.title}
                                  </h3>
                                  <p
                                    className={`${isDark ? "text-purple-300" : "text-blue-600"} font-semibold mb-2 text-sm`}
                                  >
                                    {exp.company}
                                  </p>
                                  <div
                                    className={`flex flex-wrap items-center gap-3 ${
                                      isDark ? "text-gray-400" : "text-gray-600"
                                    } text-xs mb-2`}
                                  >
                                    <div className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      <span>{exp.period}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin size={12} />
                                      <span>{exp.location}</span>
                                    </div>
                                  </div>
                                </div>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className={`${
                                    isDark
                                      ? "bg-purple-800 text-purple-200 border-purple-600"
                                      : "bg-blue-100 text-blue-700 border-blue-300"
                                  } px-3 py-1 rounded-full text-xs font-bold border mt-2 sm:mt-0`}
                                >
                                  {exp.type}
                                </motion.span>
                              </div>
                            </div>
                          </div>
                          <p className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm mb-3`}>
                            {exp.description}
                          </p>
                          <div>
                            <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"} mb-2 text-sm`}>
                              Key Responsibilities:
                            </h4>
                            <ul className="space-y-1">
                              {exp.responsibilities.slice(0, 3).map((responsibility, idx) => (
                                <li
                                  key={idx}
                                  className={`flex items-start ${isDark ? "text-gray-300" : "text-gray-700"} text-xs`}
                                >
                                  <span
                                    className={`w-1.5 h-1.5 ${
                                      isDark ? "bg-purple-400" : "bg-blue-500"
                                    } rounded-full mr-2 mt-1.5 flex-shrink-0`}
                                  ></span>
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center mt-8"
                >
                  <motion.button
                    onClick={() => setShowExperienceModal(true)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 bg-gradient-to-r ${
                      isDark
                        ? "from-purple-500 to-pink-500 border-purple-400"
                        : "from-blue-500 to-purple-500 border-blue-400"
                    } text-white rounded-full font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 border`}
                  >
                    View All Experience
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4 relative overflow-hidden">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-black via-purple-900 to-slate-900"
                : "bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
            }`}
          />
          <FloatingParticles isDark={isDark} />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-20 text-center bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
            >
              Featured Projects
            </motion.h2>

            {/* Continuous Moving Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-8"
                  animate={{
                    x: [0, -100 * projects.length],
                  }}
                  transition={{
                    x: {
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      duration: projects.length * 3,
                      ease: "linear",
                    },
                  }}
                  style={{
                    width: `${projects.length * 2 * 400}px`,
                  }}
                >
                  {/* Duplicate projects for seamless loop */}
                  {[...projects, ...projects].map((project, index) => (
                    <motion.div
                      key={`${project.id}-${index}`}
                      className="flex-shrink-0 w-80 cursor-pointer group"
                      onClick={() => openProjectDetails(project)}
                      whileHover={{ scale: 1.05, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                        {/* Project Image */}
                        <div className="aspect-video relative">
                          <Image
                            src={project.images[0] || "/placeholder.svg"}
                            alt={project.title}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Title on Hover */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-end justify-center p-6"
                          >
                            <motion.h3
                              className="text-white text-2xl font-bold text-center drop-shadow-lg"
                              initial={{ scale: 0.9 }}
                              whileHover={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {project.title}
                            </motion.h3>
                          </motion.div>

                          {/* Subtle overlay for better hover effect */}
                          <motion.div
                            className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <motion.button
                onClick={() => setShowProjectsModal(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-400"
              >
                View All Projects
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-32 px-4 relative">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
                : "bg-gradient-to-br from-white via-purple-50 to-blue-50"
            }`}
          />
          <AnimatedBackground isDark={isDark} />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`text-5xl font-bold text-center mb-20 bg-gradient-to-r ${
                isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
              } bg-clip-text text-transparent`}
            >
              Achievements
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {achievements.slice(0, 6).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer group"
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <div
                    className={`relative ${themeClasses.card} backdrop-blur-sm p-6 rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        isDark ? "from-purple-500/10 to-pink-500/10" : "from-blue-500/10 to-cyan-500/10"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      initial={false}
                    />
                    <div className="relative z-10">
                      <div
                        className={`aspect-video mb-4 rounded-2xl overflow-hidden bg-gradient-to-br ${
                          isDark ? "from-purple-800 to-pink-800" : "from-blue-100 to-cyan-100"
                        } flex items-center justify-center`}
                      >
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                          className="text-6xl"
                        >
                          {achievement.category === "online" ? "🏆" : "📜"}
                        </motion.div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            achievement.category === "online"
                              ? isDark
                                ? "bg-purple-800 text-purple-200 border-purple-600"
                                : "bg-blue-100 text-blue-700 border-blue-300"
                              : isDark
                                ? "bg-pink-800 text-pink-200 border-pink-600"
                                : "bg-purple-100 text-purple-700 border-purple-300"
                          }`}
                        >
                          {achievement.category === "online" ? "Online Course" : "Seminar"}
                        </span>
                        <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                          {achievement.date}
                        </span>
                      </div>
                      <h4
                        className={`font-bold ${
                          isDark
                            ? "text-white mb-2 group-hover:text-purple-200"
                            : "text-gray-900 mb-2 group-hover:text-blue-600"
                        } transition-colors duration-300`}
                      >
                        {achievement.title}
                      </h4>
                      <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm mb-2`}>
                        {achievement.description}
                      </p>
                      <p className={`${isDark ? "text-purple-300" : "text-blue-600"} text-sm font-semibold`}>
                        {achievement.issuer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                onClick={() => setShowAchievementsModal(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 bg-gradient-to-r ${
                  isDark ? "from-purple-500 to-pink-500 border-purple-400" : "from-cyan-500 to-blue-500 border-blue-400"
                } text-white rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 border`}
              >
                View All Achievements
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 relative">
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-black via-purple-900 to-slate-900"
                : "bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
            }`}
          />
          <FloatingParticles isDark={isDark} />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-20 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent"
            >
              Let's Connect
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.a
                variants={staggerItem}
                href="mailto:mumphry@example.com"
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-4"
                >
                  <Mail size={32} className="text-white" />
                </motion.div>
                <span className="font-bold text-lg mb-2 text-white">Email</span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  mumphry@example.com
                </span>
              </motion.a>

              <motion.a
                variants={staggerItem}
                href="tel:+1234567890"
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4"
                >
                  <Phone size={32} className="text-white" />
                </motion.div>
                <span className="font-bold text-lg mb-2 text-white">Phone</span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  +123 456 7890
                </span>
              </motion.a>

              <motion.a
                variants={staggerItem}
                href="https://linkedin.com/in/mumphry"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4"
                >
                  <Linkedin size={32} className="text-white" />
                </motion.div>
                <span className="font-bold text-lg mb-2 text-white">LinkedIn</span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  @mumphry
                </span>
              </motion.a>

              <motion.a
                variants={staggerItem}
                href="https://github.com/mumphry"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-gradient-to-r from-gray-600 to-black rounded-full mb-4"
                >
                  <Github size={32} className="text-white" />
                </motion.div>
                <span className="font-bold text-lg mb-2 text-white">GitHub</span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  @mumphry
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r ${
                isDark ? "from-purple-500 to-pink-500 border-purple-400" : "from-cyan-500 to-blue-500 border-blue-400"
              } text-white rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 z-50 group border`}
            >
              <ChevronUp size={24} className="group-hover:animate-bounce" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* All Modals remain the same but with updated theme classes */}
        {/* Education Modal */}
        <AnimatePresence>
          {showEducationModal && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowEducationModal(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${themeClasses.modal} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`sticky top-0 ${themeClasses.modal}/95 backdrop-blur-sm p-6 border-b ${
                    isDark ? "border-purple-500/30" : "border-blue-200/50"
                  } rounded-t-3xl z-10`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-3xl font-bold bg-gradient-to-r ${
                        isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                      } bg-clip-text text-transparent`}
                    >
                      Educational Journey
                    </h3>
                    <motion.button
                      onClick={() => setShowEducationModal(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 hover:${
                        isDark ? "bg-purple-800" : "bg-blue-100"
                      } rounded-full transition-colors duration-200 ${themeClasses.text}`}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-gradient-to-br ${
                        isDark
                          ? "from-purple-800/50 to-pink-800/50 border-purple-500/30"
                          : "from-blue-50 to-cyan-50 border-blue-200/50"
                      } p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`p-3 bg-gradient-to-r ${
                              isDark ? "from-purple-500 to-pink-500" : "from-cyan-500 to-blue-500"
                            } rounded-full mt-1 mb-4`}
                          >
                            <GraduationCap className="text-white" size={24} />
                          </motion.div>
                          <div
                            className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                              isDark ? "border-purple-500 bg-purple-900" : "border-blue-500 bg-blue-100"
                            }`}
                          >
                            <Image
                              src={edu.logo || "/placeholder.svg"}
                              alt={`${edu.institution} logo`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>{edu.degree}</h4>
                          <p className={`${isDark ? "text-purple-300" : "text-blue-600"} font-semibold mb-2`}>
                            {edu.institution}
                          </p>
                          <div
                            className={`flex flex-wrap items-center gap-4 ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            } mb-3`}
                          >
                            <div className="flex items-center gap-2">
                              <Calendar size={16} />
                              <span>{edu.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} />
                              <span>{edu.location}</span>
                            </div>
                            {edu.gpa && (
                              <div className="flex items-center gap-2">
                                <Star size={16} />
                                <span>GWA: {edu.gpa}</span>
                              </div>
                            )}
                          </div>
                          <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>{edu.description}</p>
                          <div
                            className={`bg-gradient-to-r ${
                              isDark
                                ? "from-purple-500 to-pink-500 border-purple-400"
                                : "from-cyan-500 to-blue-500 border-blue-400"
                            } text-white px-4 py-2 rounded-full text-sm font-semibold inline-block border`}
                          >
                            {edu.achievements}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Experience Modal */}
        <AnimatePresence>
          {showExperienceModal && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowExperienceModal(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${themeClasses.modal} rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`sticky top-0 ${themeClasses.modal}/95 backdrop-blur-sm p-6 border-b ${
                    isDark ? "border-purple-500/30" : "border-blue-200/50"
                  } rounded-t-3xl z-10`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-3xl font-bold bg-gradient-to-r ${
                        isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                      } bg-clip-text text-transparent`}
                    >
                      Professional Experience
                    </h3>
                    <motion.button
                      onClick={() => setShowExperienceModal(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 hover:${
                        isDark ? "bg-purple-800" : "bg-blue-100"
                      } rounded-full transition-colors duration-200 ${themeClasses.text}`}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {experienceData.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`bg-gradient-to-br ${
                        isDark
                          ? "from-purple-800/50 to-pink-800/50 border-purple-500/30"
                          : "from-blue-50 to-cyan-50 border-blue-200/50"
                      } p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`p-3 bg-gradient-to-r ${
                              isDark ? "from-purple-500 to-pink-500" : "from-blue-500 to-purple-500"
                            } rounded-full mt-1 mb-4`}
                          >
                            <Briefcase className="text-white" size={24} />
                          </motion.div>
                          <div
                            className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                              isDark ? "border-purple-500 bg-purple-900" : "border-blue-500 bg-blue-100"
                            }`}
                          >
                            <Image
                              src={exp.logo || "/placeholder.svg"}
                              alt={`${exp.company} logo`}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                            <div>
                              <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>{exp.title}</h4>
                              <p className={`${isDark ? "text-purple-300" : "text-blue-600"} font-semibold mb-2`}>
                                {exp.company}
                              </p>
                              <div
                                className={`flex flex-wrap items-center gap-4 ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                } mb-3`}
                              >
                                <div className="flex items-center gap-1">
                                  <Calendar size={16} />
                                  <span>{exp.period}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin size={16} />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                            </div>
                            <span
                              className={`${
                                isDark
                                  ? "bg-purple-800 text-purple-200 border-purple-600"
                                  : "bg-blue-100 text-blue-700 border-blue-300"
                              } px-4 py-2 rounded-full text-sm font-bold mt-2 md:mt-0 border`}
                            >
                              {exp.type}
                            </span>
                          </div>
                          <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>{exp.description}</p>
                          <div>
                            <h5 className={`font-semibold ${themeClasses.text} mb-2`}>Key Responsibilities:</h5>
                            <ul className="space-y-1">
                              {exp.responsibilities.map((responsibility, idx) => (
                                <li
                                  key={idx}
                                  className={`flex items-start ${isDark ? "text-gray-300" : "text-gray-700"}`}
                                >
                                  <span
                                    className={`w-2 h-2 ${
                                      isDark ? "bg-purple-400" : "bg-blue-500"
                                    } rounded-full mr-3 mt-2 flex-shrink-0`}
                                  ></span>
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Modal */}
        <AnimatePresence>
          {showProjectsModal && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowProjectsModal(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${themeClasses.modal} rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`sticky top-0 ${themeClasses.modal}/95 backdrop-blur-sm p-6 border-b ${
                    isDark ? "border-purple-500/30" : "border-blue-200/50"
                  } rounded-t-3xl z-10`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-3xl font-bold bg-gradient-to-r ${
                        isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                      } bg-clip-text text-transparent`}
                    >
                      All Projects
                    </h3>
                    <motion.button
                      onClick={() => setShowProjectsModal(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 hover:${
                        isDark ? "bg-purple-800" : "bg-blue-100"
                      } rounded-full transition-colors duration-200 ${themeClasses.text}`}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer group"
                        onClick={() => openProjectDetails(project)}
                      >
                        <div
                          className={`bg-gradient-to-br ${
                            isDark
                              ? "from-purple-800/50 to-pink-800/50 border-purple-500/30"
                              : "from-blue-50 to-cyan-50 border-blue-200/50"
                          } p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden`}
                        >
                          <div className="aspect-video mb-4 rounded-xl overflow-hidden">
                            <Image
                              src={project.images[0] || "/placeholder.svg"}
                              alt={project.title}
                              width={400}
                              height={225}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`${isDark ? "text-purple-300" : "text-blue-600"} text-sm font-semibold`}>
                              {project.category}
                            </span>
                            <span className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                              {project.year}
                            </span>
                          </div>
                          <h4
                            className={`text-xl font-bold ${
                              isDark
                                ? "text-white mb-3 group-hover:text-purple-200"
                                : "text-gray-900 mb-3 group-hover:text-blue-600"
                            } transition-colors duration-300`}
                          >
                            {project.title}
                          </h4>
                          <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4 line-clamp-2`}>
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className={`bg-gradient-to-r ${
                                  isDark
                                    ? "from-purple-500 to-pink-500 border-purple-400"
                                    : "from-cyan-500 to-blue-500 border-blue-400"
                                } text-white px-3 py-1 rounded-full text-sm font-semibold border`}
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                                +{project.techStack.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${themeClasses.modal} rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`sticky top-0 ${themeClasses.modal}/95 backdrop-blur-sm p-6 border-b ${
                    isDark ? "border-purple-500/30" : "border-blue-200/50"
                  } rounded-t-3xl z-10`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>{selectedProject.title}</h3>
                      <div className="flex items-center gap-4">
                        <span className={`${isDark ? "text-purple-300" : "text-blue-600"} font-semibold`}>
                          {selectedProject.category}
                        </span>
                        <span className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>{selectedProject.year}</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setSelectedProject(null)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 hover:${
                        isDark ? "bg-purple-800" : "bg-blue-100"
                      } rounded-full transition-colors duration-200 ${themeClasses.text}`}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="relative mb-8">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <Image
                        src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {selectedProject.images.length > 1 && (
                      <>
                        <motion.button
                          onClick={prevImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
                        >
                          <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                          onClick={nextImage}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
                        >
                          <ChevronRight size={24} />
                        </motion.button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {selectedProject.images.map((_, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                                index === currentImageIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>Project Overview</h4>
                      <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>
                        {selectedProject.fullDescription}
                      </p>

                      <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3`}>Tech Stack</h5>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`bg-gradient-to-r ${
                              isDark
                                ? "from-purple-500 to-pink-500 border-purple-400"
                                : "from-cyan-500 to-blue-500 border-blue-400"
                            } text-white px-3 py-1 rounded-full text-sm font-semibold border`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Key Features</h5>
                      <ul className="space-y-2 mb-6">
                        {selectedProject.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex items-start ${isDark ? "text-gray-300" : "text-gray-600"}`}
                          >
                            <span
                              className={`w-2 h-2 ${
                                isDark ? "bg-purple-400" : "bg-blue-500"
                              } rounded-full mr-3 mt-2 flex-shrink-0`}
                            ></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`flex gap-4 pt-6 border-t ${isDark ? "border-purple-500/30" : "border-blue-200/50"}`}>
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 px-6 py-3 ${
                        isDark
                          ? "bg-purple-800 hover:bg-purple-700 border-purple-600"
                          : "bg-gray-800 hover:bg-gray-700 border-gray-600"
                      } text-white rounded-full font-semibold transition-colors duration-300 border`}
                    >
                      <Github size={20} />
                      View Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievements Modal */}
        <AnimatePresence>
          {showAchievementsModal && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAchievementsModal(false)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${themeClasses.modal} rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`sticky top-0 ${themeClasses.modal}/95 backdrop-blur-sm p-6 border-b ${
                    isDark ? "border-purple-500/30" : "border-blue-200/50"
                  } rounded-t-3xl z-10`}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-3xl font-bold bg-gradient-to-r ${
                        isDark ? "from-white to-purple-300" : "from-gray-800 to-blue-600"
                      } bg-clip-text text-transparent`}
                    >
                      All Achievements
                    </h3>
                    <motion.button
                      onClick={() => setShowAchievementsModal(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 hover:${
                        isDark ? "bg-purple-800" : "bg-blue-100"
                      } rounded-full transition-colors duration-200 ${themeClasses.text}`}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 space-y-12">
                  {/* Online Courses */}
                  <div>
                    <h4 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="text-3xl"
                      >
                        🏆
                      </motion.div>
                      Online Courses
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {achievements
                        .filter((a) => a.category === "online")
                        .map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer group"
                            onClick={() => setSelectedAchievement(achievement)}
                          >
                            <div
                              className={`bg-gradient-to-br ${
                                isDark
                                  ? "from-purple-800/50 to-pink-800/50 border-purple-500/30"
                                  : "from-blue-50 to-cyan-50 border-blue-200/50"
                              } p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}
                            >
                              <div
                                className={`aspect-video mb-4 rounded-xl overflow-hidden bg-gradient-to-br ${
                                  isDark ? "from-purple-700 to-pink-700" : "from-blue-100 to-cyan-100"
                                } flex items-center justify-center`}
                              >
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                                  className="text-5xl"
                                >
                                  🏆
                                </motion.div>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    isDark
                                      ? "bg-purple-800 text-purple-200 border-purple-600"
                                      : "bg-blue-100 text-blue-700 border-blue-300"
                                  }`}
                                >
                                  Online Course
                                </span>
                                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                  {achievement.date}
                                </span>
                              </div>
                              <h5
                                className={`font-bold ${
                                  isDark
                                    ? "text-white mb-2 group-hover:text-purple-200"
                                    : "text-gray-900 mb-2 group-hover:text-blue-600"
                                } transition-colors duration-300`}
                              >
                                {achievement.title}
                              </h5>
                              <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm mb-2`}>
                                {achievement.description}
                              </p>
                              <p className={`${isDark ? "text-purple-300" : "text-blue-600"} text-sm font-semibold`}>
                                {achievement.issuer}
                              </p>
                              {achievement.credentialId && (
                                <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs mt-1`}>
                                  ID: {achievement.credentialId}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>

                  {/* Seminars and Training */}
                  <div>
                    <h4 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="text-3xl"
                      >
                        📜
                      </motion.div>
                      Seminars and Training
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {achievements
                        .filter((a) => a.category === "seminar")
                        .map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer group"
                            onClick={() => setSelectedAchievement(achievement)}
                          >
                            <div
                              className={`bg-gradient-to-br ${
                                isDark
                                  ? "from-indigo-800/50 to-purple-800/50 border-indigo-500/30"
                                  : "from-purple-50 to-indigo-50 border-purple-200/50"
                              } p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300`}
                            >
                              <div
                                className={`aspect-video mb-4 rounded-xl overflow-hidden bg-gradient-to-br ${
                                  isDark ? "from-indigo-700 to-purple-700" : "from-purple-100 to-indigo-100"
                                } flex items-center justify-center`}
                              >
                                <motion.div
                                  animate={{ rotate: [0, 5, -5, 0] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                                  className="text-5xl"
                                >
                                  📜
                                </motion.div>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                    isDark
                                      ? "bg-indigo-800 text-indigo-200 border-indigo-600"
                                      : "bg-purple-100 text-purple-700 border-purple-300"
                                  }`}
                                >
                                  Seminar & Training
                                </span>
                                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                                  {achievement.date}
                                </span>
                              </div>
                              <h5
                                className={`font-bold ${
                                  isDark
                                    ? "text-white mb-2 group-hover:text-indigo-200"
                                    : "text-gray-900 mb-2 group-hover:text-purple-600"
                                } transition-colors duration-300`}
                              >
                                {achievement.title}
                              </h5>
                              <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm mb-2`}>
                                {achievement.description}
                              </p>
                              <p className={`${isDark ? "text-indigo-300" : "text-purple-600"} text-sm font-semibold`}>
                                {achievement.issuer}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Details Modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`${themeClasses.modal} rounded-3xl max-w-3xl w-full shadow-2xl border ${
                  isDark ? "border-purple-500/30" : "border-blue-200/50"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>{selectedAchievement.title}</h3>
                      <p className={`${isDark ? "text-purple-300" : "text-blue-600"} font-semibold`}>
                        {selectedAchievement.issuer}
                      </p>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>{selectedAchievement.date}</p>
                    </div>
                    <motion.button
                      onClick={() => setSelectedAchievement(null)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-2 hover:${
                        isDark ? "bg-purple-800" : "bg-blue-100"
                      } rounded-full transition-colors duration-200 ${themeClasses.text}`}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>

                  <div className="aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <Image
                      src={selectedAchievement.image || "/placeholder.svg"}
                      alt={selectedAchievement.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>
                    {selectedAchievement.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold border ${
                        selectedAchievement.category === "online"
                          ? isDark
                            ? "bg-purple-800 text-purple-200 border-purple-600"
                            : "bg-blue-100 text-blue-700 border-blue-300"
                          : isDark
                            ? "bg-indigo-800 text-indigo-200 border-indigo-600"
                            : "bg-purple-100 text-purple-700 border-purple-300"
                      }`}
                    >
                      {selectedAchievement.category === "online" ? "Online Course" : "Seminar & Training"}
                    </span>
                    {selectedAchievement.credentialId && (
                      <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Credential ID: {selectedAchievement.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  )
}
