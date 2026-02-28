"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-[#0d0d0d] mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

                    {/* Left: Links */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/dashboard" className="text-gray-500 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                        <Link href="/saved-schemes" className="text-gray-500 hover:text-white transition-colors">
                            Saved
                        </Link>
                        <span className="text-gray-700">·</span>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors">
                            Terms
                        </a>
                    </div>

                    {/* Right: Copyright */}
                    <p className="text-gray-600 text-sm">
                        © {currentYear} GovScheme Finder
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
