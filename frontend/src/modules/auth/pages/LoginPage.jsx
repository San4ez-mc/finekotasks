import React from "react";
import Layout from "../../../components/layout/Layout";

export default function LoginPage() {
    return (
        <Layout>
            <h2>Авторизація</h2>
            <form>
                <div>
                    <label>Логін:</label>
                    <input type="text" placeholder="Введіть логін" />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password" placeholder="Введіть пароль" />
                </div>
                <button type="submit">Увійти</button>
            </form>
        </Layout>
    );
}
