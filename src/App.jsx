import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route
        path="/admin/about"
        element={
          <PrivateRoute>
            <AboutPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <PrivateRoute>
            <SkillsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
