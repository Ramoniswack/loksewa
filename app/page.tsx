"use client";

import { useSession } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Calculator, Monitor, FileText, BarChart3 } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const { t, language } = useLanguage();
  const router = useRouter();

  // Safe statistics numbers
  const stats = {
    questions: 1000,
    users: 5000,
    studyMaterials: 50,
    free: 100,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="text-6xl mb-6">🇳🇵</div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-300 mb-4">
              {t("welcomeTitle") || "Welcome to Loksewa Preparation Portal"}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {t("welcomeSubtitle") || "Practice for Nepal Government Service Exams"}
            </p>
            <Link
              href="/login"
              className="inline-block btn-primary text-lg px-8 py-3"
            >
              {t("getStarted") || "Get Started"}
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[1,2,3,4].map((setId) => (
              <Link
                key={setId}
                href={session ? `/quiz/${setId}` : "/login"}
                className="card text-center hover:shadow-lg transition group"
              >
                {setId === 1 && <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition" />}
                {setId === 2 && <Calculator className="w-12 h-12 mx-auto mb-3 text-green-600 group-hover:scale-110 transition" />}
                {setId === 3 && <Monitor className="w-12 h-12 mx-auto mb-3 text-purple-600 group-hover:scale-110 transition" />}
                {setId === 4 && <FileText className="w-12 h-12 mx-auto mb-3 text-orange-600 group-hover:scale-110 transition" />}

                <h3 className="text-lg font-semibold mb-2 dark:text-white group-hover:text-primary-600">
                  {t(`set${setId}Title`) || `Set ${setId}`}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t(`set${setId}Desc`) || "Description not available"}
                </p>
              </Link>
            ))}
          </div>

          {/* Statistics Section */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stats.questions ?? 0}+</div>
              <p className="text-gray-600 dark:text-gray-400">{language === "np" ? "प्रश्नहरू" : "Questions"}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.users ?? 0}+</div>
              <p className="text-gray-600 dark:text-gray-400">{language === "np" ? "प्रयोगकर्ताहरू" : "Users"}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.studyMaterials ?? 0}+</div>
              <p className="text-gray-600 dark:text-gray-400">{language === "np" ? "अध्ययन सामग्री" : "Study Materials"}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{stats.free ?? 0}%</div>
              <p className="text-gray-600 dark:text-gray-400">{language === "np" ? "निःशुल्क" : "Free"}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
