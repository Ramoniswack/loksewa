"use client";

import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, LogOut } from "lucide-react";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [firebaseUser, setFirebaseUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("firebaseUser");
    if (savedUser) {
      setFirebaseUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    // Logout from Firebase
    if (firebaseUser && isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
      localStorage.removeItem("firebaseUser");
      setFirebaseUser(null);
      window.location.href = "/";
    } else {
      // Logout from NextAuth
      signOut({ callbackUrl: "/" });
    }
  };

  const currentUser = session?.user || firebaseUser;

  return (
    <header className="gov-header bg-primary-600 text-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo + Title */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
              priority
            />
            <h1 className="text-xl md:text-2xl font-bold">
              {t("appTitle")}
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2 md:space-x-4">

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 mr-4">
              <Link href="/" className="hover:text-gray-200 transition">
                {t("home")}
              </Link>

              <Link href="/blog" className="hover:text-gray-200 transition">
                {language === "np" ? "ब्लग" : "Blog"}
              </Link>

              <Link href="/syllabus" className="hover:text-gray-200 transition">
                {language === "np" ? "पाठ्यक्रम" : "Syllabus"}
              </Link>

              <Link href="/model-papers" className="hover:text-gray-200 transition">
                {language === "np" ? "मोडेल पेपर" : "Model Papers"}
              </Link>

              {currentUser && (
                <Link href="/dashboard" className="hover:text-gray-200 transition">
                  {t("dashboard")}
                </Link>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "np" : "en")}
              className="px-3 py-1 bg-white text-primary-600 rounded font-medium text-sm hover:bg-gray-100 transition"
            >
              {language === "en" ? "नेपाली" : "English"}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 bg-white text-primary-600 rounded hover:bg-gray-100 transition"
              title={isDark ? t("lightMode") : t("darkMode")}
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Section */}
            {currentUser ? (
              <div className="flex items-center space-x-2 md:space-x-3">
                {(currentUser?.image || currentUser?.photoURL) && (
                  <Image
                    src={currentUser.image || currentUser.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 md:px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600 transition text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("logout")}</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3 md:px-4 py-2 bg-white text-primary-600 rounded font-medium hover:bg-gray-100 transition text-sm"
              >
                {t("login")}
              </Link>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
}
