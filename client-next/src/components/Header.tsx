"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = ({ language, setLanguage }: { language: string, setLanguage: (lang: string) => void }) => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/saved-schemes', label: 'Saved' }
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="border-b border-white/5 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-14">

                    {/* Simple Text Logo */}
                    <Link href="/" className="font-semibold text-base text-white hover:text-gray-300 transition-colors">
                        GovScheme Finder
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-sm font-medium transition-colors ${isActive(link.path) ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                            className="text-xs font-medium text-gray-500 hover:text-gray-300 transition-colors uppercase"
                        >
                            {language === 'en' ? 'हिं' : 'EN'}
                        </button>

                        <SignedOut>
                            <Link
                                href="/sign-in"
                                className="hidden sm:inline-block text-sm font-medium text-white hover:text-gray-300 transition-colors"
                            >
                                Sign in
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>

                        {/* Mobile Menu */}
                        <button
                            className="md:hidden text-gray-400 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/5">
                        <nav className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-sm font-medium ${isActive(link.path) ? 'text-white' : 'text-gray-400'}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <SignedOut>
                                <Link
                                    href="/sign-in"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-sm font-medium text-white pt-2 border-t border-white/5"
                                >
                                    Sign in
                                </Link>
                            </SignedOut>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
