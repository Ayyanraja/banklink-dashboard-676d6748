import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import FAQ from "./pages/public/FAQ";
import Plans from "./pages/public/Plans";
import Contact from "./pages/public/Contact";

// Auth Pages
import Login from "./pages/auth/Login";

// User Pages
import Accounts from "./pages/user/Accounts";
import Transactions from "./pages/user/Transactions";

// Admin Pages
import Banks from "./pages/admin/Banks";
import Branches from "./pages/admin/Branches";
import Users from "./pages/admin/Users";

// 404 Page
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* User Routes */}
              <Route
                path="/user/accounts"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Accounts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/transactions"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Transactions />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin/banks"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Banks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/branches"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Branches />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Route */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
