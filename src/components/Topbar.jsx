import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Sparkles, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const { user, isAdmin, entitlement, adminSettings } = useAuth();
  const phone = adminSettings?.contact?.primaryPhone || "+880 1769-920324";
  const email = adminSettings?.contact?.primaryEmail || "asifhasan10122000@gmail.com";
  const waLink = adminSettings?.contact?.whatsappLink || "https://wa.me/8801769920324";

  return (
    <div className="topbar-announcement">
      <div className="topbar-inner">
        <div className="topbar-contact-items">
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="topbar-link">
            <Phone className="icon-xs" />
            <span>Call: {phone}</span>
          </a>
          <a href={waLink} target="_blank" rel="noreferrer" className="topbar-link topbar-whatsapp">
            <MessageCircle className="icon-xs" />
            <span>WhatsApp Quick Chat</span>
          </a>
          <a href={`mailto:${email}`} className="topbar-link hide-mobile">
            <Mail className="icon-xs" />
            <span>{email}</span>
          </a>
        </div>

        <div className="topbar-action-items">
          <Link to="/support" className="topbar-pill-btn quote-pill">
            Get a Quote
          </Link>
          
          <Link to="/pricing" className={`topbar-pill-btn pro-pill ${entitlement.isPro ? 'pro-active' : ''}`}>
            <Sparkles className="icon-xs" />
            <span>{entitlement.isPro ? 'Pro Active ✓' : 'Get Pro Access'}</span>
          </Link>

          {user ? (
            <Link to="/account" className="topbar-user-link">
              <User className="icon-xs" />
              <span className="truncate max-w-[120px]">{user.displayName || user.email.split('@')[0]}</span>
            </Link>
          ) : (
            <Link to="/login" className="topbar-user-link">
              Sign In
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin" className="topbar-admin-badge" title="Operations Admin Portal">
              <ShieldCheck className="icon-xs" />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
