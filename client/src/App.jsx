import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import IssueDetails from "./pages/IssueDetails";
import Rewards from "./pages/Rewards";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./components/Layout";
import Issues from "./pages/Issues";

/* ---------- Protected Route ---------- */
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return user ? children : <Navigate to="/login" />;
}
/* ---------- Admin Route ---------- */
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Layout>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Protected */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

           <Route
              path="/report"
              element={
                <PrivateRoute>
                  <ReportIssue />
                </PrivateRoute>
              }
            />

            <Route
              path="/issues"
              element={
                <PrivateRoute>
                  <Issues />
                </PrivateRoute>
              }
            />

            <Route
              path="/issues/:id"
              element={
                <PrivateRoute>
                  <IssueDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/rewards"
              element={
                <PrivateRoute>
                  <Rewards />
                </PrivateRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
