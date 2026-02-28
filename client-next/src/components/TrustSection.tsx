import React from 'react';
import { ShieldCheck, Database, UserX, Building2 } from 'lucide-react';

const TrustSection = ({ language, t }: { language: string, t: any }) => {
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
        <div className="py-24 bg-slate-950 border-t border-white/[0.08]">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border border-white/[0.08] bg-slate-900/20">
                    {cards.map((card, index) => (
                        <div key={index} className="p-8 group hover:bg-white/[0.02] transition-colors">
                            <card.icon className="w-5 h-5 text-slate-500 group-hover:text-brand-400 transition-colors mb-4" />
                            <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{card.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustSection;
