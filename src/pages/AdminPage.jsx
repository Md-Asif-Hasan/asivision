import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Sliders, UserCheck, UserX, Save, RefreshCw,
  CreditCard, Phone, Mail, Sparkles, CheckCircle2, AlertTriangle,
  Lock, Key, Send, Search, ArrowRight, Eye, EyeOff,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAdminSettings, saveAdminSettings, resetAdminSettings, getInquiries, deleteInquiry } from '../config/adminSettings';
import { getAppsList, saveApp, deleteApp, resetAppsList } from '../config/appsManager';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminPage() {
  const { user, isAdmin, grantProAccess, revokeProAccess } = useAuth();
  
  const [settings, setSettings] = useState(getAdminSettings());
  const [activeTab, setActiveTab] = useState('apps'); // 'apps' | 'inquiries' | 'gumroad' | 'firebase' | ...
  const [saveStatus, setSaveStatus] = useState(null);
  const [inquiries, setInquiries] = useState(getInquiries());
  const [appsList, setAppsList] = useState(getAppsList());
  const [editingApp, setEditingApp] = useState(null); // null or app object
  const [cancellationLogs, setCancellationLogs] = useState([]);
  const [isLoadingCancellations, setIsLoadingCancellations] = useState(false);
  const tabsRef = useRef(null);

  React.useEffect(() => {
    if (activeTab === 'cancellations') {
      setIsLoadingCancellations(true);
      fetch('/api/subscription-cancel')
        .then(async (res) => {
          const text = await res.text();
          try { return JSON.parse(text); } catch (e) { return {}; }
        })
        .then((data) => {
          if (data && data.cancellations) setCancellationLogs(data.cancellations);
        })
        .catch(() => {})
        .finally(() => setIsLoadingCancellations(false));
    }
  }, [activeTab]);

  React.useEffect(() => {
    const refreshInquiries = () => setInquiries(getInquiries());
    const refreshApps = () => setAppsList(getAppsList());
    window.addEventListener('asivision_inquiries_updated', refreshInquiries);
    window.addEventListener('asivision_apps_updated', refreshApps);
    return () => {
      window.removeEventListener('asivision_inquiries_updated', refreshInquiries);
      window.removeEventListener('asivision_apps_updated', refreshApps);
    };
  }, []);

  // Force-activate reveal animations on this page — the global ScrollToTopAndReveal
  // observer has a race condition where it queries the DOM before AdminPage's elements
  // are mounted (e.g. direct URL navigation / hard reload), leaving them at opacity:0.
  // Running this locally, post-mount, guarantees all .reveal elements are always visible.
  React.useEffect(() => {
    const activate = () => {
      document.querySelectorAll('.admin-main-container .reveal, .admin-lock-container .reveal, .admin-tabs-wrapper.reveal').forEach((el) => {
        el.classList.add('active');
      });
    };
    activate();
    // Small delay as fallback for any conditional-render branches (auth check resolves after mount)
    const timer = setTimeout(activate, 80);
    return () => clearTimeout(timer);
  }, []);

  // Entitlement manual grant state
  const [targetUserId, setTargetUserId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('universal_yearly');
  const [grantDurationDays, setGrantDurationDays] = useState(365);
  const [entActionMsg, setEntActionMsg] = useState(null);

  // Co-Admin Management State
  const [newCoAdminEmail, setNewCoAdminEmail] = useState('');

  // Admin access passcode bypass for local testing
  const [adminPasscode, setAdminPasscode] = useState('');
  const [hasPasscodeOverride, setHasPasscodeOverride] = useState(false);

  const isAuthorized = isAdmin || hasPasscodeOverride;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    try {
      saveAdminSettings(settings);
      setSaveStatus({ success: true, message: 'Settings saved successfully and applied to live runtime!' });
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err) {
      setSaveStatus({ success: false, message: 'Failed to save settings.' });
    }
  };

  const handleAddCoAdmin = (e) => {
    e.preventDefault();
    const emailToAdd = newCoAdminEmail.trim().toLowerCase();
    if (!emailToAdd) return;

    const currentAdmins = settings.adminEmails || ["asifhasan10122000@gmail.com"];
    if (currentAdmins.map(e => e.toLowerCase()).includes(emailToAdd)) {
      setSaveStatus({ success: false, message: `Email ${emailToAdd} is already an authorized Admin or Co-Admin.` });
      setTimeout(() => setSaveStatus(null), 4000);
      return;
    }

    const updatedAdmins = [...currentAdmins, emailToAdd];
    const updatedSettings = { ...settings, adminEmails: updatedAdmins };
    setSettings(updatedSettings);
    saveAdminSettings(updatedSettings);
    setNewCoAdminEmail('');
    setSaveStatus({ success: true, message: `Successfully assigned ${emailToAdd} as a Co-Admin!` });
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const handleRemoveCoAdmin = (emailToRemove) => {
    if (emailToRemove.toLowerCase() === "asifhasan10122000@gmail.com") {
      alert("Cannot remove Master Primary Admin.");
      return;
    }

    if (confirm(`Remove Co-Admin privileges for ${emailToRemove}?`)) {
      const currentAdmins = settings.adminEmails || [];
      const updatedAdmins = currentAdmins.filter(e => e.toLowerCase() !== emailToRemove.toLowerCase());
      const updatedSettings = { ...settings, adminEmails: updatedAdmins };
      setSettings(updatedSettings);
      saveAdminSettings(updatedSettings);
      setSaveStatus({ success: true, message: `Removed Co-Admin privileges for ${emailToRemove}.` });
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  const handleGrantPro = (e) => {
    e.preventDefault();
    if (!targetUserId.trim()) return;

    grantProAccess(targetUserId.trim(), selectedPlan, Number(grantDurationDays));
    setEntActionMsg(`✓ Successfully granted ${selectedPlan} Pro access to [${targetUserId.trim()}]!`);
    setTargetUserId('');
    setTimeout(() => setEntActionMsg(null), 5000);
  };

  const handleRevokePro = (e) => {
    e.preventDefault();
    if (!targetUserId.trim()) return;

    revokeProAccess(targetUserId.trim());
    setEntActionMsg(`✓ Successfully revoked Pro access from [${targetUserId.trim()}].`);
    setTargetUserId('');
    setTimeout(() => setEntActionMsg(null), 5000);
  };

  if (!isAuthorized) {
    return (
      <div className="page-shell-full">
        <Navbar />

        <main className="admin-lock-container">
          <div className="admin-lock-card reveal">
            <div className="lock-icon-box">
              <Lock className="icon-lg text-rose-400" />
            </div>
            <h2>Admin Operations Portal Locked</h2>
            <p className="text-xs text-slate-400 mb-4">
              This area is restricted to authorized Asivision administrators (<code>asifhasan10122000@gmail.com</code>).
            </p>

            {user ? (
              <div className="mb-4 text-xs text-slate-300">
                Signed in as: <strong className="text-indigo-400">{user.email}</strong> (Not in authorized admin whitelist).
              </div>
            ) : (
              <Link to="/login" className="btn-admin-signin">
                Sign in with Admin Account
              </Link>
            )}

            <div className="admin-passcode-fallback">
              <span className="text-[11px] text-slate-500 block mb-2">Or enter Owner Master Passcode:</span>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Master Passcode"
                  className="passcode-input"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (adminPasscode === 'asivision2026' || adminPasscode === 'asif2026') {
                      setHasPasscodeOverride(true);
                    } else {
                      alert('Invalid Admin Passcode');
                    }
                  }}
                  className="btn-passcode-submit"
                >
                  Authorize
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="admin-main-container">
        {/* Header */}
        <div className="admin-header-row reveal">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="admin-badge-pill">Central Operations Dashboard</span>
              <span className="admin-user-pill">
                <ShieldCheck className="icon-xs text-emerald-400" />
                <span>{user?.email || 'Master Passcode Auth'}</span>
              </span>
            </div>
            <h1>Asivision Operations & Settings Manager</h1>
            <p className="admin-subtitle">
              Manage editable Payoneer parameters, receiving account status notes, contact endpoints, and user Pro entitlements.
            </p>
          </div>

          <button onClick={() => setSettings(resetAdminSettings())} className="btn-reset-defaults" title="Reset to Factory Defaults">
            <RefreshCw className="icon-xs" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs-wrapper">
          <button
            className="admin-tabs-arrow admin-tabs-arrow-left"
            onClick={() => tabsRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
            aria-label="Scroll tabs left"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="admin-tabs-row" ref={tabsRef}>
            <button
              onClick={() => setActiveTab('apps')}
              className={`admin-tab-btn ${activeTab === 'apps' ? 'active' : ''}`}
            >
              <Sparkles className="icon-xs" />
              <span>Dynamic Apps & Privacy ({appsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            >
              <Mail className="icon-xs" />
              <span>Support Tickets ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('coadmins')}
              className={`admin-tab-btn ${activeTab === 'coadmins' ? 'active' : ''}`}
            >
              <ShieldCheck className="icon-xs" />
              <span>Co-Admin Management</span>
            </button>

            <button
              onClick={() => setActiveTab('gumroad')}
              className={`admin-tab-btn ${activeTab === 'gumroad' ? 'active' : ''}`}
            >
              <Sparkles className="icon-xs" />
              <span>Gumroad Credentials</span>
            </button>

            <button
              onClick={() => setActiveTab('firebase')}
              className={`admin-tab-btn ${activeTab === 'firebase' ? 'active' : ''}`}
            >
              <Key className="icon-xs" />
              <span>Firebase & Service Account</span>
            </button>

            <button
              onClick={() => setActiveTab('payoneer')}
              className={`admin-tab-btn ${activeTab === 'payoneer' ? 'active' : ''}`}
            >
              <CreditCard className="icon-xs" />
              <span>Payoneer Params</span>
            </button>

            <button
              onClick={() => setActiveTab('entitlements')}
              className={`admin-tab-btn ${activeTab === 'entitlements' ? 'active' : ''}`}
            >
              <UserCheck className="icon-xs" />
              <span>Entitlements</span>
            </button>

            <button
              onClick={() => setActiveTab('cancellations')}
              className={`admin-tab-btn ${activeTab === 'cancellations' ? 'active' : ''}`}
            >
              <AlertTriangle className="icon-xs" />
              <span>Cancellations & Feedback Log</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            >
              <Phone className="icon-xs" />
              <span>Contact Info</span>
            </button>
          </div>

          <button
            className="admin-tabs-arrow admin-tabs-arrow-right"
            onClick={() => tabsRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
            aria-label="Scroll tabs right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Save Status Alert */}
        {saveStatus && (
          <div className={`auth-message-banner ${saveStatus.success ? 'success-banner' : 'error-banner'} mb-6`}>
            {saveStatus.message}
          </div>
        )}

        {/* TAB 0: DYNAMIC APPS, CLOUDFLARE IMAGES & PRIVACY MANAGER */}
        {activeTab === 'apps' && (
          <div className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>📱 Dynamic Applications, Logos & Privacy Policy Manager</h3>
                <p className="text-xs text-slate-400">
                  Configure app parameters, Cloudflare logo/preview image URLs, service account emails, and custom Privacy Policy pages.
                </p>
              </div>
              <button
                onClick={() => setEditingApp({
                  id: `app_${Date.now()}`,
                  name: '',
                  category: 'B2C • Mobile Application',
                  description: '',
                  icon: '🚀',
                  logoUrl: '',
                  previewImageUrl: '',
                  linkUrl: 'https://',
                  effectiveDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                  disclaimers: 'This application is provided as an official SaaS product by Asivision Technology & Innovation. Usage is subject to platform Terms & Conditions.',
                  collectedInfo: 'Account Telemetry: Name, email address, and authentication UID.\nOperational Log Data: Feature access timestamps and diagnostic error reports.\nDevice Parameters: Operating system version, resolution, and locale settings.',
                  howUsed: 'Deliver core application functionality and sync account preferences.\nAnalyze aggregated performance telemetry to optimize server response times.\nVerify user Pro subscription entitlement status securely.',
                  storageSecurity: 'Passwords hashed using bcrypt with secure salt parameters.\nHTTPS/TLS 1.3 encrypted data transmission across all endpoints.\nSessions secured with HttpOnly cookies and encrypted tokens.',
                  userRights: 'Users retain full ownership of account records and may request data export or account erasure at any time via privacy@asivision.com or asifhasan10122000@gmail.com.',
                  serviceAccountEmail: '',
                  privateKey: '',
                  isSaas: true,
                  status: 'Live & Pro-Enabled'
                })}
                className="btn-save-settings"
              >
                <Sparkles className="icon-xs" />
                <span>Add New Application</span>
              </button>
            </div>

            {/* Editing / Creating Form Modal / Inline Editor */}
            {editingApp && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveApp(editingApp);
                  setEditingApp(null);
                  setSaveStatus({ success: true, message: `App '${editingApp.name}' saved successfully!` });
                  setTimeout(() => setSaveStatus(null), 3000);
                }}
                className="my-6 p-6 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4"
              >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="font-bold text-white text-base">
                    {appsList.some(a => a.id === editingApp.id) ? `✏️ Editing: ${editingApp.name}` : `➕ Create New Application`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setEditingApp(null)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-lg shadow-indigo-600/25"
                  >
                    ✕ Cancel
                  </button>
                </div>

                <div className="admin-fields-grid">
                  <div className="form-group">
                    <label>Unique App ID (slug)</label>
                    <input
                      type="text"
                      value={editingApp.id}
                      onChange={(e) => setEditingApp({ ...editingApp, id: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                      className="admin-input font-mono"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>App Name</label>
                    <input
                      type="text"
                      value={editingApp.name}
                      onChange={(e) => setEditingApp({ ...editingApp, name: e.target.value })}
                      className="admin-input"
                      placeholder="e.g. Vision Pro AI"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Category / Subtitle Tag</label>
                    <input
                      type="text"
                      value={editingApp.category}
                      onChange={(e) => setEditingApp({ ...editingApp, category: e.target.value })}
                      className="admin-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>App Icon Emoji / Symbol</label>
                    <input
                      type="text"
                      value={editingApp.icon}
                      onChange={(e) => setEditingApp({ ...editingApp, icon: e.target.value })}
                      className="admin-input text-center font-bold"
                      placeholder="🧠, ⚡, 🌐, 🤖"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={editingApp.description}
                      onChange={(e) => setEditingApp({ ...editingApp, description: e.target.value })}
                      className="admin-textarea"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Cloudflare Logo Image URL (or R2 Bucket link)</label>
                    <input
                      type="text"
                      value={editingApp.logoUrl}
                      onChange={(e) => setEditingApp({ ...editingApp, logoUrl: e.target.value })}
                      className="admin-input font-mono"
                      placeholder="https://pub-xxx.r2.dev/logo.png or https://imagedelivery.net/..."
                    />
                    <span className="field-hint">Upload image to Cloudflare Images / R2 and paste public CDN URL here.</span>
                  </div>

                  <div className="form-group full-width">
                    <label>Cloudflare App Preview Screenshot Banner URL</label>
                    <input
                      type="text"
                      value={editingApp.previewImageUrl}
                      onChange={(e) => setEditingApp({ ...editingApp, previewImageUrl: e.target.value })}
                      className="admin-input font-mono"
                      placeholder="https://pub-xxx.r2.dev/preview-banner.png"
                    />
                    <span className="field-hint">High resolution screenshot or banner hosted on Cloudflare CDN.</span>
                  </div>

                  <div className="form-group">
                    <label>App Link URL (Play Store / Web link)</label>
                    <input
                      type="url"
                      value={editingApp.linkUrl}
                      onChange={(e) => setEditingApp({ ...editingApp, linkUrl: e.target.value })}
                      className="admin-input font-mono"
                    />
                  </div>

                  <div className="form-group">
                    <label>Status Badge</label>
                    <input
                      type="text"
                      value={editingApp.status}
                      onChange={(e) => setEditingApp({ ...editingApp, status: e.target.value })}
                      className="admin-input"
                      placeholder="Live & Pro-Enabled"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Firebase / Cloudflare Service Account Email</label>
                    <input
                      type="email"
                      value={editingApp.serviceAccountEmail || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, serviceAccountEmail: e.target.value })}
                      className="admin-input font-mono"
                      placeholder="app-service@asivision-payments.iam.gserviceaccount.com"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Service Account Private Key / API Secret</label>
                    <textarea
                      rows={3}
                      value={editingApp.privateKey || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, privateKey: e.target.value })}
                      className="admin-textarea font-mono text-xs"
                      placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
                    />
                  </div>

                  {/* Dynamic Privacy Policy Form Sections */}
                  <div className="form-group full-width border-t border-slate-800 pt-4 mt-2">
                    <h5 className="font-bold text-indigo-400 text-sm mb-1">📜 Dynamic Privacy Policy Form Sections</h5>
                    <p className="text-xs text-slate-400 mb-3">Each filled section automatically generates a formatted policy page at <code>/privacy/{editingApp.id}</code> matching our official layout.</p>
                  </div>

                  <div className="form-group">
                    <label>Effective & Last Updated Date</label>
                    <input
                      type="text"
                      value={editingApp.effectiveDate || 'August 20, 2026'}
                      onChange={(e) => setEditingApp({ ...editingApp, effectiveDate: e.target.value })}
                      className="admin-input"
                      placeholder="August 20, 2026"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Important Disclaimers Box (Teal Highlight Banner)</label>
                    <textarea
                      rows={2}
                      value={editingApp.disclaimers || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, disclaimers: e.target.value })}
                      className="admin-textarea text-xs"
                      placeholder="e.g. This app is for informational purposes and not an official government tool."
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Section 1: Information We Collect</label>
                    <textarea
                      rows={3}
                      value={editingApp.collectedInfo || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, collectedInfo: e.target.value })}
                      className="admin-textarea text-xs"
                      placeholder="Account Details: Name, email...\nCamera Data: Captured frames...\nDevice Information: OS version..."
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Section 2: How We Use Your Information</label>
                    <textarea
                      rows={3}
                      value={editingApp.howUsed || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, howUsed: e.target.value })}
                      className="admin-textarea text-xs"
                      placeholder="Deliver core application features...\nSync user entitlement status across devices..."
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Section 3: Data Storage & Security Protocols</label>
                    <textarea
                      rows={3}
                      value={editingApp.storageSecurity || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, storageSecurity: e.target.value })}
                      className="admin-textarea text-xs"
                      placeholder="Passwords hashed using bcrypt...\nHTTPS/TLS encrypted transmission..."
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Section 4: User Rights & Data Control</label>
                    <textarea
                      rows={2}
                      value={editingApp.userRights || ''}
                      onChange={(e) => setEditingApp({ ...editingApp, userRights: e.target.value })}
                      className="admin-textarea text-xs"
                      placeholder="Users may revoke permissions or request account data deletion via asifhasan10122000@gmail.com."
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingApp(null)}
                    className="btn-cancel-admin"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-save-settings">
                    <Save className="icon-xs" />
                    <span>Save Application & Privacy Policy</span>
                  </button>
                </div>
              </form>
            )}

            {/* List of Configured Apps */}
            <div className="space-y-4 my-4">
              {appsList.map((a) => (
                <div key={a.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row justify-between gap-4 items-start">
                  <div className="flex gap-4 items-start flex-1">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                      {a.logoUrl ? (
                        <img src={a.logoUrl} alt={a.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{a.icon || "📱"}</span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-base">{a.name}</strong>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                          {a.status}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-400 font-medium">{a.category}</p>
                      <p className="text-xs text-slate-400">{a.description}</p>
                      {a.serviceAccountEmail && (
                        <p className="text-[11px] text-slate-500 font-mono">Service Email: {a.serviceAccountEmail}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => setEditingApp({ ...a })}
                        className="btn-edit-app"
                      >
                        <span>Edit App & Privacy</span>
                      </button>
                    <Link
                      to={`/privacy/${a.id}`}
                      target="_blank"
                      className="btn-view-privacy"
                    >
                      <span>View Privacy Page</span>
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(`Delete app '${a.name}'?`)) {
                          deleteApp(a.id);
                        }
                      }}
                      className="btn-delete-app"
                    >
                      Delete App
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 0: SUPPORT TICKETS & INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>Received Client Project Inquiries & Tickets ({inquiries.length})</h3>
                <p className="text-xs text-slate-400">
                  Submissions received via the Support & Inquiry form. Reply directly via email or WhatsApp.
                </p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl my-4">
                <Mail className="icon-md text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">No support tickets or project inquiries received yet.</p>
                <p className="text-xs text-slate-500 mt-1">New submissions from the /support page will appear here live.</p>
              </div>
            ) : (
              <div className="space-y-4 my-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row justify-between gap-4 items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-white text-base">{inq.name || "Anonymous Client"}</span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                          {inq.serviceType}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          {inq.budget}
                        </span>
                        <span className="text-[11px] text-slate-500 ml-auto">
                          {new Date(inq.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 flex flex-wrap gap-4">
                        <span><strong>Email:</strong> <a href={`mailto:${inq.email}`} className="text-indigo-400 hover:underline">{inq.email}</a></span>
                        <span><strong>Phone:</strong> <a href={`tel:${inq.phone}`} className="text-indigo-400 hover:underline">{inq.phone}</a></span>
                        <span><strong>Payment:</strong> {inq.preferredPayment}</span>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/80 text-xs text-slate-200 border border-slate-800/80 whitespace-pre-wrap">
                        <strong>Project Scope:</strong>
                        <p className="mt-1 text-slate-300">{inq.projectScope}</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 shrink-0 w-full md:w-auto">
                      <a
                        href={`mailto:${inq.email}?subject=RE: Inquiry for ${encodeURIComponent(inq.serviceType)}&body=Hi ${encodeURIComponent(inq.name || '')},%0D%0A%0D%0AThank you for reaching out to Asivision regarding your project:`}
                        className="btn-quick-contact btn-email text-xs py-1.5 px-3 flex items-center justify-center gap-1 flex-1"
                      >
                        <Mail className="icon-xs" />
                        <span>Email Reply</span>
                      </a>
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-quick-contact btn-whatsapp text-xs py-1.5 px-3 flex items-center justify-center gap-1 flex-1"
                        >
                          <Send className="icon-xs" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 p-1.5 rounded transition text-center"
                        title="Delete Inquiry"
                      >
                        Delete Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: CO-ADMIN ACCESS MANAGEMENT */}
        {activeTab === 'coadmins' && (
          <div className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>Co-Admin Access Management</h3>
                <p className="text-xs text-slate-400">
                  Assign or revoke Co-Admin privileges. Authorized Gmail accounts get full access to this Operations Portal and the header Admin button.
                </p>
              </div>
            </div>

            {/* Form to add new Co-Admin */}
            <form onSubmit={handleAddCoAdmin} className="mb-8 p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
              <h4 className="text-sm font-semibold text-white mb-1">Assign New Co-Admin</h4>
              <p className="text-xs text-slate-400 mb-4">Enter a valid Google / Gmail address to grant immediate admin portal access.</p>
              <div className="flex gap-3 items-end flex-wrap">
                <div className="form-group flex-1 min-w-[260px]">
                  <label className="text-xs text-slate-300">Co-Admin Gmail Address</label>
                  <input
                    type="email"
                    value={newCoAdminEmail}
                    onChange={(e) => setNewCoAdminEmail(e.target.value)}
                    placeholder="e.g. coadmin@gmail.com"
                    className="admin-input"
                    required
                  />
                </div>
                <button type="submit" className="btn-grant-pro">
                  <ShieldCheck className="icon-xs" />
                  <span>Add Co-Admin</span>
                </button>
              </div>
            </form>

            {/* Authorized Admins List */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Authorized Admins & Co-Admins ({settings.adminEmails?.length || 1})</h4>
              <div className="space-y-3">
                {(settings.adminEmails || ["asifhasan10122000@gmail.com"]).map((adminEmail) => {
                  const isMaster = adminEmail.toLowerCase() === "asifhasan10122000@gmail.com";
                  return (
                    <div key={adminEmail} className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{adminEmail}</p>
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${isMaster ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                            {isMaster ? 'Master Primary Admin' : 'Authorized Co-Admin'}
                          </span>
                        </div>
                      </div>

                      {!isMaster && (
                        <button
                          type="button"
                          onClick={() => handleRemoveCoAdmin(adminEmail)}
                          className="btn-revoke-pro text-xs py-1.5 px-3"
                        >
                          <UserX size={14} />
                          <span>Remove Access</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: GUMROAD CREDENTIALS & PRODUCT PERMALINKS */}
        {activeTab === 'gumroad' && (
          <form onSubmit={handleSaveSettings} className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>⚡ Gumroad Payment Gateway & API Credentials</h3>
                <p className="text-xs text-slate-400">
                  Manage Access Token, Seller Username, App Secret, and Product Permalinks.
                </p>
              </div>
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Gumroad Config</span>
              </button>
            </div>

            <div className="admin-fields-grid">
              <div className="form-group full-width">
                <label>Gumroad OAuth Access Token (GUMROAD_ACCESS_TOKEN)</label>
                <input
                  type="password"
                  value={settings.gumroad?.accessToken || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gumroad: { ...settings.gumroad, accessToken: e.target.value }
                    })
                  }
                  className="admin-input font-mono"
                  placeholder="SxxZCJM..."
                  required
                />
                <span className="field-hint">OAuth access token from your Gumroad account Settings → Advanced.</span>
              </div>

              <div className="form-group">
                <label>Seller Username (Seller ID)</label>
                <input
                  type="text"
                  value={settings.gumroad?.sellerId || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gumroad: { ...settings.gumroad, sellerId: e.target.value }
                    })
                  }
                  className="admin-input"
                  placeholder="mdasifhasan"
                  required
                />
                <span className="field-hint">e.g. mdasifhasan (profile subdomain).</span>
              </div>

              <div className="form-group">
                <label>Application ID (GUMROAD_APP_ID)</label>
                <input
                  type="text"
                  value={settings.gumroad?.appId || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gumroad: { ...settings.gumroad, appId: e.target.value }
                    })
                  }
                  className="admin-input font-mono"
                  placeholder="QgobwsOV3yc..."
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Application Secret (GUMROAD_APP_SECRET)</label>
                <input
                  type="password"
                  value={settings.gumroad?.appSecret || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gumroad: { ...settings.gumroad, appSecret: e.target.value }
                    })
                  }
                  className="admin-input font-mono"
                  placeholder="H9yKE8P..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Membership Product Permalink</label>
                <input
                  type="text"
                  value={settings.gumroad?.membershipPermalink || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gumroad: { ...settings.gumroad, membershipPermalink: e.target.value }
                    })
                  }
                  className="admin-input"
                  placeholder="mbckdl"
                  required
                />
              </div>

              <div className="form-group">
                <label>Lifetime Product Permalink</label>
                <input
                  type="text"
                  value={settings.gumroad?.lifetimePermalink || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      gumroad: { ...settings.gumroad, lifetimePermalink: e.target.value }
                    })
                  }
                  className="admin-input"
                  placeholder="eajnwd"
                  required
                />
              </div>
            </div>

            <div className="card-footer-action">
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Gumroad Config</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: FIREBASE & SERVICE ACCOUNT PARAMETERS */}
        {activeTab === 'firebase' && (
          <form onSubmit={handleSaveSettings} className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>🔥 Firebase Client & Service Account Credentials</h3>
                <p className="text-xs text-slate-400">
                  Update Firebase SDK Web API keys, Project ID, Service Account Email, and Private Key.
                </p>
              </div>
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Firebase Config</span>
              </button>
            </div>

            <div className="admin-fields-grid">
              <div className="form-group">
                <label>Firebase API Key (VITE_FIREBASE_API_KEY)</label>
                <input
                  type="password"
                  value={settings.firebase?.apiKey || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      firebase: { ...settings.firebase, apiKey: e.target.value }
                    })
                  }
                  className="admin-input font-mono"
                  required
                />
              </div>

              <div className="form-group">
                <label>Firebase Auth Domain</label>
                <input
                  type="text"
                  value={settings.firebase?.authDomain || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      firebase: { ...settings.firebase, authDomain: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Firebase Project ID</label>
                <input
                  type="text"
                  value={settings.firebase?.projectId || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      firebase: { ...settings.firebase, projectId: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Storage Bucket</label>
                <input
                  type="text"
                  value={settings.firebase?.storageBucket || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      firebase: { ...settings.firebase, storageBucket: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Firebase Service Account Email</label>
                <input
                  type="email"
                  value={settings.firebase?.serviceAccountEmail || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      firebase: { ...settings.firebase, serviceAccountEmail: e.target.value }
                    })
                  }
                  className="admin-input font-mono"
                  placeholder="firebase-adminsdk-...@asivision-payments.iam.gserviceaccount.com"
                  required
                />
                <span className="field-hint">Service Account email used for backend serverless Admin SDK authorization.</span>
              </div>

              <div className="form-group full-width">
                <label>Service Account Private Key (FIREBASE_PRIVATE_KEY)</label>
                <textarea
                  rows={4}
                  value={settings.firebase?.privateKey || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      firebase: { ...settings.firebase, privateKey: e.target.value }
                    })
                  }
                  className="admin-textarea font-mono text-xs"
                  placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
                  required
                />
                <span className="field-hint">RSA Private key for Admin SDK authentication (keep safe & secure).</span>
              </div>
            </div>

            <div className="card-footer-action">
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Firebase Config</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 1: PAYONEER & FINANCIAL SETTINGS */}
        {activeTab === 'payoneer' && (
          <form onSubmit={handleSaveSettings} className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>Payoneer Payment & Invoicing Configuration</h3>
                <p className="text-xs text-slate-400">
                  Update payment request URLs and the receiving account review status notice.
                </p>
              </div>
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="admin-fields-grid">
              <div className="form-group">
                <label>Payoneer Recipient Email</label>
                <input
                  type="email"
                  value={settings.payoneer.recipientEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payoneer: { ...settings.payoneer, recipientEmail: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
                <span className="field-hint">Primary email associated with your Payoneer account.</span>
              </div>

              <div className="form-group">
                <label>Payoneer Receiving Account Status</label>
                <input
                  type="text"
                  value={settings.payoneer.receivingAccountStatus}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payoneer: { ...settings.payoneer, receivingAccountStatus: e.target.value }
                    })
                  }
                  className="admin-input"
                  placeholder="e.g. Under Verification Review or Verified"
                  required
                />
                <span className="field-hint">Status badge shown to customers and admins.</span>
              </div>

              <div className="form-group full-width">
                <label>Payoneer Status Note & Customer Instructions</label>
                <textarea
                  rows={3}
                  value={settings.payoneer.statusNote}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payoneer: { ...settings.payoneer, statusNote: e.target.value }
                    })
                  }
                  className="admin-textarea"
                  required
                />
                <span className="field-hint">Notice displayed on services and support pages regarding Payoneer custom invoices.</span>
              </div>

              <div className="form-group">
                <label>Payoneer Payment Request / Portal URL</label>
                <input
                  type="url"
                  value={settings.payoneer.customPaymentRequestUrl}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payoneer: { ...settings.payoneer, customPaymentRequestUrl: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
                <span className="field-hint">Direct link for customers to submit Payoneer payments or view invoices.</span>
              </div>

              <div className="form-group">
                <label>Default Currency for Custom Services</label>
                <input
                  type="text"
                  value={settings.payoneer.defaultCurrency}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      payoneer: { ...settings.payoneer, defaultCurrency: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
                <span className="field-hint">e.g. USD, EUR, GBP for Payoneer cross-border transactions.</span>
              </div>
            </div>

            <div className="card-footer-action">
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Payoneer Configuration</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: ENTITLEMENT OVERRIDE MANAGER */}
        {activeTab === 'entitlements' && (
          <div className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>Manual Pro Entitlement Management</h3>
                <p className="text-xs text-slate-400">
                  Grant or revoke Pro subscription status for any user email or Billing ID (<code>busr_...</code>).
                </p>
              </div>
            </div>

            {entActionMsg && (
              <div className="auth-message-banner success-banner mb-4">{entActionMsg}</div>
            )}

            <div className="admin-fields-grid">
              <div className="form-group full-width">
                <label>Target User Email or Billing User ID</label>
                <input
                  type="text"
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  placeholder="e.g. customer@gmail.com or busr_..."
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Plan Tier to Grant</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => {
                    setSelectedPlan(e.target.value);
                    if (e.target.value === 'universal_monthly') setGrantDurationDays(30);
                    else if (e.target.value === 'universal_4month') setGrantDurationDays(120);
                    else if (e.target.value === 'universal_yearly') setGrantDurationDays(365);
                    else if (e.target.value === 'universal_lifetime') setGrantDurationDays(36500);
                  }}
                  className="admin-select"
                >
                  <option value="universal_monthly">Universal Monthly (30 Days)</option>
                  <option value="universal_4month">Universal 4-Month (120 Days)</option>
                  <option value="universal_yearly">Universal Yearly (365 Days)</option>
                  <option value="universal_lifetime">Universal Lifetime (Permanent)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Duration in Days</label>
                <input
                  type="number"
                  value={grantDurationDays}
                  onChange={(e) => setGrantDurationDays(e.target.value)}
                  className="admin-input"
                  min="1"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={handleGrantPro} className="btn-grant-pro">
                <UserCheck className="icon-xs" />
                <span>Grant Pro Entitlement</span>
              </button>

              <button onClick={handleRevokePro} className="btn-revoke-pro">
                <UserX className="icon-xs" />
                <span>Revoke Pro Access</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT & COMPANY DETAILS */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveSettings} className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>Company Contact & SLA Information</h3>
                <p className="text-xs text-slate-400">
                  Update public phone, WhatsApp chat, office hours, and headquarters details.
                </p>
              </div>
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Changes</span>
              </button>
            </div>

            <div className="admin-fields-grid">
              <div className="form-group">
                <label>Primary Phone Number</label>
                <input
                  type="text"
                  value={settings.contact.primaryPhone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, primaryPhone: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>WhatsApp Number / Link</label>
                <input
                  type="text"
                  value={settings.contact.whatsappLink}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, whatsappLink: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Official Support Email</label>
                <input
                  type="email"
                  value={settings.contact.primaryEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, primaryEmail: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Operating Hours</label>
                <input
                  type="text"
                  value={settings.contact.officeHours}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, officeHours: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Headquarters Location</label>
                <input
                  type="text"
                  value={settings.contact.location}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, location: e.target.value }
                    })
                  }
                  className="admin-input"
                  required
                />
              </div>
            </div>

            <div className="card-footer-action">
              <button type="submit" className="btn-save-settings">
                <Save className="icon-xs" />
                <span>Save Contact Info</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB: CANCELLATIONS & USER FEEDBACK LOG */}
        {activeTab === 'cancellations' && (
          <div className="admin-settings-card">
            <div className="card-header-flex">
              <div>
                <h3>🚫 User Subscription Cancellations & Feedback Log ({cancellationLogs.length})</h3>
                <p className="text-xs text-slate-400">
                  Audit trail of user membership cancellations, optional feedback reasons submitted in the modal, and Gumroad API status.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsLoadingCancellations(true);
                  fetch('/api/subscription-cancel')
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.cancellations) setCancellationLogs(data.cancellations);
                    })
                    .catch(() => {})
                    .finally(() => setIsLoadingCancellations(false));
                }}
                className="btn-save-settings"
              >
                <RefreshCw className={`icon-xs ${isLoadingCancellations ? 'animate-spin' : ''}`} />
                <span>Refresh Log</span>
              </button>
            </div>

            {isLoadingCancellations ? (
              <div className="text-center py-12">
                <p className="text-slate-400 text-sm">Loading cancellation audit logs...</p>
              </div>
            ) : cancellationLogs.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl my-4">
                <AlertTriangle className="icon-md text-amber-500 mx-auto mb-2" />
                <p className="text-slate-300 font-bold text-sm">No User Cancellations Recorded Yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  When users submit a cancellation request from their account page, their submitted reason and cancellation timestamp will automatically be stored and listed here.
                </p>
              </div>
            ) : (
              <div className="space-y-4 my-4">
                {cancellationLogs.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row justify-between gap-4 items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-indigo-400 font-mono text-sm">User: {item.billingUserId}</span>
                        <span className="px-2 py-0.5 rounded text-[11px] bg-rose-500/10 border border-rose-500/30 text-rose-400 font-medium">
                          Status: Cancelled
                        </span>
                        <span className="text-[11px] text-slate-500 ml-auto">
                          {item.cancelledAt ? new Date(item.cancelledAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950 text-xs text-slate-200 border border-slate-800">
                        <strong className="text-slate-400 block mb-1">Submitted Feedback / Reason:</strong>
                        <p className="text-slate-200">"{item.reason}"</p>
                      </div>

                      <div className="text-[11px] text-slate-400 flex gap-4">
                        <span>Subscription ID: <code className="text-slate-300">{item.subscriptionId}</code></span>
                        <span>Gumroad API: <span className="text-emerald-400 font-medium">Unsubscribed</span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
