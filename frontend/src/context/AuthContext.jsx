import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Configure Axios
    const api = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await api.get('/users/me');
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    const login = async (email, password) => {
        try {
            const res = await api.post('/login', { email, password });
            const { access_token } = res.data;
            localStorage.setItem('token', access_token);
            setToken(access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            // Logic for user fetch will trigger via useEffect
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.detail || 'Login failed' };
        }
    };

    const register = async (email, password, name) => {
        try {
            const res = await api.post('/register', { email, password, name });
            return { success: true };
        } catch (error) {
            let errorMessage = 'Registration failed';
            if (error.response) {
                // Server returned a response
                if (error.response.status === 400 && error.response.data?.detail === "Email already registered") {
                    errorMessage = "This email is already registered. Please sign in.";
                } else if (error.response.status >= 500) {
                    errorMessage = "Something went wrong on our server. Please try again later.";
                } else {
                    errorMessage = error.response.data?.detail || errorMessage;
                }
            } else if (error.request) {
                // Request made but no response received
                errorMessage = "Unable to connect to the server. Please check your internet connection.";
            } else {
                // Something else happened
                errorMessage = error.message;
            }
            return { success: false, error: errorMessage };
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await api.post('/google-login', { token: tokenResponse.credential || tokenResponse.access_token });
                // Note: @react-oauth/google useGoogleLogin flow might return access_token. 
                // If checking ID token, we might need a different flow or handle it on backend. 
                // Standard implicit flow: get access token, send to backend.
                // Wait, 'credential' is for the Google Login Button (Sign in with Google).
                // 'useGoogleLogin' hook gives an access_token usually.
                // Let's assume we receive an access token or code.
                // Actually, let's use the 'credential' from the response if using the <GoogleLogin> component (button).
                // If using the hook, we get code or token.
                // For simplicity in this boilerplate, let's assume we pass what we get.

                // CORRECTION: The hook flow usually returns an access_token. The backend 'verify_oauth2_token' expects an ID Token.
                // To get an ID token with the hook, we might need flow: 'auth-code' or just use the <GoogleLogin> component wrapper which returns 'credential' (ID Token).
                // I will implement the handleGoogleResponse expecting the credential string from the <GoogleLogin> button component in the UI.
            } catch (err) {
                console.error(err);
            }
        },
        onError: error => console.log(error),
    });

    const handleGoogleCredentialResponse = async (credential) => {
        try {
            const res = await api.post('/google-login', { token: credential });
            const { access_token } = res.data;
            localStorage.setItem('token', access_token);
            setToken(access_token);
            api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.detail || 'Google Login failed' };
        }
    }

    const logout = () => {
        googleLogout();
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, handleGoogleCredentialResponse, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
