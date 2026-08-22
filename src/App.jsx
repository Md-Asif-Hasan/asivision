import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../logo.png';

// Shared components
import Navbar from './components/Navbar';
import ServicesSection from './components/ServicesSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

// New pages
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import SupportPage from './pages/SupportPage';
import AdminPage from './pages/AdminPage';
import TermsPage from './pages/TermsPage';
import RefundPage from './pages/RefundPage';
import AppPrivacyPage from './pages/AppPrivacyPage';

// Auth context
import { AuthProvider, useAuth } from './context/AuthContext';

// ─── DATA ───────────────────────────────────────────────────────────────────

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
    ],
  },
];

const githubProjectsData = [
  {
    id: 'voice-recognition-security',
    name: 'Voice Recognition System for Home Security',
    subtitle: 'MATLAB Speech Authentication & Biometric Access Control',
    category: 'MATLAB • Signal Processing & Biometrics',
    icon: '🎙️',
    description: 'Implemented a MATLAB-based voice recognition system for home security applications, enabling access control through speech authentication. Utilizes digital signal processing (DSP), acoustic feature extraction (MFCC), and spectral pattern matching to verify authorized user voice signatures with high precision.',
    url: 'https://github.com/Md-Asif-Hasan/Voice-Recognition-System-for-Home-Security-Project',
    badge: 'MATLAB • Security & Speech DSP',
    techStack: ['MATLAB', 'Signal Processing', 'MFCC', 'Biometric Security', 'Speech Authentication'],
    features: [
      'Speech signal feature extraction & frequency analysis',
      'Real-time acoustic pattern matching & confidence scoring',
      'Automated smart lock access control interface',
      'Noise-suppression pre-processing algorithms'
    ],
    previews: [
      '/assets/projects/voice recognition security system.png',
      '/assets/projects/voice_sec_2.png',
    ],
  },
  {
    id: 'heart-beat-monitoring',
    name: 'Heart-Beat Monitoring & Alarm System',
    subtitle: 'MATLAB ECG Signal Processing & Baseline Deviation Alerts',
    category: 'MATLAB • Biomedical & Health Tech',
    icon: '❤️',
    description: 'Developed a MATLAB-based system that monitors heart rate and signals deviations from baseline levels. Designed for integration with wearable health devices to provide real-time automated alerts upon detecting abnormal BPM fluctuations or potential cardiac arrhythmia.',
    url: 'https://github.com/Md-Asif-Hasan/Heart-Beat-monitoring-interface-and-alarm-system-for-health-issues',
    badge: 'MATLAB • Health Tech & Wearables',
    techStack: ['MATLAB', 'Biomedical DSP', 'ECG Analysis', 'Wearable Tech', 'Health Alerts'],
    features: [
      'Automated baseline thresholding & peak detection',
      'Instant alert triggering on arrhythmia & BPM anomalies',
      'Wearable telemetry sensor signal processing',
      'Interactive health monitoring graphical dashboard'
    ],
    previews: [
      '/assets/projects/ECG monitor system.png',
      '/assets/projects/heart_mon_2.png',
    ],
  },
  {
    id: 'autonomous-rescue-drone',
    name: 'Autonomous Rescue Drone System',
    subtitle: 'AI Computer Vision & Emergency Search-and-Rescue Navigation',
    category: 'Python • Computer Vision & Autonomous Systems',
    icon: '🛸',
    description: 'An autonomous drone system designed to navigate indoor environments and detect trapped or immobilized humans using computer vision and onboard sensor fusion, supporting emergency disaster response and search-and-rescue operations.',
    url: 'https://github.com/Md-Asif-Hasan/Autonomous-Rescue-Drone-',
    badge: 'Python • Autonomous AI & Robotics',
    techStack: ['Python', 'OpenCV', 'Computer Vision', 'Robotics', 'LiDAR & Sensors'],
    features: [
      'Indoor GPS-denied autonomous waypoint navigation',
      'Human detection algorithm using thermal & optical AI',
      'Real-time sensor telemetry streaming & mapping',
      'Collision avoidance with ultrasonic & sensor arrays'
    ],
    previews: [
      '/assets/projects/autonomous drone.png',
      '/assets/projects/rescue_drone_2.png',
    ],
  },
  {
    id: 'sweepbot-floor-cleaner',
    name: 'SweepBot Automated Floor Cleaner Robot',
    subtitle: 'Obstacle-Avoiding Mopping Robot with Liquid Dispenser',
    category: 'C++ • Embedded Systems & Robotics',
    icon: '🤖',
    description: 'SweepBot is a low-cost student robot that navigates to a designated target, wets the floor using an onboard DC liquid pump, and mops using an L298N-driven motor. Features an ultrasonic interlock safety mechanism and optional SG90 servo control.',
    url: 'https://github.com/Md-Asif-Hasan/SweepBot-Automated-Floor-Cleaner-Robot-Project-',
    badge: 'C++ • Hardware & Autonomous Robotics',
    techStack: ['C++', 'Arduino', 'L298N H-Bridge', 'HC-SR04 Ultrasonic', 'DC Water Pump'],
    features: [
      'Ultrasonic distance interlock for instant collision prevention',
      'L298N dual H-bridge motor speed & direction control',
      'Automated DC water pump fluid dispensing system',
      'Modular chassis design with servo-activated mopping mechanism'
    ],
    previews: [
      '/assets/projects/sweep bot.png',
      '/assets/projects/sweepbot_2.jpg',
    ],
  },
  {
    id: 'smart-iot-chicken-brooding',
    name: 'Smart IoT Chicken Brooding System',
    subtitle: 'Arduino Cloud Microcontroller Environment Optimization',
    category: 'C++ • IoT & Smart Agriculture',
    icon: '🐔',
    description: 'Designed and programmed an IoT-based automated chicken brooding system using Arduino Cloud, optimizing environmental climate conditions (temperature, heating, humidity) for poultry farming and young chick incubation.',
    url: 'https://github.com/Md-Asif-Hasan/Smart-IoT-based-Chicken-Brooding-system',
    badge: 'C++ • IoT & Smart AgTech',
    techStack: ['C++', 'Arduino Cloud', 'ESP32/ESP8266', 'DHT Sensors', 'Relays'],
    features: [
      'Real-time temperature & humidity monitoring via Arduino Cloud',
      'Automated heat lamp relay switching based on thermal targets',
      'Remote alert notification system for environmental anomalies',
      'Energy-efficient climate control for optimized chick growth'
    ],
    previews: [
      '/assets/projects/chicken brooding system.png',
      '/assets/projects/brooding_2.jpg',
    ],
  },
];

// ─── PRESERVED SLIDER COMPONENTS ─────────────────────────────────────────────

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

function AppsHorizontalSection({ onOpenLightbox }) {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveAppIndex((prev) => (prev + 1) % appsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handlePrev = () => {
    setActiveAppIndex((prev) => (prev - 1 + appsData.length) % appsData.length);
  };

  const handleNext = () => {
    setActiveAppIndex((prev) => (prev + 1) % appsData.length);
  };

  return (
    <section id="apps" className="section">
      <div className="section-heading reveal">
        <p className="eyebrow">Project Portfolio</p>
        <h2>Featured Mobile Applications</h2>
        <p className="section-subtitle">
          Scan through live previews, core functionality, and mobile interface design of our flagships.
        </p>
      </div>

      <div className="horizontal-slider-wrapper reveal">
        <div className="horizontal-slider-header">
          <div className="slider-counter-badge">
            <span className="counter-current">0{activeAppIndex + 1}</span>
            <span className="counter-divider">/</span>
            <span className="counter-total">0{appsData.length}</span>
          </div>
          <div className="slider-main-actions">
            <button
              className={`autoplay-toggle-btn ${isAutoPlay ? 'active' : ''}`}
              onClick={() => setIsAutoPlay(!isAutoPlay)}
            >
              {isAutoPlay ? '⏸ Pause Auto-Slide' : '▶ Play Auto-Slide'}
            </button>
            <div className="slider-arrow-group">
              <button className="slider-nav-arrow" onClick={handlePrev} aria-label="Previous application">‹</button>
              <button className="slider-nav-arrow" onClick={handleNext} aria-label="Next application">›</button>
            </div>
          </div>
        </div>

        <div className="horizontal-slider-viewport">
          <div
            className="horizontal-slider-track"
            style={{ transform: `translateX(-${activeAppIndex * 100}%)` }}
          >
            {appsData.map((app) => (
              <div key={app.id} className="project-slide-card">
                <div className="project-slide-grid">
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
                      <a href={app.url} target="_blank" rel="noreferrer" className="app-action-btn">
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
                      onOpenLightbox={onOpenLightbox}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkstationSlider({ previews, projectName, onOpenLightbox }) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!previews || previews.length <= 1) return;
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % previews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [previews]);

  const prevImage = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + previews.length) % previews.length);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % previews.length);
  };

  return (
    <div className="workstation-mockup-frame">
      <div className="workstation-title-bar">
        <div className="window-dots">
          <span className="dot-red" />
          <span className="dot-yellow" />
          <span className="dot-green" />
        </div>
        <div className="window-title">{projectName}</div>
        <span className="window-badge">Interactive Preview</span>
      </div>
      <div
        className="workstation-screen"
        onClick={() => onOpenLightbox(previews[imgIndex])}
        title="Click to view full resolution image"
      >
        {previews.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${projectName} preview ${i + 1}`}
            className={`workstation-slide-img ${i === imgIndex ? 'active' : ''}`}
            loading="lazy"
          />
        ))}
        <div className="workstation-overlay-zoom">🔍 Click to Expand</div>
      </div>
      {previews.length > 1 && (
        <div className="workstation-controls">
          <button className="slider-btn" onClick={prevImage} aria-label="Previous preview">‹</button>
          <div className="slider-dots">
            {previews.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${idx === imgIndex ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setImgIndex(idx); }}
              />
            ))}
          </div>
          <button className="slider-btn" onClick={nextImage} aria-label="Next preview">›</button>
        </div>
      )}
    </div>
  );
}

function ProjectsHorizontalSection({ onOpenLightbox }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState('carousel');

  useEffect(() => {
    if (!isAutoPlay || viewMode !== 'carousel') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % githubProjectsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, viewMode]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + githubProjectsData.length) % githubProjectsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % githubProjectsData.length);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading reveal">
        <p className="eyebrow">🔬 Hardware, IoT & AI Research</p>
        <h2>Engineering & Intelligent Systems</h2>
        <p className="section-subtitle">
          Explore open-source MATLAB speech & health tools, autonomous robotics, computer vision rescue drones, and IoT agricultural systems.
        </p>
        <div className="project-view-controls">
          <div className="view-toggle-btns">
            <button
              className={`view-toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
            >
              ↔ Sliding Carousel
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid View
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'carousel' ? (
        <div className="horizontal-slider-wrapper reveal">
          <div className="horizontal-slider-header">
            <div className="slider-counter-badge">
              <span className="counter-current">0{activeIndex + 1}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">0{githubProjectsData.length}</span>
            </div>
            <div className="slider-main-actions">
              <button
                className={`autoplay-toggle-btn ${isAutoPlay ? 'active' : ''}`}
                onClick={() => setIsAutoPlay(!isAutoPlay)}
              >
                {isAutoPlay ? '⏸ Pause Auto-Slide' : '▶ Play Auto-Slide'}
              </button>
              <div className="slider-arrow-group">
                <button className="slider-nav-arrow" onClick={handlePrev} aria-label="Previous project">‹</button>
                <button className="slider-nav-arrow" onClick={handleNext} aria-label="Next project">›</button>
              </div>
            </div>
          </div>

          <div className="horizontal-slider-viewport">
            <div
              className="horizontal-slider-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {githubProjectsData.map((project) => (
                <div key={project.id} className="project-slide-card">
                  <div className="project-slide-grid">
                    <div className="project-slide-info">
                      <div className="app-badge-pill project-badge-pill">{project.category}</div>
                      <div className="project-title-header">
                        <div>
                          <h3>{project.name}</h3>
                          <p className="project-subtitle">{project.subtitle}</p>
                        </div>
                      </div>
                      <p className="project-description-text">{project.description}</p>
                      <div className="tech-stack-row">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="tech-tag-pill">{tech}</span>
                        ))}
                      </div>
                      <div className="project-features-list">
                        <h4>Key Technical Highlights:</h4>
                        <ul>
                          {project.features.map((feat, fIdx) => (
                            <li key={fIdx}>
                              <span className="feature-check">✓</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="project-action-row">
                        <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-github">
                          <svg className="github-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>GitHub Repository</span>
                          <span className="arrow-icon">↗</span>
                        </a>
                      </div>
                    </div>
                    <div className="project-slide-preview">
                      <WorkstationSlider
                        previews={project.previews}
                        projectName={project.name}
                        onOpenLightbox={onOpenLightbox}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="projects-grid-container reveal">
          {githubProjectsData.map((project) => (
            <div key={project.id} className="project-grid-card">
              <div className="project-grid-preview-box" onClick={() => onOpenLightbox(project.previews[0])}>
                <img src={project.previews[0]} alt={project.name} className="project-grid-img" />
                <div className="grid-overlay-tag">{project.badge}</div>
              </div>
              <div className="project-grid-content">
                <div className="project-title-header">
                  <h3>{project.name}</h3>
                </div>
                <p className="project-description-text">{project.description}</p>
                <div className="tech-stack-row">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag-pill">{tech}</span>
                  ))}
                </div>
                <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-github btn-block">
                  <svg className="github-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── MAIN LANDING PAGE ────────────────────────────────────────────────────────

function LandingPage() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell-full">
      {/* Background Ambient Effects */}
      <div className="bg-ambient">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      <Navbar />

      <div className="page-shell">
        <main id="home">
          {/* ── HERO SECTION ── */}
          <section className="hero">
            <div className="hero-copy reveal">
              <div className="badge-pill-gradient">⚡ Digital Product Studio & SaaS Ecosystem</div>
              <h1>We Build & Scale Digital Experiences That Matter.</h1>
              <p className="hero-text">
                Asivision crafts high-performance mobile apps, computer vision tools, autonomous robotics, and brain gaming platforms — plus Google Play Console expertise, targeted digital marketing, and enterprise custom IT & IoT solutions.
              </p>
              <div className="hero-actions">
                <a href="#apps" className="btn btn-primary">
                  <span>Explore Featured Apps</span>
                  <span>→</span>
                </a>
                <Link to="/pricing" onClick={handleProClick} className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}>
                  <span>⚡ Get Pro Access</span>
                </Link>
                <a href="#services" className="btn btn-secondary">
                  <span>Our Services</span>
                </a>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">Live Mobile Apps</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Hardware & AI Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Specialized Services</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Engineering Precision</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="hero-visual-card reveal reveal-delay-1">
              <img
                src="/assets/services/hero-image-1.png"
                alt="Asivision Digital Product Studio"
                className="hero-featured-image"
                onError={(e) => {
                  e.target.src = '/assets/stock/hero_stock.jpg';
                }}
              />
              <div className="hero-visual-content">
                <h3>Engineering Innovation Across Mobile, Web & Robotics</h3>
                <p>Delivering high-performance solutions in AI vision, cognitive gaming, IoT automation, and digital growth.</p>
                <div className="hero-apps-pill-row">
                  {appsData.map((app) => (
                    <div key={app.id} className="hero-app-mini-pill">
                      <img src={app.logo} alt={app.name} />
                      <span>{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── FEATURED MOBILE APPS (Preserved Horizontal Slider) ── */}
          <AppsHorizontalSection onOpenLightbox={(imgSrc) => setLightboxImg(imgSrc)} />

          {/* ── ENGINEERING & AI PROJECTS (Preserved Horizontal Slider) ── */}
          <ProjectsHorizontalSection onOpenLightbox={(imgSrc) => setLightboxImg(imgSrc)} />

          {/* ── SERVICES SECTION (InventDiv-style) ── */}
          <ServicesSection />

          {/* ── CTA BANNER ── */}
          <CtaBanner />
        </main>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>×</button>
            <img src={lightboxImg} alt="Expanded preview" className="lightbox-image" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// ─── APP ROUTER ───────────────────────────────────────────────────────────────

function ScrollToTopAndReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const revealAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('active');
      });
    };

    // First pass: after paint (rAF ensures DOM is fully flushed to layout)
    const raf = requestAnimationFrame(revealAll);
    // Second pass: catches elements from conditionally-rendered/auth-gated components
    const timer = setTimeout(revealAll, 200);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.05 }
    );

    // Observe after rAF so newly-mounted elements are included
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTopAndReveal />
        <Routes>
          {/* Main Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Pricing & Pro Access (Paywall Integration) */}
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pro" element={<PricingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />

          {/* User Account Dashboard */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/dashboard" element={<AccountPage />} />

          {/* Contact & Support */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/contact" element={<SupportPage />} />

          {/* Admin Portal */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Legal Pages */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />

          {/* App Privacy Policies — all apps (static or dynamically created in /admin) use the modern AppPrivacyPage */}
          <Route path="/privacy/taka-jachai" element={<AppPrivacyPage defaultId="taka_jachai" />} />
          <Route path="/privacy/iq-test" element={<AppPrivacyPage defaultId="mindforge_arena" />} />
          <Route path="/privacy/mindforge_arena" element={<AppPrivacyPage defaultId="mindforge_arena" />} />
          <Route path="/privacy/eternora" element={<AppPrivacyPage defaultId="eternora" />} />
          <Route path="/privacy/:appId" element={<AppPrivacyPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
