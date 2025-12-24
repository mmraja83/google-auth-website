import React from 'react';
import ThemeToggle from '../components/common/ThemeToggle';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-text-main dark:text-white">Settings</h1>
                <p className="text-text-secondary dark:text-gray-400">Manage your application preferences and configuration.</p>
            </div>

            {/* Appearance Section */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-lg font-bold text-text-main dark:text-white">Appearance</h2>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">Customize how the application looks properly.</p>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-text-main dark:text-white">Theme Preference</p>
                        <p className="text-sm text-text-secondary dark:text-gray-400">Select your preferred color scheme.</p>
                    </div>
                    <ThemeToggle />
                </div>
            </div>

            {/* Notifications Section (Placeholder) */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-lg font-bold text-text-main dark:text-white">Notifications</h2>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">Control when and how you receive updates.</p>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-main dark:text-white">Email Notifications</p>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Receive daily summaries of your activity.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-text-main dark:text-white">Marketing Emails</p>
                            <p className="text-sm text-text-secondary dark:text-gray-400">Receive offers and new feature updates.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Security Section (Placeholder) */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border-light dark:border-border-dark">
                    <h2 className="text-lg font-bold text-text-main dark:text-white">Security</h2>
                    <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">Manage your password and authentication methods.</p>
                </div>
                <div className="p-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-border-light dark:border-border-dark rounded-lg text-sm font-medium text-text-main dark:text-white hover:bg-background-light dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
