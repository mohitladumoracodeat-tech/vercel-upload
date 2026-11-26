export const QUESTIONS = [
  // --- TEST 1: React 19 & Core Concepts (test-react-core) ---
  {
    id: 'q-react-1',
    testId: 'test-react-core',
    question: 'In React, what is the primary benefit of using the `useMemo` hook?',
    options: [
      'To prevent the component from re-rendering under any circumstances',
      'To cache and memoize the result of an expensive calculation between renders',
      'To create mutable ref objects that persist across re-renders without causing re-renders',
      'To perform side effects such as data fetching and DOM mutations'
    ],
    correctAnswer: 1,
    explanation: '`useMemo` caches the calculated value of a function between re-renders until one of its dependencies changes. This prevents expensive recalculations on every render cycle.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-react-2',
    testId: 'test-react-core',
    question: 'What happens when you update state using `useState` with the exact same primitive value as current state?',
    options: [
      'React throws a runtime warning in development mode',
      'React skips re-rendering the component and its children via Object.is comparison',
      'React triggers a full re-render cycle regardless of value equality',
      'The component unmounts and remounts immediately'
    ],
    correctAnswer: 1,
    explanation: 'React compares the new state with current state using Object.is algorithm. If they are identical primitives, React bails out of re-rendering the component and its descendants.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-react-3',
    testId: 'test-react-core',
    question: 'Why should keys in React lists be stable, unique, and predictable instead of using array indexes when items can be reordered?',
    options: [
      'Using indexes causes React to compile components in quirks mode',
      'Indexes can cause state mismatch bugs in child components and degrade Virtual DOM diffing performance',
      'React does not allow numeric keys and will throw a fatal syntax error',
      'Array indexes consume twice as much memory in the JavaScript heap'
    ],
    correctAnswer: 1,
    explanation: 'When items are reordered, inserted, or removed, index-based keys change for unchanged items, leading to incorrect component state binding, unnecessary DOM mutations, and broken input values.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-react-4',
    testId: 'test-react-core',
    question: 'What is the purpose of React Error Boundaries?',
    options: [
      'To catch asynchronous Promise rejections in fetch API requests',
      'To catch JavaScript errors anywhere in their child component tree and display a fallback UI',
      'To validate PropTypes and TypeScript interface declarations at runtime',
      'To prevent network timeouts during server-side rendering'
    ],
    correctAnswer: 1,
    explanation: 'Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole component tree.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-react-5',
    testId: 'test-react-core',
    question: 'How does React batch state updates in modern React (version 18 and newer)?',
    options: [
      'Only updates inside React synthetic event handlers are batched',
      'All updates inside promises, setTimeout, native event handlers, and React handlers are automatically batched',
      'State updates are never batched unless wrapped in ReactDOM.unstable_batchedUpdates()',
      'Updates are batched strictly once every 100 milliseconds'
    ],
    correctAnswer: 1,
    explanation: 'React 18 introduced Automatic Batching, which batches multiple state updates regardless of where they originate—including inside promises, setTimeout callbacks, and native event handlers.',
    difficulty: 'Hard',
    marks: 4
  },

  // --- TEST 2: Modern JavaScript ES6+ (test-js-modern) ---
  {
    id: 'q-js-1',
    testId: 'test-js-modern',
    question: 'What is the output of `typeof NaN` in JavaScript?',
    options: [
      '"undefined"',
      '"null"',
      '"number"',
      '"nan"'
    ],
    correctAnswer: 2,
    explanation: 'In JavaScript according to IEEE 754 standard, NaN represents "Not-a-Number", but its data type is still numeric, so `typeof NaN === "number"`.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-js-2',
    testId: 'test-js-modern',
    question: 'Which of the following statements about JavaScript closures is TRUE?',
    options: [
      'Closures only work with arrow functions, not standard function declarations',
      'A closure gives an inner function access to its outer function’s scope even after the outer function has finished executing',
      'Closures cause memory leaks in all modern browsers and are deprecated',
      'Variables inside a closure are automatically converted to global variables'
    ],
    correctAnswer: 1,
    explanation: 'A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). It retains access to outer variables even after the outer function returns.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-js-3',
    testId: 'test-js-modern',
    question: 'In the JavaScript Event Loop, what is the correct order of task execution between Microtasks and Macrotasks?',
    options: [
      'Macrotasks (e.g. setTimeout) run before Microtasks (e.g. Promise.then)',
      'All pending microtasks in the microtask queue run to completion before the next macrotask is processed',
      'Microtasks and macrotasks run in parallel using Web Workers',
      'The event loop executes one microtask, then one macrotask alternating one by one'
    ],
    correctAnswer: 1,
    explanation: 'After every macrotask completes (or after synchronous script execution), the JavaScript engine drains the entire microtask queue before picking the next macrotask.',
    difficulty: 'Hard',
    marks: 4
  },
  {
    id: 'q-js-4',
    testId: 'test-js-modern',
    question: 'What is the key difference between `Object.freeze()` and `Object.seal()`?',
    options: [
      '`Object.freeze()` makes properties read-only, while `Object.seal()` allows modifying existing property values but prevents adding/deleting properties',
      '`Object.seal()` converts all properties to symbols',
      '`Object.freeze()` only works on arrays, while `Object.seal()` only works on plain objects',
      'There is no difference; they are exact aliases of each other'
    ],
    correctAnswer: 0,
    explanation: '`Object.freeze()` prevents adding, deleting, and modifying existing properties (writable: false). `Object.seal()` prevents adding or deleting properties, but existing writable properties can still be changed.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-js-5',
    testId: 'test-js-modern',
    question: 'What does `[1, 2, 3] + [4, 5, 6]` evaluate to in JavaScript?',
    options: [
      '[1, 2, 3, 4, 5, 6]',
      '"1,2,34,5,6"',
      'NaN',
      'TypeError: Cannot concatenate arrays'
    ],
    correctAnswer: 1,
    explanation: 'The `+` operator coerces both arrays to strings via `toString()`, resulting in `"1,2,3"` and `"4,5,6"`. Concatenating them produces `"1,2,34,5,6"`.',
    difficulty: 'Medium',
    marks: 4
  },

  // --- TEST 3: Web Fundamentals & Performance (test-web-fundamentals) ---
  {
    id: 'q-web-1',
    testId: 'test-web-fundamentals',
    question: 'What does the `defer` attribute on a `<script>` tag do?',
    options: [
      'Executes the script immediately, blocking HTML parsing',
      'Downloads the script asynchronously and executes it after the HTML document is fully parsed, in document order',
      'Delays script execution by 5000 milliseconds',
      'Prevents the script from executing if user is on a mobile device'
    ],
    correctAnswer: 1,
    explanation: '`defer` scripts download in the background without blocking HTML parsing, and execute in document order right before DOMContentLoaded fires.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-web-2',
    testId: 'test-web-fundamentals',
    question: 'Which HTTP status code indicates that a resource was moved permanently to a new URI?',
    options: [
      '301 Moved Permanently',
      '302 Found',
      '304 Not Modified',
      '307 Temporary Redirect'
    ],
    correctAnswer: 0,
    explanation: 'HTTP 301 is the standard redirect code for permanently moved resources, indicating to clients and search engine crawlers that future requests should use the new URI.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-web-3',
    testId: 'test-web-fundamentals',
    question: 'What are the Core Web Vitals defined by Google for user experience measurement?',
    options: [
      'LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift)',
      'FCP (First Contentful Paint), TTI (Time to Interactive), Speed Index',
      'DNS Lookup Time, SSL Handshake Time, TTFB (Time to First Byte)',
      'DOM Nodes Count, Memory Footprint, CPU Usage'
    ],
    correctAnswer: 0,
    explanation: 'Google Core Web Vitals currently focus on loading speed (LCP), responsiveness / interactivity (INP, which replaced FID), and visual stability (CLS).',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-web-4',
    testId: 'test-web-fundamentals',
    question: 'What is the primary difference between `localStorage` and `sessionStorage`?',
    options: [
      '`localStorage` can only store strings, while `sessionStorage` can store binary blobs',
      '`sessionStorage` data persists only for the duration of the page session (until tab is closed), whereas `localStorage` persists indefinitely until cleared',
      '`localStorage` is accessible across different browser vendors',
      '`sessionStorage` is automatically synchronized with the backend server via cookies'
    ],
    correctAnswer: 1,
    explanation: '`sessionStorage` is scoped to the browser tab/window and cleared when closed. `localStorage` persists across sessions until explicitly deleted by the user or code.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-web-5',
    testId: 'test-web-fundamentals',
    question: 'In CSS Grid Layout, which property defines the size of rows and columns flexibly using fractions of free space?',
    options: [
      'px units',
      '% percentage units',
      'fr unit (fractional unit)',
      'rem unit'
    ],
    correctAnswer: 2,
    explanation: 'The `fr` unit represents a fraction of the available free space in the grid container, making grid layouts flexible and responsive.',
    difficulty: 'Easy',
    marks: 4
  },

  // --- TEST 4: Data Structures & Algorithms (test-dsa-essentials) ---
  {
    id: 'q-dsa-1',
    testId: 'test-dsa-essentials',
    question: 'What is the average time complexity for searching an element in a Balanced Binary Search Tree (such as AVL or Red-Black Tree)?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 1,
    explanation: 'Because the tree height is maintained at approximately log₂(n), searching halves the remaining search space at each step, yielding O(log n) time complexity.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-dsa-2',
    testId: 'test-dsa-essentials',
    question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
    options: [
      'Stack',
      'Queue',
      'Binary Heap',
      'Hash Table'
    ],
    correctAnswer: 1,
    explanation: 'A Queue enforces FIFO (First-In-First-Out) where elements are added at the rear (enqueue) and removed from the front (dequeue).',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-dsa-3',
    testId: 'test-dsa-essentials',
    question: 'What is the worst-case time complexity of QuickSort algorithm?',
    options: [
      'O(n log n)',
      'O(n)',
      'O(n²)',
      'O(2^n)'
    ],
    correctAnswer: 2,
    explanation: 'When the chosen pivot consistently splits the array into 0 and n-1 elements (such as on an already sorted array with first/last element pivot), QuickSort degrades to O(n²).',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-dsa-4',
    testId: 'test-dsa-essentials',
    question: 'Which technique is used to detect cycles in a singly linked list in O(n) time and O(1) extra space?',
    options: [
      'Binary Search',
      'Floyd’s Cycle-Finding Algorithm (Tortoise and Hare)',
      'Dijkstra’s Algorithm',
      'Depth First Search with visited Hash Map'
    ],
    correctAnswer: 1,
    explanation: 'Floyd’s algorithm uses two pointers moving at different speeds (slow moves 1 step, fast moves 2 steps). If a cycle exists, they are guaranteed to meet inside the cycle with O(1) memory.',
    difficulty: 'Hard',
    marks: 4
  },
  {
    id: 'q-dsa-5',
    testId: 'test-dsa-essentials',
    question: 'What is the best algorithmic approach for finding the shortest path in an unweighted graph?',
    options: [
      'Breadth-First Search (BFS)',
      'Depth-First Search (DFS)',
      'Prim’s Minimum Spanning Tree',
      'Kruskal’s Algorithm'
    ],
    correctAnswer: 0,
    explanation: 'BFS explores vertices layer by layer in order of their distance from the source vertex, guaranteeing the shortest path in unweighted graphs in O(V + E) time.',
    difficulty: 'Medium',
    marks: 4
  },

  // --- TEST 5: General Aptitude & Logical Reasoning (test-aptitude-reasoning) ---
  {
    id: 'q-apt-1',
    testId: 'test-aptitude-reasoning',
    question: 'Look at this series: 2, 4, 8, 16, 32, ... What number should come next?',
    options: [
      '48',
      '64',
      '56',
      '72'
    ],
    correctAnswer: 1,
    explanation: 'This is a geometric progression where each term is multiplied by 2. 32 × 2 = 64.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-apt-2',
    testId: 'test-aptitude-reasoning',
    question: 'A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?',
    options: [
      '120 meters',
      '180 meters',
      '150 meters',
      '324 meters'
    ],
    correctAnswer: 2,
    explanation: 'Speed = 60 × (5/18) m/s = 50/3 m/s. Length of train = Speed × Time = (50/3) × 9 = 150 meters.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-apt-3',
    testId: 'test-aptitude-reasoning',
    question: 'If "CAT" is coded as 24 (C=3, A=1, T=20), how is "DOG" coded using the same pattern?',
    options: [
      '26',
      '28',
      '30',
      '24'
    ],
    correctAnswer: 0,
    explanation: 'Sum of alphabetical positions: D = 4, O = 15, G = 7. 4 + 15 + 7 = 26.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-apt-4',
    testId: 'test-aptitude-reasoning',
    question: 'If 5 workers can build 5 tables in 5 days, how many days will 10 workers take to build 10 tables at the same rate?',
    options: [
      '10 days',
      '5 days',
      '2.5 days',
      '1 day'
    ],
    correctAnswer: 1,
    explanation: '5 workers build 5 tables in 5 days means 1 worker builds 1 table in 5 days. Therefore, 10 workers can build 10 tables together in 5 days.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-apt-5',
    testId: 'test-aptitude-reasoning',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only son of my mother." How is Suresh related to that boy?',
    options: [
      'Brother',
      'Uncle',
      'Father',
      'Cousin'
    ],
    correctAnswer: 2,
    explanation: '"The only son of my mother" is Suresh himself. Therefore, the boy is Suresh’s son, meaning Suresh is his father.',
    difficulty: 'Easy',
    marks: 4
  },

  // --- TEST 6: Backend, Cloud & APIs (test-backend-cloud) ---
  {
    id: 'q-back-1',
    testId: 'test-backend-cloud',
    question: 'Which HTTP method is considered idempotent according to RFC 7231 specifications?',
    options: [
      'POST',
      'PUT',
      'PATCH (by default specification)',
      'CONNECT'
    ],
    correctAnswer: 1,
    explanation: 'An idempotent HTTP method produces the exact same result on the server regardless of how many times it is called. PUT, GET, DELETE, and HEAD are idempotent; POST is not.',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-back-2',
    testId: 'test-backend-cloud',
    question: 'What is the main role of a Reverse Proxy (such as Nginx or Traefik) in modern web architecture?',
    options: [
      'To compile frontend React source code into WebAssembly',
      'To sit between internet clients and origin backend servers for load balancing, SSL termination, and caching',
      'To replace relational database management systems',
      'To act as a browser-side local storage engine'
    ],
    correctAnswer: 1,
    explanation: 'A reverse proxy intercepts client requests before they hit backend servers, handling tasks like SSL termination, compression, load balancing, security firewalls, and response caching.',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-back-3',
    testId: 'test-backend-cloud',
    question: 'In JWT (JSON Web Tokens), what are the three dot-separated components in order?',
    options: [
      'Header, Payload, Signature',
      'Issuer, Token, Expiry',
      'Algorithm, Hash, Salt',
      'Client, Secret, Session'
    ],
    correctAnswer: 0,
    explanation: 'A JWT consists of three Base64URL-encoded parts separated by dots: Header (metadata/algorithm), Payload (claims/data), and Signature (cryptographic hash).',
    difficulty: 'Easy',
    marks: 4
  },
  {
    id: 'q-back-4',
    testId: 'test-backend-cloud',
    question: 'What does the ACID acronym stand for in database transaction management?',
    options: [
      'Accuracy, Consistency, Isolation, Durability',
      'Atomicity, Consistency, Isolation, Durability',
      'Authentication, Cryptography, Integrity, Decryption',
      'Asynchronous, Concurrent, Indexed, Distributed'
    ],
    correctAnswer: 1,
    explanation: 'ACID guarantees that database transactions are processed reliably: Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrency control), and Durability (persistence).',
    difficulty: 'Medium',
    marks: 4
  },
  {
    id: 'q-back-5',
    testId: 'test-backend-cloud',
    question: 'What is containerization technology (e.g. Docker) primarily designed to achieve?',
    options: [
      'Simulate an entire physical computer hardware including BIOS and virtualization overhead',
      'Package code and all its dependencies together so an application runs quickly and reliably across computing environments',
      'Compress source files into zip archives for distribution',
      'Format hard drive partitions automatically'
    ],
    correctAnswer: 1,
    explanation: 'Docker containers package application code with system tools, libraries, and runtime dependencies, sharing the host OS kernel for lightweight, portable deployment.',
    difficulty: 'Easy',
    marks: 4
  }
];
