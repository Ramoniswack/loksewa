"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-700 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === "np" ? "हाम्रो बारेमा" : "About Us"}
            </h3>
            <p className="text-sm text-gray-200">
              {language === "np" 
                ? "लोक सेवा तयारी पोर्टल नेपाल सरकारी सेवा परीक्षाको लागि निःशुल्क अनलाइन अभ्यास प्रदान गर्दछ।"
                : "Loksewa Preparation Portal provides free online practice for Nepal Government Service examinations."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === "np" ? "द्रुत लिङ्कहरू" : "Quick Links"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "गृहपृष्ठ" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "ड्यासबोर्ड" : "Dashboard"}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "ब्लग" : "Blog"}
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "पाठ्यक्रम" : "Syllabus"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === "np" ? "स्रोतहरू" : "Resources"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/model-papers" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "मोडेल पेपर" : "Model Papers"}
                </Link>
              </li>
              <li>
                <a href="https://psc.gov.np" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "PSC आधिकारिक वेबसाइट" : "PSC Official Website"}
                </a>
              </li>
              <li>
                <Link href="/blog/2" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "तयारी टिप्स" : "Preparation Tips"}
                </Link>
              </li>
              <li>
                <Link href="/blog/3" className="text-gray-200 hover:text-white transition">
                  {language === "np" ? "अध्ययन सामग्री" : "Study Materials"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              {language === "np" ? "सम्पर्क" : "Contact"}
            </h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li className="flex items-center space-x-2">
                <span>📧</span>
                <span>info@loksewa-portal.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📱</span>
                <span>+977-1-000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📍</span>
                <span>Kathmandu, Nepal</span>
              </li>
            </ul>
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-600 mt-8 pt-6 text-center text-sm text-gray-200">
          <p>
            © {currentYear} {language === "np" ? "लोक सेवा तयारी पोर्टल" : "Loksewa Preparation Portal"} | 
            {" "}{language === "np" ? "सर्वाधिकार सुरक्षित" : "All Rights Reserved"}
          </p>
          <p className="mt-2">
            {language === "np" 
              ? "नेपाल सरकारी सेवा परीक्षाको तयारीको लागि बनाइएको"
              : "Made for Nepal Government Service Examination Preparation"} 🇳🇵
          </p>
        </div>
      </div>
    </footer>
  );
}
