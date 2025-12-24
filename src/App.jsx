import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import BlogsPage from "./pages/BlogsPage.jsx";
import TestimonialsPage from "./pages/TestimonialsPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";

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
      <Route
        path="/admin/blogs"
        element={
          <PrivateRoute>
            <BlogsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <PrivateRoute>
            <TestimonialsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/experience"
        element={
          <PrivateRoute>
            <ExperiencePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <PrivateRoute>
            <ServicesPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
