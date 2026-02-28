"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const SchemeCard = ({ scheme, index, language }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group h-full"
        >
            <div className="h-full bg-[#141414] border border-white/5 rounded-lg p-6 transition-all duration-200 hover:border-[#FD366E]/50 flex flex-col">

                {/* Header - Simplified */}
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {scheme.type || 'Government Scheme'}
                    </span>
                    {scheme.usefulnessScore && (
                        <span className="text-xs font-semibold text-gray-400">
                            {(scheme.usefulnessScore / 10).toFixed(1)}/10
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug group-hover:text-[#FD366E] transition-colors">
                    {scheme.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {scheme.description}
                </p>

                {/* Tags - More subtle */}
                {scheme.categoryTags && scheme.categoryTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {scheme.categoryTags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-xs font-medium text-gray-600 bg-white/5 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div>
                        <p className="text-xs text-gray-600 mb-0.5">Deadline</p>
                        <p className="text-sm font-medium text-gray-400">{scheme.deadline || 'Open'}</p>
                    </div>
                    {scheme.application_url && (
                        <a
                            href={scheme.application_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-sm font-medium text-[#FD366E] hover:text-[#e82d5f] transition-colors"
                        >
                            Apply <ExternalLink size={14} />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SchemeCard;
