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

// Open Source GitHub Projects Data
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
      '/assets/projects/voice_sec_1.png',
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
      '/assets/projects/heart_mon_1.png',
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
      '/assets/projects/rescue_drone_1.png',
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
      '/assets/projects/sweepbot_1.jpg',
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
      '/assets/projects/brooding_1.jpg',
      '/assets/projects/brooding_2.jpg',
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

// Horizontal Mobile Apps Carousel Component
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

        {/* Carousel Sliding Viewport */}
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

// Workstation Preview Slider Component for Engineering & Hardware Projects
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

// Horizontal Project Carousel Component
function ProjectsHorizontalSection({ onOpenLightbox }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'

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

        {/* View Control */}
        <div className="project-view-controls">
          <div className="view-toggle-btns">
            <button
              className={`view-toggle-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              title="Horizontal Sliding Carousel View"
            >
              ↔ Sliding Carousel
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
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

          {/* Carousel Sliding Viewport */}
          <div className="horizontal-slider-viewport">
            <div
              className="horizontal-slider-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {githubProjectsData.map((project) => (
                <div key={project.id} className="project-slide-card">
                  <div className="project-slide-grid">
                    {/* Left Column: Info */}
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
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-github"
                        >
                          <svg className="github-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>GitHub Repository</span>
                          <span className="arrow-icon">↗</span>
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Workstation Screen Preview */}
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
        /* Grid Fallback Mode */
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
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-github btn-block"
                >
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
          <a href="#projects">Projects</a>
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
              Asivision crafts state-of-the-art mobile apps, computer vision tools, autonomous robotics, and brain gaming platforms with sleek UX, robust architecture, and growth-focused execution.
            </p>
            <div className="hero-actions">
              <a href="#apps" className="btn btn-primary">
                <span>Explore Featured Apps</span>
                <span>→</span>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <span>Open-Source Repos</span>
              </a>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Mobile Apps</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Hardware & AI Repos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Precision Engineering</span>
              </div>
            </div>
          </div>

          <div className="hero-card reveal reveal-delay-1">
            <div className="hero-glass-card">
              <img src="/assets/stock/hero_stock.jpg" alt="Tech Product Studio Visual" className="hero-stock-preview" />
              <p className="eyebrow">Active Ecosystem</p>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '4px 0 12px' }}>
                Engineered for Impact Across Mobile, Web & Robotics
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '16px' }}>
                Delivering high-performance solutions in finance, intelligence testing, computer vision, and IoT automation.
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

        {/* Featured Mobile Applications (Horizontal Sliding Carousel) */}
        <AppsHorizontalSection onOpenLightbox={(imgSrc) => setLightboxImg(imgSrc)} />

        {/* Open Source Hardware, IoT & AI Research Projects (Horizontal Sliding Carousel) */}
        <ProjectsHorizontalSection onOpenLightbox={(imgSrc) => setLightboxImg(imgSrc)} />


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

