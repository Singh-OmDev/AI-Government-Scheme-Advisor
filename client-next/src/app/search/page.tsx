"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";
import { searchSchemes } from '@/lib/api';
import { ChevronLeft, Search, Loader2 } from 'lucide-react';
import SchemeCard from '@/components/SchemeCard';
import { translations } from '@/lib/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SearchContent = ({ language, setLanguage }: any) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    // Get translations
    const t = translations[language as keyof typeof translations] || translations['en'];

    const { getToken, isLoaded, isSignedIn } = useAuth();

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            if (!isLoaded || !isSignedIn) return; // Wait for auth

            setLoading(true);
            setError(null);
            try {
                const token = await getToken();
                const data = await searchSchemes(query, language, token || "");
                setResults(data.schemes || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch search results. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, language, isLoaded, isSignedIn, getToken]);

    // Show loading state while Auth is loading or while searching
    if (!isLoaded || (loading && !results.length && query)) {
        // Only show loader if we have a query. If no query, we show "No schemes found" or similar which might not be right... 
        // Actually if !query locally we probably just don't have results yet.
        // Let's stick to the original logic
        if (!query) return null; // Or some fallback

        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-white">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-400">Searching for "{query}"...</p>
            </div>
        );
    }

    // Redirect if not signed in
    if (!isSignedIn) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-white p-4 text-center">
                <p className="mb-4">Please sign in to search schemes.</p>
                <Link href="/sign-in" className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500">Sign In</Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {/* Back Link */}
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </Link>

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    Search Results
                </h1>
                <p className="text-slate-400 text-lg">
                    Found {results.length} schemes for <span className="text-blue-300 font-medium">"{query}"</span>
                </p>
            </div>

            {error ? (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center">
                    {error}
                </div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((scheme, index) => (
                        <SchemeCard key={index} scheme={scheme} language={language} t={t} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                    <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No schemes found</h3>
                    <p className="text-slate-400">Try searching for a different keyword like "Housing", "Students", or "Farmers".</p>
                </div>
            )}
        </div>
    );
};

const SearchResultsPage = () => {
    const [language, setLanguage] = useState('en');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 pb-20">
            <Header language={language} setLanguage={setLanguage} />
            <div className="h-20" />

            <Suspense fallback={<div className="p-10 text-center text-white">Loading Search...</div>}>
                <SearchContent language={language} setLanguage={setLanguage} />
            </Suspense>

            <Footer />
        </div>
    );
};

export default SearchResultsPage;
