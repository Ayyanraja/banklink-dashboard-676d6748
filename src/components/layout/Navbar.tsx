import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Building2, 
  LogOut, 
  Menu, 
  X,
  Home,
  FileText,
  HelpCircle,
  CreditCard,
  Mail,
  User,
  Users,
  GitBranch,
  Building
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, isAdmin, isUser, logout, user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About Us", icon: FileText },
    { to: "/faq", label: "FAQ", icon: HelpCircle },
    { to: "/plans", label: "Plans", icon: CreditCard },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  const userLinks = [
    { to: "/user/accounts", label: "Accounts", icon: CreditCard },
    { to: "/user/transactions", label: "Transactions", icon: FileText },
  ];

  const adminLinks = [
    { to: "/admin/banks", label: "Banks", icon: Building },
    { to: "/admin/branches", label: "Branches", icon: GitBranch },
    { to: "/admin/users", label: "Users", icon: Users },
  ];

  const getActiveLinks = () => {
    if (!isAuthenticated) return publicLinks;
    if (isAdmin) return adminLinks;
    if (isUser) return userLinks;
    return publicLinks;
  };

  const activeLinks = getActiveLinks();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">BankAgg</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {activeLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant={isActive(link.to) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 rounded-lg bg-secondary px-3 py-1.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {user?.role}
                  </span>
                </div>
                <Button onClick={logout} variant="outline" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col space-y-2">
              {activeLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(link.to) ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <>
                  <div className="my-2 border-t border-border pt-2">
                    <div className="rounded-lg bg-secondary px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{user?.name}</span>
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                          {user?.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
