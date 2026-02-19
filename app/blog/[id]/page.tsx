"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Book, Star, Lightbulb, FileText, Calendar, Eye } from "lucide-react";

export default function BlogPostPage() {
  const { language } = useLanguage();
  const params = useParams();
  const postId = params.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary-600">
              {language === "np" ? "गृहपृष्ठ" : "Home"}
            </Link>
            {" / "}
            <Link href="/blog" className="hover:text-primary-600">
              {language === "np" ? "ब्लग" : "Blog"}
            </Link>
            {" / "}
            <span className="text-gray-800 dark:text-white">
              {language === "np" ? "लेख" : "Article"}
            </span>
          </div>

          {/* Article Header */}
          <div className="card mb-6">
            <FileText className="w-12 h-12 mb-4 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {language === "np" 
                ? "पूर्ण PSC मोडेल प्रश्नहरू २०८२ पाठ्यक्रम सहित"
                : "Complete PSC Model Questions 2082 with Syllabus"}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded">
                Model Papers
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {language === "np" ? "जनवरी १५, २०२४" : "January 15, 2024"}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {language === "np" ? "१,२३४ दृश्यहरू" : "1,234 views"}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="card mb-6">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {language === "np" ? "परिचय" : "Introduction"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "np" 
                  ? "नेपाल लोक सेवा आयोग (PSC) परीक्षा २०८२ को लागि यो पूर्ण मोडेल प्रश्न सेट तयार गरिएको छ। यस सेटमा सबै महत्त्वपूर्ण विषयहरू समावेश छन् जुन परीक्षामा सोधिन सक्छन्।"
                  : "This complete model question set has been prepared for Nepal Public Service Commission (PSC) examination 2082. This set includes all important topics that may be asked in the examination."}
              </p>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 mt-8">
                {language === "np" ? "पाठ्यक्रम विवरण" : "Syllabus Details"}
              </h2>
              
              <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {language === "np" ? "१. सामान्य ज्ञान (२५ अंक)" : "1. General Knowledge (25 Marks)"}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{language === "np" ? "नेपालको भूगोल" : "Geography of Nepal"}</li>
                  <li>{language === "np" ? "नेपालको संविधान २०७२" : "Constitution of Nepal 2072"}</li>
                  <li>{language === "np" ? "नेपालको इतिहास" : "History of Nepal"}</li>
                  <li>{language === "np" ? "वर्तमान घटनाक्रम" : "Current Affairs"}</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {language === "np" ? "२. गणित (२५ अंक)" : "2. Mathematics (25 Marks)"}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{language === "np" ? "अंकगणित" : "Arithmetic"}</li>
                  <li>{language === "np" ? "प्रतिशत र अनुपात" : "Percentage and Ratio"}</li>
                  <li>{language === "np" ? "साधारण र चक्रीय ब्याज" : "Simple and Compound Interest"}</li>
                  <li>{language === "np" ? "तर्क र विश्लेषण" : "Reasoning and Analysis"}</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {language === "np" ? "३. कम्प्युटर ज्ञान (२५ अंक)" : "3. Computer Knowledge (25 Marks)"}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{language === "np" ? "कम्प्युटर आधारभूत" : "Computer Fundamentals"}</li>
                  <li>{language === "np" ? "MS Office (Word, Excel, PowerPoint)" : "MS Office (Word, Excel, PowerPoint)"}</li>
                  <li>{language === "np" ? "इन्टरनेट र इमेल" : "Internet and Email"}</li>
                  <li>{language === "np" ? "नेटवर्किङ आधारभूत" : "Networking Basics"}</li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {language === "np" ? "४. भाषा (२५ अंक)" : "4. Language (25 Marks)"}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>{language === "np" ? "व्याकरण" : "Grammar"}</li>
                  <li>{language === "np" ? "शब्दावली" : "Vocabulary"}</li>
                  <li>{language === "np" ? "वाक्य सुधार" : "Sentence Correction"}</li>
                  <li>{language === "np" ? "पढाइ बुझाइ" : "Reading Comprehension"}</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 mt-8">
                {language === "np" ? "तयारी टिप्स" : "Preparation Tips"}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>{language === "np" ? "नियमित अभ्यास गर्नुहोस्" : "Practice regularly"}</li>
                <li>{language === "np" ? "समय व्यवस्थापन सिक्नुहोस्" : "Learn time management"}</li>
                <li>{language === "np" ? "पुराना प्रश्नपत्रहरू समाधान गर्नुहोस्" : "Solve previous year papers"}</li>
                <li>{language === "np" ? "कमजोर विषयहरूमा बढी ध्यान दिनुहोस्" : "Focus more on weak subjects"}</li>
                <li>{language === "np" ? "मोक टेस्ट दिनुहोस्" : "Take mock tests"}</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {language === "np" 
                      ? "सुझाव: हाम्रो अनलाइन क्विज प्रणाली प्रयोग गरेर आफ्नो तयारी परीक्षण गर्नुहोस्।"
                      : "Tip: Test your preparation using our online quiz system."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Practice Quiz CTA */}
          <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              {language === "np" ? "अभ्यास सुरु गर्नुहोस्" : "Start Practicing"}
            </h3>
            <p className="mb-6">
              {language === "np" 
                ? "हाम्रो निःशुल्क अनलाइन क्विजहरू प्रयास गर्नुहोस्"
                : "Try our free online quizzes"}
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              {language === "np" ? "क्विज सुरु गर्नुहोस्" : "Start Quiz"}
            </Link>
          </div>

          {/* Related Posts */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {language === "np" ? "सम्बन्धित लेखहरू" : "Related Articles"}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/2" className="card hover:shadow-lg transition">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">
                    <Star className="text-green-600 w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                      {language === "np" 
                        ? "लोक सेवा तयारी टिप्स"
                        : "Loksewa Preparation Tips"}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === "np" ? "प्रभावकारी अध्ययन रणनीतिहरू" : "Effective study strategies"}
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/blog/3" className="card hover:shadow-lg transition">
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">
                    <Book className="text-purple-600 w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                      {language === "np" 
                        ? "संविधान २०७२ गाइड"
                        : "Constitution 2072 Guide"}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === "np" ? "महत्त्वपूर्ण धाराहरू" : "Important articles"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
