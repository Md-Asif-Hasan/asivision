const apps = [
  {
    name: 'MindForge Arena',
    type: 'IQ Mind Games',
    url: 'https://play.google.com/store/apps/details?id=com.devstudio.iqpro&pli=1',
    description: 'A clever puzzle and strategy experience designed for daily brain training and social competition.',
    badge: 'B2C • Mobile',
  },
  {
    name: 'TAKAJACHAI',
    type: 'Counterfeit money checking & business management',
    url: 'https://play.google.com/apps/internaltest/4700986813283107782',
    description: 'A powerful app for counterfeit detection and business operations, built for trusted everyday use.',
    badge: 'Tools • Finance',
  },
  {
    name: 'Eternora',
    type: 'Life Simulation',
    url: 'https://play.google.com/apps/testing/com.issb.iqtest',
    description: 'An upcoming life simulation experience focused on immersive world-building and personal growth.',
    badge: 'Simulation • Upcoming',
  },
  {
    name: 'VisionPilot',
    type: 'Productivity Suite',
    description: 'A smart workspace toolkit that helps teams capture ideas, automate routines, and ship faster.',
    badge: 'B2B • SaaS',
  },
];

const services = [
  {
    title: 'Product Strategy',
    text: 'We define the vision, roadmap, and positioning behind apps that users instantly understand and love.',
  },
  {
    title: 'Design & Development',
    text: 'From idea to launch, our team creates polished web and mobile experiences with premium UX.',
  },
  {
    title: 'Growth & Marketing',
    text: 'We help your app reach the right audience through launch campaigns, creative storytelling, and analytics.',
  },
];

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <a href="#home" className="brand">
          <span className="brand-mark">A</span>
          <span>Asivision</span>
        </a>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#apps">Apps</a>
          <a href="#services">Services</a>
          <a href="#privacy-policy">Privacy</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Creative product studio</p>
            <h1>We build, sell, and market apps that shape the next wave of digital experiences.</h1>
            <p className="hero-text">
              Asivision blends strategy, design, and growth to launch products that feel beautiful, perform brilliantly, and scale confidently.
            </p>
            <div className="hero-actions">
              <a href="#apps" className="btn btn-primary">Explore our apps</a>
              <a href="#privacy-policy" className="btn btn-secondary">View privacy policy</a>
            </div>
            <div className="stats-grid">
              <div>
                <strong>15+</strong>
                <span>products launched</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>user delight score</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>growth-minded execution</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="card-panel">
              <p className="card-tag">Launch-ready</p>
              <h3>From first click to global growth.</h3>
              <ul>
                <li>Mobile and web app development</li>
                <li>Conversion-focused marketing</li>
                <li>Scalable product operations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <p className="eyebrow">Why Asivision</p>
            <h2>Bold ideas need sharper execution.</h2>
          </div>
          <div className="about-grid">
            <article>
              <h3>Visionary thinking</h3>
              <p>We translate ambitious concepts into clear product directions that resonate with audiences and stakeholders.</p>
            </article>
            <article>
              <h3>Modern craft</h3>
              <p>Fast, elegant interfaces and reliable systems are built with performance, accessibility, and delight in mind.</p>
            </article>
            <article>
              <h3>Market-ready growth</h3>
              <p>Every launch is shaped to attract users, increase retention, and support long-term business momentum.</p>
            </article>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Everything you need to turn an app into an experience people remember.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="apps" className="section">
          <div className="section-heading">
            <p className="eyebrow">Featured apps</p>
            <h2>Built for impact across entertainment, culture, and productivity.</h2>
          </div>
          <div className="app-grid">
            {apps.map((app) => (
              <article key={app.name} className="app-card">
                <p className="app-badge">{app.badge}</p>
                <h3>{app.name}</h3>
                <p className="app-type">{app.type}</p>
                <p>{app.description}</p>
                {app.url && (
                  <a href={app.url} target="_blank" rel="noreferrer" className="app-link">
                    View on Google Play
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="privacy-policy" className="section policy-section">
          <div className="section-heading">
            <p className="eyebrow">Privacy policy</p>
            <h2>Asivision values your privacy and your trust.</h2>
          </div>
          <div className="policy-card">
            <p><strong>Last updated:</strong> June 27, 2026</p>
            <p>
              Asivision retains all proprietary rights and intellectual property interests in its applications, software, and related products, including MindForge Arena: IQ Mind Games, TAKAJACHAI, and other proprietary solutions developed by Asivision. All trademarks referenced herein remain the property of their respective owners.
            </p>
            <h3>1. Information we collect</h3>
            <p>We may collect account details, contact information, payment details handled by secure processors, profile preferences, device information, usage analytics, log data, and approximate location data where permitted.</p>
            <h3>2. How we use your information</h3>
            <p>We use your information to provide services, manage accounts, communicate updates, personalize experiences, analyze performance, improve security, and comply with legal obligations.</p>
            <h3>3. Sharing information</h3>
            <p>We may share data with trusted service providers, in connection with business transfers, when legally required, or with your explicit consent. We do not sell personal information for marketing purposes.</p>
            <h3>4. Security</h3>
            <p>We use encryption, access controls, and regular audits to protect your data. No internet transmission is 100% secure, but we take reasonable precautions.</p>
            <h3>5. Cookies and tracking</h3>
            <p>We use essential, analytics, and preference cookies to maintain functionality and understand user behavior. You may manage these settings in your browser.</p>
            <h3>6. Your rights</h3>
            <p>You may request access, correction, deletion, portability, or restriction of your data, and you may withdraw consent where applicable.</p>
            <h3>7. Contact us</h3>
            <p>Email: asifhasan10122000@gmail.com</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Asivision. Building apps with purpose and momentum.</p>
        <a href="mailto:asifhasan10122000@gmail.com">asifhasan10122000@gmail.com</a>
      </footer>
    </div>
  );
}

export default App;
