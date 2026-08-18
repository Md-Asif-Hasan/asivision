import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles, Shield, Zap, AlertCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS, PRODUCT_LIST, SAAS_APPS } from '../config/products';
import { CUSTOM_SERVICES } from '../config/services';
import { useAuth } from '../context/AuthContext';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PricingPage() {
  const { user, billingUserId, entitlement, grantProAccess } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('universal_yearly');
  const [openFaq, setOpenFaq] = useState(null);
  const [showSimModal, setShowSimModal] = useState(false);
  const [simPlan, setSimPlan] = useState(null);
  const navigate = useNavigate();

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleCheckoutClick = (plan) => {
    const bId = billingUserId || (user ? `busr_${user.uid.substring(0, 16)}` : "busr_guest");
    const checkoutUrlWithParam = `${plan.checkoutUrl}?checkout[custom][billing_user_id]=${encodeURIComponent(bId)}`;

    // If user is already pro with this plan, direct them to account
    if (entitlement.isPro && entitlement.planId === plan.id) {
      navigate('/account');
      return;
    }

    // Trigger confetti on plan click
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });

    // Provide choice to open real Lemon Squeezy checkout or simulate instant grant for testing
    setSimPlan(plan);
    setShowSimModal(true);
  };

  const handleConfirmSimulation = () => {
    if (!simPlan) return;
    const bId = billingUserId || (user ? `busr_${user.uid.substring(0, 16)}` : "busr_demo_universal");
    grantProAccess(bId, simPlan.id, simPlan.durationDays);
    setShowSimModal(false);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    navigate('/account');
  };

  const faqs = [
    {
      q: "What products are unlocked with a Universal Pro subscription?",
      a: "Universal Pro gives you full access to all Asivision digital SaaS products, including MindForge Arena Pro (IQ testing & multiplayer battles), Eternora Life Simulator Pro (story generations & legacy simulator), Taka Jachai AI vision features, and all upcoming AI scrapers and automation agents."
    },
    {
      q: "Are Google Play Console help or Digital Marketing included in this subscription?",
      a: "No. Subscription packages cover digital SaaS software only. Professional services such as Google Play Console publishing assistance, closed testing management, targeted digital marketing campaigns, and hardware/IoT engineering are bespoke services billed separately via Payoneer payment requests or custom invoices."
    },
    {
      q: "How does my Pro subscription sync across my mobile and web apps?",
      a: "When you sign in with your Universal Asivision account (or link your app account ID in your dashboard), your Pro entitlement is instantly synchronized across all devices and mobile apps in real-time."
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes! You can manage or cancel your recurring subscription in one click at any time via your Account Dashboard. Your Pro benefits will remain active until the end of your billing cycle."
    },
    {
      q: "What payment methods are supported for Pro subscriptions?",
      a: "Subscriptions are processed securely via Lemon Squeezy, supporting Credit/Debit Cards, Google Pay, Apple Pay, and PayPal."
    }
  ];

  return (
    <div className="page-shell-full">
      <Topbar />
      <Navbar />

      <main className="pricing-main-container">
        {/* Header Hero */}
        <div className="pricing-hero-header reveal">
          <div className="badge-pill-gradient">⚡ Flexible Digital Access Plans</div>
          <h1>One Subscription. Unlimited Access to All Asivision SaaS Apps.</h1>
          <p className="pricing-hero-subtitle">
            Unlock MindForge Arena Pro, Eternora Life Simulator Pro, AI Scrapers, and every new digital tool we release — backed by instant multi-device cloud synchronization.
          </p>
        </div>

        {/* Entitlement Notice Alert */}
        <div className="pricing-alert-notice reveal">
          <div className="alert-notice-icon">
            <AlertCircle className="icon-sm text-amber-400" />
          </div>
          <div className="alert-notice-text">
            <strong>Important Entitlement Policy:</strong> Subscription packages apply strictly to our <strong>Digital SaaS Products</strong>. Professional agency & consultancy services (Google Play Console support, digital marketing, website development, and hardware/IoT projects) are custom-scoped and billed separately via <strong>Payoneer request payment links</strong>.
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-matrix-grid reveal">
          {PRODUCT_LIST.map((prod) => {
            const isSelected = selectedPlan === prod.id;
            const isCurrentPro = entitlement.isPro && entitlement.planId === prod.id;

            return (
              <div
                key={prod.id}
                className={`pricing-plan-card ${prod.popular ? 'is-popular' : ''} ${prod.bestValue ? 'is-best-value' : ''} ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelectPlan(prod.id)}
              >
                {prod.badge && (
                  <div className="pricing-card-badge-top">{prod.badge}</div>
                )}

                <div className="pricing-plan-header">
                  <h3 className="plan-name">{prod.name}</h3>
                  <p className="plan-tagline">{prod.tagline}</p>
                </div>

                <div className="pricing-amount-row">
                  <span className="price-value">{prod.priceFormatted}</span>
                  <span className="period-label">{prod.periodLabel}</span>
                </div>

                {prod.savings && (
                  <div className="plan-savings-pill">{prod.savings}</div>
                )}

                <div className="pricing-features-divider" />

                <div className="pricing-features-list">
                  <p className="features-title">What's included:</p>
                  <ul>
                    {prod.features.map((feat, idx) => (
                      <li key={idx}>
                        <Check className="feature-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckoutClick(prod);
                  }}
                  className={`btn-plan-checkout ${prod.popular ? 'btn-popular' : prod.bestValue ? 'btn-best-value' : ''}`}
                >
                  <Sparkles className="icon-xs" />
                  <span>
                    {isCurrentPro
                      ? 'Current Active Plan'
                      : prod.type === 'lifetime'
                      ? 'Get Lifetime Access'
                      : `Subscribe ${prod.name.replace('Universal ', '')}`}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* SaaS Apps Ecosystem Unlocked */}
        <div className="saas-unlocked-section reveal">
          <div className="section-heading text-center">
            <p className="eyebrow">Universal Ecosystem</p>
            <h3>Digital Software In Included with Universal Pro</h3>
            <p className="section-subtitle">
              Every app below is instantly unlocked with your active Universal Pro account:
            </p>
          </div>

          <div className="saas-apps-grid">
            {SAAS_APPS.map((app) => (
              <div key={app.id} className="saas-app-card">
                <div className="saas-app-icon">{app.icon}</div>
                <div className="saas-app-content">
                  <div className="saas-app-header">
                    <h4>{app.name}</h4>
                    <span className="saas-status-badge">{app.status}</span>
                  </div>
                  <p className="saas-category">{app.category}</p>
                  <p className="saas-desc">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Services Section Callout */}
        <div className="payoneer-services-preview reveal">
          <div className="payoneer-preview-header">
            <div>
              <span className="badge-payoneer">Payoneer Invoiced Services</span>
              <h3>Need Custom Engineering, Google Play, or Marketing Services?</h3>
              <p>
                These services are not covered under software subscriptions and are quoted separately.
              </p>
            </div>
            <Link to="/support" className="btn-payoneer-inquire">
              <span>Request Custom Service Quote</span>
              <ArrowRight className="icon-xs" />
            </Link>
          </div>

          <div className="payoneer-cards-mini-grid">
            {CUSTOM_SERVICES.map((s) => (
              <div key={s.id} className="payoneer-mini-card">
                <div className="mini-card-badge">{s.badge}</div>
                <h4>{s.title}</h4>
                <p>{s.pricingStart}</p>
                <Link to="/support" state={{ preselectedService: s.title }} className="mini-card-link">
                  Discuss Requirement →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="faq-section-wrapper reveal">
          <div className="section-heading text-center">
            <p className="eyebrow">Frequently Asked Questions</p>
            <h3>Everything You Need to Know</h3>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="icon-sm" /> : <ChevronDown className="icon-sm" />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Checkout Selection Modal */}
      {showSimModal && simPlan && (
        <div className="checkout-modal-overlay" onClick={() => setShowSimModal(false)}>
          <div className="checkout-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <Sparkles className="icon-md text-indigo-400" />
              <h3>Choose Checkout Mode</h3>
              <p className="text-xs text-slate-400">
                You selected: <strong>{simPlan.name}</strong> ({simPlan.priceFormatted})
              </p>
            </div>

            <div className="modal-body space-y-4">
              <div className="checkout-choice-box">
                <h4>Option 1: Live Lemon Squeezy Gateway</h4>
                <p>Redirects to secure payment checkout in Bangladeshi Taka (BDT).</p>
                <a
                  href={`${simPlan.checkoutUrl}?checkout[custom][billing_user_id]=${encodeURIComponent(billingUserId || (user ? `busr_${user.uid.substring(0, 16)}` : "busr_guest"))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-live-checkout"
                >
                  <span>Open Lemon Squeezy Gateway ↗</span>
                </a>
              </div>

              <div className="checkout-choice-box demo-box">
                <h4>Option 2: Instant Activation (Testing & Sandbox)</h4>
                <p>Simulate instant payment verification and grant Pro access to your current account immediately.</p>
                <button onClick={handleConfirmSimulation} className="btn-sim-activate">
                  <span>Instant Activate Pro Now</span>
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowSimModal(false)} className="btn-modal-cancel">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
