import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TaskFilters.css"; // ✅ додали стилі

export default function TaskFilters({
    selectedDate,
    onDateChange,
    onPrevDay,
    onNextDay,
    onTypeFilterChange,
    onCreatorFilterChange,
    onSortChange,
}) {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    const formatDate = (date) =>
        date.toLocaleDateString("uk-UA", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showCalendar]);

    return (
        <div className="task-filters-wrapper">
            {/* 🔹 Рядок із фільтрами */}
            <div className="filters-row">
                <select className="filter-select" onChange={(e) => onTypeFilterChange(e.target.value)}>
                    <option value="">Всі типи</option>
                    <option value="важлива">Важлива</option>
                    <option value="термінова">Термінова</option>
                    <option value="звичайна">Звичайна</option>
                </select>

                <select className="filter-select" onChange={(e) => onCreatorFilterChange(e.target.value)}>
                    <option value="">Всі автори</option>
                    <option value="Іван">Іван</option>
                    <option value="Олена">Олена</option>
                    <option value="Петро">Петро</option>
                </select>

                <select className="filter-select" onChange={(e) => onSortChange(e.target.value)}>
                    <option value="">Без сортування</option>
                    <option value="asc">За дедлайном ↑</option>
                    <option value="desc">За дедлайном ↓</option>
                </select>
            </div>

            {/* 🔹 Рядок із датою та стрілками */}
            <div className="daily-header" style={{ position: "relative" }}>
                <button className="date-arrow" onClick={onPrevDay}>
                    ←
                </button>

                <h2
                    className="date-title"
                    onClick={() => setShowCalendar((prev) => !prev)}
                >
                    {formatDate(selectedDate)}
                </h2>

                <button className="date-arrow" onClick={onNextDay}>
                    →
                </button>

                {showCalendar && (
                    <div className="calendar-popup" ref={calendarRef}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                onDateChange(date);
                                setShowCalendar(false);
                            }}
                            inline
                            locale="uk"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
