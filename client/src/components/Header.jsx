
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Languages, ShieldCheck, BarChart2, HelpCircle, BookmarkCheck } from 'lucide-react';

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

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

                    <SignedIn>
                        <Link to="/saved-schemes" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-green-400 rounded-full border border-green-500/20 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] group">
                            <BookmarkCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="font-medium text-sm">Saved</span>
                        </Link>
                    </SignedIn>

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

                    <SignedOut>
                        <Link
                            to="/sign-in"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                        >
                            {language === 'hi' ? 'साइन इन' : 'Sign In'}
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </nav>
            </div>
        </header>
    );
};


export default Header;
