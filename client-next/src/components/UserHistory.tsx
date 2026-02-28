"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { getUserHistory } from '@/lib/api';

const UserHistory = ({ language }: { language: string }) => {
    const { user } = useUser();
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchHistory = async () => {
            try {
                const historyData = await getUserHistory(user.id);
                setHistory(historyData);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load history", err);
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    if (!user) return null;

    if (loading) return <div className="p-8 text-center text-gray-500">Loading history...</div>;

    if (history.length === 0) return (
        <div className="p-8 text-center bg-[#141414] border border-white/5 rounded-lg">
            <h3 className="text-lg font-semibold mb-1">No History Yet</h3>
            <p className="text-gray-600 text-sm">Your recent scheme searches will appear here.</p>
        </div>
    );

    return (
        <div className="bg-[#141414] border border-white/5 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-5">
                {language === 'hi' ? 'मेरा इतिहास' : 'Search History'}
            </h3>

            <div className="space-y-3">
                {history.map((item) => (
                    <div key={item._id} className="bg-[#1a1a1a] border border-white/5 p-4 rounded-lg hover:border-white/10 transition-colors">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </span>
                                <span>·</span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {item.profile?.state}
                                </span>
                                <span>·</span>
                                <span className="flex items-center gap-1.5">
                                    <Briefcase className="w-3.5 h-3.5" />
                                    {item.profile?.occupation}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-white">
                                Found <span className="text-[#FD366E]">{item.schemesFound}</span> matching schemes
                            </p>
                            {item.topSchemes && item.topSchemes.length > 0 && (
                                <p className="text-xs text-gray-600 truncate">
                                    {item.topSchemes.join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserHistory;
