import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Handshake, Mail, User, Phone, Globe, FileText,
  CheckCircle2, ArrowRight, Loader2, Sparkles, MessageCircle, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { submitQuoteRequest } from '../config/partnershipManager';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PAYMENT_METHODS = [
  "Bkash",
  "Nagad",
  "Rocket",
  "Bank Transfer (Bangladesh)",
  "PayPal",
  "Wise (TransferWise)",
  "Payoneer",
  "Western Union",
  "MoneyGram",
  "Other personal transfer",
];

export default function GetQuotePage() {
  const { user, billingUserId } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    appName: '',
    appDescription: '',
    appLink: '',
    website: '',
    message: '',
    preferredPayment: PAYMENT_METHODS[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!user) {
    return (
      <div className="page-shell-full">
        <Navbar />
        <main className="auth-page-container">
          <div className="auth-card-wrapper reveal" style={{ opacity: 1, transform: 'none' }}>
            <div className="auth-header-block">
              <Handshake size={40} className="text-indigo-400 mb-3" style={{ margin: '0 auto 12px' }} />
              <h2>Partnership Program</h2>
              <p className="auth-subtitle">Sign in to request a partnership quote and register your app on the Asivision platform.</p>
            </div>
            <div className="auth-form-card">
              <Link to="/login" state={{ from: '/partnership/quote', message: 'Sign in to request a partnership quote.' }} className="btn-auth-submit" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <span>Sign In to Continue</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="page-shell-full">
        <Navbar />
        <main className="auth-page-container">
          <div className="auth-card-wrapper" style={{ opacity: 1, transform: 'none' }}>
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={56} className="text-emerald-400" style={{ margin: '0 auto 16px' }} />
              <h2 style={{ color: '#f4f4f5', marginBottom: '12px', fontSize: '1.5rem' }}>Quote Request Submitted!</h2>
              <p style={{ color: '#a1a1aa', marginBottom: '24px', lineHeight: 1.6 }}>
                Your partnership quote request has been received. Once you complete your
                <strong style={{ color: '#6366f1' }}> $200 membership payment</strong> via your chosen method,
                contact us to confirm. We'll activate your partnership dashboard within 24 hours.
              </p>
              <div className="partnership-info-box" style={{ marginBottom: '24px' }}>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <strong style={{ color: '#f4f4f5' }}>Membership Fee:</strong> $200 — 10-Year Partner Access
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <strong style={{ color: '#f4f4f5' }}>What you get:</strong> Your app listed on Asivision platform with logo, preview, app link, and your own privacy policy page.
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>
                  <strong style={{ color: '#f4f4f5' }}>Next step:</strong> Transfer $200 via {form.preferredPayment}, then{' '}
                  <a href="https://wa.me/8801769920324" target="_blank" rel="noreferrer" style={{ color: '#6366f1' }}>
                    WhatsApp us
                  </a>{' '}
                  or{' '}
                  <a href="mailto:asifhasan10122000@gmail.com" style={{ color: '#6366f1' }}>
                    email us
                  </a>{' '}
                  with your payment receipt.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/8801769920324?text=Hi%2C%20I%20submitted%20a%20partnership%20quote%20request%20and%20want%20to%20confirm%20my%20payment."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-auth-submit"
                  style={{ display: 'inline-flex', gap: '8px', width: 'auto', padding: '12px 24px' }}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
                <Link to="/account" className="btn-back-signin" style={{ padding: '12px 24px' }}>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    try {
      const id = await submitQuoteRequest(user.uid, user.email, {
        ...form,
        billingUserId,
        displayName: user.displayName,
      });
      if (id) {
        setSubmitted(true);
      } else {
        setErrorMsg('Failed to submit your request. Please try again or contact us directly.');
      }
    } catch (err) {
      setErrorMsg('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <div className="page-shell-full">
      <Navbar />

      <main style={{ maxWidth: '780px', margin: '0 auto', padding: '32px 16px 64px', width: '100%' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px', opacity: 1, transform: 'none' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', padding: '6px 16px', borderRadius: '999px', marginBottom: '16px' }}>
            <Handshake size={16} className="text-indigo-400" />
            <span style={{ color: '#818cf8', fontSize: '0.8rem', fontWeight: 600 }}>Asivision Partnership Program</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#f4f4f5', lineHeight: 1.2, marginBottom: '12px' }}>
            Get a Partnership Quote
          </h1>
          <p style={{ color: '#a1a1aa', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            List your app on the Asivision platform. Fill in your app details, choose your payment method,
            and we'll activate your partner dashboard after your one-time $200 membership payment.
          </p>
        </div>

        {/* Pricing Info Card */}
        <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <DollarSign size={18} style={{ color: '#818cf8' }} />
              <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.9rem' }}>Membership Fee</span>
            </div>
            <p style={{ color: '#f4f4f5', fontSize: '1.8rem', fontWeight: 800 }}>$200</p>
            <p style={{ color: '#a1a1aa', fontSize: '0.78rem' }}>One-time · 10-Year Partner Access</p>
          </div>
          <div style={{ flex: 2, minWidth: '240px' }}>
            <p style={{ color: '#a1a1aa', fontSize: '0.83rem', lineHeight: 1.7 }}>
              ✓ Your app listed with logo, preview image & app link<br />
              ✓ Dedicated privacy policy page on our platform<br />
              ✓ Partner tab visible in your account dashboard<br />
              ✓ 10-year partnership validity — one payment only
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: '#12131a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px 24px' }}>
          <h3 style={{ color: '#f4f4f5', fontWeight: 700, fontSize: '1rem', marginBottom: '20px' }}>Your Details & App Information</h3>

          {errorMsg && (
            <div className="auth-message-banner error-banner" style={{ marginBottom: '16px' }}>{errorMsg}</div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label>Your Full Name <span style={{ color: '#f43f5e' }}>*</span></label>
              <div className="input-icon-wrapper">
                <User className="input-icon" />
                <input type="text" placeholder="e.g. John Doe" required {...field('name')} />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address <span style={{ color: '#f43f5e' }}>*</span></label>
              <div className="input-icon-wrapper">
                <Mail className="input-icon" />
                <input type="email" placeholder="you@example.com" required {...field('email')} />
              </div>
            </div>
            <div className="form-group">
              <label>Phone / WhatsApp Number</label>
              <div className="input-icon-wrapper">
                <Phone className="input-icon" />
                <input type="tel" placeholder="+880 1700 000000" {...field('phone')} />
              </div>
            </div>
            <div className="form-group">
              <label>Your App / Product Name <span style={{ color: '#f43f5e' }}>*</span></label>
              <div className="input-icon-wrapper">
                <Sparkles className="input-icon" />
                <input type="text" placeholder="e.g. MyAwesome App" required {...field('appName')} />
              </div>
            </div>
            <div className="form-group">
              <label>App Link (Play Store / Web URL) <span style={{ color: '#f43f5e' }}>*</span></label>
              <div className="input-icon-wrapper">
                <Globe className="input-icon" />
                <input type="url" placeholder="https://play.google.com/..." required {...field('appLink')} />
              </div>
            </div>
            <div className="form-group">
              <label>Your Website (optional)</label>
              <div className="input-icon-wrapper">
                <Globe className="input-icon" />
                <input type="url" placeholder="https://yoursite.com" {...field('website')} />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>App Description <span style={{ color: '#f43f5e' }}>*</span></label>
            <textarea
              rows={3}
              placeholder="Describe what your app does, its main features, and target users..."
              required
              {...field('appDescription')}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px', color: '#f4f4f5', fontSize: '0.88rem', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label>Preferred Payment Method <span style={{ color: '#f43f5e' }}>*</span></label>
            <select
              required
              {...field('preferredPayment')}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px', color: '#f4f4f5', fontSize: '0.88rem', fontFamily: 'inherit' }}
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m} style={{ background: '#12131a', color: '#f4f4f5' }}>{m}</option>
              ))}
            </select>
            <span style={{ color: '#71717a', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
              After submitting, transfer $200 via this method and send us proof of payment via WhatsApp or email.
            </span>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label>Additional Message (optional)</label>
            <textarea
              rows={3}
              placeholder="Any extra details or special requirements..."
              {...field('message')}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px 14px', color: '#f4f4f5', fontSize: '0.88rem', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-auth-submit"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Handshake size={18} />
            )}
            <span>{isSubmitting ? 'Submitting...' : 'Submit Partnership Quote Request'}</span>
          </button>

          <p style={{ color: '#71717a', fontSize: '0.75rem', textAlign: 'center', marginTop: '12px' }}>
            After submitting, our team will review your details and contact you to confirm payment and activate your partner dashboard.
          </p>
        </form>

        {/* Contact Info */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
          <a href="https://wa.me/8801769920324" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.82rem', fontWeight: 600 }}>
            <MessageCircle size={14} />
            <span>WhatsApp: +880 1769-920324</span>
          </a>
          <a href="mailto:asifhasan10122000@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#818cf8', fontSize: '0.82rem', fontWeight: 600 }}>
            <Mail size={14} />
            <span>asifhasan10122000@gmail.com</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
