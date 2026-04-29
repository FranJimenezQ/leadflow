import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LeadsPage from "./pages/LeadsPage.jsx";
import PipelinePage from "./pages/PipelinePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Navbar from "./components/layout/Navbar.jsx";
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/pipeline" />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/pipeline" element={<PipelinePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;