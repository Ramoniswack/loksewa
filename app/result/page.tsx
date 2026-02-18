"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { QuizResult } from "@/types";
import { Book, CheckCircle2, Star, ThumbsUp, XCircle } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function ResultContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [previousResults, setPreviousResults] = useState<QuizResult[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isLoadingResult, setIsLoadingResult] = useState(true);

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Make sure we're in the browser and authenticated
    if (typeof window === 'undefined') return;
    if (status === "loading") return;
    if (status === "unauthenticated") return;

    // Try to get result from URL parameter 'id' or 'data'
    const resultId = searchParams.get("id");
    const dataParam = searchParams.get("data");
    
    if (!resultId && !dataParam) {
      router.push("/dashboard");
      return;
    }

    let currentResult: QuizResult | null = null;

    // Method 1: Get from localStorage using ID (new method)
    if (resultId) {
      try {
        const stored = localStorage.getItem(resultId);
        console.log("Looking for result with ID:", resultId);
        console.log("Found in localStorage:", stored ? "Yes" : "No");
        
        if (stored) {
          currentResult = JSON.parse(stored);
          console.log("Successfully parsed result:", currentResult);
          
          // Clean up - remove the temporary result after reading
          setTimeout(() => {
            localStorage.removeItem(resultId);
          }, 100);
        } else {
          console.warn(`Result with ID ${resultId} not found in localStorage`);

          // Fallback: try 'lastResult' (saved by quiz page) or match against quizResults history
          try {
            const last = localStorage.getItem('lastResult');
            if (last) {
              const parsedLast = JSON.parse(last);
              const idTs = parseInt(resultId.replace(/^result_/, ''), 10);
              const lastTs = Date.parse(parsedLast.date || '');

              // Accept 'lastResult' if timestamps are close (same submission)
              if (!isNaN(idTs) && !isNaN(lastTs) && Math.abs(idTs - lastTs) < 10000) {
                currentResult = parsedLast;
                console.warn('Recovered result from lastResult fallback');
              }
            }

            // If still not found, try to recover from quizResults history
            if (!currentResult) {
              const savedHistory = localStorage.getItem('quizResults');
              if (savedHistory) {
                const allResults = JSON.parse(savedHistory);
                const idTs2 = parseInt(resultId.replace(/^result_/, ''), 10);

                if (!isNaN(idTs2)) {
                  const match = allResults.find((r: any) => Math.abs(Date.parse(r.date) - idTs2) < 10000);
                  if (match) {
                    currentResult = match;
                    console.warn('Recovered result from quizResults history (matched by timestamp)');
                  }
                }

                // Fallback to the most recent entry if nothing matched
                if (!currentResult && allResults.length > 0) {
                  currentResult = allResults[allResults.length - 1];
                  console.warn('Recovered most recent result from quizResults history as fallback');
                }
              }
            }
          } catch (err) {
            console.warn('Fallback recovery failed:', err);
          }
        }
      } catch (err) {
        console.error("Failed to parse result from localStorage:", err);
      }
    }

    // Method 2: Parse from URL data parameter (fallback for old method)
    if (!currentResult && dataParam) {
      console.log("Trying to parse from URL data parameter");
      const attempts = [
        (d: string) => JSON.parse(d),
        (d: string) => JSON.parse(decodeURIComponent(d)),
        (d: string) => JSON.parse(decodeURIComponent(decodeURIComponent(d))),
      ];

      for (const attempt of attempts) {
        try {
          currentResult = attempt(dataParam) as QuizResult;
          console.log("Successfully parsed from URL");
          break;
        } catch (err) {
          // continue to next attempt
        }
      }
    }

    if (!currentResult) {
      console.error("Failed to load result data. ResultId:", resultId, "DataParam:", dataParam ? "exists" : "missing");
      setParseError("Unable to load quiz result. Please try again.");
      setIsLoadingResult(false);
      return;
    }

    // Sanitize numeric fields to avoid NaN in charts and UI
    const sanitize = (r: any) => {
      const parsedSetId = Number.parseInt(String(r?.setId ?? ""), 10);
      const questionsArr = Array.isArray(r?.questions) ? r.questions : [];
      const total = Number.isFinite(Number(r?.totalQuestions)) ? Number(r.totalQuestions) : questionsArr.length || 0;
      const correct = Number.isFinite(Number(r?.correctAnswers)) ? Number(r.correctAnswers) : 0;
      const wrong = Number.isFinite(Number(r?.wrongAnswers)) ? Number(r.wrongAnswers) : Math.max(0, total - correct);
      const score = Number.isFinite(Number(r?.score))
        ? Math.round(Number(r.score))
        : (total > 0 ? Math.round((correct / total) * 100) : 0);

      return {
        ...r,
        setId: Number.isNaN(parsedSetId) ? 0 : parsedSetId,
        totalQuestions: total,
        correctAnswers: correct,
        wrongAnswers: wrong,
        score,
        questions: questionsArr,
        userAnswers: Array.isArray(r?.userAnswers) ? r.userAnswers : [],
        date: r?.date || new Date().toISOString(),
      } as QuizResult;
    };

    const sanitized = sanitize(currentResult);
    setResult(sanitized);
    setIsLoadingResult(false);

    // Get previous results for this set (from localStorage)
    try {
      const saved = localStorage.getItem("quizResults");
      if (saved) {
        const allResults = JSON.parse(saved);
        const sameSetResults = allResults.filter(
          (r: QuizResult) => r.setId === sanitized.setId && r.date !== sanitized.date
        );
        // Ensure previous results have numeric scores
        const normalized = sameSetResults.map((r: any) => ({
          ...r,
          score: Number.isFinite(Number(r?.score)) ? Math.round(Number(r.score)) : 0,
          totalQuestions: Number.isFinite(Number(r?.totalQuestions)) ? Number(r.totalQuestions) : (Array.isArray(r?.questions) ? r.questions.length : 0),
        } as QuizResult));
        setPreviousResults(normalized.slice(-5)); // Last 5 attempts
      }
    } catch (err) {
      console.warn("Could not read previous quizResults from localStorage:", err);
    }
  }, [status, searchParams, router]);

  if (status === "loading" || isLoadingResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (parseError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="card text-center">
              <p className="text-red-600 font-semibold mb-2">Error: {parseError}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Unable to load quiz result.</p>
              <div className="flex gap-4 justify-center">
                <Link href="/dashboard" className="btn-primary">Back to Dashboard</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!result) {
    // still waiting for the parsed result to be set (or we redirected)
    return null;
  }

  const chartData = {
    labels: [t("correctAnswers"), t("wrongAnswers")],
    datasets: [
      {
        data: [result.correctAnswers, result.wrongAnswers],
        backgroundColor: ['#10b981', '#ef4444'],
        borderColor: ['#059669', '#dc2626'],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
    },
  };

  // Comparison chart data
  const comparisonData = {
    labels: [
      ...previousResults.map((_, i) => `${language === "np" ? "प्रयास" : "Attempt"} ${i + 1}`),
      language === "np" ? "यो प्रयास" : "This Attempt"
    ],
    datasets: [
      {
        label: language === "np" ? "अंक %" : "Score %",
        data: [...previousResults.map(r => r.score), result.score],
        backgroundColor: [...previousResults.map(() => '#94a3b8'), '#0056e0'],
        borderColor: [...previousResults.map(() => '#64748b'), '#00337a'],
        borderWidth: 2,
      },
    ],
  };

  const comparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Result Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
                          {result.score >= 80 ? (
                  <Star className="text-green-600 w-16 h-16 mx-auto" />
                ) : result.score >= 60 ? (
                  <ThumbsUp className="text-yellow-600 w-16 h-16 mx-auto" />
                ) : (
                  <Book className="text-blue-600 w-16 h-16 mx-auto" />
                )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {t("quizResults")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t(`set${result.setId}Title`)}
            </p>
          </div>

          {/* Score Card */}
          <div className="card mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {language === "np" ? "तपाईंको अंक" : "Your Score"}
            </p>
            <p className={`text-6xl font-bold mb-4 ${
              result.score >= 80 ? 'text-green-600' : 
              result.score >= 60 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {result.score}%
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {result.correctAnswers} {t("of")} {result.totalQuestions} {t("correctAnswers")}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="card text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {t("totalQuestions")}
              </p>
              <p className="text-3xl font-bold text-primary-600">
                {result.totalQuestions}
              </p>
            </div>

            <div className="card text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {t("correctAnswers")}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {result.correctAnswers}
              </p>
            </div>

            <div className="card text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {t("wrongAnswers")}
              </p>
              <p className="text-3xl font-bold text-red-600">
                {result.wrongAnswers}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              {language === "np" ? "नतिजा विश्लेषण" : "Result Analysis"}
            </h2>
            <div className="h-64">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Comparison Chart */}
          {previousResults.length > 0 && (
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                {language === "np" ? "प्रगति तुलना" : "Progress Comparison"}
              </h2>
              <div className="h-64">
                <Bar data={comparisonData} options={comparisonOptions} />
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                {language === "np" 
                  ? `पहिलो प्रयास: ${previousResults[0]?.score}% → यो प्रयास: ${result.score}%`
                  : `First Attempt: ${previousResults[0]?.score}% → This Attempt: ${result.score}%`
                }
                {previousResults.length > 0 && (
                  <span className={`ml-2 font-semibold ${
                    result.score > previousResults[previousResults.length - 1].score 
                      ? 'text-green-600' 
                      : result.score < previousResults[previousResults.length - 1].score
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}>
                    {result.score > previousResults[previousResults.length - 1].score 
                      ? `↑ +${result.score - previousResults[previousResults.length - 1].score}%`
                      : result.score < previousResults[previousResults.length - 1].score
                      ? `↓ ${result.score - previousResults[previousResults.length - 1].score}%`
                      : '→ Same'
                    }
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Show Answers Button */}
          <div className="card mb-6">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="w-full btn-secondary"
            >
              {showAnswers 
                ? (language === "np" ? "उत्तरहरू लुकाउनुहोस्" : "Hide Answers")
                : (language === "np" ? "सही उत्तरहरू हेर्नुहोस्" : "Show Correct Answers")
              }
            </button>
          </div>

         
          {/* Answers Review */}
{showAnswers && result.questions && result.userAnswers && (
  <div className="card mb-6">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
      {language === "np" ? "उत्तर समीक्षा" : "Answer Review"}
    </h2>

    <div className="space-y-6">
      {result.questions.map((question, index) => {
        const userAnswer = result.userAnswers![index];
        const correctAnswer = question.correct_answer;
        const isCorrect = userAnswer === correctAnswer;

        return (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${
              isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-red-500 bg-red-50 dark:bg-red-900/20"
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              )}

              <div className="flex-1">
                {/* Question */}
                <p className="font-semibold text-gray-800 dark:text-white mb-2">
                  {language === "np" ? "प्रश्न" : "Question"} {index + 1}:{" "}
                  {language === "en"
                    ? question.question_en
                    : question.question_np}
                </p>

                {/* If Wrong Show Message */}
                {!isCorrect && (
                  <p className="text-red-600 font-semibold mb-3">
                    {language === "np"
                      ? "तपाईंले गलत उत्तर छान्नुभयो"
                      : "You selected wrong answer"}
                  </p>
                )}

                {/* Options */}
                <div className="space-y-2 ml-4">
                  {(language === "en"
                    ? question.options_en
                    : question.options_np
                  ).map((option, optIndex) => {
                    const isUserAnswer = userAnswer === optIndex;
                    const isCorrectOption = correctAnswer === optIndex;

                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border transition-all ${
                          isCorrectOption
                            ? "border-green-500 bg-green-100 dark:bg-green-900/30"
                            : isUserAnswer && !isCorrect
                            ? "border-red-500 bg-red-100 dark:bg-red-900/30"
                            : "border-gray-300 bg-gray-50 dark:bg-gray-700"
                        }`}
                      >
                        {/* Option Label */}
                        <span className="font-bold mr-2 text-lg">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>

                        {/* Option Text */}
                        {option}

                        {/* Correct Tag */}
                        {isCorrectOption && (
                          <span className="ml-3 text-green-700 dark:text-green-300 font-semibold">
                            ✓{" "}
                            {language === "np"
                              ? "सही उत्तर"
                              : "Correct Answer"}
                          </span>
                        )}

                        {/* Wrong Selected Tag */}
                        {isUserAnswer && !isCorrect && (
                          <span className="ml-3 text-red-700 dark:text-red-300 font-semibold">
                            ✗{" "}
                            {language === "np"
                              ? "तपाईंले छान्नुभयो"
                              : "You Selected"}
                          </span>
                        )}

                        {/* Correct Selected Tag */}
                        {isUserAnswer && isCorrect && (
                          <span className="ml-3 text-blue-700 dark:text-blue-300 font-semibold">
                            ★{" "}
                            {language === "np"
                              ? "तपाईंको सही उत्तर"
                              : "Your Correct Choice"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 text-center btn-primary"
            >
              {t("backToDashboard")}
            </Link>
            <Link
              href={`/quiz/${result.setId}`}
              className="flex-1 text-center btn-secondary"
            >
              {t("retakeQuiz")}
            </Link>
          </div>

          {/* Motivational Message */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-center">
            <p className="text-gray-700 dark:text-gray-200">
              {result.score >= 80
                ? language === "np"
                  ? "उत्कृष्ट! तपाईं राम्रो गर्दै हुनुहुन्छ!"
                  : "Excellent! You're doing great!"
                : result.score >= 60
                ? language === "np"
                  ? "राम्रो! अझै सुधार गर्न सक्नुहुन्छ।"
                  : "Good! You can improve further."
                : language === "np"
                ? "अझै अभ्यास गर्नुहोस्। तपाईं गर्न सक्नुहुन्छ!"
                : "Keep practicing! You can do it!"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
 