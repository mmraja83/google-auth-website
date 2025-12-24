import React from 'react';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-text-main dark:text-white tracking-tight">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h2>
                        <p className="text-text-secondary dark:text-gray-400 mt-1">Logged in as <span className="font-medium text-text-main dark:text-gray-300">{user?.email}</span></p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-main dark:text-gray-200 hover:bg-background-light dark:hover:bg-white/5 shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[20px]">cloud_download</span>
                            Export
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium shadow-md shadow-primary/20 transition-all">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            Add Report
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Sales */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Total Sales</p>
                            <h3 className="text-2xl font-bold text-text-main dark:text-white mt-2">$124,500</h3>
                        </div>
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400">
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                            +12.5%
                        </span>
                        <span className="text-xs text-text-secondary dark:text-gray-500">from last month</span>
                    </div>
                </div>

                {/* New Users */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">New Users</p>
                            <h3 className="text-2xl font-bold text-text-main dark:text-white mt-2">1,204</h3>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">group_add</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                            +5.2%
                        </span>
                        <span className="text-xs text-text-secondary dark:text-gray-500">from last month</span>
                    </div>
                </div>

                {/* Server Load */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Server Load</p>
                            <h3 className="text-2xl font-bold text-text-main dark:text-white mt-2">45%</h3>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500 dark:text-blue-400">
                            <span className="material-symbols-outlined">dns</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs font-semibold text-text-secondary dark:text-gray-400 bg-background-light dark:bg-white/5 px-1.5 py-0.5 rounded">
                            Stable
                        </span>
                        <span className="text-xs text-text-secondary dark:text-gray-500">last updated 1m ago</span>
                    </div>
                </div>

                {/* Pending Tickets */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Pending Tickets</p>
                            <h3 className="text-2xl font-bold text-text-main dark:text-white mt-2">12</h3>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-500 dark:text-orange-400">
                            <span className="material-symbols-outlined">pending_actions</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 flex items-center bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded">
                            Action Required
                        </span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Overview (Bar Chart) */}
                <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Revenue Overview</h3>
                        <select className="text-sm bg-background-light dark:bg-white/5 border-none rounded-lg text-text-secondary dark:text-gray-300 py-1 pl-3 pr-8 focus:ring-1 focus:ring-primary cursor-pointer outline-none">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    {/* Simulated Bar Chart */}
                    <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 mt-4 px-2">
                        {[
                            { m: 'Jan', h: '45%' }, { m: 'Feb', h: '60%' }, { m: 'Mar', h: '35%' },
                            { m: 'Apr', h: '80%' }, { m: 'May', h: '55%' }, { m: 'Jun', h: '70%' },
                            { m: 'Jul', h: '90%' }, { m: 'Aug', h: '65%' }
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                                <div className="w-full bg-background-light dark:bg-white/5 rounded-t-sm relative h-48 overflow-hidden">
                                    <div
                                        className="absolute bottom-0 w-full bg-primary/80 group-hover:bg-primary transition-all duration-500 rounded-t-sm"
                                        style={{ height: item.h }}
                                    ></div>
                                </div>
                                <span className="text-xs text-text-secondary dark:text-gray-500">{item.m}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Traffic Source (Donut Chart) */}
                <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Traffic Sources</h3>
                    <div className="flex-1 flex flex-col items-center justify-center relative">
                        <div className="relative h-48 w-48 rounded-full" style={{ background: 'conic-gradient(#f27f0d 0% 55%, #fb923c 55% 80%, #fed7aa 80% 100%)' }}>
                            <div className="absolute inset-4 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center flex-col">
                                <span className="text-2xl font-bold text-text-main dark:text-white">85%</span>
                                <span className="text-xs text-text-secondary dark:text-gray-400 uppercase tracking-wide">Growth</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-primary"></span>
                                <span className="text-text-secondary dark:text-gray-300">Direct</span>
                            </div>
                            <span className="font-semibold text-text-main dark:text-white">55%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-orange-400"></span>
                                <span className="text-text-secondary dark:text-gray-300">Social</span>
                            </div>
                            <span className="font-semibold text-text-main dark:text-white">25%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-orange-200"></span>
                                <span className="text-text-secondary dark:text-gray-300">Referral</span>
                            </div>
                            <span className="font-semibold text-text-main dark:text-white">20%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center">
                        <h3 className="text-lg font-bold text-text-main dark:text-white">Recent Orders</h3>
                        <button className="text-primary text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-text-secondary dark:text-gray-400">
                            <thead className="bg-background-light dark:bg-white/5 text-xs uppercase font-semibold text-text-secondary dark:text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-light dark:divide-white/5">
                                {[
                                    { id: '#ORD-5542', name: 'Jane Cooper', date: 'Oct 24, 2023', amt: '$124.00', status: 'Completed', color: 'green' },
                                    { id: '#ORD-5541', name: 'Wade Warren', date: 'Oct 23, 2023', amt: '$89.00', status: 'Pending', color: 'yellow' },
                                    { id: '#ORD-5540', name: 'Esther Howard', date: 'Oct 23, 2023', amt: '$240.50', status: 'Completed', color: 'green' },
                                    { id: '#ORD-5539', name: 'Cameron Williamson', date: 'Oct 22, 2023', amt: '$56.00', status: 'Cancelled', color: 'red' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-background-light dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-text-main dark:text-white">{row.id}</td>
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">{row.name[0]}</div>
                                            <span>{row.name}</span>
                                        </td>
                                        <td className="px-6 py-4">{row.date}</td>
                                        <td className="px-6 py-4 font-medium text-text-main dark:text-white">{row.amt}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${row.color}-100 text-${row.color}-800 dark:bg-${row.color}-900/30 dark:text-${row.color}-400`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm p-6">
                    <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Recent Activity</h3>
                    <div className="relative pl-4 border-l border-border-light dark:border-white/10 space-y-6">
                        {[
                            { title: 'New user registered', desc: 'User @alex_doe joined.', time: '2 mins ago', color: 'bg-primary' },
                            { title: 'System update', desc: 'Server maintenance completed.', time: '1 hour ago', color: 'bg-gray-300 dark:bg-gray-600' },
                            { title: 'New order received', desc: 'Order #5542 was placed.', time: '3 hours ago', color: 'bg-gray-300 dark:bg-gray-600' },
                            { title: 'Report generated', desc: 'Monthly sales report available.', time: '5 hours ago', color: 'bg-gray-300 dark:bg-gray-600' },
                        ].map((item, idx) => (
                            <div key={idx} className="relative pl-6">
                                <span className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full ${item.color} border-2 border-surface-light dark:border-surface-dark`}></span>
                                <p className="text-sm font-medium text-text-main dark:text-white">{item.title}</p>
                                <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">{item.desc}</p>
                                <span className="text-[10px] text-text-secondary dark:text-gray-500 mt-2 block">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
