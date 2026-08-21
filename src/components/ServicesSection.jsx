import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldAlert, CreditCard, Sparkles, HelpCircle } from 'lucide-react';
import { CUSTOM_SERVICES, VALUE_PROPOSITIONS } from '../config/services';
import { useAuth } from '../context/AuthContext';

export default function ServicesSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuotaClick = (e, serviceTitle) => {
    if (!user) {
      e.preventDefault();
      navigate('/login', {
        state: {
          from: '/support',
          preselectedService: serviceTitle,
          message: 'Please sign in or create an account to get quota or request a service quote.'
        }
      });
    }
  };

  const handleProClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/login', {
        state: {
          from: '/pricing',
          message: 'Please sign in or create an account to get Pro access.'
        }
      });
    }
  };

  return (
    <section id="services" className="section services-modern-section">
      {/* Section Header */}
      <div className="section-heading reveal">
        <div className="badge-pill-gradient">💼 Core Capabilities & Specialized Services</div>
        <h2>What Can We Help You Build & Scale?</h2>
        <p className="section-subtitle">
          From Google Play Console product expertise and digital growth campaigns to high-performance websites, mobile apps, and custom IoT systems.
        </p>
      </div>

      {/* Services Grid (4 Modern InventDiv-Style Cards) */}
      <div className="services-grid-modern reveal">
        {CUSTOM_SERVICES.map((srv) => (
          <div key={srv.id} className="service-card-modern">
            <div className="service-card-image-box">
              <img
                src={srv.image}
                alt={srv.title}
                className="service-card-img"
                onError={(e) => {
                  if (srv.fallbackImage && e.target.src !== srv.fallbackImage) {
                    e.target.src = srv.fallbackImage;
                  }
                }}
              />
              <div className="service-card-badge">{srv.badge}</div>
            </div>

            <div className="service-card-body">
              <div className="service-payment-badge">
                <CreditCard className="icon-xs" />
                <span>{srv.paymentMethod}</span>
              </div>

              <h3 className="service-title">{srv.title}</h3>
              <p className="service-description">{srv.description}</p>

              <div className="service-deliverables">
                <h4>Key Inclusions:</h4>
                <ul>
                  {srv.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="service-card-footer">
                <div className="service-pricing-tag">
                  <span className="price-label">{srv.pricingStart}</span>
                </div>
                <Link
                  to="/support"
                  state={{ preselectedService: srv.title }}
                  onClick={(e) => handleQuotaClick(e, srv.title)}
                  className="btn-service-action"
                >
                  <span>Get Started / Quote</span>
                  <ArrowRight className="icon-xs" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Crucial Entitlement Separation Banner */}
      <div className="entitlement-callout-banner reveal">
        <div className="callout-icon-box">
          <ShieldAlert className="callout-icon" />
        </div>
        <div className="callout-content">
          <h4>Understanding Service vs. Subscription Entitlements:</h4>
          <p>
            <strong>Universal Pro Subscriptions</strong> provide access exclusively to our <strong>Digital SaaS Products & AI Tools</strong> (such as MindForge Arena Pro, Eternora Life Simulator Pro, AI Scrapers & Automations).
          </p>
          <p className="callout-subtext">
            Google Play Console / App Store publishing assistance, targeted digital marketing campaigns, custom IT maintenance, and IoT/Hardware engineering are <strong>custom consulting & client services</strong> that require tailored requirements and are billed via <strong>Payoneer custom payment requests / invoices</strong>.
          </p>
        </div>
        <div className="callout-actions">
          <Link to="/pricing" onClick={handleProClick} className="btn-callout-saas">
            <Sparkles className="icon-xs" />
            <span>View SaaS Pro Plans</span>
          </Link>
          <Link to="/support" onClick={(e) => handleQuotaClick(e, 'General Partnership & Inquiries')} className="btn-callout-quote">
            <span>Request Custom Service</span>
          </Link>
        </div>
      </div>

      {/* Why Choose Asivision Section */}
      <div className="why-choose-wrapper reveal">
        <div className="section-heading text-center">
          <p className="eyebrow">The Asivision Difference</p>
          <h3>Why Growing Businesses & Creators Choose Us</h3>
        </div>

        <div className="why-choose-grid">
          {VALUE_PROPOSITIONS.map((prop, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon">{prop.icon}</div>
              <h4>{prop.title}</h4>
              <p>{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
