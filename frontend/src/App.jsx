import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DesignForm from './components/feature/DesignForm';
import Layout from './components/layout/Layout';
import Profile from './pages/Profile';
import './index.css';

const DashboardHome = () => {
    const { user } = useAuth();
    return (
        <div className="dashboard-home">
            <div className="soft-card welcome-card">
                <h1>Hello, {user?.name || 'Friend'}!</h1>
                <p>Welcome to your Soft Auth dashboard. Everything you need is right here.</p>
            </div>
        </div>
    );
};

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/login" element={!user ? <DesignForm /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <DesignForm /> : <Navigate to="/dashboard" />} />

            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <DashboardHome />
                </ProtectedRoute>
            } />

            <Route path="/profile" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    )
}

export default App
