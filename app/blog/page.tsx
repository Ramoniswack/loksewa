"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FileText, Lightbulb, BookOpen, Monitor, Calculator, MapPin } from "lucide-react";

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ComponentType<{className?: string}> } = {
    "📄": FileText,
    "💡": Lightbulb,
    "📚": BookOpen,
    "💻": Monitor,
    "🔢": Calculator,
    "🗺️": MapPin,
  };
  return iconMap[iconName] || FileText;
};

const blogPosts = [
  {
    id: 1,
    title_en: "Complete PSC Model Questions 2082 with Syllabus",
    title_np: "पूर्ण PSC मोडेल प्रश्नहरू २०८२ पाठ्यक्रम सहित",
    excerpt_en: "Download complete model questions for PSC 2082 with detailed syllabus and sample papers.",
    excerpt_np: "विस्तृत पाठ्यक्रम र नमूना पत्रहरू सहित PSC २०८२ को लागि पूर्ण मोडेल प्रश्नहरू डाउनलोड गर्नुहोस्।",
    category: "Model Papers",
    date: "2024-01-15",
    icon: "📄"
  },
  {
    id: 2,
    title_en: "Loksewa Preparation Tips and Strategies",
    title_np: "लोक सेवा तयारी टिप्स र रणनीतिहरू",
    excerpt_en: "Essential tips and strategies to crack Loksewa exams with effective study plans.",
    excerpt_np: "प्रभावकारी अध्ययन योजनाको साथ लोक सेवा परीक्षा पास गर्न आवश्यक टिप्स र रणनीतिहरू।",
    category: "Tips",
    date: "2024-01-10",
    icon: "💡"
  },
  {
    id: 3,
    title_en: "Nepal Constitution 2072 - Complete Guide",
    title_np: "नेपालको संविधान २०७२ - पूर्ण गाइड",
    excerpt_en: "Comprehensive guide to Nepal Constitution 2072 with important articles and amendments.",
    excerpt_np: "महत्त्वपूर्ण धाराहरू र संशोधनहरू सहित नेपालको संविधान २०७२ को व्यापक गाइड।",
    category: "Study Material",
    date: "2024-01-05",
    icon: "📚"
  },
  {
    id: 4,
    title_en: "Computer Knowledge for Loksewa - Complete Notes",
    title_np: "लोक सेवाको लागि कम्प्युटर ज्ञान - पूर्ण नोटहरू",
    excerpt_en: "Complete computer knowledge notes covering all topics for Loksewa examination.",
    excerpt_np: "लोक सेवा परीक्षाको लागि सबै विषयहरू समेट्ने पूर्ण कम्प्युटर ज्ञान नोटहरू।",
    category: "Study Material",
    date: "2024-01-01",
    icon: "💻"
  },
  {
    id: 5,
    title_en: "Mathematics Shortcuts for Quick Calculation",
    title_np: "छिटो गणनाको लागि गणित सर्टकटहरू",
    excerpt_en: "Learn mathematical shortcuts and tricks for solving problems quickly in exams.",
    excerpt_np: "परीक्षामा समस्याहरू छिटो समाधान गर्न गणितीय सर्टकट र ट्रिकहरू सिक्नुहोस्।",
    category: "Tips",
    date: "2023-12-28",
    icon: "🔢"
  },
  {
    id: 6,
    title_en: "Nepal Geography - Important Facts and Figures",
    title_np: "नेपाल भूगोल - महत्त्वपूर्ण तथ्य र तथ्याङ्कहरू",
    excerpt_en: "Important geographical facts about Nepal including rivers, mountains, and districts.",
    excerpt_np: "नदीहरू, पहाडहरू र जिल्लाहरू सहित नेपालको बारेमा महत्त्वपूर्ण भौगोलिक तथ्यहरू।",
    category: "Study Material",
    date: "2023-12-25",
    icon: "🗺️"
  }
];

export default function BlogPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            {language === "np" ? "ब्लग र अध्ययन सामग्री" : "Blog & Study Materials"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === "np" 
              ? "लोक सेवा परीक्षाको लागि नवीनतम लेख, टिप्स र अध्ययन सामग्री"
              : "Latest articles, tips and study materials for Loksewa examination"}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
            {language === "np" ? "सबै" : "All"}
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:border-primary-500">
            {language === "np" ? "मोडेल पेपर" : "Model Papers"}
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:border-primary-500">
            {language === "np" ? "टिप्स" : "Tips"}
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:border-primary-500">
            {language === "np" ? "अध्ययन सामग्री" : "Study Material"}
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => {
            const IconComponent = getIconComponent(post.icon);
            return (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="card hover:shadow-lg transition group"
            >
              <IconComponent className="w-10 h-10 mb-3 text-blue-600" />
              <div className="mb-2">
                <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-primary-600 transition">
                {language === "en" ? post.title_en : post.title_np}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {language === "en" ? post.excerpt_en : post.excerpt_np}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="text-primary-600 font-medium">
                  {language === "np" ? "पढ्नुहोस् →" : "Read More →"}
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
