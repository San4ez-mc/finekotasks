import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TasksPage from "../modules/tasks/pages/TasksPage";
import OrgStructurePage from "../modules/orgStructure/pages/OrgStructurePage";
import LoginPage from "../modules/auth/pages/LoginPage";
import NotFound from "../pages/NotFound";
import DailyTasksPage from "../modules/tasks/pages/DailyTasksPage";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tasks" element={<DailyTasksPage />} />
                <Route path="/org-structure" element={<OrgStructurePage />} />
                <Route path="/auth" element={<LoginPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
