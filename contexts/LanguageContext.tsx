"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "np";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    appTitle: "Loksewa Preparation Portal",
    home: "Home",
    dashboard: "Dashboard",
    login: "Login",
    logout: "Logout",
    
    // Landing Page
    welcomeTitle: "Welcome to Loksewa Preparation Portal",
    welcomeSubtitle: "Practice for Nepal Government Service Exams",
    getStarted: "Get Started",
    loginWithGoogle: "Login with Google",
    
    // Dashboard
    welcomeBack: "Welcome Back",
    selectQuestionSet: "Select Question Set",
    totalAttempts: "Total Attempts",
    averageScore: "Average Score",
    lastResult: "Last Result",
    
    // Question Sets
    set1Title: "Question Model 1",
    set1Desc: "Set1",
    set2Title: "Question Model 2",
    set2Desc: "Set2",
    set3Title: "Question Model 3",
    set3Desc: "Set3",
    set4Title: "Question Model 4",
    set4Desc: "Set4",
    
    startQuiz: "Start Quiz",
    questions: "Questions",
    
    // Quiz
    question: "Question",
    of: "of",
    timeRemaining: "Time Remaining",
    submit: "Submit Quiz",
    next: "Next",
    previous: "Previous",
    
    // Results
    quizResults: "Quiz Results",
    totalQuestions: "Total Questions",
    correctAnswers: "Correct Answers",
    wrongAnswers: "Wrong Answers",
    score: "Score",
    backToDashboard: "Back to Dashboard",
    retakeQuiz: "Retake Quiz",
    
    // Theme
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
  },
  np: {
    // Header
    appTitle: "लोक सेवा तयारी पोर्टल",
    home: "गृहपृष्ठ",
    dashboard: "ड्यासबोर्ड",
    login: "लगइन",
    logout: "लगआउट",
    
    // Landing Page
    welcomeTitle: "लोक सेवा तयारी पोर्टलमा स्वागत छ",
    welcomeSubtitle: "नेपाल सरकारी सेवा परीक्षाको लागि अभ्यास गर्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
    loginWithGoogle: "गुगलबाट लगइन गर्नुहोस्",
    
    // Dashboard
    welcomeBack: "फेरि स्वागत छ",
    selectQuestionSet: "प्रश्न सेट छान्नुहोस्",
    totalAttempts: "कुल प्रयासहरू",
    averageScore: "औसत अंक",
    lastResult: "अन्तिम नतिजा",
    
    // Question Sets
    set1Title: "प्रश्न मोडेल 1",
    set1Desc: "नेपाल भूगोल, संविधान, इतिहास",
    set2Title: "प्रश्न मोडेल 2",
    set2Desc: "प्रतिशत, अनुपात, अंकगणित, तर्क",
    set3Title: "प्रश्न मोडेल 3",
    set3Desc: "आधारभूत, इन्टरनेट, नेटवर्किङ",
    set4Title: "प्रश्न मोडेल 4",
    set4Desc: "व्याकरण, शब्दावली, वाक्य सुधार",
    
    startQuiz: "क्विज सुरु गर्नुहोस्",
    questions: "प्रश्नहरू",
    
    // Quiz
    question: "प्रश्न",
    of: "को",
    timeRemaining: "बाँकी समय",
    submit: "पेश गर्नुहोस्",
    next: "अर्को",
    previous: "अघिल्लो",
    
    // Results
    quizResults: "क्विज नतिजा",
    totalQuestions: "कुल प्रश्नहरू",
    correctAnswers: "सही उत्तरहरू",
    wrongAnswers: "गलत उत्तरहरू",
    score: "अंक",
    backToDashboard: "ड्यासबोर्डमा फर्कनुहोस्",
    retakeQuiz: "फेरि प्रयास गर्नुहोस्",
    
    // Theme
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("np");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "np")) {
      setLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
