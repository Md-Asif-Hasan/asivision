import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, User, Menu, X, Shield, LifeBuoy } from 'lucide-react';
import logo from '../../logo.png';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, entitlement, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="navbar-wrapper">
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
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <Link to="/pricing" className={`btn-nav-pro ${entitlement.isPro ? 'is-pro' : ''}`}>
            <Sparkles className="btn-icon" />
            <span>{entitlement.isPro ? 'Universal Pro' : 'Pro Access'}</span>
          </Link>

          {user ? (
            <Link to="/account" className="btn-nav-account">
              <User className="btn-icon" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link to="/login" className="btn-nav-login">
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
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
              Home
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
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="mobile-link highlight-link">
              ⚡ Pro Access & SaaS Plans
            </Link>
            <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              <LifeBuoy className="icon-xs" />
              <span>Contact & Support</span>
            </Link>
            <Link to={user ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="mobile-link">
              <User className="icon-xs" />
              <span>{user ? "My Dashboard" : "Sign In / Register"}</span>
            </Link>
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="mobile-link admin-link">
                <Shield className="icon-xs" />
                <span>Admin Operations</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
