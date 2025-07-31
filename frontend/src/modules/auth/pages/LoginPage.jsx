import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await login(username, password);
        if (ok) {
            navigate("/");
        } else {
            setError("Невірний логін або пароль");
        }
    };

    return (
        <Layout>
            <h2>Авторизація</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Логін:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Введіть логін"
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введіть пароль"
                    />
                </div>
                <button type="submit">Увійти</button>
            </form>
        </Layout>
    );
}
