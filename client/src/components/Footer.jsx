import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full py-12 mt-20 border-t border-[#262626] bg-[#0a0a0a]">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <span className="font-display font-bold text-2xl tracking-tight text-white uppercase">
                        Scheme<span className="text-[#f97316]">.AI</span>
                    </span>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-neutral-400 text-sm flex items-center justify-center md:justify-end gap-2 font-mono uppercase tracking-widest font-medium">
                        Engineered with <Heart className="w-4 h-4 text-[#f97316]" /> for Impact
                    </p>
                    <p className="text-neutral-500 text-xs mt-3 font-mono uppercase tracking-widest font-medium">
                        © {new Date().getFullYear()} Scheme.AI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
