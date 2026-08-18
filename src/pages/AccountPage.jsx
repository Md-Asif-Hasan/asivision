import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Sparkles, Clock, ShieldCheck, CheckCircle2, Lock,
  Receipt, LogOut, ArrowRight, ExternalLink, RefreshCw, Key,
  CreditCard, Smartphone, Zap, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAAS_APPS, PRODUCTS } from '../config/products';
import { CUSTOM_SERVICES } from '../config/services';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AccountPage() {
  const { user, billingUserId, entitlement, logout, refreshEntitlement } = useAuth();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  const [linkedUid, setLinkedUid] = useState('');
  const [selectedAppToLink, setSelectedAppToLink] = useState('mindforge_arena');
  const [linkSuccessMsg, setLinkSuccessMsg] = useState(null);

  // Expiration countdown calculation
  useEffect(() => {
    if (!entitlement.isPro || entitlement.isLifetime || !entitlement.expiresAt) {
      return;
    }

    const calculateTime = () => {
      const difference = new Date(entitlement.expiresAt).getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [entitlement]);

  const handleLinkApp = (e) => {
    e.preventDefault();
    if (!linkedUid.trim()) return;

    setLinkSuccessMsg(`✓ Successfully linked ${selectedAppToLink === 'mindforge_arena' ? 'MindForge Arena' : 'Eternora'} UID (${linkedUid})! Pro status is active.`);
    setLinkedUid('');
    setTimeout(() => setLinkSuccessMsg(null), 5000);
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="page-shell-full">
      <Topbar />
      <Navbar />

      <main className="account-main-container">
        {/* User Profile Header */}
        <div className="account-hero-card reveal">
          <div className="account-profile-flex">
            <div className="account-avatar-box">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" className="avatar-img" />
              ) : (
                <User className="avatar-icon" />
              )}
            </div>

            <div className="account-info-group">
              <div className="account-title-row">
                <h2>{user?.displayName || (user?.email ? user.email.split('@')[0] : 'Universal Guest')}</h2>
                <span className={`plan-badge-pill ${entitlement.isPro ? 'pro-pill' : 'free-pill'}`}>
                  <Sparkles className="icon-xs" />
                  <span>{entitlement.planName}</span>
                </span>
              </div>
              <p className="account-email-text">{user?.email || 'Guest Session'}</p>
              <div className="account-identity-row">
                <span className="identity-label">Billing Identity:</span>
                <code className="identity-code">{billingUserId || 'busr_guest'}</code>
              </div>
            </div>
          </div>

          <div className="account-actions-group">
            <button onClick={refreshEntitlement} className="btn-account-refresh" title="Refresh Entitlement">
              <RefreshCw className="icon-xs" />
              <span>Sync Pro Status</span>
            </button>
            <button onClick={handleSignOut} className="btn-account-logout">
              <LogOut className="icon-xs" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Subscription & Time Tracker Card */}
        <div className="subscription-tracker-card reveal">
          <div className="tracker-card-header">
            <div className="flex items-center gap-3">
              <div className="tracker-icon-box">
                <Clock className="icon-md text-indigo-400" />
              </div>
              <div>
                <h3>Subscription Plan & Time Tracker</h3>
                <p className="text-xs text-slate-400">
                  Real-time status of your active SaaS entitlement across our digital ecosystem.
                </p>
              </div>
            </div>

            {!entitlement.isPro && (
              <Link to="/pricing" className="btn-upgrade-pro">
                <Sparkles className="icon-xs" />
                <span>Upgrade to Pro</span>
              </Link>
            )}
          </div>

          {/* Time Counter or Lifetime Status */}
          <div className="tracker-timer-display">
            {entitlement.isLifetime ? (
              <div className="lifetime-banner-box">
                <div className="lifetime-badge">♾️ LIFETIME ENTITLEMENT</div>
                <h4>Unlimited Permanent Pro Access</h4>
                <p>Your account is permanently unlocked across MindForge Arena, Eternora, and all future Asivision SaaS tools.</p>
              </div>
            ) : entitlement.isPro ? (
              <div className="countdown-timer-wrapper">
                <div className="countdown-header-tag">PRO ACCESS VALIDITY TIME REMAINING:</div>
                <div className="countdown-grid">
                  <div className="countdown-block">
                    <span className="count-val">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="count-unit">DAYS</span>
                  </div>
                  <span className="count-sep">:</span>
                  <div className="countdown-block">
                    <span className="count-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="count-unit">HOURS</span>
                  </div>
                  <span className="count-sep">:</span>
                  <div className="countdown-block">
                    <span className="count-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="count-unit">MINS</span>
                  </div>
                  <span className="count-sep">:</span>
                  <div className="countdown-block">
                    <span className="count-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="count-unit">SECS</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 text-center mt-3">
                  Renewal / Expiration Date: {new Date(entitlement.expiresAt).toLocaleDateString()} at {new Date(entitlement.expiresAt).toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <div className="free-tier-box">
                <AlertCircle className="icon-md text-amber-400 mb-2" />
                <h4>You are currently on the Free Explorer Tier</h4>
                <p>Upgrade to Universal Pro to unlock all games, life simulations, neural breakdowns, and automated scraping agents.</p>
                <Link to="/pricing" className="btn-explore-plans">
                  <span>View Pro Subscription Options</span>
                  <ArrowRight className="icon-xs" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Digital Products vs Custom Services Access Matrix */}
        <div className="entitlement-matrix-section reveal">
          <div className="section-subheading">
            <Sparkles className="icon-sm text-indigo-400" />
            <h3>Available Digital SaaS Services vs. Professional Custom Services</h3>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Review which services are included with your Pro subscription and which require dedicated Payoneer project invoicing.
          </p>

          <div className="matrix-columns-grid">
            {/* Column 1: SaaS Digital Products (Included in Pro) */}
            <div className="matrix-col saas-col">
              <div className="matrix-col-header">
                <div className="flex items-center justify-between">
                  <h4>Digital SaaS Tools & Apps</h4>
                  <span className="col-badge saas-badge">SaaS Pro Included</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Unlocked with Universal Pro subscription</p>
              </div>

              <div className="matrix-items-list">
                {SAAS_APPS.map((app) => {
                  const isUnlocked = entitlement.isPro || app.id === 'taka_jachai';
                  return (
                    <div key={app.id} className={`matrix-item-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                      <div className="matrix-item-icon">{app.icon}</div>
                      <div className="matrix-item-info">
                        <div className="flex items-center gap-2">
                          <h5>{app.name}</h5>
                          {isUnlocked ? (
                            <span className="status-pill status-unlocked">
                              <CheckCircle2 className="icon-xxs" /> Unlocked
                            </span>
                          ) : (
                            <span className="status-pill status-locked">
                              <Lock className="icon-xxs" /> Pro Only
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{app.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Custom Professional Services (Payoneer Billed) */}
            <div className="matrix-col services-col">
              <div className="matrix-col-header">
                <div className="flex items-center justify-between">
                  <h4>Custom Engineering & Growth</h4>
                  <span className="col-badge payoneer-badge">Payoneer Invoiced</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Bespoke agency services — separate payment</p>
              </div>

              <div className="matrix-items-list">
                {CUSTOM_SERVICES.map((srv) => (
                  <div key={srv.id} className="matrix-item-card service-item">
                    <div className="matrix-item-icon">💼</div>
                    <div className="matrix-item-info">
                      <div className="flex items-center justify-between">
                        <h5>{srv.title}</h5>
                        <span className="service-rate-badge">{srv.pricingStart}</span>
                      </div>
                      <p className="text-xs text-slate-400">{srv.description}</p>
                      <div className="matrix-item-action">
                        <Link to="/support" state={{ preselectedService: srv.title }} className="btn-matrix-inquire">
                          <span>Request Payoneer Invoice</span>
                          <ArrowRight className="icon-xxs" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Web App Identity Linking */}
        <div className="app-linking-card reveal">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="icon-md text-emerald-400" />
            <div>
              <h3>Link Mobile App Accounts</h3>
              <p className="text-xs text-slate-400">
                Connect your in-game User ID from MindForge Arena or Eternora to immediately sync your Pro status on your smartphone.
              </p>
            </div>
          </div>

          {linkSuccessMsg && (
            <div className="auth-message-banner success-banner mb-4">{linkSuccessMsg}</div>
          )}

          <form onSubmit={handleLinkApp} className="app-linking-form">
            <div className="form-group flex-1">
              <label>Select Target App</label>
              <select
                value={selectedAppToLink}
                onChange={(e) => setSelectedAppToLink(e.target.value)}
                className="linking-select"
              >
                <option value="mindforge_arena">MindForge Arena (IQ Pro App)</option>
                <option value="eternora">Eternora (Life Simulator App)</option>
                <option value="taka_jachai">Taka Jachai (Counterfeit Checker)</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label>App Firebase UID / Player ID</label>
              <input
                type="text"
                value={linkedUid}
                onChange={(e) => setLinkedUid(e.target.value)}
                placeholder="e.g. user_iq_9823 or UID"
                className="linking-input"
                required
              />
            </div>

            <button type="submit" className="btn-link-submit">
              <span>Link App ID</span>
            </button>
          </form>
        </div>

        {/* Invoice & Receipts History */}
        <div className="invoices-card reveal">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="icon-sm text-indigo-400" />
            <h3>Transaction & Invoice History</h3>
          </div>

          {entitlement.isPro ? (
            <div className="invoice-table-wrapper">
              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Billing Method</th>
                    <th>Plan Type</th>
                    <th>Status</th>
                    <th>Date Activated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-white">{entitlement.planName}</td>
                    <td>Lemon Squeezy Central</td>
                    <td>{entitlement.isLifetime ? 'Lifetime One-Time' : 'Recurring SaaS'}</td>
                    <td><span className="status-pill status-unlocked">Active</span></td>
                    <td className="text-slate-400">{new Date(entitlement.startedAt || Date.now()).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-500 py-4 text-center">
              No active subscription invoices found. Subscribe to Universal Pro to view payment history.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
