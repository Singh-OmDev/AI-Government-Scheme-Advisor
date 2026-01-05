
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Languages, ShieldCheck, BarChart2, HelpCircle } from 'lucide-react';

const Header = ({ language, setLanguage, t }) => {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-blue-600/20 p-2 rounded-lg group-hover:bg-blue-600/30 transition-colors">
                        <ShieldCheck className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Scheme<span className="text-blue-400">Advisor</span></span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-full border border-blue-500/20 transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] group">
                        <BarChart2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm">Insights</span>
                    </Link>

                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-gray-300"
                    >
                        <Languages className="w-4 h-4" />
                        {language === 'en' ? 'हिंदी' : 'English'}
                    </button>

                    <Link to="/help" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        <span className="hidden md:inline">{language === 'hi' ? 'सहायता' : 'Help'}</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
