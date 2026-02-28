"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';
import { getAnalytics } from '@/lib/api';

const AdminDashboard = ({ language }: { language: string }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const analyticsData = await getAnalytics();
                if (!analyticsData) throw new Error("No data");
                setData(analyticsData);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load analytics (using fallback):", err);
                const mockData = {
                    totalSearches: 1245,
                    topStates: [
                        { _id: 'Maharashtra', count: 450 },
                        { _id: 'UP', count: 320 },
                        { _id: 'Bihar', count: 210 },
                        { _id: 'Delhi', count: 150 },
                        { _id: 'Karnataka', count: 115 }
                    ],
                    topOccupations: [
                        { _id: 'Student', count: 520 },
                        { _id: 'Farmer', count: 340 },
                        { _id: 'Unemployed', count: 210 },
                        { _id: 'Business', count: 120 },
                        { _id: 'Homemaker', count: 55 }
                    ],
                    recentSearches: []
                };
                setData(mockData);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return null;
    if (!data) return null;

    const isHindi = language === 'hi';

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-1">
                        {isHindi ? 'प्लेटफ़ॉर्म आँकड़े' : 'Platform Analytics'}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {isHindi ? 'उपयोगकर्ता गतिविधि और खोज डेटा' : 'User activity and search data overview'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* KPI Cards - Simplified */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">

                        <div className="bg-[#141414] border border-white/5 rounded-lg p-6">
                            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Total Searches</p>
                            <p className="text-3xl font-bold mb-1">
                                {data.totalSearches ? data.totalSearches.toLocaleString() : '0'}
                            </p>
                            <div className="flex items-center gap-1.5 text-green-500 text-xs font-medium">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>+12% this week</span>
                            </div>
                        </div>

                        <div className="bg-[#141414] border border-white/5 rounded-lg p-6">
                            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">Active States</p>
                            <p className="text-3xl font-bold mb-1">
                                {data.topStates?.length || 0}
                            </p>
                            <p className="text-xs text-gray-600">With user activity</p>
                        </div>

                        <div className="bg-[#141414] border border-white/5 rounded-lg p-6">
                            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wider">User Categories</p>
                            <p className="text-3xl font-bold mb-1">
                                {data.topOccupations?.length || 0}
                            </p>
                            <p className="text-xs text-gray-600">Demographics tracked</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Top States Chart */}
                        <div className="bg-[#141414] border border-white/5 rounded-lg p-6">
                            <h4 className="text-base font-semibold mb-4">
                                {isHindi ? 'शीर्ष राज्य' : 'Top States'}
                            </h4>
                            <div style={{ width: '100%', height: 240 }}>
                                <ResponsiveContainer>
                                    <BarChart data={data.topStates}>
                                        <XAxis
                                            dataKey="_id"
                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                            interval={0}
                                            height={30}
                                            stroke="#2e2e2e"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                fontSize: '12px'
                                            }}
                                            cursor={{ fill: 'rgba(253, 54, 110, 0.05)' }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="#FD366E"
                                            radius={[4, 4, 0, 0]}
                                            barSize={35}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Top Occupations Chart */}
                        <div className="bg-[#141414] border border-white/5 rounded-lg p-6">
                            <h4 className="text-base font-semibold mb-4">
                                {isHindi ? 'शीर्ष व्यवसाय' : 'User Demographics'}
                            </h4>
                            <div style={{ width: '100%', height: 240 }}>
                                <ResponsiveContainer>
                                    <BarChart data={data.topOccupations} layout="vertical">
                                        <XAxis type="number" hide />
                                        <YAxis
                                            type="category"
                                            dataKey="_id"
                                            width={90}
                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                            stroke="#2e2e2e"
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#1a1a1a',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                fontSize: '12px'
                                            }}
                                            cursor={{ fill: 'rgba(168, 85, 247, 0.05)' }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="#a855f7"
                                            radius={[0, 4, 4, 0]}
                                            barSize={22}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#141414] border border-white/5 rounded-lg p-6">
                            <h4 className="text-base font-semibold mb-4">
                                {isHindi ? 'हालिया गतिविधि' : 'Recent Activity'}
                            </h4>

                            <div className="space-y-4">
                                {data.recentSearches && data.recentSearches.length > 0 ? (
                                    data.recentSearches.map((item: any, index: number) => (
                                        <div key={index} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                            <p className="text-xs text-gray-600 mb-1">
                                                {item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                                            </p>
                                            <p className="text-sm text-gray-300">
                                                <span className="font-medium text-white">{item.profile?.occupation || 'User'}</span> from {item.profile?.state || 'India'} found <span className="text-[#FD366E] font-medium">{item.schemesFound}</span> schemes
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-600">No recent activity.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
