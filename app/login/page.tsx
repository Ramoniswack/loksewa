"use client";

import { signIn, useSession } from "next-auth/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const { data: session } = useSession();
  const { language } = useLanguage();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(language === "np" 
            ? "इमेल वा पासवर्ड गलत छ"
            : "Invalid email or password");
        } else {
          router.push("/dashboard");
        }
      } else {
        // Register
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || (language === "np" 
            ? "दर्ता असफल भयो"
            : "Registration failed"));
        } else {
          setSuccess(language === "np" 
            ? "दर्ता सफल! कृपया लगइन गर्नुहोस्"
            : "Registration successful! Please login");
          setIsLogin(true);
          setName("");
          setPassword("");
        }
      }
    } catch (err) {
      setError(language === "np" 
        ? "केहि गलत भयो। पुन: प्रयास गर्नुहोस्"
        : "Something went wrong. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log("Firebase config check:", {
      isFirebaseConfigured,
      hasAuth: !!auth,
      hasProvider: !!googleProvider,
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "set" : "missing",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });

    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setError(language === "np" 
        ? "Firebase कन्फिगर गरिएको छैन। कृपया .env.local फाइल जाँच गर्नुहोस्"
        : "Firebase not configured. Please check .env.local file");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      // Sign in with Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Create NextAuth session with Firebase user
      const sessionResult = await signIn("credentials", {
        firebaseUser: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }),
        redirect: false,
      });

      if (sessionResult?.error) {
        setError(language === "np" 
          ? "सत्र निर्माण असफल। पुन: प्रयास गर्नुहोस्"
          : "Session creation failed. Please try again");
      } else {
        // Also store in localStorage for backup
        localStorage.setItem("firebaseUser", JSON.stringify({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }));
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setError(language === "np" 
        ? "गुगल लगइन असफल भयो। पुन: प्रयास गर्नुहोस्"
        : "Google sign-in failed. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="card">
            <div className="flex justify-center mb-6"><Lock className="w-16 h-16 text-blue-600" /></div>
            <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-2 text-center">
              {isLogin 
                ? (language === "np" ? "लगइन" : "Login")
                : (language === "np" ? "नयाँ खाता बनाउनुहोस्" : "Create New Account")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
              {isLogin
                ? (language === "np" 
                  ? "लोक सेवा तयारी पोर्टलमा पहुँच गर्न लगइन गर्नुहोस्"
                  : "Login to access Loksewa Preparation Portal")
                : (language === "np"
                  ? "आफ्नो तयारी सुरु गर्न नयाँ खाता बनाउनुहोस्"
                  : "Create a new account to start your preparation")}
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-200 rounded">
                {success}
              </div>
            )}

            {/* Login/Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {/* Name Field (Register only) */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === "np" ? "पूरा नाम" : "Full Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={language === "np" ? "तपाईंको नाम" : "Your name"}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "np" ? "इमेल" : "Email"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={language === "np" ? "तपाईंको इमेल" : "your@email.com"}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "np" ? "पासवर्ड" : "Password"}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={language === "np" ? "••••••••" : "••••••••"}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {language === "np" 
                      ? "कम्तिमा ६ अक्षर हुनुपर्छ"
                      : "Must be at least 6 characters"}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading 
                  ? (language === "np" ? "कृपया पर्खनुहोस्..." : "Please wait...")
                  : isLogin 
                    ? (language === "np" ? "लगइन गर्नुहोस्" : "Login")
                    : (language === "np" ? "खाता बनाउनुहोस्" : "Create Account")}
              </button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center mb-6">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setSuccess("");
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {isLogin
                  ? (language === "np" 
                    ? "नयाँ प्रयोगकर्ता? खाता बनाउनुहोस्"
                    : "New user? Create an account")
                  : (language === "np"
                    ? "पहिले नै खाता छ? लगइन गर्नुहोस्"
                    : "Already have an account? Login")}
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  {language === "np" ? "वा" : "OR"}
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 hover:border-primary-500 text-gray-700 font-medium py-3 px-6 rounded-lg transition shadow-sm hover:shadow-md"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>{language === "np" ? "गुगलबाट लगइन गर्नुहोस्" : "Continue with Google"}</span>
            </button>

            {/* Demo Account Info */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded text-sm text-gray-600 dark:text-gray-300">
              <p className="font-semibold mb-2">
                {language === "np" ? "डेमो खाता:" : "Demo Account:"}
              </p>
              <p>Email: demo@loksewa.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}