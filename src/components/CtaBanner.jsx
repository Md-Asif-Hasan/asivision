import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CtaBanner() {
  const { adminSettings } = useAuth();
  const phone = adminSettings?.contact?.primaryPhone || "+880 1769-920324";
  const waLink = adminSettings?.contact?.whatsappLink || "https://wa.me/8801769920324";

  return (
    <section className="cta-banner-wrapper reveal">
      <div className="cta-banner-card">
        <div className="cta-banner-bg">
          <img
            src="/assets/services/fotter-cta.png"
            alt="CTA Visual"
            className="cta-bg-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="cta-overlay-gradient" />
        </div>

        <div className="cta-banner-content">
          <div className="cta-pill-badge">🚀 Accelerate Your Digital Transformation</div>
          <h2>Ready to Take Your Product or Business Forward?</h2>
          <p className="cta-description">
            Whether you need Google Play Console publishing support, high-converting digital marketing campaigns, an enterprise web/mobile app, or a Pro SaaS subscription across our ecosystem — let's make it happen.
          </p>

          <div className="cta-btn-group">
            <Link to="/support" className="btn-cta-primary">
              <span>Discuss Your Project / Get Quote</span>
              <ArrowRight className="icon-xs" />
            </Link>

            <Link to="/pricing" className="btn-cta-secondary">
              <Sparkles className="icon-xs" />
              <span>Unlock Pro SaaS Access</span>
            </Link>

            <a href={waLink} target="_blank" rel="noreferrer" className="btn-cta-whatsapp">
              <MessageCircle className="icon-xs" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

          <div className="cta-quick-contacts">
            <span>Direct Line: <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a></span>
            <span className="dot-sep">•</span>
            <span>Email: <a href="mailto:asifhasan10122000@gmail.com">asifhasan10122000@gmail.com</a></span>
            <span className="dot-sep">•</span>
            <span>Fast 24-Hour Response</span>
          </div>
        </div>
      </div>
    </section>
  );
}
