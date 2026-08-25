import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Handshake, Upload, Globe, FileText, CheckCircle2, Loader2,
  Sparkles, Image, Lock, ArrowRight, Trash2, ExternalLink,
  AlertCircle, Plus, Eye
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  savePartnerApp,
  getPartnerAppsByUser,
  deletePartnerApp,
  checkIsPartner,
} from '../config/partnershipManager';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PRIVACY_POLICY_DEFAULTS = {
  effectiveDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  disclaimers: 'This application is a third-party product listed on the Asivision platform. Please review this policy before using the service.',
  collectedInfo: 'Account information needed to provide the service.\nDevice and diagnostic information needed to keep the application reliable.',
  howUsed: 'Deliver the features and services you request.\nMaintain security, reliability, and support for the application.',
  storageSecurity: 'Information is protected using reasonable technical and organizational safeguards.\nAccess is limited to authorized systems and personnel where required.',
  userRights: 'You may request access, correction, export, or deletion of eligible personal information by contacting the app\'s support team.',
};

function toSlug(str) {
  return String(str).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function PartnershipPage() {
  const { user, billingUserId } = useAuth();
  const navigate = useNavigate();

  const [isPartner, setIsPartner] = useState(false);
  const [partnerLoading, setPartnerLoading] = useState(true);
  const [apps, setApps] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const emptyForm = {
    appName: '',
    appId: '',
    category: '',
    description: '',
    logoUrl: '',
    previewImageUrl: '',
    appLink: '',
    privacyPolicyMode: 'form', // 'form' | 'url'
    externalPrivacyUrl: '',
    ...PRIVACY_POLICY_DEFAULTS,
  };

  const [form, setForm] = useState(emptyForm);

  // Check partner status
  useEffect(() => {
    if (!user) return;
    checkIsPartner(user.uid).then((status) => {
      setIsPartner(status);
      setPartnerLoading(false);
    });
  }, [user]);

  // Load partner apps
  useEffect(() => {
    if (!user || !isPartner) { setAppsLoading(false); return; }
    setAppsLoading(true);
    getPartnerAppsByUser(user.uid).then((data) => {
      setApps(data);
      setAppsLoading(false);
    });
  }, [user, isPartner]);

  // Listen for updates
  useEffect(() => {
    const refresh = () => {
      if (user && isPartner) {
        getPartnerAppsByUser(user.uid).then(setApps);
      }
    };
    window.addEventListener('asivision_partner_apps_updated', refresh);
    return () => window.removeEventListener('asivision_partner_apps_updated', refresh);
  }, [user, isPartner]);

  if (!user) {
    return (
      <div className="page-shell-full">
        <Navbar />
        <main className="auth-page-container">
          <div className="auth-card-wrapper" style={{ opacity: 1, transform: 'none' }}>
            <Lock size={40} style={{ color: '#6366f1', margin: '0 auto 16px', display: 'block' }} />
            <h2 style={{ textAlign: 'center', color: '#f4f4f5', marginBottom: '12px' }}>Sign In Required</h2>
            <p style={{ textAlign: 'center', color: '#a1a1aa', marginBottom: '24px' }}>Please sign in to access your partnership dashboard.</p>
            <Link to="/login" state={{ from: '/partnership' }} className="btn-auth-submit" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <span>Sign In</span><ArrowRight size={16} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (partnerLoading) {
    return (
      <div className="page-shell-full">
        <Navbar />
        <main className="auth-page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 size={36} className="animate-spin" style={{ color: '#6366f1' }} />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isPartner) {
    return (
      <div className="page-shell-full">
        <Navbar />
        <main className="auth-page-container">
          <div className="auth-card-wrapper" style={{ opacity: 1, transform: 'none' }}>
            <Handshake size={44} style={{ color: '#6366f1', margin: '0 auto 16px', display: 'block' }} />
            <h2 style={{ textAlign: 'center', color: '#f4f4f5', marginBottom: '12px' }}>Partnership Not Yet Active</h2>
            <p style={{ textAlign: 'center', color: '#a1a1aa', marginBottom: '8px', lineHeight: 1.7 }}>
              Your partnership program is not yet activated. To become a partner:
            </p>
            <ol style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: 2, textAlign: 'left', maxWidth: '400px', margin: '0 auto 24px', paddingLeft: '20px' }}>
              <li>Submit a quote request from the button below</li>
              <li>Pay the $200 one-time membership fee (10-year access)</li>
              <li>Contact us with your payment receipt via WhatsApp or email</li>
              <li>We'll activate your partnership tab within 24 hours</li>
            </ol>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/partnership/quote" className="btn-auth-submit" style={{ display: 'inline-flex', gap: '8px', width: 'auto', padding: '12px 24px' }}>
                <Sparkles size={16} />
                <span>Get a Quote</span>
              </Link>
              <Link to="/account" className="btn-back-signin" style={{ padding: '12px 24px' }}>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleOpenForm = (app = null) => {
    if (app) {
      setForm({ ...emptyForm, ...app });
      setEditingApp(app);
    } else {
      setForm(emptyForm);
      setEditingApp(null);
    }
    setShowForm(true);
    setSaveStatus(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApp(null);
    setForm(emptyForm);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    const appId = form.appId || `partner_${toSlug(form.appName)}_${Date.now()}`;
    const payload = {
      ...form,
      appId,
      appName: form.appName.trim(),
    };

    try {
      const savedId = await savePartnerApp(user.uid, user.email, payload);
      if (savedId) {
        setSaveStatus({ success: true, message: `App "${form.appName}" saved successfully! It will appear in the Asivision platform.` });
        setShowForm(false);
        setEditingApp(null);
        setForm(emptyForm);
        const updated = await getPartnerAppsByUser(user.uid);
        setApps(updated);
      } else {
        setSaveStatus({ success: false, message: 'Failed to save. Please try again.' });
      }
    } catch (err) {
      setSaveStatus({ success: false, message: 'An error occurred. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (app) => {
    if (!window.confirm(`Delete "${app.appName}"? This cannot be undone.`)) return;
    const ok = await deletePartnerApp(app.appId || app.id);
    if (ok) {
      setApps((prev) => prev.filter((a) => (a.appId || a.id) !== (app.appId || app.id)));
    }
  };

  const fieldProps = (key) => ({
    value: form[key] || '',
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="partner-page-container">
        {/* Header */}
        <div className="partner-page-header reveal">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="admin-badge-pill">Partner Dashboard</span>
              <span className="admin-user-pill" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981' }}>
                <CheckCircle2 size={12} />
                <span>Partnership Active</span>
              </span>
            </div>
            <h1>Partnership Program</h1>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginTop: '4px' }}>
              Manage your apps listed on the Asivision platform. Add your logo, preview images, app link, and privacy policy.
            </p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="btn-save-settings"
          >
            <Plus size={16} />
            <span>Register New App</span>
          </button>
        </div>

        {/* Status Messages */}
        {saveStatus && (
          <div className={`auth-message-banner ${saveStatus.success ? 'success-banner' : 'error-banner'}`} style={{ marginBottom: '20px' }}>
            {saveStatus.message}
          </div>
        )}

        {/* App Registration Form */}
        {showForm && (
          <div style={{ background: '#0e0f17', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '20px', padding: '28px 24px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ color: '#f4f4f5', fontWeight: 700 }}>
                {editingApp ? `Editing: ${editingApp.appName}` : 'Register New App'}
              </h3>
              <button onClick={handleCloseForm} style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', color: '#f43f5e', padding: '6px 14px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* App Basic Info */}
              <h4 style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>App Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label>App Name <span style={{ color: '#f43f5e' }}>*</span></label>
                  <input type="text" className="admin-input" placeholder="My App" required {...fieldProps('appName')} onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({ ...f, appName: name, appId: f.appId || `partner_${toSlug(name)}` }));
                  }} />
                </div>
                <div className="form-group">
                  <label>App ID (auto-slug)</label>
                  <input type="text" className="admin-input font-mono" placeholder="partner_my_app" {...fieldProps('appId')} />
                </div>
                <div className="form-group">
                  <label>Category / Type <span style={{ color: '#f43f5e' }}>*</span></label>
                  <input type="text" className="admin-input" placeholder="e.g. Productivity, Finance, Games" required {...fieldProps('category')} />
                </div>
                <div className="form-group">
                  <label>App Link (Play Store / Web) <span style={{ color: '#f43f5e' }}>*</span></label>
                  <input type="url" className="admin-input font-mono" placeholder="https://play.google.com/..." required {...fieldProps('appLink')} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>App Description <span style={{ color: '#f43f5e' }}>*</span></label>
                <textarea rows={3} className="admin-textarea" placeholder="Describe your app's main features and purpose..." required {...fieldProps('description')} />
              </div>

              {/* Images */}
              <h4 style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                Images (Cloudflare R2 Bucket: asivision-bucket)
              </h4>
              <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '12px', padding: '14px 16px', marginBottom: '14px', fontSize: '0.8rem', color: '#a1a1aa', lineHeight: 1.7 }}>
                <strong style={{ color: '#818cf8' }}>Cloudflare R2 Storage Guide:</strong> Upload your app logo and preview screenshots into bucket <code style={{ color: '#c084fc', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>asivision-bucket</code> in folder <code style={{ color: '#c084fc', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>/application-images/</code>.
                <br />Public Image URL format: <code style={{ color: '#10b981', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/your-logo.png</code>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label>App Logo URL (Cloudflare R2) <span style={{ color: '#f43f5e' }}>*</span></label>
                  <input type="url" className="admin-input font-mono" placeholder="https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/app-logo.png" required {...fieldProps('logoUrl')} />
                  {form.logoUrl && (
                    <div style={{ marginTop: '8px', width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={form.logoUrl} alt="Logo preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>App Preview Screenshot URL (Cloudflare R2) <span style={{ color: '#f43f5e' }}>*</span></label>
                  <input type="url" className="admin-input font-mono" placeholder="https://pub-8c781e8170374f06a590d96f616c98bd.r2.dev/application-images/app-preview.png" required {...fieldProps('previewImageUrl')} />
                  {form.previewImageUrl && (
                    <div style={{ marginTop: '8px', width: '100%', maxWidth: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={form.previewImageUrl} alt="Preview" style={{ width: '100%', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Privacy Policy */}
              <h4 style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                Privacy Policy
              </h4>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {[['form', '📝 Fill in Privacy Form (Recommended)'], ['url', '🔗 Use External Privacy Policy URL']].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, privacyPolicyMode: val }))}
                    style={{
                      padding: '8px 16px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      background: form.privacyPolicyMode === val ? 'rgba(99,102,241,0.2)' : 'transparent',
                      border: `1px solid ${form.privacyPolicyMode === val ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      color: form.privacyPolicyMode === val ? '#818cf8' : '#a1a1aa',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {form.privacyPolicyMode === 'url' ? (
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>External Privacy Policy URL <span style={{ color: '#f43f5e' }}>*</span></label>
                  <input type="url" className="admin-input font-mono" placeholder="https://yoursite.com/privacy" required={form.privacyPolicyMode === 'url'} {...fieldProps('externalPrivacyUrl')} />
                  <span style={{ color: '#71717a', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>We'll link to this URL from our platform's privacy section for your app.</span>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '14px', marginBottom: '16px' }}>
                  <div className="form-group">
                    <label>Effective Date</label>
                    <input type="text" className="admin-input" placeholder="August 20, 2026" {...fieldProps('effectiveDate')} />
                  </div>
                  <div className="form-group">
                    <label>App Disclaimer (shown in highlighted banner)</label>
                    <textarea rows={2} className="admin-textarea text-xs" placeholder="e.g. This app is for informational purposes..." {...fieldProps('disclaimers')} />
                  </div>
                  <div className="form-group">
                    <label>Section 1: Information We Collect <span style={{ color: '#f43f5e' }}>*</span></label>
                    <textarea rows={3} className="admin-textarea text-xs" placeholder="Account Details: Name, email...\nDevice Info: OS version, screen resolution..." required={form.privacyPolicyMode === 'form'} {...fieldProps('collectedInfo')} />
                  </div>
                  <div className="form-group">
                    <label>Section 2: How We Use Your Information <span style={{ color: '#f43f5e' }}>*</span></label>
                    <textarea rows={3} className="admin-textarea text-xs" placeholder="Deliver core application features...\nSync user preferences across devices..." required={form.privacyPolicyMode === 'form'} {...fieldProps('howUsed')} />
                  </div>
                  <div className="form-group">
                    <label>Section 3: Data Storage & Security <span style={{ color: '#f43f5e' }}>*</span></label>
                    <textarea rows={3} className="admin-textarea text-xs" placeholder="Passwords hashed using bcrypt...\nHTTPS/TLS encrypted transmission..." required={form.privacyPolicyMode === 'form'} {...fieldProps('storageSecurity')} />
                  </div>
                  <div className="form-group">
                    <label>Section 4: User Rights & Data Control <span style={{ color: '#f43f5e' }}>*</span></label>
                    <textarea rows={2} className="admin-textarea text-xs" placeholder="Users may request data deletion via support@yourapp.com." required={form.privacyPolicyMode === 'form'} {...fieldProps('userRights')} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button type="button" onClick={handleCloseForm} className="btn-cancel-admin">Cancel</button>
                <button type="submit" disabled={isSaving} className="btn-save-settings">
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                  <span>{isSaving ? 'Saving...' : 'Save App & Privacy Policy'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Registered Apps */}
        <div style={{ background: '#12131a', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ color: '#f4f4f5', fontWeight: 700, fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} style={{ color: '#6366f1' }} />
            Your Registered Apps ({apps.length})
          </h3>

          {appsLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#71717a' }}>
              <Loader2 size={28} className="animate-spin" style={{ margin: '0 auto 12px', display: 'block', color: '#6366f1' }} />
              <p>Loading your apps...</p>
            </div>
          ) : apps.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#71717a' }}>
              <Image size={36} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
              <p style={{ marginBottom: '8px' }}>No apps registered yet.</p>
              <p style={{ fontSize: '0.82rem' }}>Click "Register New App" above to list your first app on the Asivision platform.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {apps.map((app) => (
                <div key={app.appId || app.id} style={{ background: '#0e0f17', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  {/* Logo */}
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {app.logoUrl ? (
                      <img src={app.logoUrl} alt={app.appName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Image size={22} style={{ opacity: 0.4 }} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <strong style={{ color: '#f4f4f5', fontSize: '0.95rem' }}>{app.appName}</strong>
                      <span style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>Active</span>
                    </div>
                    <p style={{ color: '#818cf8', fontSize: '0.78rem', marginBottom: '4px' }}>{app.category}</p>
                    <p style={{ color: '#71717a', fontSize: '0.78rem', lineHeight: 1.5 }}>{app.description?.substring(0, 120)}{app.description?.length > 120 ? '...' : ''}</p>
                    {app.appLink && (
                      <a href={app.appLink} target="_blank" rel="noreferrer" style={{ color: '#6366f1', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                        <ExternalLink size={11} />
                        <span>App Link</span>
                      </a>
                    )}
                  </div>

                  {/* Preview */}
                  {app.previewImageUrl && (
                    <div style={{ width: '70px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <img src={app.previewImageUrl} alt="Preview" style={{ width: '100%', display: 'block' }} />
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0, width: '100%', maxWidth: '160px' }}>
                    <button onClick={() => handleOpenForm(app)} className="btn-edit-app">
                      <span>Edit App</span>
                    </button>
                    {app.privacyPolicyMode === 'url' && app.externalPrivacyUrl ? (
                      <a href={app.externalPrivacyUrl} target="_blank" rel="noreferrer" className="btn-view-privacy">
                        <span>View Privacy</span>
                      </a>
                    ) : (
                      <Link to={`/privacy/${app.appId || app.id}`} target="_blank" className="btn-view-privacy">
                        <span>View Privacy Page</span>
                      </Link>
                    )}
                    <button
                      onClick={() => handleDelete(app)}
                      style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.25)', color: '#f43f5e', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }}
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div style={{ marginTop: '24px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '14px', padding: '16px 20px' }}>
          <h4 style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>ℹ️ How Your App Gets Listed</h4>
          <ul style={{ color: '#a1a1aa', fontSize: '0.82rem', lineHeight: 2, paddingLeft: '16px' }}>
            <li>Apps you register here will be displayed on the Asivision platform's apps showcase.</li>
            <li>Your logo and preview images are served from Cloudflare R2/CDN for fast delivery worldwide.</li>
            <li>A dedicated privacy policy page is generated at <code style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>/privacy/your-app-id</code></li>
            <li>Your 10-year partnership membership includes unlimited app registrations and updates.</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
