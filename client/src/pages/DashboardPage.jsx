import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import { translations } from '../translations';

const DashboardPage = () => {
    // Default language state for Header compatibility
    // In a real app, this might be in a context, but here we can manage it locally or default to 'en'
    // Since Header expects setLanguage, we provide it.
    const [language, setLanguage] = useState('en');
    const t = translations[language];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 flex flex-col">
            <Header language={language} setLanguage={setLanguage} t={t} />

            <main className="flex-grow">
                <AdminDashboard language={language} />
            </main>

            <Footer />
        </div>
    );
};

export default DashboardPage;
