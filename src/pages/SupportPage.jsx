import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Mail, Phone, MessageCircle, Clock, MapPin, Send,
  CheckCircle2, AlertCircle, HelpCircle, ShieldCheck, Sparkles, CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CUSTOM_SERVICES } from '../config/services';
import { saveInquiry } from '../config/adminSettings';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SupportPage() {
  const { adminSettings } = useAuth();
  const location = useLocation();

  const phone = adminSettings?.contact?.primaryPhone || "+880 1769-920324";
  const email = adminSettings?.contact?.primaryEmail || "asifhasan10122000@gmail.com";
  const waLink = adminSettings?.contact?.whatsappLink || "https://wa.me/8801769920324";
  const payoneerStatus = adminSettings?.payoneer?.statusNote || "Our Payoneer receiving account is currently under verification review. Direct custom invoice links are issued upon scoping.";

  const preselected = location.state?.preselectedService || "Google Play Console Support & Consultancy";

  const [serviceType, setServiceType] = useState(preselected);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectScope: '',
    budget: '$100 - $500',
    preferredPayment: 'Payoneer Invoice / Request Link'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (location.state?.preselectedService) {
      setServiceType(location.state.preselectedService);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const inquiryPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceType,
      projectScope: formData.projectScope,
      budget: formData.budget,
      preferredPayment: formData.preferredPayment
    };

    saveInquiry(inquiryPayload);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="support-main-container">
        {/* Hero Header */}
        <div className="support-hero-header reveal">
          <div className="badge-pill-gradient">💬 Dedicated Client & Technical Support</div>
          <h1>Let's Connect & Build Your Next Project</h1>
          <p className="support-hero-subtitle">
            Whether you need Google Play Console assistance, digital marketing campaigns, custom web/mobile apps, or support with your Pro SaaS subscription — our team is here to assist.
          </p>
        </div>

        {/* Top 3 Quick Contact Cards */}
        <div className="quick-contacts-grid reveal">
          <div className="contact-quick-card">
            <div className="quick-card-icon-box bg-emerald-500/10 text-emerald-400">
              <MessageCircle className="icon-md" />
            </div>
            <h3>WhatsApp Live Chat</h3>
            <p className="text-xs text-slate-400">Fastest response for quick project discussions and questions.</p>
            <span className="contact-highlight-value">{phone}</span>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-quick-contact btn-whatsapp">
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="contact-quick-card">
            <div className="quick-card-icon-box bg-indigo-500/10 text-indigo-400">
              <Phone className="icon-md" />
            </div>
            <h3>Direct Phone Call</h3>
            <p className="text-xs text-slate-400">Available Monday through Saturday 9:00 AM – 6:00 PM (GMT+6).</p>
            <span className="contact-highlight-value">{phone}</span>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="btn-quick-contact btn-phone">
              <span>Call Direct Line</span>
            </a>
          </div>

          <div className="contact-quick-card">
            <div className="quick-card-icon-box bg-purple-500/10 text-purple-400">
              <Mail className="icon-md" />
            </div>
            <h3>Official Support Email</h3>
            <p className="text-xs text-slate-400">Send detailed requirement documents or RFP briefs.</p>
            <span className="contact-highlight-value truncate max-w-[200px]">{email}</span>
            <div className="flex gap-2 w-full">
              <a href={`mailto:${email}`} className="btn-quick-contact btn-email flex-1">
                <span>Send Email</span>
              </a>
              <button onClick={handleCopyEmail} className="btn-copy-email">
                {copiedEmail ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Payoneer Review & Payment Information Notice */}
        <div className="payoneer-support-notice reveal">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <CreditCard className="icon-md" />
            </div>
            <div>
              <h4>Payoneer Custom Invoicing & Payment Instructions</h4>
              <p className="text-xs text-slate-300 mt-1">
                {payoneerStatus}
              </p>
              <div className="payoneer-steps-grid mt-3">
                <div className="payoneer-step-item">
                  <span className="step-num">1</span>
                  <span>Submit your project details via the inquiry form below.</span>
                </div>
                <div className="payoneer-step-item">
                  <span className="step-num">2</span>
                  <span>We confirm deliverables, milestone scope, and send a tailored quote.</span>
                </div>
                <div className="payoneer-step-item">
                  <span className="step-num">3</span>
                  <span>Direct Payoneer payment request link or invoice is generated for payment.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Support Form & Office Hours Split */}
        <div className="support-form-layout reveal">
          {/* Left: Contact / Quote Form */}
          <div className="support-form-card">
            <div className="form-card-header">
              <Send className="icon-sm text-indigo-400" />
              <h3>Submit a Project Inquiry or Support Ticket</h3>
            </div>

            {submittedSuccess ? (
              <div className="form-success-state">
                <CheckCircle2 className="icon-lg text-emerald-400 mb-3" />
                <h4>Inquiry Received Successfully!</h4>
                <p>
                  Thank you for reaching out. We will review your project requirements for <strong>{serviceType}</strong> and respond via email or WhatsApp within 24 hours.
                </p>
                <button onClick={() => setSubmittedSuccess(false)} className="btn-send-another">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="support-form-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asif Hasan"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1769-..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Select Required Service</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="form-select-styled"
                    >
                      <option value="Google Play Console Support & Consultancy">Google Play Console Support & Consultancy</option>
                      <option value="Digital Marketing & Online Business Growth">Digital Marketing & Growth Campaigns</option>
                      <option value="Website & Mobile App Development">Website & Mobile App Development</option>
                      <option value="Custom IT, Cloud, Hardware & IoT Engineering">Custom IT, MATLAB DSP & IoT Engineering</option>
                      <option value="Pro SaaS Subscription Billing Support">Pro SaaS Subscription Billing Support</option>
                      <option value="General Partnership & Inquiries">General Partnership & Inquiries</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Scope & Requirements Description</label>
                  <textarea
                    rows={5}
                    value={formData.projectScope}
                    onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                    placeholder="Provide details about your project goals, app package name, tech stack, or specific support questions..."
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Estimated Budget Tier</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="form-select-styled"
                    >
                      <option value="< $100 (Quick Consultation / Review)">&lt; $100 (Quick Review / Consultation)</option>
                      <option value="$100 - $300 (Standard Service)">$100 - $300 (Standard Setup / Campaign)</option>
                      <option value="$300 - $1,000 (Full Project / App Dev)">$300 - $1,000 (Full Project / App Dev)</option>
                      <option value="$1,000+ (Enterprise / Hardware System)">$1,000+ (Enterprise / Custom Hardware)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Preferred Payment Mode</label>
                    <select
                      value={formData.preferredPayment}
                      onChange={(e) => setFormData({ ...formData, preferredPayment: e.target.value })}
                      className="form-select-styled"
                    >
                      <option value="Payoneer Invoice / Request Link">Payoneer Invoice / Request Link</option>
                      <option value="Credit / Debit Card via Payoneer">Credit / Debit Card via Payoneer</option>
                      <option value="Local Bank Wire (Bangladesh)">Local Bank Wire (Bangladesh)</option>
                      <option value="Gumroad (SaaS Pro Plans Only)">Gumroad (SaaS Pro Plans Only)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-submit-support">
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry to Engineering Team</span>
                      <Send className="icon-xs" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Office Hours & Location Card */}
          <div className="support-sidebar-info">
            <div className="sidebar-info-card">
              <h4>Operating Hours & Location</h4>
              <div className="sidebar-detail-list">
                <div className="sidebar-detail-item">
                  <Clock className="icon-sm text-indigo-400 shrink-0" />
                  <div>
                    <strong>Working Hours:</strong>
                    <p className="text-xs text-slate-400">Monday – Saturday: 9:00 AM – 6:00 PM (GMT+6)</p>
                    <p className="text-xs text-rose-400/80">Sunday: Closed for maintenance</p>
                  </div>
                </div>

                <div className="sidebar-detail-item">
                  <MapPin className="icon-sm text-indigo-400 shrink-0" />
                  <div>
                    <strong>Headquarters Location:</strong>
                    <p className="text-xs text-slate-400">{adminSettings?.contact?.location || "608/1, Kazla, Rajshahi, Bangladesh"}</p>
                    <p className="text-xs text-slate-400">Serving global clients across USA, Europe, South Asia & Middle East</p>
                  </div>
                </div>

                <div className="sidebar-detail-item">
                  <ShieldCheck className="icon-sm text-emerald-400 shrink-0" />
                  <div>
                    <strong>Guaranteed Response SLA:</strong>
                    <p className="text-xs text-slate-400">24-hour turnaround on all service quote requests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick SaaS vs Service Reminder */}
            <div className="sidebar-info-card note-card">
              <h4>SaaS Pro Member?</h4>
              <p className="text-xs text-slate-300 mb-3">
                Need to link an app UID or check your remaining time on MindForge Arena & Eternora?
              </p>
              <a href="/account" className="btn-sidebar-account">
                <span>Go to User Dashboard →</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
