# QuizPulse — Online Quiz & Assessment Platform

A modern, responsive, frontend-only Online Quiz & Test Application built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router DOM**. Data persistence is managed via **HTML5 LocalStorage** and static JavaScript mock datasets with zero external backend or database dependencies.

---

## 🚀 Live Demo Credentials

For rapid evaluation, a pre-seeded candidate demo account is available:
- **Email:** `demo@example.com`
- **Password:** `password123`
- *Or click the **"Auto Fill"** button directly on the Sign In page.*

New accounts can also be created on the Register page.

---

## 🛠️ Technology Stack

- **Framework:** React 19 (Vite 8)
- **Language:** JavaScript (ES6+)
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS (@tailwindcss/vite)
- **Icons:** Lucide React
- **Notifications & Dialogs:** SweetAlert2
- **Audio Feedback:** Synthesizer via Web Audio API (zero external assets)
- **Celebration Confetti:** Canvas-Confetti
- **State & Storage:** React Context API + LocalStorage

---

## 📋 Features Implemented

### 1. Application Pages (12 Pages)
1. **Home Page (`/`)**: Hero section, statistics, category cards, featured test challenges, interactive workflow guide, and footer.
2. **Login Page (`/login`)**: Email and password validation, show/hide password toggle, 1-click demo login auto-fill, and session restore.
3. **Register Page (`/register`)**: Name, email, password strength checks, confirm password validation, and LocalStorage persistence.
4. **Dashboard (`/dashboard`)**: Metric cards (available tests, attempted, average score %, best score %), domain performance progress bars, and recent attempt history table.
5. **All Tests Page (`/tests`)**: Filter by category, filter by difficulty (Easy, Medium, Hard), search by keyword/syllabus, and sort by popularity, duration, or question count.
6. **Test Instructions Page (`/instructions/:testId`)**: Detailed test guidelines, syllabus, marking scheme, acknowledgement checkbox, and start confirmation.
7. **Quiz / Test Attempt Page (`/quiz/:testId`)**:
   - Single-choice Multiple Choice Questions (4 options per question).
   - Real-time countdown timer with color warnings (< 2 minutes) and auto-submit on `00:00`.
   - Question Navigator palette (Answered, Unanswered, Marked for Review, Current Question).
   - Mark question for review.
   - Clear selection button.
   - Next and Previous buttons with auto-advance support.
   - Submit confirmation modal displaying answered/unanswered summary.
   - Multi-submission protection and reload persistence draft.
8. **Test Result Page (`/result`)**:
   - Score percentage, letter grade (A+, A, B, C, D, F), and Pass/Fail status.
   - Metrics breakdown: correct, wrong, unanswered, and time taken.
   - Question-by-question review displaying chosen answer vs correct answer and comprehensive explanations.
   - Retake test, Share score, and return to dashboard actions.
9. **My Results Page (`/my-results`)**:
   - Historical test records list.
   - Filter by status (Passed / Failed), sort by date or score, search by test title.
   - Delete individual attempt with SweetAlert2 confirmation, or clear all history.
10. **Profile Page (`/profile`)**:
    - Update candidate name, email, and role/specialization.
    - Change password with current password verification.
    - Candidate statistics and join date.
11. **Settings Page (`/settings`)**:
    - Light / Dark mode toggle.
    - Audio sound effects toggle with test chime.
    - Auto-advance on option select toggle.
    - Critical timer warning chime toggle.
    - Danger zone: Reset all application data with factory reseed.
12. **404 Not Found Page (`*`)**:
    - Friendly not found page with quick navigation back to Home or Tests catalog.

---

## 📁 Project Architecture

```
vercel-upload/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx
│   │   │   ├── DynamicIcon.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── layout/
│   │       ├── AppLayout.jsx
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       └── Footer.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── QuizContext.jsx
│   ├── data/
│   │   ├── categories.js
│   │   ├── questions.js
│   │   └── tests.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useQuiz.js
│   │   └── useTheme.js
│   ├── pages/
│   │   ├── AllTests.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyResults.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── QuizAttempt.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   ├── TestInstructions.jsx
│   │   └── TestResult.jsx
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── sound.js
│   │   ├── storage.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── vercel.json
└── package.json
```

---

## 🚢 Deployment to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into Vercel.
3. If deploying from the root workspace, set the **Root Directory** to `vercel-upload`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. `vercel.json` is already pre-configured for SPA client-side routing rewrites.
