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

async function seedHomeCourses() {
  console.log('Seeding Docker Essentials & TypeScript Deep Dive into Sanity...');

  // 1. Docker Essentials (Beginner, 10h 12m = 36720s, 8 modules)
  const dockerModules = [
    { title: 'Containers Overview & Architecture', duration: 4200, summary: 'Understand container primitives, cgroups, and namespaces.' },
    { title: 'Docker Installation & Setup', duration: 3600, summary: 'Install Docker Desktop, Docker Engine, and CLI utilities.' },
    { title: 'Working with Images & Dockerfiles', duration: 5100, summary: 'Build optimized multi-stage Docker images.' },
    { title: 'Managing Containers & Lifecycles', duration: 4500, summary: 'Run, stop, inspect, and monitor active containers.' },
    { title: 'Docker Storage & Volumes', duration: 4800, summary: 'Persist data across container lifecycles with named volumes.' },
    { title: 'Container Networking & DNS', duration: 4620, summary: 'Bridge networks, port forwarding, and inter-container communication.' },
    { title: 'Multi-Container Apps with Compose', duration: 5100, summary: 'Define and run multi-service architectures with Docker Compose.' },
    { title: 'Production Best Practices & Security', duration: 4800, summary: 'Rootless containers, vulnerability scanning, and CI/CD pushes.' },
  ];

  const dockerModuleDocs = [];
  for (let m = 0; m < dockerModules.length; m++) {
    const mod = dockerModules[m];
    const lessonSlug = `docker-essentials-m${m + 1}-l1`;
    const lessonId = `lesson.${lessonSlug}`;

    await client.createOrReplace({
      _id: lessonId,
      _type: 'lesson',
      title: mod.title,
      slug: { _type: 'slug', current: lessonSlug },
      duration: mod.duration,
      isFreePreview: m === 0,
      studentCount: 1850 - m * 50,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: [
        {
          _key: `note-${lessonSlug}-0`,
          _type: 'block',
          children: [
            {
              _key: `span-${lessonSlug}-0`,
              _type: 'span',
              text: `Master ${mod.title} with hands-on container commands and configurations.`,
              marks: [],
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      keyPoints: [
        `Core principles of ${mod.title}`,
        'Container orchestration essentials',
        'Debugging and workflow tips',
      ],
    });

    dockerModuleDocs.push({
      _type: 'module',
      _key: `docker-essentials-module-${m + 1}`,
      title: mod.title,
      summary: mod.summary,
      lessons: [
        {
          _type: 'reference',
          _key: `${lessonSlug}-ref`,
          _ref: lessonId,
        },
      ],
    });
  }

  const dockerCourse = {
    _id: 'course.docker-essentials',
    _type: 'course',
    title: 'Docker Essentials',
    slug: { _type: 'slug', current: 'docker-essentials' },
    summary: 'Containerize applications and streamline your development workflow.',
    level: 'beginner',
    price: 69,
    isPopular: true,
    studentCount: 1850,
    instructor: { _type: 'reference', _ref: 'instructor.alina-costa' },
    category: { _type: 'reference', _ref: 'category.backend-infrastructure' },
    learningOutcomes: [
      {
        _type: 'learningOutcome',
        _key: 'docker-outcome-0',
        icon: 'workflow',
        title: 'Container Fundamentals',
        description: 'Understand the difference between containers and virtual machines.',
      },
      {
        _type: 'learningOutcome',
        _key: 'docker-outcome-1',
        icon: 'layers',
        title: 'Dockerfile Optimization',
        description: 'Build fast, lightweight multi-stage Docker images.',
      },
      {
        _type: 'learningOutcome',
        _key: 'docker-outcome-2',
        icon: 'database',
        title: 'Volumes & Networking',
        description: 'Connect databases and backend services with custom networks.',
      },
      {
        _type: 'learningOutcome',
        _key: 'docker-outcome-3',
        icon: 'rocket',
        title: 'Docker Compose in Production',
        description: 'Deploy resilient multi-service applications with Compose.',
      },
    ],
    modules: dockerModuleDocs,
  };
  await client.createOrReplace(dockerCourse);
  console.log('Successfully created/replaced course.docker-essentials');

  // 2. TypeScript Deep Dive (Intermediate, 14h 36m = 52560s, 10 modules)
  const tsModules = [
    { title: 'The Type System Fundamentals', duration: 5200, summary: 'Type inference, literal types, and structural subtyping.' },
    { title: 'Union, Intersection & Primitive Types', duration: 4800, summary: 'Narrowing types with type guards and assertion functions.' },
    { title: 'Interfaces vs Type Aliases', duration: 4900, summary: 'Declaration merging, extension rules, and ergonomics.' },
    { title: 'Generics & Type Parameter Constraints', duration: 5600, summary: 'Reusable components, generic classes, and extends constraints.' },
    { title: 'Conditional Types & Infer Keyword', duration: 5800, summary: 'Advanced pattern matching and type-level transformation.' },
    { title: 'Mapped & Template Literal Types', duration: 5400, summary: 'Dynamic key remapping, string manipulations, and keys-of.' },
    { title: 'Decorators, Metadata & Reflection', duration: 5100, summary: 'Stage 3 decorators and runtime metadata reflection.' },
    { title: 'Declaration Files & Third-Party Typings', duration: 5000, summary: 'Writing .d.ts definitions and ambient type declarations.' },
    { title: 'Compiler Flags & Strict Mode Practices', duration: 5160, summary: 'tsconfig.json optimization and strict null checks.' },
    { title: 'Production Architecture Patterns', duration: 5600, summary: 'Fullstack monorepos, shared types, and domain-driven types.' },
  ];

  const tsModuleDocs = [];
  for (let m = 0; m < tsModules.length; m++) {
    const mod = tsModules[m];
    const lessonSlug = `typescript-deep-dive-m${m + 1}-l1`;
    const lessonId = `lesson.${lessonSlug}`;

    await client.createOrReplace({
      _id: lessonId,
      _type: 'lesson',
      title: mod.title,
      slug: { _type: 'slug', current: lessonSlug },
      duration: mod.duration,
      isFreePreview: m === 0,
      studentCount: 3100 - m * 60,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      notes: [
        {
          _key: `note-${lessonSlug}-0`,
          _type: 'block',
          children: [
            {
              _key: `span-${lessonSlug}-0`,
              _type: 'span',
              text: `Master ${mod.title} with practical compiler examples and edge-case puzzles.`,
              marks: [],
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      keyPoints: [
        `Deep dive into ${mod.title}`,
        'Type soundness and compiler internals',
        'Real-world refactoring patterns',
      ],
    });

    tsModuleDocs.push({
      _type: 'module',
      _key: `typescript-deep-dive-module-${m + 1}`,
      title: mod.title,
      summary: mod.summary,
      lessons: [
        {
          _type: 'reference',
          _key: `${lessonSlug}-ref`,
          _ref: lessonId,
        },
      ],
    });
  }

  const tsCourse = {
    _id: 'course.typescript-deep-dive',
    _type: 'course',
    title: 'TypeScript Deep Dive',
    slug: { _type: 'slug', current: 'typescript-deep-dive' },
    summary: 'Go beyond the basics and write safer, more expressive code.',
    level: 'intermediate',
    price: 79,
    isPopular: true,
    studentCount: 3100,
    instructor: { _type: 'reference', _ref: 'instructor.daniel-okafor' },
    category: { _type: 'reference', _ref: 'category.languages' },
    learningOutcomes: [
      {
        _type: 'learningOutcome',
        _key: 'ts-outcome-0',
        icon: 'layers',
        title: 'Master Structural Typing',
        description: 'Understand duck typing and nominal brand patterns in TypeScript.',
      },
      {
        _type: 'learningOutcome',
        _key: 'ts-outcome-1',
        icon: 'workflow',
        title: 'Advanced Conditional Types',
        description: 'Leverage infer and distributed conditional types with ease.',
      },
      {
        _type: 'learningOutcome',
        _key: 'ts-outcome-2',
        icon: 'gauge',
        title: 'Type Performance & Soundness',
        description: 'Avoid compiler slowdowns with optimized mapped types.',
      },
      {
        _type: 'learningOutcome',
        _key: 'ts-outcome-3',
        icon: 'rocket',
        title: 'Architect Enterprise Codebases',
        description: 'Share type safe contracts between frontend and backend.',
      },
    ],
    modules: tsModuleDocs,
  };
  await client.createOrReplace(tsCourse);
  console.log('Successfully created/replaced course.typescript-deep-dive');
}

seedHomeCourses().catch(console.error);
