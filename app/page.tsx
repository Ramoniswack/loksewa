"use client";

import { useSession } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Calculator, Monitor, FileText, BarChart3, Flag } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const { t, language } = useLanguage();
  const router = useRouter();

  const stats = {
    questions: 1000,
    users: 5000,
    studyMaterials: 50,
    free: 100,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto text-center">

          {/* Hero Section */}
          <div className="mb-14">
            <div className="mb-6"><Flag className="w-20 h-20 mx-auto text-blue-600" /></div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 dark:text-red-400 mb-5 tracking-tight">
              {language === "np"
                ? "लोक सेवा तयारी पोर्टल"
                : "Nepal Loksewa Preparation Portal"}
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              {language === "np"
                ? "नेपाल सरकारको लोक सेवा आयोग परीक्षाको लागि अभ्यास, मोडेल प्रश्न र अध्ययन सामग्री"
                : "Practice MCQs, Model Sets and Study Materials for Nepal Public Service Commission Exams"}
            </p>

            <Link
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-3 rounded-xl shadow-md transition"
            >
              {language === "np" ? "अहिले सुरु गर्नुहोस्" : "Start Preparation"}
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[1,2,3,4].map((setId) => (
              <Link
                key={setId}
                href={session ? `/quiz/${setId}` : "/login"}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition group"
              >
                {setId === 1 && <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition" />}
                {setId === 2 && <Calculator className="w-12 h-12 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition" />}
                {setId === 3 && <Monitor className="w-12 h-12 mx-auto mb-3 text-green-600 group-hover:scale-110 transition" />}
                {setId === 4 && <FileText className="w-12 h-12 mx-auto mb-3 text-purple-600 group-hover:scale-110 transition" />}
                
                <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-blue-600">
                  {t(`set${setId}Title`) || `Practice Set ${setId}`}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t(`set${setId}Desc`) ||
                    (language === "np"
                      ? "लोक सेवा अभ्यास प्रश्न"
                      : "Loksewa Practice Questions")}
                </p>
              </Link>
            ))}
          </div>

          {/* Statistics Section */}
          <div className="grid md:grid-cols-4 gap-6 mt-20">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-red-600 mb-2">
                {stats.questions ?? 0}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "np" ? "प्रश्न बैंक" : "Question Bank"}
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-blue-600 mb-2">
                {stats.users ?? 0}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "np" ? "विद्यार्थी" : "Students"}
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-green-600 mb-2">
                {stats.studyMaterials ?? 0}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "np" ? "अध्ययन सामग्री" : "Study Materials"}
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-extrabold text-purple-600 mb-2">
                {stats.free ?? 0}%
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "np" ? "निःशुल्क सामग्री" : "Free Content"}
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
