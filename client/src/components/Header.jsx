
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Languages, ShieldCheck, BarChart2 } from 'lucide-react';

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

                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                        <BarChart2 className="w-4 h-4 text-purple-400" />
                        <span>Insights</span>
                    </Link>

                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium text-gray-300"
                    >
                        <Languages className="w-4 h-4" />
                        {language === 'en' ? 'हिंदी' : 'English'}
                    </button>

                </div>
            </div>
        </header>
    )
};

export default Header;
