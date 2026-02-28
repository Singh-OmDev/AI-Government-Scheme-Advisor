"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InputForm from '@/components/InputForm';
import SchemeCard from '@/components/SchemeCard';
import { recommendSchemes } from '@/lib/api';
import { translations } from '@/lib/translations';
import { useUser, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = translations[language as keyof typeof translations] as any;

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const data = await recommendSchemes({ ...formData, language, userId: user?.id }, token || "");
      if (data.schemes) {
        setSchemes(data.schemes);
        setShowResults(true);
        setTimeout(() => {
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#FD366E]/20 bg-[#0d0d0d] text-white flex flex-col">
      <Header language={language} setLanguage={setLanguage} />

      <main className="flex-1">

        {/* Simple, Direct Hero */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-4xl mx-auto px-6">

            {/* Main Content - Left Aligned, Not Centered */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                Find government schemes you're eligible for
              </h1>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Answer a few questions about yourself and we'll match you with relevant government programs and benefits.
              </p>

              {!isSignedIn && (
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FD366E] text-white rounded-lg font-medium hover:bg-[#e82d5f] transition-colors text-sm"
                >
                  Sign in to get started <ArrowRight size={16} />
                </Link>
              )}
            </div>

            {/* Form Section */}
            {isSignedIn && (
              <div className="mt-12 max-w-xl">
                <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} t={t} />
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {showResults && (
          <section id="results" className="py-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">
                  {schemes.length} {schemes.length === 1 ? 'scheme' : 'schemes'} found
                </h2>
                <p className="text-gray-500 text-sm">Based on the information you provided</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {schemes.map((scheme, index) => (
                  <SchemeCard
                    key={index}
                    scheme={scheme}
                    index={index}
                    language={language}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
