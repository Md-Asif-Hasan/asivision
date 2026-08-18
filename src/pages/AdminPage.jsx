import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Sliders, UserCheck, UserX, Save, RefreshCw,
  CreditCard, Phone, Mail, Sparkles, CheckCircle2, AlertTriangle,
  Lock, Key, Send, Search, ArrowRight, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAdminSettings, saveAdminSettings, resetAdminSettings } from '../config/adminSettings';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminPage() {
  const { user, isAdmin, grantProAccess, revokeProAccess } = useAuth();
  
  const [settings, setSettings] = useState(getAdminSettings());
  const [activeTab, setActiveTab] = useState('payoneer'); // 'payoneer' | 'entitlements' | 'contact'
  const [saveStatus, setSaveStatus] = useState(null);

  // Entitlement manual grant state
  const [targetUserId, setTargetUserId] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('universal_yearly');
  const [grantDurationDays, setGrantDurationDays] = useState(365);
  const [entActionMsg, setEntActionMsg] = useState(null);

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
        <Topbar />
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
      <Topbar />
      <Navbar />

      <main className="admin-main-container">
        {/* Header */}
        <div className="admin-header-row reveal">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="admin-badge-pill">⚙️ Central Operations Dashboard</span>
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
        <div className="admin-tabs-row reveal">
          <button
            onClick={() => setActiveTab('payoneer')}
            className={`admin-tab-btn ${activeTab === 'payoneer' ? 'active' : ''}`}
          >
            <CreditCard className="icon-xs" />
            <span>Payoneer & Financial Parameters</span>
          </button>

          <button
            onClick={() => setActiveTab('entitlements')}
            className={`admin-tab-btn ${activeTab === 'entitlements' ? 'active' : ''}`}
          >
            <UserCheck className="icon-xs" />
            <span>Pro Entitlement Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`admin-tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          >
            <Phone className="icon-xs" />
            <span>Contact & Company Details</span>
          </button>
        </div>

        {/* Save Status Alert */}
        {saveStatus && (
          <div className={`auth-message-banner ${saveStatus.success ? 'success-banner' : 'error-banner'} mb-6`}>
            {saveStatus.message}
          </div>
        )}

        {/* TAB 1: PAYONEER & FINANCIAL SETTINGS */}
        {activeTab === 'payoneer' && (
          <form onSubmit={handleSaveSettings} className="admin-settings-card reveal">
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
          <div className="admin-settings-card reveal">
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
          <form onSubmit={handleSaveSettings} className="admin-settings-card reveal">
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
      </main>

      <Footer />
    </div>
  );
}
