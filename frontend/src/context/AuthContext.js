import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse stored user", e);
            }
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post(
                "https://tasks.fineko.space/backend/web/index.php?r=auth/login",
                { username, password }
            );
            if (res.data && res.data.success) {
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                return true;
            }
        } catch (e) {
            console.error("Login error", e);
        }
        return false;
    };

    const logout = async () => {
        try {
            await axios.post(
                "https://tasks.fineko.space/backend/web/index.php?r=auth/logout"
            );
        } catch (e) {
            // ignore
        }
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

