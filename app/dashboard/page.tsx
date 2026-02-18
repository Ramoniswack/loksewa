"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { QuizResult } from "@/types";
import { BookOpen, Calculator, Monitor, FileText, BarChart3, Target, TrendingUp } from "lucide-react";

const questionSets = [
  { id: 1, icon: BookOpen, color: "bg-blue-100 dark:bg-blue-900", iconColor: "text-blue-600" },
  { id: 2, icon: Calculator, color: "bg-green-100 dark:bg-green-900", iconColor: "text-green-600" },
  { id: 3, icon: Monitor, color: "bg-purple-100 dark:bg-purple-900", iconColor: "text-purple-600" },
  { id: 4, icon: FileText, color: "bg-orange-100 dark:bg-orange-900", iconColor: "text-orange-600" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t, language } = useLanguage();
  const [results, setResults] = useState<QuizResult[]>([]);

  // ✅ Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const saved = localStorage.getItem("quizResults");
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const currentUser = session?.user;

  const totalAttempts = results.length;
  const averageScore = totalAttempts > 0
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / totalAttempts)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {t("welcomeBack")}, {currentUser?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "np" 
              ? "आफ्नो लोक सेवा तयारी जारी राख्नुहोस्"
              : "Continue your Loksewa preparation"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {t("totalAttempts")}
                </p>
                <p className="text-3xl font-bold text-primary-600">
                  {totalAttempts}
                </p>
              </div>
              <BarChart3 className="w-12 h-12 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {t("averageScore")}
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {averageScore}%
                </p>
              </div>
              <Target className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {language === "np" ? "उपलब्ध सेटहरू" : "Available Sets"}
                </p>
                <p className="text-3xl font-bold text-purple-600">4</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Question Sets */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t("selectQuestionSet")}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {questionSets.map((set) => {
              const IconComponent = set.icon;
              return (
                <Link
                  key={set.id}
                  href={`/quiz/${set.id}`}
                  className={`${set.color} p-6 rounded-lg border-2 border-transparent hover:border-primary-500 transition shadow-sm hover:shadow-md group`}
                >
                  <div className="text-center">
                    <IconComponent className={`w-16 h-16 mx-auto mb-3 ${set.iconColor} group-hover:scale-110 transition`} />
                    <h3 className="text-xl font-bold mb-2 dark:text-white">
                      {t(`set${set.id}Title`)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {t(`set${set.id}Desc`)}
                    </p>
                    <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded font-medium">
                      {t("startQuiz")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Results */}
        {results.length > 0 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {language === "np" ? "हालैका नतिजाहरू" : "Recent Results"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left dark:text-white">
                      {language === "np" ? "सेट" : "Set"}
                    </th>
                    <th className="px-4 py-2 text-left dark:text-white">
                      {t("score")}
                    </th>
                    <th className="px-4 py-2 text-left dark:text-white">
                      {t("correctAnswers")}
                    </th>
                    <th className="px-4 py-2 text-left dark:text-white">
                      {language === "np" ? "मिति" : "Date"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.slice(-5).reverse().map((result, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 dark:text-gray-300">
                        {t(`set${result.setId}Title`)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary-600">
                        {result.score}%
                      </td>
                      <td className="px-4 py-3 dark:text-gray-300">
                        {result.correctAnswers}/{result.totalQuestions}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {new Date(result.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
