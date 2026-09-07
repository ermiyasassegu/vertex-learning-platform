const fs = require('fs');
const path = require('path');
const os = require('os');
const { createClient } = require('next-sanity');

const configPath = path.join(os.homedir(), '.config', 'sanity', 'config.json');
const { authToken } = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const client = createClient({
  projectId: '5t2b9v1m',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: authToken,
  useCdn: false,
});

const modulesData = [
  {
    title: 'Introduction to Next.js',
    summary: "Understand the core features of Next.js and why it's the React framework.",
    lessons: [
      { title: 'Why Next.js in 2026', duration: 900, isFreePreview: true },
      { title: 'The Evolution of the React Architecture', duration: 1020, isFreePreview: true },
      { title: 'Architecture Overview & Mental Models', duration: 780, isFreePreview: false },
    ],
  },
  {
    title: 'Project Setup & Structure',
    summary: 'Set up a new Next.js project and explore the folder structure.',
    lessons: [
      { title: 'Initial Project Scaffolding & Tooling', duration: 1200, isFreePreview: false },
      { title: 'Folder Structure & Colocation Best Practices', duration: 1560, isFreePreview: false },
      { title: 'TypeScript & Path Aliases Configuration', duration: 1560, isFreePreview: false },
    ],
  },
  {
    title: 'Routing & Layouts',
    summary: 'Learn about file-based routing, layouts, and nested routes.',
    lessons: [
      { title: 'App Directory & File-Based Conventions', duration: 1800, isFreePreview: false },
      { title: 'Nested Layouts, Templates & Parallel Routes', duration: 2160, isFreePreview: false },
      { title: 'Dynamic Route Segments & Catch-all Patterns', duration: 1800, isFreePreview: false },
    ],
  },
  {
    title: 'Server Components',
    summary: 'Build components with server-side rendering and data fetching.',
    lessons: [
      { title: 'Server vs Client Component Boundaries', duration: 1980, isFreePreview: false },
      { title: 'Composition Patterns & Serialization Rules', duration: 2100, isFreePreview: false },
      { title: 'Streaming Component Trees with Suspense', duration: 2040, isFreePreview: false },
    ],
  },
  {
    title: 'Data Fetching & Caching',
    summary: 'Fetch data efficiently and leverage caching for better performance.',
    lessons: [
      { title: 'The Next.js Extended Fetch Architecture', duration: 1740, isFreePreview: false },
      { title: 'Time-based & On-demand Revalidation', duration: 1800, isFreePreview: false },
      { title: 'Request Deduplication & Unstable Cache', duration: 1740, isFreePreview: false },
    ],
  },
  {
    title: 'Authentication',
    summary: 'Implement authentication using NextAuth.js in your app.',
    lessons: [
      { title: 'Auth Fundamentals in Server Components', duration: 1560, isFreePreview: false },
      { title: 'Session Handling & Middleware Protection', duration: 1680, isFreePreview: false },
      { title: 'Securing Server Actions & Route Handlers', duration: 1440, isFreePreview: false },
    ],
  },
  {
    title: 'State Management',
    summary: 'Manage client and server state effectively with modern patterns.',
    lessons: [
      { title: 'URL State as the Single Source of Truth', duration: 1500, isFreePreview: false },
      { title: 'Zustand & Lightweight Client State Stores', duration: 1500, isFreePreview: false },
      { title: 'Syncing Server State without Redux', duration: 1500, isFreePreview: false },
    ],
  },
  {
    title: 'Forms & Server Actions',
    summary: 'Handle form submissions and mutations with Server Actions.',
    lessons: [
      { title: 'Form Submissions & Progressive Enhancement', duration: 1800, isFreePreview: false },
      { title: 'Zod Validation & Server-side Error Handling', duration: 1920, isFreePreview: false },
      { title: 'Optimistic UI Updates with useOptimistic', duration: 1800, isFreePreview: false },
    ],
  },
  {
    title: 'Styling & Design Systems',
    summary: 'Integrate Tailwind CSS, styling libraries, and responsive UI.',
    lessons: [
      { title: 'Tailwind CSS v4 Integration & Design Tokens', duration: 1600, isFreePreview: false },
      { title: 'Accessible UI with Radix Primitives', duration: 1600, isFreePreview: false },
      { title: 'Dark Mode & Theme Switching without FOUC', duration: 1600, isFreePreview: false },
    ],
  },
  {
    title: 'Testing & Quality Assurance',
    summary: 'Unit testing, integration testing, and end-to-end testing Next.js apps.',
    lessons: [
      { title: 'Unit Testing Server Components with Vitest', duration: 2100, isFreePreview: false },
      { title: 'Integration Testing Server Actions', duration: 2100, isFreePreview: false },
      { title: 'End-to-End Testing with Playwright', duration: 2100, isFreePreview: false },
    ],
  },
  {
    title: 'Performance Optimization',
    summary: 'Core Web Vitals, image optimization, dynamic imports, and streaming.',
    lessons: [
      { title: 'Optimizing LCP, CLS, and INP in Production', duration: 2600, isFreePreview: false },
      { title: 'next/image Deep Dive & Responsive Art Direction', duration: 2600, isFreePreview: false },
      { title: 'Bundle Analysis & Dynamic Imports with next/dynamic', duration: 2600, isFreePreview: false },
    ],
  },
  {
    title: 'Deployment & Scaling',
    summary: 'Deploy with confidence and scale your Next.js applications.',
    lessons: [
      { title: 'Vercel Deployment Architecture & Edge Network', duration: 2020, isFreePreview: false },
      { title: 'Self-hosting with Docker & Multi-stage Builds', duration: 2020, isFreePreview: false },
      { title: 'Monitoring, PostHog Analytics & Error Tracking', duration: 2020, isFreePreview: false },
    ],
  },
];

async function seed() {
  console.log('Seeding Next.js for Production course...');

  const createdModules = [];
  for (let mIdx = 0; mIdx < modulesData.length; mIdx++) {
    const mod = modulesData[mIdx];
    const modLessonRefs = [];

    for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
      const les = mod.lessons[lIdx];
      const lessonSlug = `nextjs-for-production-m${mIdx + 1}-l${lIdx + 1}`;
      const lessonId = `lesson.${lessonSlug}`;

      const lessonDoc = {
        _id: lessonId,
        _type: 'lesson',
        title: les.title,
        slug: { _type: 'slug', current: lessonSlug },
        duration: les.duration,
        isFreePreview: les.isFreePreview,
        studentCount: 2100 - (mIdx * 100 + lIdx * 30),
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        notes: [
          {
            _key: `note-${lessonSlug}-0`,
            _type: 'block',
            children: [
              {
                _key: `span-${lessonSlug}-0`,
                _type: 'span',
                text: `In this lesson, we cover ${les.title.toLowerCase()} with production best practices, architecture patterns, and practical code walkthroughs.`,
                marks: [],
              },
            ],
            markDefs: [],
            style: 'normal',
          },
        ],
        keyPoints: [
          `Core concepts of ${les.title}`,
          'Production-grade implementation techniques',
          'Common pitfalls and debugging strategies',
        ],
        proTip: 'Always verify client/server boundaries using bundle analyzer tools before deploying to production.',
      };

      await client.createOrReplace(lessonDoc);
      modLessonRefs.push({
        _type: 'reference',
        _key: `${lessonSlug}-ref`,
        _ref: lessonId,
      });
    }

    createdModules.push({
      _type: 'module',
      _key: `nextjs-for-production-module-${mIdx + 1}`,
      title: mod.title,
      summary: mod.summary,
      lessons: modLessonRefs,
    });
  }

  const courseDoc = {
    _id: 'course.nextjs-for-production',
    _type: 'course',
    title: 'Next.js for Production',
    slug: { _type: 'slug', current: 'nextjs-for-production' },
    summary: 'Build scalable, high-performance web applications with Next.js, best practices, and production-ready deployment strategies.',
    level: 'intermediate',
    price: 99,
    isPopular: true,
    studentCount: 2100,
    instructor: {
      _type: 'reference',
      _ref: 'instructor.mira-kovac',
    },
    category: {
      _type: 'reference',
      _ref: 'category.web-development',
    },
    learningOutcomes: [
      {
        _type: 'learningOutcome',
        _key: 'nextjs-prod-outcome-0',
        icon: 'layers',
        title: 'App Router Foundations',
        description: 'Master the App Router, layouts, loading states, and nested routing.',
      },
      {
        _type: 'learningOutcome',
        _key: 'nextjs-prod-outcome-1',
        icon: 'database',
        title: 'Data Fetching & Caching',
        description: 'Fetch data efficiently and leverage caching for better performance.',
      },
      {
        _type: 'learningOutcome',
        _key: 'nextjs-prod-outcome-2',
        icon: 'gauge',
        title: 'Performance Optimization',
        description: 'Optimize rendering, assets, and bundle size for faster apps.',
      },
      {
        _type: 'learningOutcome',
        _key: 'nextjs-prod-outcome-3',
        icon: 'cloud',
        title: 'Deployment & Scaling',
        description: 'Deploy with confidence and scale your Next.js applications.',
      },
    ],
    modules: createdModules,
  };

  const result = await client.createOrReplace(courseDoc);
  console.log('Successfully created/replaced course:', result._id);
}

seed().catch(console.error);
