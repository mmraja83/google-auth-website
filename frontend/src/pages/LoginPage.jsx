import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const { login, handleGoogleCredentialResponse } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const res = await login(email, password);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.error);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen w-full flex-row overflow-hidden font-display bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200">
            {/* Left Visual Section (Desktop Only) */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between overflow-hidden bg-primary/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent z-0"></div>

                {/* Logo Area */}
                <div className="relative z-10 p-12">
                    <div className="flex items-center gap-3 text-white">
                        <img src="/logo.svg" alt="Logo" className="w-10 h-10 object-contain" />
                        <span className="text-2xl font-bold tracking-tight">Soft Auth</span>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-12 max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-md mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                        <span>New Dashboard V2.0</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4 drop-shadow-sm">
                        Empower your team with <br />seamless collaboration.
                    </h2>
                    <p className="text-lg text-white/90 font-medium max-w-md leading-relaxed">
                        Join over 4,000 enterprise teams building the future with our secure, scalable platform.
                    </p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12 relative bg-surface-light dark:bg-surface-dark">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-primary">
                    <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="text-xl font-bold text-text-main dark:text-white">Soft Auth</span>
                </div>

                <div className="w-full max-w-[420px] flex flex-col">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-text-main dark:text-white tracking-tight mb-2">Welcome back</h1>
                        <p className="text-text-secondary dark:text-gray-400">Please enter your details to sign in.</p>
                    </div>

                    {/* Google Login Wrapper */}
                    <div className="w-full mb-8">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                const res = await handleGoogleCredentialResponse(credentialResponse.credential);
                                if (res.success) {
                                    navigate('/dashboard');
                                } else {
                                    setError(res.error);
                                }
                            }}
                            onError={() => setError('Google Login Failed')}
                            useOneTap
                            width="100%"
                            theme="outline"
                            size="large"
                            shape="pill"
                            text="signin_with"
                        />
                    </div>

                    <div className="relative flex items-center py-4 mb-4">
                        <div className="grow border-t border-border-light dark:border-border-dark"></div>
                        <span className="mx-4 shrink-0 text-xs font-medium uppercase text-text-secondary/80 tracking-wider">Or continue with</span>
                        <div className="grow border-t border-border-light dark:border-border-dark"></div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-main dark:text-gray-200" htmlFor="email">Email Address</label>
                            <input
                                className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3.5 text-text-main dark:text-white placeholder-text-secondary/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-main dark:text-gray-200" htmlFor="password">Password</label>
                            <input
                                className="block w-full rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-4 py-3.5 text-text-main dark:text-white placeholder-text-secondary/70 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input className="h-4 w-4 rounded border-border-light text-primary focus:ring-primary cursor-pointer" type="checkbox" />
                                <span className="text-sm text-text-main dark:text-gray-300 group-hover:text-primary transition-colors">Remember me</span>
                            </label>
                            <Link className="text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-colors" to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-text-secondary dark:text-gray-400">
                        Don't have an account?
                        <Link to="/register" className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors ml-1">Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
