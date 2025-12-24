import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar toggle

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
        { name: 'Profile', path: '/profile', icon: 'person' },
        { name: 'Settings', path: '/settings', icon: 'settings' }, // Placeholder
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-72 flex-col justify-between border-r border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-all z-20">
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="flex items-center gap-3 px-6 py-6 border-b border-border-light dark:border-border-dark">
                        <div className="flex items-center justify-center h-10 w-10">
                            <img src="/logo.svg" alt="Soft Auth" className="h-full w-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold leading-tight">Soft Auth</h1>
                            <p className="text-text-secondary dark:text-gray-500 text-xs font-medium">Enterprise Edition</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
                        <p className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Main Menu</p>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${location.pathname === item.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:bg-background-light dark:hover:bg-white/5 hover:text-text-main dark:hover:text-white'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${location.pathname === item.path ? 'icon-filled' : ''}`}>{item.icon}</span>
                                <span className="text-sm font-semibold">{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Mini Profile */}
                    <div className="p-4 border-t border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-background-light dark:hover:bg-white/5 cursor-pointer transition-colors">
                            <div className="h-9 w-9 rounded-full bg-cover bg-center bg-primary text-white flex items-center justify-center font-bold">
                                {user?.picture ? (
                                    <img src={user.picture} alt="Avatar" className="h-full w-full rounded-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                    user?.name?.[0] || 'U'
                                )}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                            </div>
                            <button onClick={handleLogout} className="ml-auto text-text-secondary hover:text-red-500 transition-colors" title="Logout">
                                <span className="material-symbols-outlined">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-surface-light dark:bg-surface-dark z-40 transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-6 border-b border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center h-8 w-8">
                                <img src="/logo.svg" alt="Soft Auth" className="h-full w-full object-contain" />
                            </div>
                            <span className="font-bold text-lg">Soft Auth</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:bg-background-light dark:hover:bg-white/5'
                                    }`}
                            >
                                <span className="material-symbols-outlined">{item.icon}</span>
                                <span className="text-sm font-medium">{item.name}</span>
                            </Link>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-border-light dark:border-border-dark">
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-text-secondary hover:text-red-500 transition-colors">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="text-sm font-medium">Log Out</span>
                        </button>
                    </div>
                </div>
            </aside>


            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Top Header */}
                <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 px-6 backdrop-blur-md">
                    <button
                        className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>

                    {/* Search (Desktop) */}
                    <div className="hidden md:flex w-full max-w-md items-center gap-2 rounded-lg bg-background-light dark:bg-background-dark px-3 py-2 border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <span className="material-symbols-outlined text-text-secondary">search</span>
                        <input
                            className="w-full bg-transparent border-none p-0 text-sm text-text-main dark:text-white placeholder:text-text-secondary focus:ring-0 outline-none"
                            placeholder="Search anything..."
                            type="text"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 ml-auto">
                        <ThemeToggle />

                        <button className="relative p-2 text-text-secondary hover:text-primary hover:bg-primary/5 rounded-full transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-surface-light dark:border-surface-dark"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold md:hidden">
                            {user?.name?.[0] || 'U'}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
