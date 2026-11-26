export const TESTS = [
  {
    id: 'test-react-core',
    slug: 'react-19-core-mastery',
    title: 'React 19 & Core Concepts',
    category: 'frontend',
    categoryName: 'Frontend & React',
    difficulty: 'Medium',
    duration: 10, // minutes
    totalQuestions: 5,
    totalMarks: 20,
    passingScore: 60, // percentage
    description: 'Evaluate your mastery of React 19 hooks, state batching, Virtual DOM reconciliation, and error boundaries.',
    icon: 'Code2',
    color: '#4F46E5',
    badge: 'Popular',
    attemptsCount: 1420,
    rating: 4.9,
    syllabus: [
      'React Hooks: useMemo, useCallback, useRef, useState',
      'Automatic batching and concurrent rendering',
      'Virtual DOM diffing algorithms and stable keys',
      'Error boundaries and lifecycle management'
    ]
  },
  {
    id: 'test-js-modern',
    slug: 'modern-javascript-es6-plus',
    title: 'Modern JavaScript (ES6+)',
    category: 'javascript',
    categoryName: 'JavaScript Mastery',
    difficulty: 'Hard',
    duration: 12,
    totalQuestions: 5,
    totalMarks: 20,
    passingScore: 60,
    description: 'Deep dive into event loop queues, closures, prototypes, type coercion quirks, and object immutability.',
    icon: 'Cpu',
    color: '#F59E0B',
    badge: 'Hot',
    attemptsCount: 2180,
    rating: 4.8,
    syllabus: [
      'Event loop: Macrotasks vs Microtasks',
      'Lexical scope and closures',
      'Object.freeze vs Object.seal and prototype chain',
      'Type coercion and primitives'
    ]
  },
  {
    id: 'test-web-fundamentals',
    slug: 'web-fundamentals-performance',
    title: 'Web Fundamentals & Performance',
    category: 'web-fundamentals',
    categoryName: 'Web Fundamentals',
    difficulty: 'Easy',
    duration: 8,
    totalQuestions: 5,
    totalMarks: 20,
    passingScore: 50,
    description: 'Test your understanding of HTTP specifications, Core Web Vitals, CSS Grid fr units, and web storage.',
    icon: 'Globe',
    color: '#06B6D4',
    badge: 'Beginner Friendly',
    attemptsCount: 980,
    rating: 4.7,
    syllabus: [
      'Script loading: defer vs async',
      'HTTP status codes and caching',
      'Core Web Vitals (LCP, INP, CLS)',
      'Web Storage APIs (localStorage vs sessionStorage)'
    ]
  },
  {
    id: 'test-dsa-essentials',
    slug: 'dsa-and-algorithms-essentials',
    title: 'Data Structures & Algorithms',
    category: 'dsa',
    categoryName: 'Data Structures & CS',
    difficulty: 'Hard',
    duration: 15,
    totalQuestions: 5,
    totalMarks: 20,
    passingScore: 60,
    description: 'Analyze time/space complexities, graph traversal, cycle detection, trees, and classic sorting algorithms.',
    icon: 'Database',
    color: '#10B981',
    badge: 'Challenging',
    attemptsCount: 1640,
    rating: 4.9,
    syllabus: [
      'Binary Search Trees and time complexity',
      'QuickSort worst vs average cases',
      'Floyd’s cycle detection algorithm',
      'Breadth First Search (BFS) in unweighted graphs'
    ]
  },
  {
    id: 'test-aptitude-reasoning',
    slug: 'logical-aptitude-reasoning',
    title: 'General Aptitude & Reasoning',
    category: 'aptitude',
    categoryName: 'General Aptitude',
    difficulty: 'Easy',
    duration: 10,
    totalQuestions: 5,
    totalMarks: 20,
    passingScore: 50,
    description: 'Sharpen your analytical problem solving with number sequences, speed-time-distance, and blood relations.',
    icon: 'BrainCircuit',
    color: '#EC4899',
    badge: 'Quick Test',
    attemptsCount: 1890,
    rating: 4.6,
    syllabus: [
      'Number and geometric series',
      'Speed, distance and time word problems',
      'Alphabetical coding patterns',
      'Work rate and logical relations'
    ]
  },
  {
    id: 'test-backend-cloud',
    slug: 'backend-apis-cloud-computing',
    title: 'Backend, APIs & Cloud Architecture',
    category: 'backend-devops',
    categoryName: 'Backend & Cloud',
    difficulty: 'Medium',
    duration: 12,
    totalQuestions: 5,
    totalMarks: 20,
    passingScore: 60,
    description: 'Evaluate your knowledge of RESTful API design, JWT authentication, reverse proxies, and database ACID properties.',
    icon: 'Server',
    color: '#8B5CF6',
    badge: 'Trending',
    attemptsCount: 1120,
    rating: 4.8,
    syllabus: [
      'HTTP idempotency: PUT vs POST',
      'Reverse proxy architecture (Nginx, Traefik)',
      'JWT token structure (Header, Payload, Signature)',
      'ACID transactions and containerization'
    ]
  }
];
