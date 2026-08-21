import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, User, Menu, X, ShieldCheck, LifeBuoy } from 'lucide-react';
import logo from '../../logo.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, entitlement, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleProClick = (e) => {
    if (!user) {
      e.preventDefault();
      setMobileMenuOpen(false);
      navigate('/login', {
        state: {
          from: '/pricing',
          message: 'Please sign in or create an account to get Pro access.'
        }
      });
    }
  };

  return (
    <header className="navbar-wrapper">
      {/* Main Persistent Sticky Navbar */}
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Asivision" className="navbar-logo" />
          <div className="brand-text-block">
            <span className="brand-name">Asivision</span>
            <span className="brand-tagline">Studio & Ecosystem</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-desktop-nav">
          <Link to="/" className={`nav-item ${isHome ? 'active' : ''}`}>
            Home
          </Link>
          <a href="/#apps" className="nav-item">
            Apps
          </a>
          <a href="/#projects" className="nav-item">
            Projects
          </a>
          <a href="/#services" className="nav-item">
            Services
          </a>
          <Link to="/pricing" className={`nav-item ${location.pathname === '/pricing' ? 'active' : ''}`}>
            Pricing / Pro
          </Link>
          <Link to="/support" className={`nav-item ${location.pathname === '/support' ? 'active' : ''}`}>
            Support
          </Link>
          {isAdmin && (
            <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
              Admin
            </Link>
          )}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <Link to="/pricing" onClick={handleProClick} className={`btn-nav-pro ${entitlement.isPro && !entitlement.isCancelled ? 'is-pro' : ''}`}>
            <Sparkles className="btn-icon" />
            <span>{entitlement.isPro && !entitlement.isCancelled ? 'Pro Active ✓' : 'Get Pro Access'}</span>
          </Link>

          {user ? (
            <Link to="/account" className="btn-nav-account">
              <User className="btn-icon" />
              <span className="truncate max-w-[100px]">{user.displayName || user.email.split('@')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="btn-nav-login">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-drawer">
          <div className="mobile-drawer-links">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              Home Overview
            </Link>
            <a href="/#apps" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              Featured Mobile Apps
            </a>
            <a href="/#projects" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              Hardware & AI Projects
            </a>
            <a href="/#services" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              Services (Google Play & Marketing)
            </a>
            <Link to="/pricing" onClick={handleProClick} className="mobile-link highlight-link">
              ⚡ Pro Access & SaaS Plans
            </Link>
            <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              <LifeBuoy className="icon-xs" />
              <span>Support</span>
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="mobile-link admin-link">
                <ShieldCheck className="icon-xs" />
                <span>Admin Operations Portal</span>
              </Link>
            )}
            <Link to={user ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              <User className="icon-xs" />
              <span>{user ? `Dashboard (${user.displayName || user.email.split('@')[0]})` : "Sign In / Register"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

