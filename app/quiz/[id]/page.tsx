"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Question } from "@/types";

export default function QuizPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { t, language } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const setId = params.id as string;

  // ✅ Load Firebase user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("firebaseUser");
    if (savedUser) setFirebaseUser(JSON.parse(savedUser));
    setAuthChecked(true);
  }, []);

  // ✅ Universal auth check: NextAuth OR Firebase
  useEffect(() => {
    if (!authChecked) return;

    const isLoggedIn =
      status === "authenticated" || !!firebaseUser || !!localStorage.getItem("firebaseUser");

    if (!isLoggedIn && status !== "loading") {
      router.push("/login");
    }
  }, [status, firebaseUser, authChecked, router]);

  // ✅ Load quiz questions
  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch(`/data/questions/set${setId}.json`);
        if (!response.ok) throw new Error(`Failed to load questions: ${response.status}`);

        const data = await response.json();
        if (!data || data.length === 0) throw new Error("No questions found");

        setQuestions(data);
        setSelectedAnswers(new Array(data.length).fill(-1));
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        alert(
          language === "np"
            ? "प्रश्नहरू लोड गर्न असफल भयो। कृपया पुन: प्रयास गर्नुहोस्।"
            : "Failed to load questions. Please try again."
        );
        router.push("/dashboard");
      }
    }

    if (setId) loadQuestions();
  }, [setId, router, language]);

  // ✅ Timer
  useEffect(() => {
    if (timeLeft > 0 && !loading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, loading]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctCount = questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correct_answer ? 1 : 0);
    }, 0);

    const parsedSetId = Number.parseInt(String(setId), 10);
    const total = questions.length || 0;
    const correct = Number.isFinite(correctCount) ? correctCount : 0;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    const result = {
      setId: Number.isNaN(parsedSetId) ? 0 : parsedSetId,
      totalQuestions: total,
      correctAnswers: correct,
      wrongAnswers: Math.max(0, total - correct),
      score: score,
      date: new Date().toISOString(),
      questions: questions || [],
      userAnswers: Array.isArray(selectedAnswers) ? selectedAnswers : [],
    };

    try {
      // Save result history
      const saved = localStorage.getItem("quizResults");
      const results = saved ? JSON.parse(saved) : [];
      results.push(result);
      localStorage.setItem("quizResults", JSON.stringify(results));

      // Save current result with unique ID
      const resultId = `result_${Date.now()}`;
      localStorage.setItem(resultId, JSON.stringify(result));
      localStorage.setItem("lastResult", JSON.stringify(result));

      router.push(`/result?id=${resultId}`);
    } catch (error) {
      console.error("Error storing result:", error);
      alert(
        language === "np"
          ? "नतिजा सुरक्षित गर्न असफल भयो। कृपया पुन: प्रयास गर्नुहोस्।"
          : "Failed to save result. Please try again."
      );
    }
  };

  // ✅ Loading state until auth checked
  if (status === "loading" || loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const currentUser = session?.user || firebaseUser;
  if (!currentUser || questions.length === 0) return null;

  const question = questions[currentQuestion];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Quiz Header */}
        <div className="card mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {t(`set${setId}Title`)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t("question")} {currentQuestion + 1} {t("of")} {questions.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t("timeRemaining")}</p>
              <p
                className={`text-2xl font-bold ${
                  timeLeft < 60 ? "text-red-600" : "text-primary-600"
                }`}
              >
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            {language === "en" ? question.question_en : question.question_np}
          </h2>
          <div className="space-y-3">
            {(language === "en" ? question.options_en : question.options_np).map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-primary-600 bg-primary-50 dark:bg-primary-900"
                    : "border-gray-300 dark:border-gray-600 hover:border-primary-400"
                }`}
              >
                <span className="font-semibold text-primary-600 mr-3">{String.fromCharCode(65 + index)}.</span>
                <span className="dark:text-white">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="card bg-white dark:bg-gray-800 sticky bottom-0 left-0 right-0 z-10">
          {/* Question Counter */}
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("question")} <span className="font-bold text-primary-600">{currentQuestion + 1}</span> {t("of")} <span className="font-bold text-primary-600">{questions.length}</span>
            </p>
          </div>

          {/* Question Navigation Buttons */}
          <div className="mb-4 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`min-w-8 w-8 h-8 rounded flex items-center justify-center text-sm font-semibold transition ${
                    index === currentQuestion
                      ? "bg-primary-600 text-white"
                      : selectedAnswers[index] !== -1
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  title={`Question ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              ← {t("previous")}
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button onClick={handleSubmit} className="btn-primary flex-1 bg-green-600 hover:bg-green-700">
                {t("submit")}
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))
                }
                className="btn-primary flex-1"
              >
                {t("next")} →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
