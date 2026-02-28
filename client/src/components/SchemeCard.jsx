import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, FileText, CheckCircle, MessageSquare, Send, Share2, Gift, Bookmark, BookmarkCheck } from 'lucide-react';
import { chatWithScheme, saveScheme, removeSavedScheme } from '../api';
import { useUser } from '@clerk/clerk-react';

const SchemeCard = ({ scheme, index, t, language, initialSavedState = false, onRemove }) => {
    const { user } = useUser();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(initialSavedState);
    const [isSaveLoading, setIsSaveLoading] = useState(false);

    const handleSaveToggle = async () => {
        if (!user) {
            alert("Please sign in to save schemes!");
            return;
        }

        if (isSaved && onRemove) {
            // If onRemove is provided (e.g., SavedPage), delegated logic
            onRemove();
            return;
        }
        if (!user) {
            alert("Please sign in to save schemes!");
            return;
        }

        // Optimistic Update: Update UI immediately
        const wasSaved = isSaved;
        setIsSaved(true);
        // setIsSaveLoading(true); // Don't show loading state, just show success

        try {
            // Perform API call in background
            await saveScheme(user.id, scheme);
        } catch (error) {
            if (error.message !== "Already saved") {
                console.error("Save failed", error);
                // Revert on failure
                setIsSaved(wasSaved);
                alert("Failed to save. Please try again.");
            }
        } finally {
            setIsSaveLoading(false);
        }
    };


    const handleShare = () => {
        const text = `Check out this government scheme: *${scheme.name}*\n\n${scheme.description}\n\nFind more at AI Government Scheme Advisor!`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = { role: 'user', content: chatInput };
        setChatHistory(prev => [...prev, userMsg]);
        setChatInput('');
        setIsChatLoading(true);

        try {
            const data = await chatWithScheme(scheme, userMsg.content, language);
            const aiMsg = { role: 'ai', content: data.answer };
            setChatHistory(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat error:", error);
            setChatHistory(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#262626] hover:border-[#f97316]/50 shadow-xl transition-all group print:break-inside-avoid print:bg-white print:border-gray-300 print:text-black"
        >
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${scheme.type === 'Central'
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 print:text-orange-600 print:border-orange-600'
                            : 'bg-green-500/10 text-green-400 border border-green-500/20 print:text-green-600 print:border-green-600'
                            }`}>
                            {scheme.type === 'Central' ? t.central : t.state}
                        </span>
                        <h3 className="text-xl font-display font-bold text-white mt-3 leading-tight group-hover:text-[#f97316] transition-colors print:text-black uppercase tracking-wide">
                            {scheme.name}
                        </h3>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            {scheme.deadline &&
                                !['n/a', 'varies', 'check', 'unknown', 'various'].some(bad => scheme.deadline.toLowerCase().includes(bad)) && (
                                    <div className="text-[10px] text-red-300 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 font-medium whitespace-nowrap">
                                        ⏳ {scheme.deadline === 'Open' ? (language === 'hi' ? 'खुला है' : 'Open') : scheme.deadline}
                                    </div>
                                )}
                            <div className="flex items-center gap-1 text-xs text-[#f97316] bg-[#f97316]/10 px-2 py-1 rounded-md border border-[#f97316]/20 print:text-[#f97316] font-mono tracking-wider uppercase">
                                <span className="font-bold">{scheme.usefulnessScore}%</span> {t.match}
                            </div>
                        </div>
                        <button
                            onClick={handleShare}
                            className="text-gray-400 hover:text-green-400 transition-colors print:hidden"
                            title={t.share}
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={handleSaveToggle}
                            disabled={isSaveLoading || isSaved}
                            className={`transition-colors print:hidden relative ${isSaved ? 'text-[#f97316]' : 'text-neutral-500 hover:text-[#f97316]'}`}
                            title={isSaved ? "Saved" : "Save Scheme"}
                        >
                            <motion.div
                                key={isSaved ? "saved" : "unsaved"}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {isSaved ? <BookmarkCheck className="w-6 h-6 fill-current" /> : <Bookmark className="w-6 h-6" />}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {scheme.categoryTags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 bg-[#050505] px-2 py-1 rounded border border-[#262626] print:text-gray-600 print:border-gray-400">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-neutral-400 mb-6 line-clamp-2 print:text-gray-700 leading-relaxed">
                    {scheme.description}
                </p>

                <div className="flex gap-4 print:hidden">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs text-neutral-400 hover:text-white font-bold flex items-center gap-1 transition-colors uppercase tracking-widest mono-text"
                    >
                        {isExpanded ? t.showLess : t.viewDetails}
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </button>

                    <button
                        onClick={() => setShowChat(!showChat)}
                        className={`text-xs font-bold flex items-center gap-1 transition-colors uppercase tracking-widest mono-text ${showChat ? 'text-[#f97316]' : 'text-neutral-400 hover:text-[#f97316]'}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        {t.askAI}
                    </button>

                    {/* Apply Button Logic with Fallback */}
                    {(() => {
                        const hasUrl = scheme.application_url && scheme.application_url !== 'N/A';
                        const linkUrl = hasUrl
                            ? scheme.application_url
                            : `https://www.google.com/search?q=${encodeURIComponent(scheme.name + ' official website apply online')}`;

                        return (
                            <div className="flex flex-col items-end gap-1">
                                <a
                                    href={linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-sm font-semibold flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg shadow-sm ${hasUrl
                                        ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20'
                                        : 'bg-slate-700 hover:bg-slate-600 text-gray-200 border border-white/10'
                                        }`}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {hasUrl
                                        ? (language === 'hi' ? 'अभी आवेदन करें' : 'Apply Now')
                                        : (language === 'hi' ? 'खोजें और आवेदन करें' : 'Search to Apply')
                                    }
                                </a>
                                {hasUrl && (
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                        Source: {new URL(scheme.application_url).hostname.replace('www.', '')}
                                    </span>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </div>

            {/* Chat Section */}
            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#050505] border-t border-[#262626] print:hidden"
                    >
                        <div className="p-4 space-y-4">
                            <h4 className="text-[10px] font-bold text-[#f97316] uppercase tracking-widest mono-text">{t.chatTitle}</h4>

                            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
                                {chatHistory.length === 0 && (
                                    <p className="text-xs text-gray-500 italic">{t.chatPlaceholder}</p>
                                )}
                                {chatHistory.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#262626] text-white border border-[#404040]'
                                            : 'bg-[#0a0a0a] text-neutral-300 border border-[#262626]'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isChatLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleChatSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder={t.typeQuestion}
                                    className="flex-1 bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/30 mono-text placeholder-neutral-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!chatInput.trim() || isChatLoading}
                                    className="bg-[#f97316] hover:bg-[#ff8a3d] disabled:opacity-50 disabled:cursor-not-allowed text-black p-3 rounded-lg transition-colors border border-[#f97316]"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`${isExpanded ? 'block' : 'hidden'} print:block`}>
                <AnimatePresence>
                    {(isExpanded || true) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="bg-[#050505] border-t border-[#262626] p-6 space-y-0 print:bg-transparent print:border-gray-300 print:text-black relative">
                                {/* Vertical Timeline Line */}
                                <div className="absolute left-8 top-10 bottom-10 w-px bg-[#262626] hidden md:block"></div>

                                <div className="flex flex-col gap-8 relative z-10">
                                    {/* Eligibility */}
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 group items-start md:items-center">
                                        <div className="md:w-1/3 flex-shrink-0">
                                            <h4 className="font-bold text-white text-[10px] uppercase tracking-widest mono-text flex items-center gap-3 print:text-black">
                                                <span className="w-6 h-6 rounded bg-[#0a0a0a] border border-[#262626] flex items-center justify-center text-[#f97316] group-hover:border-[#f97316]/50 transition-colors">1</span>
                                                {t.eligibility}
                                            </h4>
                                        </div>
                                        <div className="md:w-2/3 bg-[#0a0a0a] rounded-xl p-5 border border-[#262626] hover:border-[#404040] transition-colors">
                                            <ul className="space-y-3">
                                                {scheme.eligibilitySummary.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-white font-medium text-sm">
                                                        <span className="text-[#f97316] mono-text mt-0.5">&gt;</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    {scheme.benefits && scheme.benefits.length > 0 && (
                                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 group items-start md:items-center">
                                            <div className="md:w-1/3 flex-shrink-0">
                                                <h4 className="font-bold text-white text-[10px] uppercase tracking-widest mono-text flex items-center gap-3 print:text-black">
                                                    <span className="w-6 h-6 rounded bg-[#0a0a0a] border border-[#262626] flex items-center justify-center text-[#f97316] group-hover:border-[#f97316]/50 transition-colors">2</span>
                                                    {t.benefits}
                                                </h4>
                                            </div>
                                            <div className="md:w-2/3 bg-[#0a0a0a] rounded-xl p-5 border border-[#262626] hover:border-[#404040] transition-colors">
                                                <ul className="space-y-3">
                                                    {scheme.benefits.map((benefit, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-white font-medium text-sm">
                                                            <span className="text-[#f97316] mono-text mt-0.5">&gt;</span>
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Documents */}
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 group items-start md:items-center">
                                        <div className="md:w-1/3 flex-shrink-0">
                                            <h4 className="font-bold text-white text-[10px] uppercase tracking-widest mono-text flex items-center gap-3 print:text-black">
                                                <span className="w-6 h-6 rounded bg-[#0a0a0a] border border-[#262626] flex items-center justify-center text-[#f97316] group-hover:border-[#f97316]/50 transition-colors">3</span>
                                                {t.documents}
                                            </h4>
                                        </div>
                                        <div className="md:w-2/3 bg-[#0a0a0a] rounded-xl p-5 border border-[#262626] hover:border-[#404040] transition-colors">
                                            <div className="flex flex-wrap gap-2">
                                                {scheme.requiredDocuments.map((doc, i) => (
                                                    <span key={i} className="bg-[#050505] text-white font-medium px-3 py-1.5 rounded-lg text-xs mono-text uppercase border border-[#262626] print:text-gray-700 print:border-gray-400">
                                                        {doc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Application Steps */}
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 group items-start md:items-center">
                                        <div className="md:w-1/3 flex-shrink-0">
                                            <h4 className="font-bold text-white text-[10px] uppercase tracking-widest mono-text flex items-center gap-3 print:text-black">
                                                <span className="w-6 h-6 rounded bg-[#0a0a0a] border border-[#262626] flex items-center justify-center text-[#f97316] group-hover:border-[#f97316]/50 transition-colors">4</span>
                                                {t.steps}
                                            </h4>
                                        </div>
                                        <div className="md:w-2/3 bg-[#0a0a0a] rounded-xl p-5 border border-[#262626] hover:border-[#404040] transition-colors">
                                            <ol className="space-y-4">
                                                {scheme.applicationSteps.map((step, i) => (
                                                    <li key={i} className="flex items-start gap-4 text-white font-medium text-sm">
                                                        <span className="flex-shrink-0 w-6 h-6 bg-[#262626] text-white rounded flex items-center justify-center text-[10px] font-bold border border-[#404040] mono-text">
                                                            {i + 1}
                                                        </span>
                                                        <span className="mt-0.5">{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SchemeCard;
