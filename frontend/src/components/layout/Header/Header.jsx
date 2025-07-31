import React, { useState } from "react";
import "./Header.css";
import { FiMenu } from "react-icons/fi"; // стильна іконка меню

export default function Header({ onToggleMenu }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <header className="app-header">
            {/* Ліва частина: кнопка відкриття/закриття меню */}
            <div className="header-left">
                <button className="menu-btn" onClick={onToggleMenu} title="Toggle menu">
                    <FiMenu size={22} color="#fff" />
                </button>
            </div>

            {/* Центр: пошук */}
            <div className="header-center">
                <input type="text" className="search-input" placeholder="Знайти задачі..." />
            </div>

            {/* Права частина: аватар */}
            <div className="header-right">
                <div className="user-avatar" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                    AD
                </div>
                {userMenuOpen && (
                    <div className="user-dropdown">
                        <ul>
                            <li>Профіль</li>
                            <li>Налаштування</li>
                            <li className="logout">Вихід</li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
