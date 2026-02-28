import React from 'react';
import { ShieldCheck, Database, UserX, Building2 } from 'lucide-react';

const TrustSection = ({ language, t }) => {
    const isHindi = language === 'hi';

    const cards = [
        {
            icon: UserX,
            title: isHindi ? 'आधार की आवश्यकता नहीं' : 'No Aadhaar Required',
            desc: isHindi ? 'ब्राउज़ करने के लिए किसी भी आईडी को लिंक करने की आवश्यकता नहीं है।' : 'No need to link any ID just to browse schemes.'
        },
        {
            icon: Database,
            title: isHindi ? 'कोई व्यक्तिगत डेटा संग्रहीत नहीं' : 'No Personal Data Stored',
            desc: isHindi ? 'हम आपकी गोपनीयता का सम्मान करते हैं और संवेदनशील डेटा संग्रहीत नहीं करते हैं।' : 'We respect your privacy. No sensitive data is saved.'
        },
        {
            icon: ShieldCheck,
            title: isHindi ? 'गुमनाम एआई प्रोसेसिंग' : 'Anonymous AI Processing',
            desc: isHindi ? 'एआई आपके नाम को जाने बिना आपकी प्रोफाइल का विश्लेषण करता है।' : 'AI analyzes your profile without ever knowing your name.'
        },
        {
            icon: Building2,
            title: isHindi ? 'सरकारी डेटा स्रोत' : 'Gov Data Sources Only',
            desc: isHindi ? 'विश्वसनीयता के लिए केवल आधिकारिक स्रोतों से जानकारी।' : 'Information curated from official sources for reliability.'
        }
    ];

    return (
        <div className="py-20 relative max-w-5xl mx-auto">
            <div className="text-center mb-16 px-4">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#262626] bg-[#0a0a0a] text-[#f97316] text-xs font-bold uppercase tracking-widest mono-text mb-6">
                    <ShieldCheck className="w-4 h-4" />
                    {isHindi ? '100% सुरक्षित और निजी' : 'Secure & Private'}
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight uppercase">
                    {isHindi ? 'विश्वास और सुरक्षा' : 'The Science of Trust'}
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                    {isHindi
                        ? 'आपकी गोपनीयता हमारी priority है। बिना किसी डर के योजनाओं का लाभ उठाएं।'
                        : 'We prioritize your data security above all else. Explore government schemes anonymously and safely.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#262626] border border-[#262626] shadow-xl">
                {cards.map((card, index) => (
                    <div key={index} className="group relative p-10 bg-[#0a0a0a] hover:bg-[#121212] transition-colors duration-300">
                        <div className="absolute top-0 left-0 w-1 h-0 bg-[#f97316] group-hover:h-full transition-all duration-300 ease-out"></div>

                        <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                            <div className="w-14 h-14 shrink-0 bg-[#141414] border border-[#262626] flex items-center justify-center group-hover:border-neutral-500 transition-colors">
                                <card.icon className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#f97316] transition-colors">{card.title}</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed font-light">{card.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustSection;
