import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import logo from '../../logo.png';
import { useAuth } from '../context/AuthContext';
import { getAppsList, toPrivacySlug } from '../config/appsManager';

export default function Footer() {
  const { adminSettings } = useAuth();
  const [apps, setApps] = useState(() => getAppsList());
  const phone = adminSettings?.contact?.primaryPhone || "+880 1769-920324";
  const email = adminSettings?.contact?.primaryEmail || "asifhasan10122000@gmail.com";
  const waLink = adminSettings?.contact?.whatsappLink || "https://wa.me/8801769920324";
  const location = adminSettings?.contact?.location || "608/1, Kazla, Rajshahi, Bangladesh";
  const hours = adminSettings?.contact?.officeHours || "Monday - Saturday: 9:00 AM - 6:00 PM (GMT+6)";
  const regNo = adminSettings?.contact?.registrationNo || "ASI-TECH-2026-BD";

  useEffect(() => {
    const refreshApps = () => setApps(getAppsList());
    window.addEventListener('asivision_apps_updated', refreshApps);
    return () => window.removeEventListener('asivision_apps_updated', refreshApps);
  }, []);

  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Main 5-Column Grid */}
        <div className="footer-top-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-col-brand">
            <Link to="/" className="footer-brand-header">
              <img src={logo} alt="Asivision logo" className="footer-logo" />
              <span className="footer-brand-title">Asivision</span>
            </Link>
            <p className="footer-brand-desc">
              Asivision is a digital product studio & technology engineering firm helping creators and enterprises build scalable web & mobile apps, resolve Google Play Console challenges, launch targeted digital campaigns, and deploy intelligent IoT systems.
            </p>
            <div className="footer-badge-item">
              <ShieldCheck className="icon-xs text-emerald-400" />
              <span>Reg: {regNo}</span>
            </div>
            <p className="footer-disclaimer-text">
              All logos and product trademarks belong to their respective owners. Google Play is a trademark of Google LLC.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform Links</h4>
            <ul className="footer-link-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><a href="/#apps">Featured Mobile Apps</a></li>
              <li><a href="/#projects">Hardware & AI Projects</a></li>
              <li><a href="/#services">Specialized Services</a></li>
              <li><Link to="/pricing">Pro Access / Pricing</Link></li>
              <li><Link to="/support">Contact & Support</Link></li>
              <li><Link to="/account">User Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 3: SaaS Ecosystem (Pro Subscription) */}
          <div className="footer-col">
            <h4 className="footer-heading">SaaS Digital Products</h4>
            <span className="footer-subheading-tag">Unlocked via Universal Pro</span>
            <ul className="footer-link-list">
              <li><a href="https://play.google.com/store/apps/details?id=com.devstudio.iqpro" target="_blank" rel="noreferrer">MindForge Arena Pro ↗</a></li>
              <li><a href="https://play.google.com/apps/testing/com.Eternora.app" target="_blank" rel="noreferrer">Eternora Life Simulator ↗</a></li>
              <li><a href="https://play.google.com/apps/internaltest/4700986813283107782" target="_blank" rel="noreferrer">Taka Jachai AI Vision ↗</a></li>
              <li><Link to="/pricing">AI Automation Agents (Beta)</Link></li>
              <li><Link to="/pricing">Multi-App Cloud Sync</Link></li>
            </ul>
          </div>

          {/* Col 4: Custom Services (Payoneer Invoicing) */}
          <div className="footer-col">
            <h4 className="footer-heading">Professional Services</h4>
            <span className="footer-subheading-tag">Billed via Payoneer</span>
            <ul className="footer-link-list">
              <li><Link to="/support" state={{ preselectedService: "Google Play Console Support & Consultancy" }}>Google Play Console Help</Link></li>
              <li><Link to="/support" state={{ preselectedService: "Google Play Console Support & Consultancy" }}>20-Tester Closed Testing</Link></li>
              <li><Link to="/support" state={{ preselectedService: "Digital Marketing & Online Business Growth" }}>Targeted Google & Meta Ads</Link></li>
              <li><Link to="/support" state={{ preselectedService: "Website & Mobile App Development" }}>Custom Web & Mobile Apps</Link></li>
              <li><Link to="/support" state={{ preselectedService: "Custom IT, Cloud, Hardware & IoT Engineering" }}>MATLAB DSP & IoT Systems</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact & Office Hours */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-heading">Direct Contact & Hours</h4>
            <div className="footer-contact-block">
              <div className="footer-contact-row">
                <Clock className="icon-xs text-indigo-400 shrink-0" />
                <span>{hours}</span>
              </div>
              <div className="footer-contact-row">
                <MapPin className="icon-xs text-indigo-400 shrink-0" />
                <span>{location}</span>
              </div>
              <div className="footer-contact-row">
                <Phone className="icon-xs text-emerald-400 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
              </div>
              <div className="footer-contact-row">
                <MessageCircle className="icon-xs text-emerald-400 shrink-0" />
                <a href={waLink} target="_blank" rel="noreferrer">WhatsApp Chat</a>
              </div>
              <div className="footer-contact-row">
                <Mail className="icon-xs text-indigo-400 shrink-0" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Asivision Studio. Engineering solutions with purpose & precision.
          </div>

          <div className="footer-legal-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/refund">Refund Policy</Link>
            {apps.map((app) => (
              <Link key={app.id} to={`/privacy/${toPrivacySlug(app.id)}`}>{app.name} Privacy</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
