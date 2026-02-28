"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';

const InputForm = ({ onSubmit, isLoading }: any) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        state: 'Uttar Pradesh',
        annualIncome: '',
        category: ''
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const isStepValid = () => {
        if (step === 1) return formData.name && formData.age && formData.gender;
        if (step === 2) return formData.state && formData.annualIncome && formData.category;
        return true;
    };

    const InputField = ({ label, name, type = "text", placeholder, value, onChange }: any) => (
        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/5 focus:border-[#FD366E] focus:outline-none transition-colors placeholder:text-gray-600 text-white"
            />
        </div>
    );

    const SelectField = ({ label, name, value, onChange, options }: any) => (
        <div className="mb-5">
            <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/5 focus:border-[#FD366E] focus:outline-none transition-colors text-white appearance-none cursor-pointer"
            >
                <option value="" disabled>Select {label}</option>
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="bg-[#141414] border border-white/5 rounded-lg p-8">

            {/* Steps Indicator - Simplified */}
            <div className="flex items-center justify-center mb-8 gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= 1 ? 'bg-[#FD366E] text-white' : 'bg-white/5 text-gray-600'}`}>
                    1
                </div>
                <div className={`w-16 h-0.5 rounded-full transition-colors ${step > 1 ? 'bg-[#FD366E]' : 'bg-white/5'}`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step >= 2 ? 'bg-[#FD366E] text-white' : 'bg-white/5 text-gray-600'}`}>
                    2
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

                            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" />
                            <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="e.g. 28" />

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['Male', 'Female', 'Other'].map((g) => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${formData.gender === g ? 'bg-[#FD366E] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className="w-full py-3 bg-[#FD366E] text-white rounded-lg font-medium hover:bg-[#e82d5f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold mb-6">Location & Income</h3>

                            <SelectField
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                options={["Uttar Pradesh", "Maharashtra", "Bihar", "West Bengal", "Delhi", "Other"]}
                            />

                            <SelectField
                                label="Annual Income"
                                name="annualIncome"
                                value={formData.annualIncome}
                                onChange={handleChange}
                                options={["Less than 1 Lakh", "1 Lakh - 3 Lakhs", "3 Lakhs - 5 Lakhs", "More than 5 Lakhs"]}
                            />

                            <SelectField
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                options={["General", "OBC", "SC", "ST"]}
                            />

                            <div className="flex gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 bg-white/5 text-gray-400 rounded-lg font-medium hover:bg-white/10 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading || !isStepValid()}
                                    className="flex-1 py-3 bg-[#FD366E] text-white rounded-lg font-medium hover:bg-[#e82d5f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Find My Schemes'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
};

export default InputForm;
