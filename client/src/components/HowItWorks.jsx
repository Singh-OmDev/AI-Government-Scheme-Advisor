import React from 'react';
import { UserCircle2, BrainCircuit, FileCheck, ArrowRight } from 'lucide-react';

const HowItWorks = ({ t }) => {
    const steps = [
        {
            icon: <UserCircle2 className="w-8 h-8 text-neutral-400 group-hover:text-white transition-colors" />,
            title: t?.step1Title || "Enter Details",
            desc: t?.step1Desc || "Provide basic information about yourself."
        },
        {
            icon: <BrainCircuit className="w-8 h-8 text-[#f97316]" />,
            title: t?.step2Title || "AI Analysis",
            desc: t?.step2Desc || "Our AI scans hundreds of schemes for you."
        },
        {
            icon: <FileCheck className="w-8 h-8 text-neutral-400 group-hover:text-white transition-colors" />,
            title: t?.step3Title || "Get Results",
            desc: t?.step3Desc || "Receive a personalized list of benefits."
        }
    ];

    return (
        <div className="py-20 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">{t?.howItWorks || "From Inputs to Impact"}</h2>
                <div className="w-16 h-1 bg-[#f97316] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#262626] bg-[#0a0a0a] relative">
                {steps.map((step, index) => (
                    <div key={index} className={`relative p-10 flex flex-col items-center text-center group hover:bg-[#121212] transition-colors ${index !== steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#262626]' : ''}`}>
                        <div className="mb-6 p-4 bg-[#141414] border border-[#262626] rounded-none shadow-sm group-hover:border-neutral-500 transition-colors">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-3 uppercase tracking-wide">{step.title}</h3>
                        <p className="text-sm text-neutral-300 font-medium leading-relaxed">{step.desc}</p>

                        {index !== steps.length - 1 && (
                            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-[#0a0a0a] p-1 border border-[#262626] rounded-full text-neutral-600">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
