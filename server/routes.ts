import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertEnrollmentSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Courses
  app.get(api.courses.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const courses = await storage.getCourses(search, category);
    res.json(courses);
  });

  app.get(api.courses.get.path, async (req, res) => {
    const course = await storage.getCourse(Number(req.params.id));
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  });

  // Instructors
  app.get(api.instructors.list.path, async (req, res) => {
    const instructors = await storage.getInstructors();
    res.json(instructors);
  });

  // Enroll
  app.post(api.enroll.create.path, async (req, res) => {
    try {
      const input = insertEnrollmentSchema.parse(req.body);
      await storage.createEnrollment(input);
      res.status(201).json({ success: true, message: 'Enrolled successfully' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = insertContactMessageSchema.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const instructors = await storage.getInstructors();
  if (instructors.length < 25) {
    // ── Instructors ──────────────────────────────────────────────────────────
    const inst1 = await storage.createInstructor({
      name: "Dr. Angela Yu",
      title: "Full-Stack Developer & Lead Instructor",
      bio: "Angela is a developer and teacher passionate about teaching others to code. She has trained thousands of students worldwide through her engaging, project-based courses.",
      expertise: ["Web Development", "Python", "iOS", "Flutter"],
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst2 = await storage.createInstructor({
      name: "Andrew Ng",
      title: "AI Pioneer & Co-founder of Coursera",
      bio: "Andrew Ng is a globally recognised AI researcher and educator. He co-founded Coursera, led AI teams at Google and Baidu, and now runs deeplearning.ai.",
      expertise: ["Machine Learning", "AI", "Deep Learning", "Neural Networks"],
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst3 = await storage.createInstructor({
      name: "Jonas Schmedtmann",
      title: "JavaScript & CSS Expert",
      bio: "Jonas is a passionate JavaScript developer and teacher with over 10 years of experience. His courses are renowned for clarity, depth, and real-world relevance.",
      expertise: ["JavaScript", "CSS", "Node.js", "Web Design"],
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst4 = await storage.createInstructor({
      name: "Colt Steele",
      title: "Software Engineer & Bootcamp Instructor",
      bio: "Colt is a developer and bootcamp instructor who has helped over a million students learn to code. Known for his clear explanations and practical examples.",
      expertise: ["Web Development", "Python", "SQL", "Data Structures"],
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst5 = await storage.createInstructor({
      name: "Dr. Sarah Chen",
      title: "Data Scientist & ML Engineer",
      bio: "Sarah holds a PhD in Statistics from MIT and has worked at top tech companies. She translates complex data concepts into actionable, practical knowledge.",
      expertise: ["Data Science", "Python", "Statistics", "Data Visualization"],
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst6 = await storage.createInstructor({
      name: "Brad Traversy",
      title: "Full-Stack Developer & Educator",
      bio: "Brad is a popular web developer and content creator with over 1 million YouTube subscribers. He specializes in practical, hands-on tutorials for modern web technologies.",
      expertise: ["JavaScript", "React", "Node.js", "MongoDB"],
      imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst7 = await storage.createInstructor({
      name: "Dr. Emily Watson",
      title: "Cybersecurity Researcher & CISO",
      bio: "Emily is a former NSA analyst and cybersecurity expert with 15 years of experience. She helps professionals master ethical hacking and security best practices.",
      expertise: ["Cybersecurity", "Ethical Hacking", "Network Security", "Penetration Testing"],
      imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst8 = await storage.createInstructor({
      name: "Marcus Johnson",
      title: "UX Designer & Product Strategist",
      bio: "Marcus is a senior UX designer who has worked with Fortune 500 companies including Apple and Google. He brings real-world design thinking to every lesson.",
      expertise: ["UI/UX Design", "Figma", "Product Design", "User Research"],
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst9 = await storage.createInstructor({
      name: "Priya Patel",
      title: "Cloud Architect & DevOps Lead",
      bio: "Priya is a certified AWS Solutions Architect with 12 years of cloud infrastructure experience. She has helped dozens of enterprises migrate to and scale on the cloud.",
      expertise: ["AWS", "DevOps", "Docker", "Kubernetes", "CI/CD"],
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst10 = await storage.createInstructor({
      name: "Kevin Zhang",
      title: "Blockchain Developer & Web3 Educator",
      bio: "Kevin is a blockchain architect who has built and audited smart contracts for DeFi protocols handling over $100M in value. He demystifies Web3 for every skill level.",
      expertise: ["Blockchain", "Solidity", "Web3", "DeFi", "Smart Contracts"],
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst11 = await storage.createInstructor({
      name: "Dr. Rachel Kim",
      title: "Mobile Development Expert",
      bio: "Rachel is a mobile developer with apps that have over 10 million downloads combined. She teaches React Native, Swift, and Flutter with a focus on production-ready code.",
      expertise: ["React Native", "Swift", "Flutter", "iOS", "Android"],
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst12 = await storage.createInstructor({
      name: "David Park",
      title: "Game Developer & Unity Expert",
      bio: "David has shipped over 20 games on Steam and mobile platforms. He teaches Unity and Unreal Engine with a focus on professional game design and performance.",
      expertise: ["Unity", "C#", "Game Design", "Unreal Engine", "3D Modeling"],
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst13 = await storage.createInstructor({
      name: "Sofia Martinez",
      title: "Digital Marketing & Growth Expert",
      bio: "Sofia has grown startups from zero to millions of users using data-driven marketing strategies. She specialises in SEO, paid ads, and conversion optimisation.",
      expertise: ["Digital Marketing", "SEO", "Social Media", "Growth Hacking", "Analytics"],
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst14 = await storage.createInstructor({
      name: "James O'Brien",
      title: "Backend Engineer & Database Architect",
      bio: "James is a senior backend engineer with expertise in high-scale systems. He has designed databases handling billions of records at top tech companies.",
      expertise: ["PostgreSQL", "Redis", "System Design", "Microservices", "Go"],
      imageUrl: "https://images.unsplash.com/photo-1548449112-96a38a643324?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst15 = await storage.createInstructor({
      name: "Aisha Williams",
      title: "Business Analytics & BI Specialist",
      bio: "Aisha spent 10 years as a senior analyst at McKinsey before becoming an educator. She makes complex business data concepts accessible and immediately actionable.",
      expertise: ["Business Analytics", "Tableau", "Power BI", "SQL", "Excel"],
      imageUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst16 = await storage.createInstructor({
      name: "Tom Richardson",
      title: "Python Developer & Automation Expert",
      bio: "Tom is a Python developer who has automated thousands of hours of manual work for businesses worldwide. He teaches practical Python with a focus on real results.",
      expertise: ["Python", "Automation", "Web Scraping", "APIs", "Django"],
      imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst17 = await storage.createInstructor({
      name: "Dr. Mei Lin",
      title: "AI Research Scientist",
      bio: "Mei is a research scientist who has published over 30 papers on computer vision and NLP. She bridges cutting-edge research and practical implementation beautifully.",
      expertise: ["Computer Vision", "NLP", "TensorFlow", "PyTorch", "Research"],
      imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst18 = await storage.createInstructor({
      name: "Alex Turner",
      title: "DevOps Engineer & SRE",
      bio: "Alex has built and maintained infrastructure for platforms with millions of active users. He focuses on reliability, automation, and modern DevOps culture.",
      expertise: ["Kubernetes", "Terraform", "Jenkins", "AWS", "Linux"],
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst19 = await storage.createInstructor({
      name: "Laura Simmons",
      title: "Graphic Designer & Brand Strategist",
      bio: "Laura is an award-winning designer who has worked with global brands like Nike and Spotify. She brings professional design thinking into every creative tutorial.",
      expertise: ["Adobe Creative Suite", "Brand Design", "Typography", "Motion Graphics"],
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst20 = await storage.createInstructor({
      name: "Robert Kiyosaki Jr.",
      title: "Finance & Investment Educator",
      bio: "Robert is a certified financial planner and investor who has helped thousands of people build wealth. He teaches personal finance and investment strategies with clarity.",
      expertise: ["Personal Finance", "Investing", "Stocks", "Real Estate", "Crypto"],
      imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst21 = await storage.createInstructor({
      name: "Nina Okonkwo",
      title: "Cloud Security Architect",
      bio: "Nina is a cloud security specialist with certifications across AWS, Azure, and GCP. She has secured cloud environments for Fortune 100 companies across three continents.",
      expertise: ["Cloud Security", "AWS Security", "Zero Trust", "Compliance", "IAM"],
      imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst22 = await storage.createInstructor({
      name: "Chris Anderson",
      title: "Product Manager & Startup Mentor",
      bio: "Chris has launched 7 products as a PM at startups and scaled companies. He teaches product thinking, roadmapping, and stakeholder management from real-world experience.",
      expertise: ["Product Management", "Agile", "User Stories", "Roadmapping", "OKRs"],
      imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst23 = await storage.createInstructor({
      name: "Dr. Yusuf Hassan",
      title: "Quantum Computing Researcher",
      bio: "Yusuf is a quantum computing researcher at a leading university who makes this frontier technology accessible to motivated learners at all levels.",
      expertise: ["Quantum Computing", "Qiskit", "Linear Algebra", "Physics", "Python"],
      imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst24 = await storage.createInstructor({
      name: "Camille Dubois",
      title: "French Language & Culture Expert",
      bio: "Camille is a native French speaker and certified language instructor who has taught French to thousands of international students using immersive, communicative methods.",
      expertise: ["French Language", "Linguistics", "Culture", "Grammar", "Conversation"],
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    const inst25 = await storage.createInstructor({
      name: "Hiroshi Tanaka",
      title: "Japanese Language & Martial Arts Instructor",
      bio: "Hiroshi is a Tokyo native with 20 years of teaching experience. He combines language learning with cultural insight to create deeply engaging Japanese courses.",
      expertise: ["Japanese Language", "Kanji", "Japanese Culture", "JLPT Prep"],
      imageUrl: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    });

    // ── Courses ───────────────────────────────────────────────────────────────
    // Web Development
    await storage.createCourse({
      title: "The Complete Web Development Bootcamp",
      description: "Become a full-stack web developer with just one course. HTML, CSS, JavaScript, Node, React, MongoDB and more!",
      category: "Web Development",
      price: 1999,
      rating: "4.8",
      instructorId: inst1.id,
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Front-End Foundations", content: "HTML5, CSS3, Bootstrap 5" },
        { title: "JavaScript Essentials", content: "Variables, Functions, ES6+, DOM" },
        { title: "Backend with Node.js", content: "Express, REST APIs, MongoDB" },
        { title: "React & Deployment", content: "React, Hooks, Heroku deployment" },
      ],
      duration: "55 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "React - The Complete Guide (incl Hooks, Router, Redux)",
      description: "Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
      category: "Web Development",
      price: 1499,
      rating: "4.9",
      instructorId: inst1.id,
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "React Basics", content: "Components, Props, State" },
        { title: "Hooks Deep Dive", content: "useState, useEffect, useContext" },
        { title: "Redux & State Management", content: "Redux Toolkit, RTK Query" },
        { title: "Next.js & SSR", content: "App Router, Server Components" },
      ],
      duration: "30 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "JavaScript: Understanding the Weird Parts",
      description: "An advanced JavaScript course that dives deep into the JS engine, closures, prototypal inheritance, and functional programming patterns.",
      category: "Web Development",
      price: 1799,
      rating: "4.9",
      instructorId: inst3.id,
      imageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Execution Context & Hoisting", content: "Call stack, scope chain" },
        { title: "Closures & Prototypes", content: "Lexical environments, prototype chain" },
        { title: "Async JavaScript", content: "Promises, async/await, event loop" },
        { title: "Functional Patterns", content: "Currying, composition, monads" },
      ],
      duration: "18 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Advanced CSS and Sass: Flexbox, Grid, Animations",
      description: "The most advanced and modern CSS course on the internet — mastering flexbox, CSS grid, responsive design, and Sass.",
      category: "Web Development",
      price: 1299,
      rating: "4.8",
      instructorId: inst3.id,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Flexbox Mastery", content: "All flex properties, real layouts" },
        { title: "CSS Grid", content: "Grid templates, auto-placement" },
        { title: "Sass & BEM", content: "Variables, mixins, nesting" },
        { title: "Animations & Transitions", content: "Keyframes, transform, SVG animation" },
      ],
      duration: "22 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
      description: "Master Node by building a real-world RESTful API and web app with authentication, Node.js security, payments & more.",
      category: "Web Development",
      price: 2199,
      rating: "4.8",
      instructorId: inst3.id,
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Node.js Fundamentals", content: "Modules, file system, streams" },
        { title: "Express Framework", content: "Routing, middleware, MVC" },
        { title: "MongoDB & Mongoose", content: "CRUD, aggregations, indexing" },
        { title: "Auth & Security", content: "JWT, bcrypt, rate limiting" },
      ],
      duration: "42 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "TypeScript for Professionals",
      description: "Learn TypeScript from scratch and build better JavaScript applications with robust type safety and modern tooling.",
      category: "Web Development",
      price: 1599,
      rating: "4.7",
      instructorId: inst6.id,
      imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "TypeScript Basics", content: "Types, interfaces, enums" },
        { title: "Generics & Utility Types", content: "Generic functions, mapped types" },
        { title: "TypeScript with React", content: "Typed components, hooks" },
        { title: "Advanced Patterns", content: "Decorators, declaration merging" },
      ],
      duration: "16 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Full-Stack Web Development with Django & React",
      description: "Build production-ready full-stack applications using Django REST Framework on the backend and React on the frontend.",
      category: "Web Development",
      price: 2499,
      rating: "4.6",
      instructorId: inst16.id,
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Django REST Framework", content: "Serializers, viewsets, permissions" },
        { title: "Authentication", content: "JWT tokens, session auth" },
        { title: "React Frontend", content: "Consuming APIs, state management" },
        { title: "Deployment", content: "Docker, AWS EC2, Nginx" },
      ],
      duration: "38 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "GraphQL with React: The Complete Guide",
      description: "Learn GraphQL from the ground up and integrate it seamlessly with your React applications using Apollo Client.",
      category: "Web Development",
      price: 1699,
      rating: "4.7",
      instructorId: inst6.id,
      imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "GraphQL Fundamentals", content: "Queries, mutations, subscriptions" },
        { title: "Apollo Server", content: "Resolvers, schema design" },
        { title: "Apollo Client", content: "Caching, optimistic updates" },
        { title: "Real-time with GraphQL", content: "WebSockets, live queries" },
      ],
      duration: "20 hours",
      level: "Advanced",
    });

    // Data Science
    await storage.createCourse({
      title: "Machine Learning A-Z™: Python & R In Data Science",
      description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
      category: "Data Science",
      price: 2499,
      rating: "4.7",
      instructorId: inst2.id,
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Data Preprocessing", content: "Handling missing data, encoding" },
        { title: "Regression Models", content: "Linear, polynomial, SVR" },
        { title: "Classification", content: "Logistic regression, K-NN, SVM" },
        { title: "Clustering", content: "K-Means, hierarchical clustering" },
      ],
      duration: "40 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Python for Data Science and Machine Learning Bootcamp",
      description: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib, Plotly, Scikit-Learn, Machine Learning, Tensorflow, and more!",
      category: "Data Science",
      price: 1999,
      rating: "4.8",
      instructorId: inst5.id,
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Python Refresher", content: "NumPy, Pandas basics" },
        { title: "Data Visualization", content: "Matplotlib, Seaborn, Plotly" },
        { title: "Machine Learning", content: "Scikit-Learn, model evaluation" },
        { title: "Deep Learning Intro", content: "TensorFlow, Keras basics" },
      ],
      duration: "25 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Data Science Masterclass with Python",
      description: "A comprehensive end-to-end data science course covering statistics, machine learning, and advanced analytics techniques.",
      category: "Data Science",
      price: 2799,
      rating: "4.9",
      instructorId: inst5.id,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Statistical Foundations", content: "Probability, hypothesis testing" },
        { title: "Exploratory Data Analysis", content: "Data cleaning, feature engineering" },
        { title: "Predictive Modeling", content: "Ensemble methods, XGBoost" },
        { title: "Model Deployment", content: "Flask APIs, MLflow, monitoring" },
      ],
      duration: "48 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "SQL & Database Design Masterclass",
      description: "Learn SQL from basic queries to advanced database design, optimisation, and administration with PostgreSQL.",
      category: "Data Science",
      price: 1499,
      rating: "4.7",
      instructorId: inst14.id,
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "SQL Fundamentals", content: "SELECT, JOINs, aggregations" },
        { title: "Advanced Queries", content: "CTEs, window functions, subqueries" },
        { title: "Database Design", content: "Normalisation, ERD, indexing" },
        { title: "Performance Tuning", content: "EXPLAIN, partitioning, vacuuming" },
      ],
      duration: "20 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Tableau & Power BI: Business Intelligence Masterclass",
      description: "Master business intelligence tools and create stunning, interactive dashboards that drive data-driven decisions.",
      category: "Data Science",
      price: 1799,
      rating: "4.6",
      instructorId: inst15.id,
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Tableau Fundamentals", content: "Charts, maps, calculated fields" },
        { title: "Power BI", content: "DAX, data modelling, reports" },
        { title: "Dashboard Design", content: "Layout, storytelling, UX" },
        { title: "Publishing & Sharing", content: "Tableau Server, Power BI service" },
      ],
      duration: "18 hours",
      level: "Intermediate",
    });

    // AI & ML
    await storage.createCourse({
      title: "Deep Learning Specialization",
      description: "Master deep learning and break into AI. Build neural networks from scratch and lead successful machine learning projects.",
      category: "AI & Machine Learning",
      price: 2999,
      rating: "4.9",
      instructorId: inst2.id,
      imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Neural Networks", content: "Forward/back propagation, activations" },
        { title: "CNNs", content: "Convolutions, ResNet, detection" },
        { title: "Sequence Models", content: "RNN, LSTM, Transformers" },
        { title: "MLOps", content: "Training at scale, deployment" },
      ],
      duration: "60 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Computer Vision with TensorFlow & OpenCV",
      description: "Build production computer vision systems — image classification, object detection, segmentation, and real-time video analysis.",
      category: "AI & Machine Learning",
      price: 2299,
      rating: "4.8",
      instructorId: inst17.id,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "OpenCV Fundamentals", content: "Image processing, transformations" },
        { title: "Classification", content: "CNNs, transfer learning" },
        { title: "Object Detection", content: "YOLO, Faster R-CNN" },
        { title: "Deployment", content: "TensorFlow Serving, edge devices" },
      ],
      duration: "35 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Natural Language Processing with Transformers",
      description: "Learn to build cutting-edge NLP applications using BERT, GPT, and other transformer models with Hugging Face.",
      category: "AI & Machine Learning",
      price: 2499,
      rating: "4.8",
      instructorId: inst17.id,
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "NLP Fundamentals", content: "Tokenization, embeddings, RNNs" },
        { title: "Transformers Architecture", content: "Attention mechanism, BERT" },
        { title: "Fine-tuning LLMs", content: "Task-specific fine-tuning, PEFT" },
        { title: "Production NLP", content: "Inference optimization, APIs" },
      ],
      duration: "28 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Generative AI & Prompt Engineering Masterclass",
      description: "Harness the power of ChatGPT, Claude, Midjourney, and other AI tools. Build AI-powered applications and master prompt engineering.",
      category: "AI & Machine Learning",
      price: 1999,
      rating: "4.7",
      instructorId: inst5.id,
      imageUrl: "https://images.unsplash.com/photo-1675557009875-436f7a7c1cc5?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Prompt Engineering", content: "Zero-shot, few-shot, chain-of-thought" },
        { title: "OpenAI API", content: "Chat completions, function calling" },
        { title: "LangChain & RAG", content: "Vector stores, retrieval-augmented" },
        { title: "AI App Development", content: "Building full LLM-powered apps" },
      ],
      duration: "22 hours",
      level: "Intermediate",
    });

    // Cybersecurity
    await storage.createCourse({
      title: "Ethical Hacking & Penetration Testing",
      description: "Learn ethical hacking from scratch. Practice on realistic labs and become a certified penetration tester.",
      category: "Cybersecurity",
      price: 2299,
      rating: "4.8",
      instructorId: inst7.id,
      imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Networking Fundamentals", content: "TCP/IP, protocols, Wireshark" },
        { title: "Reconnaissance", content: "OSINT, scanning, enumeration" },
        { title: "Exploitation", content: "Metasploit, CVEs, buffer overflows" },
        { title: "Post-Exploitation", content: "Privilege escalation, persistence" },
      ],
      duration: "45 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Cloud Security & AWS Security Specialty",
      description: "Secure AWS environments with best practices, IAM, encryption, and compliance frameworks. Prep for the AWS Security Specialty exam.",
      category: "Cybersecurity",
      price: 2599,
      rating: "4.7",
      instructorId: inst21.id,
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "IAM Deep Dive", content: "Policies, roles, trust relationships" },
        { title: "Data Protection", content: "KMS, S3 security, encryption" },
        { title: "Network Security", content: "VPC, WAF, Shield, GuardDuty" },
        { title: "Compliance", content: "SOC 2, PCI-DSS, GDPR on AWS" },
      ],
      duration: "32 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Web Application Security & Bug Bounty Hunting",
      description: "Learn to find vulnerabilities in web applications using OWASP Top 10, Burp Suite, and participate in bug bounty programs.",
      category: "Cybersecurity",
      price: 1999,
      rating: "4.8",
      instructorId: inst7.id,
      imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "OWASP Top 10", content: "XSS, SQLi, CSRF, IDOR" },
        { title: "Burp Suite", content: "Proxy, scanner, intruder" },
        { title: "API Security", content: "REST API vulnerabilities" },
        { title: "Bug Bounty", content: "Platforms, reporting, payouts" },
      ],
      duration: "28 hours",
      level: "Intermediate",
    });

    // UI/UX Design
    await storage.createCourse({
      title: "UI/UX Design Bootcamp: From Figma to Prototype",
      description: "Learn the complete UX design process from user research to high-fidelity prototypes. Build a professional portfolio.",
      category: "UI/UX Design",
      price: 1799,
      rating: "4.8",
      instructorId: inst8.id,
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "UX Research", content: "User interviews, personas, journey maps" },
        { title: "Wireframing", content: "Low-fi sketching, information architecture" },
        { title: "Figma Design", content: "Components, auto-layout, variants" },
        { title: "Prototyping & Testing", content: "Interactive prototypes, usability tests" },
      ],
      duration: "24 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Advanced Figma: Design Systems & Collaboration",
      description: "Build and maintain scalable design systems in Figma. Learn advanced component architecture, tokens, and team workflows.",
      category: "UI/UX Design",
      price: 1599,
      rating: "4.7",
      instructorId: inst8.id,
      imageUrl: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Design Tokens", content: "Colors, typography, spacing systems" },
        { title: "Component Architecture", content: "Variants, props, nested components" },
        { title: "Design Systems", content: "Documentation, governance, versioning" },
        { title: "Handoff & Dev Mode", content: "Figma Dev Mode, annotations" },
      ],
      duration: "16 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Motion Design & UI Animation",
      description: "Add life to your interfaces with After Effects, Lottie, and CSS animations. Create micro-interactions that delight users.",
      category: "UI/UX Design",
      price: 1499,
      rating: "4.6",
      instructorId: inst19.id,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Animation Principles", content: "12 principles, easing, timing" },
        { title: "CSS Animations", content: "Keyframes, transitions, transforms" },
        { title: "After Effects for UI", content: "Shape layers, expressions" },
        { title: "Lottie & Web Export", content: "Bodymovin, React integration" },
      ],
      duration: "20 hours",
      level: "Intermediate",
    });

    // Cloud & DevOps
    await storage.createCourse({
      title: "AWS Certified Solutions Architect — Associate",
      description: "Ace the AWS SAA-C03 exam and master cloud architecture. Covering all core AWS services with hands-on labs.",
      category: "Cloud & DevOps",
      price: 2299,
      rating: "4.9",
      instructorId: inst9.id,
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Core Services", content: "EC2, S3, RDS, VPC" },
        { title: "High Availability", content: "Auto Scaling, load balancers, Route 53" },
        { title: "Security & Identity", content: "IAM, KMS, Cognito" },
        { title: "Architecture Patterns", content: "Well-Architected Framework, exam tips" },
      ],
      duration: "30 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Docker & Kubernetes: The Complete Guide",
      description: "Build, test, and deploy containerized applications at scale with Docker and Kubernetes. Includes real-world production deployments.",
      category: "Cloud & DevOps",
      price: 1999,
      rating: "4.8",
      instructorId: inst18.id,
      imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Docker Fundamentals", content: "Images, containers, Dockerfiles" },
        { title: "Docker Compose", content: "Multi-container apps, networking" },
        { title: "Kubernetes Core", content: "Pods, deployments, services" },
        { title: "Production K8s", content: "Helm, monitoring, RBAC" },
      ],
      duration: "22 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Terraform & Infrastructure as Code",
      description: "Automate cloud infrastructure provisioning with Terraform. Learn state management, modules, and multi-cloud deployments.",
      category: "Cloud & DevOps",
      price: 1799,
      rating: "4.7",
      instructorId: inst18.id,
      imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Terraform Basics", content: "Providers, resources, variables" },
        { title: "State Management", content: "Remote state, locking, workspaces" },
        { title: "Modules", content: "Writing reusable modules, registry" },
        { title: "CI/CD with Terraform", content: "GitOps, Atlantis, pipelines" },
      ],
      duration: "18 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "CI/CD Pipelines with GitHub Actions & Jenkins",
      description: "Build robust continuous integration and delivery pipelines that automate testing, building, and deployment of applications.",
      category: "Cloud & DevOps",
      price: 1599,
      rating: "4.6",
      instructorId: inst9.id,
      imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "CI Fundamentals", content: "Automated testing, code quality" },
        { title: "GitHub Actions", content: "Workflows, actions, secrets" },
        { title: "Jenkins", content: "Pipelines, agents, plugins" },
        { title: "Deployment Strategies", content: "Blue/green, canary, rolling" },
      ],
      duration: "16 hours",
      level: "Intermediate",
    });

    // Mobile Development
    await storage.createCourse({
      title: "React Native - The Practical Guide",
      description: "Use React Native and your React knowledge to build native iOS and Android apps — including push notifications, hooks, Redux.",
      category: "Mobile Development",
      price: 1999,
      rating: "4.7",
      instructorId: inst11.id,
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "React Native Basics", content: "Components, StyleSheet, navigation" },
        { title: "Device Features", content: "Camera, location, push notifications" },
        { title: "State Management", content: "Redux, Context API with RN" },
        { title: "Publishing", content: "App Store, Play Store submission" },
      ],
      duration: "30 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Flutter & Dart: Build Native Cross-Platform Apps",
      description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter.",
      category: "Mobile Development",
      price: 2199,
      rating: "4.8",
      instructorId: inst1.id,
      imageUrl: "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Dart Fundamentals", content: "Syntax, OOP, async/await" },
        { title: "Flutter Widgets", content: "Stateless, stateful, Material, Cupertino" },
        { title: "State Management", content: "Provider, Riverpod, BLoC" },
        { title: "Backend Integration", content: "Firebase, REST APIs, SQLite" },
      ],
      duration: "35 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "iOS Development with Swift & SwiftUI",
      description: "Build real iOS apps with Swift and SwiftUI. Master Xcode, Core Data, networking, and the App Store submission process.",
      category: "Mobile Development",
      price: 2299,
      rating: "4.8",
      instructorId: inst11.id,
      imageUrl: "https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Swift Fundamentals", content: "Optionals, closures, protocols" },
        { title: "SwiftUI", content: "Views, state, data flow" },
        { title: "Core Data", content: "Persistence, relationships, migration" },
        { title: "App Store", content: "TestFlight, review, monetisation" },
      ],
      duration: "40 hours",
      level: "Intermediate",
    });

    // Game Development
    await storage.createCourse({
      title: "Unity Game Development: Build 2D & 3D Games",
      description: "Learn Unity 2022, C# scripting, physics, animations, and ship your own games to PC, mobile, and the web.",
      category: "Game Development",
      price: 1999,
      rating: "4.8",
      instructorId: inst12.id,
      imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Unity Fundamentals", content: "Scene, GameObjects, Inspector" },
        { title: "C# Scripting", content: "MonoBehaviour, events, coroutines" },
        { title: "Physics & Animation", content: "Rigidbody, Animator, Cinemachine" },
        { title: "Publishing", content: "WebGL, Android, iOS builds" },
      ],
      duration: "28 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Unreal Engine 5 - Complete Developer Course",
      description: "Create professional-grade 3D games using Unreal Engine 5 with Blueprints, Lumen lighting, and Nanite geometry.",
      category: "Game Development",
      price: 2499,
      rating: "4.7",
      instructorId: inst12.id,
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Unreal Engine 5 Basics", content: "Interface, Blueprints, Lumen" },
        { title: "Game Mechanics", content: "Character controllers, AI, combat" },
        { title: "Level Design", content: "Landscape, Nanite, World Partition" },
        { title: "Multiplayer", content: "Networking, replication, dedicated servers" },
      ],
      duration: "36 hours",
      level: "Intermediate",
    });

    // Digital Marketing
    await storage.createCourse({
      title: "Digital Marketing Masterclass: SEO, Social Media & Ads",
      description: "Master every major digital marketing channel — from SEO and Google Ads to social media marketing and email campaigns.",
      category: "Digital Marketing",
      price: 1799,
      rating: "4.7",
      instructorId: inst13.id,
      imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "SEO & Content", content: "Keyword research, on-page, link building" },
        { title: "Google Ads", content: "Search, Display, Shopping campaigns" },
        { title: "Social Media Marketing", content: "Meta, LinkedIn, TikTok ads" },
        { title: "Email Marketing", content: "Automation, segmentation, analytics" },
      ],
      duration: "32 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Growth Hacking & Viral Marketing Strategies",
      description: "Learn the exact growth hacking techniques used by Airbnb, Uber, and Dropbox to achieve explosive, scalable growth.",
      category: "Digital Marketing",
      price: 1599,
      rating: "4.6",
      instructorId: inst13.id,
      imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Growth Mindset", content: "Pirate metrics, experiment culture" },
        { title: "Product-Led Growth", content: "Viral loops, network effects" },
        { title: "Paid Acquisition", content: "CAC, LTV, channel scaling" },
        { title: "Retention & Referral", content: "Onboarding, NPS, referral programs" },
      ],
      duration: "14 hours",
      level: "Intermediate",
    });

    // Blockchain
    await storage.createCourse({
      title: "Blockchain & Cryptocurrency Fundamentals",
      description: "Understand how blockchain works, how cryptocurrencies function, and how decentralized applications are built.",
      category: "Blockchain",
      price: 1799,
      rating: "4.6",
      instructorId: inst10.id,
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Blockchain Basics", content: "Distributed ledger, consensus, hashing" },
        { title: "Bitcoin & Ethereum", content: "UTXO model, EVM, gas" },
        { title: "DeFi Ecosystem", content: "DEXs, lending, yield farming" },
        { title: "Wallets & Security", content: "Key management, hardware wallets" },
      ],
      duration: "16 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Solidity & Smart Contract Development",
      description: "Build and audit Solidity smart contracts on Ethereum. Deploy DeFi protocols, NFT marketplaces, and DAOs.",
      category: "Blockchain",
      price: 2299,
      rating: "4.7",
      instructorId: inst10.id,
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Solidity Fundamentals", content: "Types, functions, modifiers, events" },
        { title: "Smart Contract Patterns", content: "OpenZeppelin, proxy upgrades" },
        { title: "Testing & Security", content: "Hardhat, Slither, audit checklist" },
        { title: "DeFi Projects", content: "Token, NFT marketplace, DAO" },
      ],
      duration: "30 hours",
      level: "Advanced",
    });

    // Business & Finance
    await storage.createCourse({
      title: "Personal Finance & Wealth Building",
      description: "Take control of your finances. Learn budgeting, debt elimination, investing, and building long-term wealth from scratch.",
      category: "Business & Finance",
      price: 1299,
      rating: "4.8",
      instructorId: inst20.id,
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Budgeting & Cash Flow", content: "50/30/20 rule, expense tracking" },
        { title: "Debt Management", content: "Avalanche, snowball, negotiation" },
        { title: "Investing Basics", content: "Stocks, ETFs, index funds" },
        { title: "Wealth Building", content: "Compound interest, tax optimization" },
      ],
      duration: "12 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Stock Market Investing & Trading Masterclass",
      description: "Learn fundamental and technical analysis, portfolio management, and risk strategies used by professional investors.",
      category: "Business & Finance",
      price: 1999,
      rating: "4.7",
      instructorId: inst20.id,
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Market Fundamentals", content: "Market structure, order types, indices" },
        { title: "Fundamental Analysis", content: "Financial statements, DCF valuation" },
        { title: "Technical Analysis", content: "Chart patterns, indicators, signals" },
        { title: "Portfolio Management", content: "Diversification, rebalancing, risk" },
      ],
      duration: "20 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Product Management Bootcamp",
      description: "Launch your PM career with skills in roadmapping, Agile, user research, and stakeholder communication. Real-world case studies.",
      category: "Business & Finance",
      price: 2199,
      rating: "4.7",
      instructorId: inst22.id,
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "PM Fundamentals", content: "Role, responsibilities, career paths" },
        { title: "Product Discovery", content: "User research, problem framing" },
        { title: "Roadmapping & OKRs", content: "Prioritisation, strategy, OKRs" },
        { title: "Agile & Execution", content: "Scrum, sprints, stakeholder management" },
      ],
      duration: "18 hours",
      level: "Beginner",
    });

    // Python
    await storage.createCourse({
      title: "Python Automation & Scripting Bootcamp",
      description: "Automate the boring stuff: web scraping, file processing, email automation, and building scripts that save hours every week.",
      category: "Programming",
      price: 1499,
      rating: "4.7",
      instructorId: inst16.id,
      imageUrl: "https://images.unsplash.com/photo-1585432959449-8b4ebf1a4cf7?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Python Fundamentals", content: "Variables, loops, functions, OOP" },
        { title: "File & OS Automation", content: "pathlib, shutil, scheduling" },
        { title: "Web Scraping", content: "BeautifulSoup, Selenium, Playwright" },
        { title: "APIs & Bots", content: "REST APIs, Telegram/Discord bots" },
      ],
      duration: "22 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Go Programming Language: Complete Bootcamp",
      description: "Master Go from the ground up. Build fast, concurrent programs, REST APIs, and microservices with Google's language.",
      category: "Programming",
      price: 1899,
      rating: "4.7",
      instructorId: inst14.id,
      imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Go Basics", content: "Syntax, types, interfaces, structs" },
        { title: "Concurrency", content: "Goroutines, channels, select" },
        { title: "REST APIs with Go", content: "Gin, GORM, JWT auth" },
        { title: "Microservices", content: "gRPC, Docker, deployment" },
      ],
      duration: "20 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Rust Programming: Zero to Production",
      description: "Learn Rust — the language loved by developers for memory safety and performance. Build systems, CLIs, and web servers.",
      category: "Programming",
      price: 2199,
      rating: "4.8",
      instructorId: inst4.id,
      imageUrl: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Rust Fundamentals", content: "Ownership, borrowing, lifetimes" },
        { title: "Error Handling", content: "Result, Option, custom errors" },
        { title: "Async Rust", content: "Tokio, async/await, networking" },
        { title: "Web with Actix", content: "REST APIs, databases, middleware" },
      ],
      duration: "30 hours",
      level: "Advanced",
    });

    // Languages
    await storage.createCourse({
      title: "French for Beginners: Speak French in 30 Days",
      description: "Learn French quickly using proven immersion techniques. Achieve conversational fluency in everyday situations.",
      category: "Languages",
      price: 999,
      rating: "4.8",
      instructorId: inst24.id,
      imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Pronunciation & Phonetics", content: "French sounds, liaison, elision" },
        { title: "Core Vocabulary", content: "1000 most common words" },
        { title: "Essential Grammar", content: "Verbs, tenses, genders" },
        { title: "Conversation Practice", content: "Real dialogues, travel phrases" },
      ],
      duration: "15 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Japanese for Beginners: Hiragana to Conversation",
      description: "Start your Japanese journey from zero. Master hiragana, katakana, basic kanji, and essential conversational phrases.",
      category: "Languages",
      price: 1199,
      rating: "4.9",
      instructorId: inst25.id,
      imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Hiragana & Katakana", content: "All kana with stroke order" },
        { title: "Basic Kanji", content: "JLPT N5 kanji, radicals" },
        { title: "Grammar Foundations", content: "Particles, verb conjugation" },
        { title: "Conversation", content: "Greetings, shopping, directions" },
      ],
      duration: "20 hours",
      level: "Beginner",
    });

    // Quantum
    await storage.createCourse({
      title: "Quantum Computing with Qiskit",
      description: "Journey into quantum computing. Understand qubits, gates, and circuits — then run code on real IBM quantum hardware.",
      category: "AI & Machine Learning",
      price: 2499,
      rating: "4.7",
      instructorId: inst23.id,
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Quantum Mechanics Basics", content: "Superposition, entanglement" },
        { title: "Quantum Gates & Circuits", content: "Hadamard, CNOT, Toffoli" },
        { title: "Quantum Algorithms", content: "Grover, Shor, QAOA" },
        { title: "IBM Quantum Hardware", content: "Running on real devices" },
      ],
      duration: "24 hours",
      level: "Advanced",
    });

    // Graphic Design
    await storage.createCourse({
      title: "Adobe Photoshop & Illustrator: Graphic Design Masterclass",
      description: "Master the industry-standard design tools and build a stunning portfolio with logo design, illustration, and photo editing.",
      category: "Design",
      price: 1699,
      rating: "4.7",
      instructorId: inst19.id,
      imageUrl: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Photoshop Fundamentals", content: "Layers, masks, selections" },
        { title: "Photo Retouching", content: "Colour grading, skin retouching" },
        { title: "Illustrator Basics", content: "Vector graphics, Pen tool, typography" },
        { title: "Brand Identity", content: "Logo design, brand guidelines" },
      ],
      duration: "26 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "3D Modelling & Rendering with Blender",
      description: "Create stunning 3D art, animations, and visualisations with Blender — the most powerful free 3D software available.",
      category: "Design",
      price: 1899,
      rating: "4.8",
      instructorId: inst19.id,
      imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Blender Interface", content: "Navigation, shortcuts, workflow" },
        { title: "3D Modelling", content: "Mesh editing, sculpting, retopology" },
        { title: "Materials & Shading", content: "Cycles, EEVEE, node editor" },
        { title: "Animation & Rendering", content: "Rigging, keyframes, output" },
      ],
      duration: "32 hours",
      level: "Intermediate",
    });

    // System Design
    await storage.createCourse({
      title: "System Design Interview Masterclass",
      description: "Ace system design interviews at FAANG companies. Learn to design scalable, reliable systems from scratch.",
      category: "Programming",
      price: 2299,
      rating: "4.9",
      instructorId: inst14.id,
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Fundamentals", content: "Scalability, reliability, CAP theorem" },
        { title: "Core Components", content: "Load balancers, caches, queues, CDNs" },
        { title: "Database Design", content: "SQL vs NoSQL, sharding, replication" },
        { title: "Real Systems", content: "Design Twitter, Uber, YouTube" },
      ],
      duration: "18 hours",
      level: "Advanced",
    });

    await storage.createCourse({
      title: "Data Structures & Algorithms: Complete Coding Interview Prep",
      description: "Crack coding interviews at top tech companies. Master arrays, trees, graphs, dynamic programming and sorting algorithms.",
      category: "Programming",
      price: 1999,
      rating: "4.8",
      instructorId: inst4.id,
      imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Arrays & Strings", content: "Two pointers, sliding window" },
        { title: "Trees & Graphs", content: "DFS, BFS, Dijkstra, union-find" },
        { title: "Dynamic Programming", content: "Memoization, tabulation, knapsack" },
        { title: "Interview Strategy", content: "STAR method, system communication" },
      ],
      duration: "35 hours",
      level: "Intermediate",
    });

    await storage.createCourse({
      title: "Linux & Shell Scripting Masterclass",
      description: "Become a Linux power user and automate tasks with Bash scripting. Essential skills for developers, DevOps, and sysadmins.",
      category: "Cloud & DevOps",
      price: 1399,
      rating: "4.7",
      instructorId: inst18.id,
      imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Linux Fundamentals", content: "File system, permissions, processes" },
        { title: "Shell Scripting", content: "Bash syntax, loops, functions" },
        { title: "Networking Tools", content: "curl, ssh, nmap, iptables" },
        { title: "Server Administration", content: "Cron, systemd, log management" },
      ],
      duration: "14 hours",
      level: "Beginner",
    });

    await storage.createCourse({
      title: "Microsoft Excel: From Beginner to Advanced",
      description: "Master Excel completely — from basic formulas to pivot tables, Power Query, macros, and advanced data analysis.",
      category: "Business & Finance",
      price: 1299,
      rating: "4.7",
      instructorId: inst15.id,
      imageUrl: "https://images.unsplash.com/photo-1600267204026-85c3cc8e96cd?auto=format&fit=crop&w=800&q=80",
      syllabus: [
        { title: "Excel Fundamentals", content: "Formulas, functions, cell referencing" },
        { title: "Data Analysis", content: "Pivot tables, VLOOKUP, Power Query" },
        { title: "Charts & Visualisation", content: "Dynamic charts, sparklines" },
        { title: "Macros & VBA", content: "Record macros, write VBA scripts" },
      ],
      duration: "16 hours",
      level: "Beginner",
    });
  }
}
