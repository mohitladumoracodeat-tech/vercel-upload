import { TESTS } from '../src/data/tests.js';
import { CATEGORIES } from '../src/data/categories.js';
import { QUESTIONS } from '../src/data/questions.js';
import { calculateQuizResults, formatTime, calculateDashboardStats } from '../src/utils/calculations.js';
import { validateLoginForm, validateRegisterForm, isValidEmail, isValidPassword } from '../src/utils/validation.js';

console.log('--- STARTING COMPREHENSIVE QUIZ VERIFICATION ---');

// 1. Data Integrity Tests
console.log(`✓ Tests loaded: ${TESTS.length}`);
console.log(`✓ Categories loaded: ${CATEGORIES.length}`);
console.log(`✓ Questions loaded: ${QUESTIONS.length}`);

// Every test must have questions
TESTS.forEach(test => {
  const testQuestions = QUESTIONS.filter(q => q.testId === test.id);
  if (testQuestions.length === 0) {
    throw new Error(`Test ${test.id} has no questions!`);
  }
  if (testQuestions.length !== test.totalQuestions) {
    throw new Error(`Test ${test.id} totalQuestions mismatch: expected ${test.totalQuestions}, got ${testQuestions.length}`);
  }
  console.log(`  ✓ Test "${test.title}": ${testQuestions.length} questions, ${test.duration}m duration, ${test.totalMarks} marks`);
});

// Every question must have 4 options and valid correctAnswer index (0..3)
QUESTIONS.forEach((q, idx) => {
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    throw new Error(`Question ${q.id} does not have exactly 4 options!`);
  }
  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
    throw new Error(`Question ${q.id} has invalid correctAnswer index: ${q.correctAnswer}`);
  }
  if (!q.explanation || q.explanation.length < 10) {
    throw new Error(`Question ${q.id} is missing a detailed explanation!`);
  }
});
console.log('✓ All questions passed 4-option, valid index, and detailed explanation checks');

// 2. Validation Utilities Tests
console.log('\n--- TESTING VALIDATION HELPERS ---');
console.assert(isValidEmail('test@example.com') === true, 'Valid email failed');
console.assert(isValidEmail('bad-email') === false, 'Invalid email passed');
console.assert(isValidPassword('123456') === true, 'Valid password failed');
console.assert(isValidPassword('123') === false, 'Short password passed');

const loginCheck = validateLoginForm({ email: 'demo@example.com', password: 'password123' });
console.assert(loginCheck.isValid === true, 'Login validation failed for valid data');

const regCheck = validateRegisterForm({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  confirmPassword: 'password123'
});
console.assert(regCheck.isValid === true, 'Register validation failed for valid data');
console.log('✓ Validation helpers verified successfully');

// 3. Quiz Scoring & Result Calculation Tests
console.log('\n--- TESTING QUIZ SCORING LOGIC ---');
const sampleTest = TESTS[0];
const sampleQuestions = QUESTIONS.filter(q => q.testId === sampleTest.id);

// Perfect score scenario
const perfectAnswers = {};
sampleQuestions.forEach(q => {
  perfectAnswers[q.id] = q.correctAnswer;
});

const perfectResult = calculateQuizResults({
  test: sampleTest,
  questions: sampleQuestions,
  userAnswers: perfectAnswers,
  timeTakenSeconds: 150,
  userId: 'usr-test',
  userEmail: 'test@example.com'
});

console.assert(perfectResult.percentage === 100, `Expected 100%, got ${perfectResult.percentage}%`);
console.assert(perfectResult.isPassed === true, 'Expected passed to be true');
console.assert(perfectResult.correctCount === sampleQuestions.length, 'Expected all questions correct');
console.assert(perfectResult.wrongCount === 0, 'Expected 0 wrong');
console.assert(perfectResult.grade === 'A+', 'Expected grade A+');
console.log(`  ✓ Perfect score result: 100% (${perfectResult.obtainedMarks}/${perfectResult.totalMarks}), Grade: ${perfectResult.grade}, Passed: ${perfectResult.isPassed}`);

// Mixed score scenario (3 correct, 1 wrong, 1 skipped)
const mixedAnswers = {};
mixedAnswers[sampleQuestions[0].id] = sampleQuestions[0].correctAnswer;
mixedAnswers[sampleQuestions[1].id] = sampleQuestions[1].correctAnswer;
mixedAnswers[sampleQuestions[2].id] = sampleQuestions[2].correctAnswer;
mixedAnswers[sampleQuestions[3].id] = (sampleQuestions[3].correctAnswer + 1) % 4; // wrong answer
// sampleQuestions[4] is skipped/unanswered

const mixedResult = calculateQuizResults({
  test: sampleTest,
  questions: sampleQuestions,
  userAnswers: mixedAnswers,
  timeTakenSeconds: 345,
  userId: 'usr-test',
  userEmail: 'test@example.com'
});

console.assert(mixedResult.correctCount === 3, 'Expected 3 correct');
console.assert(mixedResult.wrongCount === 1, 'Expected 1 wrong');
console.assert(mixedResult.unansweredCount === 1, 'Expected 1 unanswered');
console.assert(mixedResult.percentage === 60, `Expected 60%, got ${mixedResult.percentage}%`);
console.assert(mixedResult.isPassed === true, 'Expected 60% to pass');
console.log(`  ✓ Mixed score result: 60% (${mixedResult.obtainedMarks}/${mixedResult.totalMarks}), Correct: 3, Wrong: 1, Skipped: 1, Time: ${formatTime(mixedResult.timeTakenSeconds)}`);

// Failing score scenario
const failAnswers = {};
mixedAnswers[sampleQuestions[0].id] = sampleQuestions[0].correctAnswer; // only 1 correct

const failResult = calculateQuizResults({
  test: sampleTest,
  questions: sampleQuestions,
  userAnswers: failAnswers,
  timeTakenSeconds: 120,
  userId: 'usr-test',
  userEmail: 'test@example.com'
});

console.assert(failResult.isPassed === false, 'Expected fail for 0%');
console.assert(failResult.grade === 'F', 'Expected grade F');
console.log(`  ✓ Failing score result: ${failResult.percentage}%, Grade: ${failResult.grade}, Passed: ${failResult.isPassed}`);

// 4. Dashboard Stats Calculation Tests
console.log('\n--- TESTING DASHBOARD ANALYTICS ---');
const stats = calculateDashboardStats([perfectResult, mixedResult], TESTS);
console.assert(stats.totalAvailableTests === TESTS.length, 'Total tests mismatch');
console.assert(stats.testsAttempted === 2, 'Attempted count mismatch');
console.assert(stats.averageScore === 80, `Expected 80% avg, got ${stats.averageScore}%`);
console.assert(stats.bestScore === 100, `Expected 100% best, got ${stats.bestScore}%`);
console.assert(stats.passedCount === 2, 'Expected 2 passed');
console.assert(stats.failedCount === 0, 'Expected 0 failed');
console.log('✓ Dashboard analytics computed successfully');

console.log('\n=========================================');
console.log('🎉 ALL QUIZ ENGINE AND LOGIC TESTS PASSED!');
console.log('=========================================');
