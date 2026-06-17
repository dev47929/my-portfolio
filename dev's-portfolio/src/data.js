export const PORTFOLIO_BIO = {
  name: "Dev",
  fullName: "Dev Sharma",
  title: "Backend Developer",
  subTitle: "Computer Science & Engineering Student at LNCT Bhopal | Backend-focused developer specializing in Java, Spring Boot & PostgreSQL",
  location: "Bhopal, Madhya Pradesh, India",
  email: "dev47929@gmail.com",
  phone: "7000247420",
  github: "https://github.com/devsharma",
  linkedin: "https://linkedin.com/in/devsharma",
  leetcode: "https://leetcode.com/dev47929",
  aboutFull: "I am a Backend-focused software developer and B.Tech Computer Science & Engineering student at LNCT Bhopal (CGPA: 8.81, Latest SGPA: 9.0). I build RESTful APIs, microservices, and full-stack applications using Java, Spring Boot, and PostgreSQL, with experience in JWT-based authentication, Spring Security, and LLM API integration.",
  philosophy: "Clean architecture, thoughtful API design, and hands-on hackathon experience are the foundation of building reliable, scalable backend systems.",
};

export const CORE_STATS = [
  { value: "8.81", label: "Cumulative CGPA" },
  { value: "9.0",  label: "Latest SGPA" },
  { value: "5+",   label: "Hackathons & Events Led" },
];

export const EDUCATION_DATA = {
  title: "Bachelor of Technology in Computer Science and Engineering (B.Tech CSE)",
  period: "2024 – 2028",
  gpa: "8.81 CGPA | 9.0 SGPA (Latest Semester)",
  institution: "LNCT Bhopal",
};

export const BENTO_PROFILE = {
  column1: "Backend-focused developer specializing in Java, Spring Boot & PostgreSQL",
  column2: "Strong academics: 8.81 CGPA with a 9.0 SGPA in the latest semester at LNCT Bhopal",
  column3: "Building production-grade RESTful APIs, microservices, and full-stack applications",
  column4: {
    title: "Core Skills",
    text: "Java · Spring Boot · Spring Security · PostgreSQL · JWT · React.js · DSA · System Design",
  },
};

export const PROJECTS_DATA = [
  {
    id: "ai-job-tracker",
    title: "AI-Powered Job Tracker",
    subtitle: "Full-Stack Job Management Platform",
    type: "engineering",
    date: "2026",
    tags: ["Spring Boot", "React.js", "PostgreSQL", "JWT", "RestClient", "WebClient"],
    description: "Full-stack job tracking platform with AI-powered resume analysis and bulk job entry.",
    role: "Full-Stack Developer",
    longDescription:
      "A full-stack job tracking platform featuring secure JWT-based authentication, role-based authorization, and AI-assisted workflows. Allows users to manage job applications end-to-end with AI-powered resume analysis and bulk data entry powered by Groq LLMs.",
    features: [
      "REST APIs for creating, updating, deleting, and filtering job applications with status tracking",
      "AI-assisted bulk job entry that transforms raw copy-pasted job data into structured records",
      "AI-powered Resume–Job Match Analyzer using Groq LLMs — generates match scores, skill-gap analysis, and personalized recommendations",
      "Multiple AI provider integrations using RestClient and WebClient for API communication",
    ],
    metrics: [
      { label: "Auth", value: "JWT + BCrypt" },
      { label: "AI Provider", value: "Groq LLMs" },
      { label: "Stack", value: "Spring Boot + React" },
    ],
  },
  {
    id: "feature-flag-service",
    title: "Feature Flag Service",
    subtitle: "Self-Hosted Feature Management Backend",
    type: "engineering",
    date: "2026",
    tags: ["Spring Boot", "Spring Security", "JPA", "JWT", "PostgreSQL", "H2"],
    description: "Self-hosted feature flag service with cascading evaluation logic and percentage-based rollouts.",
    role: "Backend Developer",
    longDescription:
      "A production-ready, self-hosted feature flag service built with Spring Boot. Features a cascading Flag Evaluation Engine, percentage-based rollouts via userId hashing, per-user overrides, and environment-scoped flag management — all secured with JWT authentication.",
    features: [
      "Flag Evaluation Engine with cascading decision logic: user override → flag disabled → rollout % → flag enabled",
      "Percentage-based rollouts via userId hashing with per-user overrides for fine-grained exposure control",
      "JWT-based authentication and registration with BCrypt password hashing and stateless session management",
      "Environment-scoped flag schema (dev/staging/prod) with RESTful CRUD APIs secured via Spring Security",
    ],
    metrics: [
      { label: "Environments", value: "dev / staging / prod" },
      { label: "Auth", value: "JWT Stateless" },
      { label: "DB Support", value: "PostgreSQL + H2" },
    ],
  },
  {
    id: "interview-circle",
    title: "InterviewCircle",
    subtitle: "AI-Powered Interview Prep Platform",
    type: "interactive",
    date: "2026",
    tags: ["React.js", "Monaco Editor", "Speech-to-Text", "AI", "ATS"],
    description: "AI-powered interview prep platform built at Tech Sageathon — Top 4 out of 200+ teams.",
    role: "Frontend Lead (React.js)",
    longDescription:
      "Built at Tech Sageathon hosted by SIRT Bhopal. InterviewCircle is an AI-powered interview preparation platform featuring a live coding environment, real-time AI guidance, speech-to-text mock interviews, and an ATS-based resume analyzer. Achieved Top 4 out of 200+ competing teams.",
    features: [
      "Monaco Editor integration for live coding with real-time AI-driven guidance",
      "Speech-to-text engine for mock interview simulations",
      "ATS-based resume analyser for interview readiness scoring",
      "Led the React.js frontend end-to-end within a hackathon timeline",
    ],
    metrics: [
      { label: "Hackathon Rank", value: "Top 4 / 200+" },
      { label: "Event", value: "Tech Sageathon, SIRT Bhopal" },
      { label: "Year", value: "2026" },
    ],
  },
];

export const EXPERIENCE_CARDS = [
  {
    role: "Backend Engineer",
    desc: "Built RESTful APIs, microservices, and full-stack applications using Java, Spring Boot, and PostgreSQL. Experienced in JWT authentication, Spring Security, and LLM API integration.",
    accent: "gold",
  },
  {
    role: "Hackathon Competitor",
    desc: "Active hackathon participant with multiple top finishes — Top 4 at Tech Sageathon (200+ teams), Top 20 at BGI Hackathon (600+ teams), and Top 16 at a national startup competition (100+ teams).",
    accent: "purple",
  },
  {
    role: "Team Lead",
    desc: "Served as Team Lead across 5+ major technical events and hackathons, overseeing development, ideation, and final presentations.",
    accent: "cyan",
  },
  {
    role: "CS Student & Problem Solver",
    desc: "B.Tech CSE at LNCT Bhopal (CGPA: 8.81). Strong foundations in Data Structures & Algorithms, OOP, and System Design, with active LeetCode practice.",
    accent: "rose",
  },
];

export const TIMELINE_JOURNEY = [
  {
    year: "2026",
    title: "Tech Sageathon — Top 4 / 200+ Teams",
    desc: "Built InterviewCircle at Tech Sageathon (SIRT Bhopal) — an AI-powered interview prep platform with live coding, speech-to-text mock interviews, and ATS resume analysis. Placed Top 4 among 200+ teams.",
  },
  {
    year: "2026",
    title: "Feature Flag Service & AI Job Tracker",
    desc: "Developed two portfolio-grade backend projects: a self-hosted Feature Flag Service with cascading evaluation and JWT auth, and an AI-Powered Job Tracker with Groq LLM integration and resume-job match analysis.",
  },
  {
    year: "2025",
    title: "BGI Hackathon — Top 20 / 600+ Teams",
    desc: "Led a development team to place Top 20 out of 600+ teams at the BGI Hackathon, Bhopal — building and pitching a full-stack product within 24 hours.",
  },
  {
    year: "2025",
    title: "National Startup Competition — Top 16 Grand Finalists",
    desc: "Led a startup pitching team to become Top 16 Grand Finalists out of 100+ teams in a national-level startup competition.",
  },
  {
    year: "2024",
    title: "Started B.Tech CSE at LNCT Bhopal",
    desc: "Began Bachelor of Technology in Computer Science & Engineering at LNCT Bhopal. Achieving 8.81 CGPA with a 9.0 SGPA in the latest semester while building backend projects and competing in hackathons.",
  },
];