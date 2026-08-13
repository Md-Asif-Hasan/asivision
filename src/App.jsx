import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../logo.png';
import TakaJachaiPrivacy from './pages/TakaJachaiPrivacy';
import IqTestPrivacy from './pages/IqTestPrivacy';
import EternoraPrivacy from './pages/EternoraPrivacy';

// Project Showcase Data
const appsData = [
  {
    id: 'taka-jachai',
    name: 'TAKA JACHAI',
    type: 'Counterfeit Money Checking & Business Management',
    logo: '/assets/logos/taka_jachai.png',
    stockBanner: '/assets/stock/vision_stock.jpg',
    stockTag: '⚡ AI Vision & Fraud Detection System',
    url: 'https://play.google.com/apps/internaltest/4700986813283107782',
    privacyUrl: '/privacy/taka-jachai',
    description: 'A cutting-edge solution for Bangladeshi banknote authentication powered by computer vision. Features automated counterfeit detection, smart expense management, invoice generation, and predictive financial forecasting.',
    badge: 'Tools • Finance & Commerce',
    previews: [
      '/assets/previews/taka_jachai/t1.webp',
      '/assets/previews/taka_jachai/t2.webp',
      '/assets/previews/taka_jachai/t3.webp',
      '/assets/previews/taka_jachai/t4.webp',
    ],
  },
  {
    id: 'iq-test',
    name: 'MindForge Arena',
    type: 'IQ Mind Games & Brain Training',
    logo: '/assets/logos/iq_test.png',
    stockBanner: '/assets/stock/brain_stock.jpg',
    stockTag: '🧠 Neural Cognitive Esports Arena',
    url: 'https://play.google.com/store/apps/details?id=com.devstudio.iqpro&pli=1',
    privacyUrl: '/privacy/iq-test',
    description: 'A comprehensive cognitive training platform featuring multi-dimensional IQ testing, real-time multiplayer Line Wars battles, daily mental agility challenges, and detailed analytical skill performance breakdowns.',
    badge: 'B2C • Brain Training & Gaming',
    previews: [
      '/assets/previews/iq_test/m1.webp',
      '/assets/previews/iq_test/m2.webp',
      '/assets/previews/iq_test/m3.webp',
      '/assets/previews/iq_test/m4.webp',
      '/assets/previews/iq_test/m5.webp',
      '/assets/previews/iq_test/m6.webp',
      '/assets/previews/iq_test/m7.webp',
    ],
  },
  {
    id: 'eternora',
    name: 'Eternora',
    type: 'Life Simulation Experience',
    logo: '/assets/logos/eternora.png',
    stockBanner: '/assets/stock/eternora_stock.jpg',
    stockTag: '🌐 Metaverse Life Simulation & Legacy World',
    url: 'https://play.google.com/apps/testing/com.Eternora.app',
    privacyUrl: '/privacy/eternora',
    description: 'An open-source life simulator where player choices sculpt decades of family legacy, relationships, careers, and personal growth. Built with high-fidelity world-building and real-time community challenges.',
    badge: 'Simulation • Mobile App',
    previews: [
      '/assets/previews/eternora/Generated Image July 24, 2026 - 11_11AM.png',
      '/assets/previews/eternora/Generated Image July 24, 2026 - 11_32AM.png',
      '/assets/previews/eternora/Generated Image July 24, 2026 - 11_33AM.png',
      '/assets/previews/eternora/Generated Image July 24, 2026 - 11_34AM.png',
      '/assets/previews/eternora/Generated Image July 24, 2026 - 11_35AM.png',
    ],
  },
];

const services = [
  {
    title: 'Product Strategy & Vision',
    icon: '🎯',
    text: 'We define product positioning, target market strategies, and intuitive user journeys for mobile and web applications.',
  },
  {
    title: 'Full-Stack Mobile & Web',
    icon: '⚡',
    text: 'From scalable React/Vite web apps to high-performance cross-platform Android mobile applications with modern UX.',
  },
  {
    title: 'Computer Vision & AI Integration',
    icon: '🧠',
    text: 'Integrating machine learning models, image classification, real-time object detection, and smart predictive analytics.',
  },
];

// Smartphone Preview Slider Component
function PhoneSlider({ previews, appName, onOpenLightbox }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!previews || previews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % previews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [previews]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + previews.length) % previews.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % previews.length);
  };

  return (
    <div className="phone-mockup-wrapper">
      <div className="phone-mockup-frame">
        <div className="phone-notch" />
        <div className="phone-screen" onClick={() => onOpenLightbox(previews[currentIndex])} title="Click to expand full resolution preview">
          {previews.map((imgSrc, idx) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt={`${appName} preview ${idx + 1}`}
              className={`slide-image ${idx === currentIndex ? 'active' : ''}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
      {previews.length > 1 && (
        <div className="slider-controls">
          <button className="slider-btn" onClick={handlePrev} aria-label="Previous image">‹</button>
          <div className="slider-dots">
            {previews.slice(0, 7).map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === (currentIndex % 7) ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
          <button className="slider-btn" onClick={handleNext} aria-label="Next image">›</button>
        </div>
      )}
    </div>
  );
}

// Main Landing Page Component
function LandingPage() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('asifhasan10122000@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="page-shell">
      {/* Background Ambient Effects */}
      <div className="bg-ambient">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      {/* Header Topbar Navigation */}
      <header className="topbar">
        <Link to="/" className="brand">
          <img src={logo} alt="Asivision logo" className="brand-logo" />
          <span>Asivision</span>
        </Link>
        <nav className="nav-links">
          <a href="#apps">Apps</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-btn">Contact Us</a>
        </nav>
      </header>

      <main id="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">Creative Product Studio</p>
            <h1>We build & scale digital experiences that matter.</h1>
            <p className="hero-text">
              Asivision crafts state-of-the-art mobile apps, computer vision tools, and brain gaming platforms with sleek UX, robust architecture, and growth-focused execution.
            </p>
            <div className="hero-actions">
              <a href="#apps" className="btn btn-primary">
                <span>Explore Featured Apps</span>
                <span>→</span>
              </a>
              <a href="#contact" className="btn btn-secondary">Get in Touch</a>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Major Mobile Apps</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">User-Centric Design</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Satisfaction Score</span>
              </div>
            </div>
          </div>

          <div className="hero-card reveal reveal-delay-1">
            <div className="hero-glass-card">
              <img src="/assets/stock/hero_stock.jpg" alt="Tech Product Studio Visual" className="hero-stock-preview" />
              <p className="eyebrow">Active Ecosystem</p>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '4px 0 12px' }}>
                Engineered for Impact Across Mobile & Web
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '16px' }}>
                Delivering high-performance applications in finance, intelligence testing, and life simulation.
              </p>

              <div className="hero-apps-row">
                {appsData.map((app) => (
                  <div key={app.id} className="hero-app-badge-item" title={app.name}>
                    <img src={app.logo} alt={app.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Apps Showcase Section */}
        <section id="apps" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Project Portfolio</p>
            <h2>Featured Mobile Applications</h2>
            <p className="section-subtitle">
              Scan through live previews, core functionality, and mobile interface design of our flagships.
            </p>
          </div>

          <div className="app-showcase-container">
            {appsData.map((app, index) => (
              <div
                key={app.id}
                className={`app-display-card reveal ${index % 2 !== 0 ? 'reverse' : ''}`}
              >
                <div className="app-info-side">
                  {app.stockBanner && (
                    <div className="stock-feature-banner">
                      <img src={app.stockBanner} alt={`${app.name} visual`} />
                      <div className="stock-banner-overlay">
                        <span className="stock-badge-tag">{app.stockTag}</span>
                      </div>
                    </div>
                  )}

                  <div className="app-badge-pill">{app.badge}</div>
                  <div className="app-header-flex">
                    <img src={app.logo} alt={`${app.name} logo`} className="app-logo-large" />
                    <div className="app-title-group">
                      <h3>{app.name}</h3>
                      <p className="app-type-tag">{app.type}</p>
                    </div>
                  </div>
                  <p className="app-description">{app.description}</p>
                  <div className="app-action-row">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="app-action-btn"
                    >
                      <span>Google Play Store</span>
                      <span>↗</span>
                    </a>
                    <Link to={app.privacyUrl} className="app-action-btn privacy-action-btn">
                      <span>Privacy Policy</span>
                    </Link>
                  </div>
                </div>

                <div className="app-preview-side">
                  <PhoneSlider
                    previews={app.previews}
                    appName={app.name}
                    onOpenLightbox={(imgSrc) => setLightboxImg(imgSrc)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Services & Capabilities Section */}
        <section id="services" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Core Capabilities</p>
            <h2>What We Bring to the Table</h2>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <div key={service.title} className={`service-card reveal reveal-delay-${(index % 3) + 1}`}>
                <div className="card-icon-box">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Why Asivision</p>
            <h2>Quality Engineering Meets Purposeful Design</h2>
          </div>

          <div className="about-grid">
            <div className="about-card reveal reveal-delay-1">
              <h3>Precision Engineering</h3>
              <p>Clean architecture, resilient backend APIs, and responsive mobile interfaces crafted with performance in mind.</p>
            </div>
            <div className="about-card reveal reveal-delay-2">
              <h3>User-First Innovation</h3>
              <p>Every micro-interaction and workflow is tested to provide maximum clarity, speed, and user delight.</p>
            </div>
            <div className="about-card reveal reveal-delay-3">
              <h3>Growth & Scalability</h3>
              <p>Built from ground up for reliable scaling, seamless updates, and sustainable product momentum.</p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="contact-section section">
          <div className="section-heading reveal">
            <p className="eyebrow">Get in Touch</p>
            <h2>Let's Connect & Collaborate</h2>
            <p className="section-subtitle">
              Have questions, feedback, or partnership ideas? Reach out to us directly via email or phone.
            </p>
          </div>

          <div className="contact-card-grid">
            <div className="contact-item-card reveal reveal-delay-1">
              <div className="contact-icon-wrapper">✉</div>
              <h3>Email Us</h3>
              <p className="contact-detail">asifhasan10122000@gmail.com</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="mailto:asifhasan10122000@gmail.com" className="btn btn-primary">
                  Send Email
                </a>
                <button onClick={handleCopyEmail} className="btn btn-secondary">
                  {copiedEmail ? 'Copied! ✓' : 'Copy Address'}
                </button>
              </div>
            </div>

            <div className="contact-item-card reveal reveal-delay-2">
              <div className="contact-icon-wrapper">📞</div>
              <h3>Direct Phone & WhatsApp</h3>
              <p className="contact-detail">+880 1769-920324</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="tel:+8801769920324" className="btn btn-primary">
                  Call Now
                </a>
                <a href="https://wa.me/8801769920324" target="_blank" rel="noreferrer" className="btn btn-secondary">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>×</button>
            <img src={lightboxImg} alt="Expanded preview" className="lightbox-image" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Asivision Studio. Crafting apps with purpose & precision.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/privacy/taka-jachai" className="footer-link">Taka Jachai Privacy</Link>
          <Link to="/privacy/iq-test" className="footer-link">IQ Test Privacy</Link>
          <Link to="/privacy/eternora" className="footer-link">Eternora Privacy</Link>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy/taka-jachai" element={<TakaJachaiPrivacy />} />
        <Route path="/privacy/iq-test" element={<IqTestPrivacy />} />
        <Route path="/privacy/eternora" element={<EternoraPrivacy />} />
      </Routes>
    </Router>
  );
}

export default App;

