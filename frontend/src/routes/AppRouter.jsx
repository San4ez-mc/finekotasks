import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TasksPage from "../modules/tasks/pages/TasksPage";
import DailyTasksPage from "../modules/tasks/pages/DailyTasksPage";
import ResultsPage from "../modules/results/pages/ResultsPage";
import OrgStructurePage from "../modules/orgStructure/pages/OrgStructurePage";
import TelegramGroupPage from "../modules/telegram/pages/TelegramGroupPage";
import LoginPage from "../modules/auth/pages/LoginPage";
import NotFound from "../pages/NotFound";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AppRouter() {
    const { user } = useAuth();

    const RequireAuth = ({ children }) =>
        user ? children : <Navigate to="/auth" replace />;

    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<LoginPage />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <HomePage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <RequireAuth>
                            <DailyTasksPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/results"
                    element={
                        <RequireAuth>
                            <ResultsPage />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/org-structure"
                    element={
                        <RequireAuth>
                            <OrgStructurePage />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/telegram-group"
                    element={
                        <RequireAuth>
                            <TelegramGroupPage />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
