import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';
import { translations } from '../translations';

const DashboardPage = () => {

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
