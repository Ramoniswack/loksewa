"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Clipboard, MessageSquare, GraduationCap, Lightbulb } from "lucide-react";

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{className?: string}> } = {
    "📋": Clipboard,
    "📝": MessageSquare,
    "👨‍🏫": GraduationCap,
    "💡": Lightbulb,
  };
  return iconMap[iconName] || MessageSquare;
};

const modelPapers = [
  {
    id: 1,
    title_en: "PSC Model Paper 2082 - Set A",
    title_np: "PSC मोडेल पेपर २०८२ - सेट A",
    year: "2082",
    level: "5th Level",
    subjects: "All Subjects",
    questions: 100,
    duration: "2 hours",
    icon: "📄"
  },
  {
    id: 2,
    title_en: "PSC Model Paper 2082 - Set B",
    title_np: "PSC मोडेल पेपर २०८२ - सेट B",
    year: "2082",
    level: "5th Level",
    subjects: "All Subjects",
    questions: 100,
    duration: "2 hours",
    icon: "📄"
  },
  {
    id: 3,
    title_en: "Kharidar Model Paper 2081",
    title_np: "खरिदार मोडेल पेपर २०८१",
    year: "2081",
    level: "5th Level",
    subjects: "All Subjects",
    questions: 100,
    duration: "2 hours",
    icon: "📋"
  },
  {
    id: 4,
    title_en: "Nayab Subba Model Paper 2081",
    title_np: "नायब सुब्बा मोडेल पेपर २०८१",
    year: "2081",
    level: "6th Level",
    subjects: "All Subjects",
    questions: 100,
    duration: "2.5 hours",
    icon: "📋"
  },
  {
    id: 5,
    title_en: "Assistant Model Paper 2081",
    title_np: "सहायक मोडेल पेपर २०८१",
    year: "2081",
    level: "4th Level",
    subjects: "All Subjects",
    questions: 100,
    duration: "2 hours",
    icon: "📝"
  },
  {
    id: 6,
    title_en: "Teacher Service Model Paper 2081",
    title_np: "शिक्षक सेवा मोडेल पेपर २०८१",
    year: "2081",
    level: "Various",
    subjects: "Subject + Pedagogy",
    questions: 100,
    duration: "3 hours",
    icon: "👨‍🏫"
  }
];

export default function ModelPapersPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {language === "np" ? "मोडेल पेपरहरू" : "Model Papers"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "np" 
              ? "विभिन्न लोक सेवा पदहरूको लागि मोडेल प्रश्नपत्रहरू"
              : "Model question papers for various Loksewa positions"}
          </p>
        </div>

        {/* Filter Section */}
        <div className="card mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === "np" ? "वर्ष" : "Year"}
              </label>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <option>{language === "np" ? "सबै" : "All"}</option>
                <option>2082</option>
                <option>2081</option>
                <option>2080</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === "np" ? "तह" : "Level"}
              </label>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
                <option>{language === "np" ? "सबै" : "All"}</option>
                <option>4th Level</option>
                <option>5th Level</option>
                <option>6th Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Model Papers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modelPapers.map((paper) => {
            const IconComponent = getIconComponent(paper.icon);
            return (
            <div key={paper.id} className="card hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <IconComponent className="w-12 h-12 text-blue-600" />
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded text-sm font-medium">
                  {paper.year}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                {language === "en" ? paper.title_en : paper.title_np}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">
                    {language === "np" ? "तह:" : "Level:"}
                  </span>
                  <span>{paper.level}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">
                    {language === "np" ? "विषयहरू:" : "Subjects:"}
                  </span>
                  <span>{paper.subjects}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">
                    {language === "np" ? "प्रश्नहरू:" : "Questions:"}
                  </span>
                  <span>{paper.questions}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-24 font-medium">
                    {language === "np" ? "समय:" : "Duration:"}
                  </span>
                  <span>{paper.duration}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/blog/${paper.id}`}
                  className="flex-1 text-center btn-primary text-sm py-2"
                >
                  {language === "np" ? "हेर्नुहोस्" : "View"}
                </Link>
                <button className="flex-1 text-center btn-secondary text-sm py-2">
                  {language === "np" ? "डाउनलोड" : "Download"}
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="card bg-blue-50 dark:bg-blue-900 border-l-4 border-primary-600 mt-8">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                {language === "np" ? "मोडेल पेपर कसरी प्रयोग गर्ने?" : "How to Use Model Papers?"}
              </h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>• {language === "np" ? "वास्तविक परीक्षा जस्तै समय सीमा राख्नुहोस्" : "Set time limit like real exam"}</li>
                <li>• {language === "np" ? "सबै प्रश्नहरू समाधान गर्ने प्रयास गर्नुहोस्" : "Try to solve all questions"}</li>
                <li>• {language === "np" ? "आफ्नो उत्तरहरू जाँच गर्नुहोस्" : "Check your answers"}</li>
                <li>• {language === "np" ? "कमजोर क्षेत्रहरू पहिचान गर्नुहोस्" : "Identify weak areas"}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
