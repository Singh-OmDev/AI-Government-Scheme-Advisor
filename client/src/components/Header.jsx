
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Languages, ShieldCheck, BarChart2, HelpCircle, BookmarkCheck, Search, X } from 'lucide-react';

import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Header = ({ language, setLanguage, t }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const isActive = (path) => location.pathname === path;

    const handleSearchCheck = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        Scheme<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Advisor</span>
                    </span>
                </Link>

                {/* Centered Navigation Pills */}
                <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-xl shadow-black/20">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive('/dashboard')
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <BarChart2 className={`w-4 h-4 ${isActive('/dashboard') ? 'animate-pulse' : ''}`} />
                        Insights
                    </Link>

                    <SignedIn>
                        <Link
                            to="/saved-schemes"
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive('/saved-schemes')
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <BookmarkCheck className="w-4 h-4" />
                            Saved
                        </Link>
                    </SignedIn>
                </nav>

                {/* Right Actions Group */}
                <div className="flex items-center gap-4">

                    {/* Quick Search Bar */}
                    <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'bg-white/10 w-48 md:w-64' : 'w-10 bg-transparent'} rounded-full overflow-hidden border ${isSearchOpen ? 'border-white/20' : 'border-transparent'}`}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearchCheck} className="flex items-center w-full">
                                <Search className="w-4 h-4 text-slate-400 ml-3 min-w-4" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search schemes..."
                                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white text-sm px-2 py-1.5 placeholder:text-slate-500"
                                    autoFocus
                                />
                                <button type="button" onClick={() => setIsSearchOpen(false)} className="pr-2 text-slate-400 hover:text-white">
                                    <X className="w-4 h-4" />
                                </button>
                            </form>
                        ) : (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors w-10 h-10 flex items-center justify-center"
                                title="Quick Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Utility Tools */}
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/5">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            title="Change Language"
                        >
                            <Languages className="w-4 h-4" />
                        </button>

                        <div className="w-px h-4 bg-white/10" />

                        <Link to="/help" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" title="Help">
                            <HelpCircle className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Auth Section */}
                    <div className="pl-2 border-l border-white/10">
                        <SignedOut>
                            <Link
                                to="/sign-in"
                                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                            >
                                {language === 'hi' ? 'साइन इन' : 'Sign In'}
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-9 h-9 border-2 border-white/10 hover:border-blue-500/50 transition-colors"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>

                </div>
            </div>
        </header>
    );
};


export default Header;
