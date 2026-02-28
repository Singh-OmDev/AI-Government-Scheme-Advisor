"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { getSavedSchemes, removeSavedScheme } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemeCard from '@/components/SchemeCard';
import { translations } from '@/lib/translations';
import { Bookmark, Loader2 } from 'lucide-react';

const SavedSchemesPage = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [savedSchemes, setSavedSchemes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('en');
    const t = translations[language as keyof typeof translations] as any;

    useEffect(() => {
        if (!isLoaded) return;
        if (!isSignedIn) {
            setLoading(false);
            return;
        }

        const fetchSaved = async () => {
            try {
                const data = await getSavedSchemes(user.id);
                setSavedSchemes(data);
            } catch (err) {
                console.error("Failed to load saved schemes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaved();
    }, [isLoaded, isSignedIn, user]);

    const handleRemove = async (id: string) => {
        try {
            await removeSavedScheme(id);
            setSavedSchemes(prev => prev.filter(s => s._id !== id));
        } catch (err) {
            console.error("Failed to remove", err);
        }
    };

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
                <Loader2 className="w-8 h-8 animate-spin text-[#FD366E]" />
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-[#0d0d0d] flex flex-col">
                <Header language={language} setLanguage={setLanguage} />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-lg text-gray-500">Please sign in to view your saved schemes.</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">
            <Header language={language} setLanguage={setLanguage} />

            <main className="flex-grow container mx-auto px-6 py-8 mt-20">
                <div className="flex items-center gap-3 mb-8">
                    <Bookmark className="w-6 h-6 text-[#FD366E]" />
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {language === 'hi' ? 'मेरी सुरक्षित योजनाएं' : 'Saved Schemes'}
                        </h1>
                        <p className="text-gray-500 text-sm">Your bookmarked benefits.</p>
                    </div>
                </div>

                {savedSchemes.length === 0 ? (
                    <div className="text-center py-16 bg-[#141414] border border-white/5 rounded-lg">
                        <Bookmark className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold mb-1">No Saved Schemes</h3>
                        <p className="text-gray-600 text-sm">Bookmarked schemes will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedSchemes.map((item, index) => {
                            const scheme = { ...item.schemeData };
                            return (
                                <SchemeCard
                                    key={item._id}
                                    scheme={scheme}
                                    index={index}
                                    language={language}
                                />
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default SavedSchemesPage;
