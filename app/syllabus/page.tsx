"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Clipboard, MessageSquare, GraduationCap, Download, Info } from "lucide-react";

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{className?: string}> } = {
    "📋": Clipboard,
    "📝": MessageSquare,
    "🎓": GraduationCap,
    "👨‍🏫": GraduationCap,
  };
  return iconMap[iconName] || MessageSquare;
};

const syllabusData = [
  {
    id: 1,
    position_en: "Section Officer (Kharidar)",
    position_np: "खरिदार (सेक्सन अफिसर)",
    level: "5th Level",
    subjects: [
      { name_en: "General Knowledge", name_np: "सामान्य ज्ञान", marks: 25 },
      { name_en: "Mathematics", name_np: "गणित", marks: 25 },
      { name_en: "Computer", name_np: "कम्प्युटर", marks: 25 },
      { name_en: "English/Nepali", name_np: "अंग्रेजी/नेपाली", marks: 25 }
    ],
    totalMarks: 100,
    duration: "2 hours",
    icon: "📋"
  },
  {
    id: 2,
    position_en: "Assistant (Sahayak)",
    position_np: "सहायक",
    level: "4th Level",
    subjects: [
      { name_en: "General Knowledge", name_np: "सामान्य ज्ञान", marks: 30 },
      { name_en: "Mathematics", name_np: "गणित", marks: 20 },
      { name_en: "Computer", name_np: "कम्प्युटर", marks: 25 },
      { name_en: "Language", name_np: "भाषा", marks: 25 }
    ],
    totalMarks: 100,
    duration: "2 hours",
    icon: "📝"
  },
  {
    id: 3,
    position_en: "Nayab Subba",
    position_np: "नायब सुब्बा",
    level: "6th Level",
    subjects: [
      { name_en: "General Knowledge", name_np: "सामान्य ज्ञान", marks: 30 },
      { name_en: "Administration", name_np: "प्रशासन", marks: 30 },
      { name_en: "Computer", name_np: "कम्प्युटर", marks: 20 },
      { name_en: "Language", name_np: "भाषा", marks: 20 }
    ],
    totalMarks: 100,
    duration: "2.5 hours",
    icon: "🎓"
  },
  {
    id: 4,
    position_en: "Teacher Service Commission",
    position_np: "शिक्षक सेवा आयोग",
    level: "Various",
    subjects: [
      { name_en: "General Knowledge", name_np: "सामान्य ज्ञान", marks: 25 },
      { name_en: "Subject Knowledge", name_np: "विषय ज्ञान", marks: 50 },
      { name_en: "Pedagogy", name_np: "शिक्षाशास्त्र", marks: 25 }
    ],
    totalMarks: 100,
    duration: "3 hours",
    icon: "👨‍🏫"
  }
];

export default function SyllabusPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {language === "np" ? "पाठ्यक्रम विवरण" : "Syllabus Details"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "np" 
              ? "विभिन्न लोक सेवा पदहरूको लागि पूर्ण पाठ्यक्रम"
              : "Complete syllabus for various Loksewa positions"}
          </p>
        </div>

        {/* Info Banner */}
        <div className="card bg-blue-50 dark:bg-blue-900 border-l-4 border-primary-600 mb-8">
          <div className="flex items-start space-x-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                {language === "np" ? "महत्त्वपूर्ण सूचना" : "Important Notice"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {language === "np" 
                  ? "यो पाठ्यक्रम नेपाल लोक सेवा आयोगको आधिकारिक वेबसाइटबाट लिइएको हो। नवीनतम अपडेटको लागि आधिकारिक वेबसाइट हेर्नुहोस्।"
                  : "This syllabus is taken from the official website of Nepal Public Service Commission. Please check the official website for latest updates."}
              </p>
            </div>
          </div>
        </div>

        {/* Syllabus Cards */}
        <div className="space-y-6">
          {syllabusData.map((item) => {
            const IconComponent = getIconComponent(item.icon);
            return (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <IconComponent className="w-12 h-12 text-blue-600" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {language === "en" ? item.position_en : item.position_np}
                    </h2>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded">
                        {item.level}
                      </span>
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded">
                        {language === "np" ? "कुल अंक" : "Total Marks"}: {item.totalMarks}
                      </span>
                      <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-3 py-1 rounded">
                        {language === "np" ? "समय" : "Duration"}: {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subjects Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-800 dark:text-white font-semibold">
                        {language === "np" ? "क्र.सं." : "S.N."}
                      </th>
                      <th className="px-4 py-3 text-left text-gray-800 dark:text-white font-semibold">
                        {language === "np" ? "विषय" : "Subject"}
                      </th>
                      <th className="px-4 py-3 text-right text-gray-800 dark:text-white font-semibold">
                        {language === "np" ? "पूर्णाङ्क" : "Full Marks"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.subjects.map((subject, index) => (
                      <tr key={index} className="border-b dark:border-gray-700">
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
                          {language === "en" ? subject.name_en : subject.name_np}
                        </td>
                        <td className="px-4 py-3 text-right text-primary-600 font-bold">
                          {subject.marks}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 dark:bg-gray-800 font-bold">
                      <td colSpan={2} className="px-4 py-3 text-gray-800 dark:text-white">
                        {language === "np" ? "जम्मा" : "Total"}
                      </td>
                      <td className="px-4 py-3 text-right text-primary-600">
                        {item.totalMarks}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  href={`/blog/${item.id}`}
                  className="btn-primary text-sm"
                >
                  {language === "np" ? "विस्तृत पाठ्यक्रम हेर्नुहोस्" : "View Detailed Syllabus"}
                </Link>
                <Link
                  href="/dashboard"
                  className="btn-secondary text-sm"
                >
                  {language === "np" ? "अभ्यास सुरु गर्नुहोस्" : "Start Practice"}
                </Link>
              </div>
            </div>
            );
          })}
        </div>

        {/* Download Section */}
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center mt-8">
          <div className="mb-4"><Download className="w-16 h-16 mx-auto" /></div>
          <h3 className="text-2xl font-bold mb-3">
            {language === "np" ? "पाठ्यक्रम डाउनलोड गर्नुहोस्" : "Download Syllabus"}
          </h3>
          <p className="mb-6">
            {language === "np" 
              ? "सबै पदहरूको पूर्ण पाठ्यक्रम PDF फर्म्याटमा डाउनलोड गर्नुहोस्"
              : "Download complete syllabus for all positions in PDF format"}
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            {language === "np" ? "PDF डाउनलोड गर्नुहोस्" : "Download PDF"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
