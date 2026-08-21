import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight, Loader2, KeyRound, Eye, EyeOff, ShieldCheck, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../../logo.png';

export default function LoginPage() {
  const { user, loginWithEmail, registerWithEmail, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl = location.state?.from || '/account';
  const planId = location.state?.selectedPlanId;
  const preselectedService = location.state?.preselectedService;
  const customMessage = location.state?.message;

  const targetState = {
    ...(planId ? { selectedPlanId: planId } : {}),
    ...(preselectedService ? { preselectedService } : {})
  };

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // If already logged in, redirect
  if (user && !isLoading) {
    navigate(redirectUrl, { state: targetState });
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (mode === 'signup' && password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (mode === 'signup') {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(redirectUrl, { state: targetState });
    } catch (err) {
      setErrorMsg(mapFirebaseError(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle();
      navigate(redirectUrl, { state: targetState });
    } catch (err) {
      setErrorMsg(mapFirebaseError(err.code) || 'Google sign-in was cancelled or failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    try {
      await resetPassword(email);
      setSuccessMsg(`Password reset instructions sent to ${email}. Please check your inbox.`);
    } catch (err) {
      setErrorMsg(mapFirebaseError(err.code));
    } finally {
      setIsLoading(false);
    }
  };

  function mapFirebaseError(code) {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check and try again.';
      case 'auth/email-already-in-use':
        return 'This email address is already in use. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password must be at least 8 characters long.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a few minutes before trying again.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in popup was closed.';
      default:
        return 'Authentication encountered an error. Please try again.';
    }
  }

  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="auth-page-container">
        <div className="auth-card-wrapper reveal">
          {/* Brand Header */}
          <div className="auth-header-block">
            <img src={logo} alt="Asivision" className="auth-brand-logo" />
            <h2>
              {mode === 'signup'
                ? 'Create Your Universal Account'
                : mode === 'reset'
                ? 'Reset Your Password'
                : 'Sign In to Asivision'}
            </h2>
            <p className="auth-subtitle">
              {mode === 'reset'
                ? "Enter your account email and we'll send you a password recovery link."
                : 'One account unlocks current and all upcoming digital SaaS tools.'}
            </p>
          </div>

          <div className="auth-form-card">
            {/* Feedback Banners */}
            {customMessage && (
              <div className="auth-message-banner info-banner" style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.35)',
                color: '#a5b4fc',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: '600',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles className="icon-xs text-indigo-400 shrink-0" />
                <span>{customMessage}</span>
              </div>
            )}
            {errorMsg && (
              <div className="auth-message-banner error-banner">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="auth-message-banner success-banner">{successMsg}</div>
            )}

            {/* Google Sign-In */}
            {mode !== 'reset' && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isLoading}
                  className="btn-google-auth"
                >
                  {isLoading ? (
                    <Loader2 className="icon-sm animate-spin" />
                  ) : (
                    <svg className="google-icon-svg" viewBox="0 0 24 24" width="18" height="18">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                  )}
                  <span>Continue with Google</span>
                </button>

                <div className="auth-divider-line">
                  <span>OR WITH EMAIL</span>
                </div>
              </>
            )}

            {/* Password Reset Form */}
            {mode === 'reset' ? (
              <form onSubmit={handlePasswordReset} className="auth-form-body">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-icon-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn-auth-submit">
                  {isLoading ? <Loader2 className="icon-sm animate-spin" /> : <KeyRound className="icon-sm" />}
                  <span>Send Reset Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMsg(null); setSuccessMsg(null); }}
                  className="btn-back-signin"
                >
                  ← Back to Sign In
                </button>
              </form>
            ) : (
              /* Email / Password Form */
              <form onSubmit={handleEmailAuth} className="auth-form-body">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-icon-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-icon-wrapper">
                    <Lock className="input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle-btn"
                    >
                      {showPassword ? <EyeOff className="icon-xs" /> : <Eye className="icon-xs" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-icon-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="forgot-password-row">
                    <button
                      type="button"
                      onClick={() => { setMode('reset'); setErrorMsg(null); }}
                      className="forgot-link"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button type="submit" disabled={isLoading} className="btn-auth-submit">
                  {isLoading ? (
                    <Loader2 className="icon-sm animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="icon-sm" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Toggle Modes */}
            {mode !== 'reset' && (
              <div className="auth-toggle-footer">
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === 'signin' ? 'signup' : 'signin');
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="toggle-mode-btn"
                >
                  {mode === 'signup'
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Create one"}
                </button>
              </div>
            )}
          </div>

          <p className="auth-legal-notice">
            By accessing Asivision, you agree to our{' '}
            <Link to="/terms" className="legal-link">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy/iq-test" className="legal-link">Privacy Policy</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
