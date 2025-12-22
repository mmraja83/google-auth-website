import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DesignForm from './components/feature/DesignForm';
import Layout from './components/layout/Layout';
import DashboardHome from './components/dashboard/DashboardHome';
import Profile from './pages/Profile';
import VerifyEmail from './pages/VerifyEmail';
import './index.css';



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



            <Route path="/verify-email" element={<VerifyEmail />} />

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
