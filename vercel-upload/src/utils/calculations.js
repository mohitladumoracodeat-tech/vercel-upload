// Calculation and formatting utilities for tests, metrics, and scoring

export const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const calculateQuizResults = ({
  test,
  questions,
  userAnswers, // { [questionId]: selectedOptionIndex }
  timeTakenSeconds,
  userId,
  userEmail,
}) => {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  let totalMarks = 0;
  let obtainedMarks = 0;

  const detailedQuestions = questions.map((q) => {
    const qMarks = q.marks || 4;
    totalMarks += qMarks;

    const selectedAnswer = userAnswers[q.id];
    const isAnswered = selectedAnswer !== undefined && selectedAnswer !== null;

    let isCorrect = false;
    let marksForThisQuestion = 0;

    if (!isAnswered) {
      unansweredCount++;
    } else if (Number(selectedAnswer) === Number(q.correctAnswer)) {
      isCorrect = true;
      correctCount++;
      marksForThisQuestion = qMarks;
      obtainedMarks += qMarks;
    } else {
      wrongCount++;
      // Optional negative marking could be subtracted here if configured, keeping 0 for now
    }

    return {
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      selectedAnswer: isAnswered ? selectedAnswer : null,
      isCorrect,
      isAnswered,
      explanation: q.explanation,
      marks: qMarks,
      marksObtained: marksForThisQuestion,
      difficulty: q.difficulty || 'Medium',
    };
  });

  const attemptedCount = correctCount + wrongCount;
  const percentage = totalMarks > 0 ? Math.round((obtainedMarks / totalMarks) * 100) : 0;
  const passingScore = test.passingScore || 60;
  const isPassed = percentage >= passingScore;

  // Grade classification
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';

  const resultRecord = {
    id: `res-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    testId: test.id,
    testSlug: test.slug,
    testTitle: test.title,
    category: test.category,
    categoryName: test.categoryName,
    difficulty: test.difficulty,
    userId: userId || 'guest',
    userEmail: userEmail || 'guest@example.com',
    totalQuestions: questions.length,
    attemptedCount,
    unansweredCount,
    correctCount,
    wrongCount,
    totalMarks,
    obtainedMarks,
    percentage,
    passingScore,
    isPassed,
    grade,
    timeTakenSeconds,
    completedAt: new Date().toISOString(),
    answers: userAnswers,
    detailedQuestions,
  };

  return resultRecord;
};

export const calculateDashboardStats = (results = [], allTests = []) => {
  const totalAvailableTests = allTests.length;
  const testsAttempted = results.length;

  if (testsAttempted === 0) {
    return {
      totalAvailableTests,
      testsAttempted: 0,
      averageScore: 0,
      bestScore: 0,
      passedCount: 0,
      failedCount: 0,
      totalTimeSpentMinutes: 0,
      recentHistory: [],
      categoryBreakdown: {},
    };
  }

  const scores = results.map((r) => r.percentage || 0);
  const bestScore = Math.max(...scores);
  const averageScore = Math.round(scores.reduce((acc, curr) => acc + curr, 0) / scores.length);
  const passedCount = results.filter((r) => r.isPassed).length;
  const failedCount = testsAttempted - passedCount;

  const totalTimeSeconds = results.reduce((acc, curr) => acc + (curr.timeTakenSeconds || 0), 0);
  const totalTimeSpentMinutes = Math.round(totalTimeSeconds / 60);

  // Category breakdown
  const categoryBreakdown = {};
  results.forEach((r) => {
    const cat = r.categoryName || r.category || 'General';
    if (!categoryBreakdown[cat]) {
      categoryBreakdown[cat] = { count: 0, totalScore: 0 };
    }
    categoryBreakdown[cat].count += 1;
    categoryBreakdown[cat].totalScore += r.percentage || 0;
  });

  Object.keys(categoryBreakdown).forEach((cat) => {
    categoryBreakdown[cat].avgScore = Math.round(
      categoryBreakdown[cat].totalScore / categoryBreakdown[cat].count
    );
  });

  return {
    totalAvailableTests,
    testsAttempted,
    averageScore,
    bestScore,
    passedCount,
    failedCount,
    totalTimeSpentMinutes,
    recentHistory: results.slice(0, 5),
    categoryBreakdown,
  };
};
