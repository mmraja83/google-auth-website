import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardHome from './components/dashboard/DashboardHome';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Layout from './components/layout/Layout';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const App = () => {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Layout>
                                    <DashboardHome />
                                </Layout>
                            </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                            <ProtectedRoute>
                                <Layout>
                                    <Profile />
                                </Layout>
                            </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                            <ProtectedRoute>
                                <Layout>
                                    <Settings />
                                </Layout>
                            </ProtectedRoute>
                        } />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
