import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
                
                {/* User Protected Routes */}
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
                
                {/* Admin Protected Routes */}
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
