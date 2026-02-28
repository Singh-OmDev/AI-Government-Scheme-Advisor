"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import { translations } from '@/lib/translations';
import { SignedIn } from '@clerk/nextjs';
import UserHistory from '@/components/UserHistory';

const DashboardPage = () => {
    const [language, setLanguage] = useState('en');
    const t = translations[language as keyof typeof translations] as any;

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#FD366E]/20 flex flex-col">
            <Header language={language} setLanguage={setLanguage} />

            <main className="flex-grow container mx-auto px-6 py-8 space-y-8 mt-20">
                <SignedIn>
                    <UserHistory language={language} />
                </SignedIn>

                <AdminDashboard language={language} />
            </main>

            <Footer />
        </div>
    );
};

export default DashboardPage;
