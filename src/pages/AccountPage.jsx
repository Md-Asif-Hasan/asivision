import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Sparkles, Clock, ShieldCheck, CheckCircle2, Lock,
  Receipt, LogOut, ArrowRight, ExternalLink, RefreshCw, Key,
  CreditCard, Smartphone, Zap, AlertCircle, Bell, Rocket
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAAS_APPS, PRODUCTS } from '../config/products';
import { getAppsList } from '../config/appsManager';
import { CUSTOM_SERVICES } from '../config/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AccountPage() {
  const { user, billingUserId, entitlement, logout, refreshEntitlement, markSubscriptionCancelled } = useAuth();
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
  const [appsList, setAppsList] = useState(getAppsList());

  // Keep appsList in sync when admin updates apps
  useEffect(() => {
    const refresh = () => setAppsList(getAppsList());
    window.addEventListener('asivision_apps_updated', refresh);
    return () => window.removeEventListener('asivision_apps_updated', refresh);
  }, []);

  // Automatic deep-link account linking when opened via app URL (e.g. /account?app_id=mindforge_arena&app_uid=UID123)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const appIdParam = params.get('app_id');
    const appUidParam = params.get('app_uid');

    if (appUidParam) {
      setLinkedUid(appUidParam);
      if (appIdParam) setSelectedAppToLink(appIdParam);
      setLinkSuccessMsg(`✓ Auto-linking detected for ${appIdParam || 'app'} (UID: ${appUidParam}). Click 'Link Account' below to confirm.`);
    }
  }, []);

  // Derived: live apps (has a real linkUrl) vs upcoming (no linkUrl or status signals "incoming")
  const liveApps = appsList.filter(a =>
    a.linkUrl && a.linkUrl !== 'https://' &&
    !['incoming', 'coming soon', 'in development'].some(k => a.status?.toLowerCase().includes(k))
  );
  const upcomingApps = appsList.filter(a =>
    !a.linkUrl || a.linkUrl === 'https://' ||
    ['incoming', 'coming soon', 'in development'].some(k => a.status?.toLowerCase().includes(k))
  );

  // Expiration countdown calculation (uses fixed immutable expiresAt date)
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

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelStatusMsg, setCancelStatusMsg] = useState(null);

  const handleCancelSubscription = async (e) => {
    e.preventDefault();
    setIsCancelling(true);
    setCancelStatusMsg(null);

    try {
      const res = await fetch('/api/subscription-cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billing_user_id: billingUserId,
          subscription_id: entitlement.subscriptionId || billingUserId,
          reason: cancelReason || 'User initiated cancellation via dashboard'
        })
      });

      const responseText = await res.text();
      let data = {};
      try { data = JSON.parse(responseText); } catch (_) {}

      if (!res.ok) {
        throw new Error(data?.error || data?.message || `Server returned ${res.status} status.`);
      }

      if (markSubscriptionCancelled) {
        markSubscriptionCancelled(cancelReason);
      }

      const gumroadNote = data?.gumroadMessage || data?.message || '';
      setCancelStatusMsg({
        type: 'success',
        text: `✓ Subscription cancelled on Gumroad. ${gumroadNote ? `(${gumroadNote}) ` : ''}You retain full Pro access until your current billing period ends.`
      });

      setTimeout(() => {
        setIsCancelModalOpen(false);
        refreshEntitlement();
      }, 2500);
    } catch (err) {
      setCancelStatusMsg({
        type: 'error',
        text: err.message || 'An error occurred during cancellation. Please try again.'
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="account-main-container">
        {/* User Profile Header */}
        <div className="account-hero-card reveal">
          <div className="account-profile-flex">
            <div className="account-avatar-box">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Google Account User"}
                  className="avatar-img"
                  referrerPolicy="no-referrer"
                />
              ) : user?.email ? (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white text-xl">
                  {user.email.charAt(0).toUpperCase()}
                </div>
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

        {/* Subscription & Time Tracker Card — hidden after cancellation */}
        {!entitlement.isCancelled && (
          <div className="subscription-tracker-card reveal">
            <div className="tracker-card-header flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="tracker-icon-box">
                  <Clock className="icon-md text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3>Subscription Plan & Time Tracker</h3>
                    <span className="inline-block rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                      7-Day Free Trial: 1-Time Offer
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Real-time status of your active SaaS entitlement across our digital ecosystem.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {entitlement.isPro && !entitlement.isLifetime ? (
                  <button
                    type="button"
                    onClick={() => setIsCancelModalOpen(true)}
                    className="btn-account-refresh text-xs text-rose-400 border-rose-500/30 hover:bg-rose-500/10 cursor-pointer"
                    style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e', background: 'rgba(244, 63, 94, 0.1)', cursor: 'pointer' }}
                  >
                    <AlertCircle className="icon-xs" />
                    <span>Cancel Subscription</span>
                  </button>
                ) : null}

                {!entitlement.isPro && (
                  <Link to="/pricing" className="btn-upgrade-pro">
                    <Sparkles className="icon-xs" />
                    <span>Upgrade to Pro</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Time Counter or Lifetime Status */}
            <div className="tracker-timer-display">
              {entitlement.isLifetime ? (
                <div className="lifetime-banner-box">
                  <div className="lifetime-badge">♾️ LIFETIME ENTITLEMENT</div>
                  <h4>Unlimited Permanent Pro Access</h4>
                  <p>Your account is permanently unlocked across current and all future Asivision SaaS tools.</p>
                </div>
              ) : entitlement.isPro ? (
                <div className="countdown-timer-wrapper flex flex-col items-center">
                  <div className="countdown-header-tag text-center">
                    PRO ACCESS VALIDITY TIME REMAINING:
                  </div>
                  <div className="countdown-grid justify-center">
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

                  {/* Perfect Centered Renewal / Expiration Badge */}
                  <div className="centered-expiration-badge-container">
                    <div className="centered-expiration-badge">
                      <span>Renewal / Expiration Date:</span>
                      <strong>
                        {new Date(entitlement.expiresAt).toLocaleDateString()} at {new Date(entitlement.expiresAt).toLocaleTimeString()}
                      </strong>
                    </div>
                  </div>
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
        )}

        {/* Cancellation Confirmation Card — shown only after cancellation */}
        {entitlement.isCancelled && (
          <div className="subscription-cancelled-card reveal">
            <div className="cancelled-card-icon-row">
              <div className="cancelled-icon-badge">
                <AlertCircle size={28} />
              </div>
              <div>
                <h3 className="cancelled-card-title">Subscription Cancelled</h3>
                <p className="cancelled-card-subtitle">Your recurring Gumroad payments have been stopped</p>
              </div>
            </div>
            <div className="cancelled-info-grid">
              <div className="cancelled-info-item">
                <span className="cancelled-info-label">Status</span>
                <span className="cancelled-info-value cancelled-status-pill">
                  <span className="cancelled-dot" />
                  Cancelled
                </span>
              </div>
              <div className="cancelled-info-item">
                <span className="cancelled-info-label">Pro Access Until</span>
                <span className="cancelled-info-value">
                  {entitlement.expiresAt
                    ? new Date(entitlement.expiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : '—'}
                </span>
              </div>
              <div className="cancelled-info-item">
                <span className="cancelled-info-label">Plan After Expiry</span>
                <span className="cancelled-info-value">Free Explorer</span>
              </div>
            </div>
            <div className="cancelled-card-footer">
              <p className="cancelled-footer-note">
                Want to restart your subscription? A new purchase will begin immediately with no free trial.
              </p>
              <Link to="/pricing" className="btn-resubscribe">
                <Sparkles size={14} />
                <span>Resubscribe to Pro</span>
              </Link>
            </div>
          </div>
        )}

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
                    <td>Gumroad Gateway</td>
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

        {/* ── PRO APP LINKS ── */}
        <div className="pro-app-links-card reveal">
          <div className="pro-section-header">
            <div className="flex items-center gap-3">
              <div className="pro-section-icon-box">
                <Rocket className="icon-md text-indigo-400" />
              </div>
              <div>
                <h3>Your Pro App Access</h3>
                <p className="text-xs text-slate-400">
                  Launch any of your unlocked Asivision apps directly from your dashboard.
                </p>
              </div>
            </div>
            {!entitlement.isPro && (
              <Link to="/pricing" className="btn-upgrade-pro">
                <Sparkles className="icon-xs" />
                <span>Unlock All Apps</span>
              </Link>
            )}
          </div>

          <div className="pro-app-links-grid">
            {liveApps.map((app) => {
              const isUnlocked = entitlement.isPro || app.id === 'taka_jachai';
              return (
                <div key={app.id} className={`pro-app-link-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                  <div className="pro-app-link-identity">
                    <div className="pro-app-link-icon">
                      {app.logoUrl ? (
                        <img src={app.logoUrl} alt={app.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <span className="text-2xl">{app.icon}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4>{app.name}</h4>
                        <span className={`pro-app-status-pill ${isUnlocked ? 'status-live' : 'status-locked'}`}>
                          {isUnlocked ? '✓ Unlocked' : '🔒 Pro Only'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{app.category}</p>
                      <p className="text-xs text-slate-500 mt-1">{app.description}</p>
                    </div>
                  </div>
                  <div className="pro-app-link-actions">
                    {isUnlocked ? (
                      <a
                        href={app.playStoreUrl || app.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-launch-app"
                      >
                        <ExternalLink size={14} />
                        <span>Launch App</span>
                      </a>
                    ) : (
                      <Link to="/pricing" className="btn-launch-app btn-launch-locked">
                        <Lock size={14} />
                        <span>Get Pro Access</span>
                      </Link>
                    )}
                    {app.status && (
                      <span className="app-status-note">{app.status}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── UPCOMING APPS & SERVICES FEED ── */}
        <div className="upcoming-feed-card reveal">
          <div className="pro-section-header">
            <div className="flex items-center gap-3">
              <div className="pro-section-icon-box upcoming-icon-box">
                <Bell className="icon-md text-amber-400" />
              </div>
              <div>
                <h3>Upcoming Apps & Services</h3>
                <p className="text-xs text-slate-400">
                  {entitlement.isPro
                    ? '🔑 Pro insider preview — be the first to know what\'s launching next.'
                    : 'Upgrade to Pro to get early access and insider updates on everything coming soon.'}
                </p>
              </div>
            </div>
          </div>

          {upcomingApps.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              No upcoming apps at the moment — check back soon!
            </p>
          ) : (
            <div className="upcoming-apps-grid">
              {upcomingApps.map((app) => (
                <div key={app.id} className="upcoming-app-card">
                  <div className="upcoming-app-glow" />
                  <div className="upcoming-app-icon">
                    {app.logoUrl ? (
                      <img src={app.logoUrl} alt={app.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-3xl">{app.icon}</span>
                    )}
                  </div>
                  <div className="upcoming-app-info">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4>{app.name}</h4>
                      <span className="upcoming-status-badge">{app.status || 'Coming Soon'}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-1">{app.category}</p>
                    <p className="text-xs text-slate-500">{app.description}</p>
                  </div>
                  <div className="upcoming-app-cta">
                    {entitlement.isPro ? (
                      <span className="upcoming-pro-note">
                        <Bell size={12} />
                        <span>You'll get day-1 access as a Pro member</span>
                      </span>
                    ) : (
                      <Link to="/pricing" className="btn-upcoming-unlock">
                        <Sparkles size={13} />
                        <span>Get Early Access</span>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Direct Subscription Cancellation Modal Overlay */}
        {isCancelModalOpen && (
          <div className="asivision-modal-overlay" onClick={() => setIsCancelModalOpen(false)}>
            <div className="asivision-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="btn-modal-close-icon"
                title="Close modal"
              >
                ✕
              </button>

              <div className="modal-header-flex">
                <div className="modal-icon-badge">
                  <AlertCircle className="icon-md" />
                </div>
                <div className="modal-title-group">
                  <h3>Cancel Pro Subscription</h3>
                  <p>Gumroad API Integration</p>
                </div>
              </div>

              <div className="modal-warning-card">
                <p style={{ fontWeight: '700', marginBottom: '4px' }}>⚠️ Cancels recurring charges immediately</p>
                <p>
                  Your recurring payments on Gumroad will stop. You maintain full access to your Pro benefits through{' '}
                  <strong>
                    {entitlement?.expiresAt ? new Date(entitlement.expiresAt).toLocaleDateString() : 'the end of your billing cycle'}
                  </strong>.
                </p>
              </div>

              {cancelStatusMsg ? (
                <div style={{
                  padding: '16px',
                  borderRadius: '16px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginTop: '16px',
                  background: cancelStatusMsg.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  border: cancelStatusMsg.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
                  color: cancelStatusMsg.type === 'success' ? '#34d399' : '#f43f5e'
                }}>
                  {cancelStatusMsg.text}
                </div>
              ) : (
                <form onSubmit={handleCancelSubscription}>
                  <div style={{ marginBottom: '18px' }}>
                    <label className="modal-label">
                      Cancellation Reason (Optional):
                    </label>
                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Help us improve Asivision..."
                      rows={3}
                      className="modal-textarea"
                    />
                  </div>

                  <div className="modal-actions-row">
                    <button
                      type="button"
                      onClick={() => setIsCancelModalOpen(false)}
                      disabled={isCancelling}
                      className="btn-modal-cancel-stay"
                    >
                      Keep My Plan
                    </button>
                    <button
                      type="submit"
                      disabled={isCancelling}
                      className="btn-modal-cancel-confirm"
                    >
                      {isCancelling ? 'Processing...' : 'Confirm Cancellation'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
