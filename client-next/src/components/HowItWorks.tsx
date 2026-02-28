"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, BrainCircuit, FileCheck } from 'lucide-react';

const HowItWorks = ({ t }: { t: any }) => {
    const steps = [
        {
            icon: <UserCircle2 className="w-8 h-8 text-brand-400" />,
            title: t?.step1Title || "Enter Details",
            desc: t?.step1Desc || "Provide basic information about yourself."
        },
        {
            icon: <BrainCircuit className="w-8 h-8 text-accent-gold" />,
            title: t?.step2Title || "AI Analysis",
            desc: t?.step2Desc || "Our AI scans hundreds of schemes for you."
        },
        {
            icon: <FileCheck className="w-8 h-8 text-brand-500" />,
            title: t?.step3Title || "Get Results",
            desc: t?.step3Desc || "Receive a personalized list of benefits."
        }
    ];

    return (
        <div className="py-20 border-t border-white/5">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">{t?.howItWorks || "How It Works"}</h2>
                <p className="text-slate-400 max-w-xl mx-auto">Three simple steps to access benefits designed for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-900/50 border border-white/5 hover:border-white/10 p-8 rounded-2xl flex flex-col items-start transition-colors"
                    >
                        <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/5">
                            {React.cloneElement(step.icon, { className: "w-6 h-6 text-brand-400" })}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
