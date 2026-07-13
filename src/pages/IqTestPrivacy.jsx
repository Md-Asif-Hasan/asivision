import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

function IqTestPrivacy() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <img src={logo} alt="Asivision logo" className="brand-logo" />
          <span>Asivision</span>
        </Link>
        <nav className="nav-links">
          <Link to="/">Back to Home</Link>
        </nav>
      </header>

      <main>
        <section className="section">
          <div className="section-heading">
            <p className="eyebrow">Privacy Policy</p>
            <h2>MindForge Arena (IQ Test Pro)</h2>
          </div>

          <div className="policy-card">
            <p><strong>Effective Date:</strong> March 29, 2026 | <strong>Last Updated:</strong> March 29, 2026</p>

            <div style={{
              background: 'rgba(126, 214, 223, 0.1)',
              borderLeft: '4px solid #7ed6df',
              padding: '16px 20px',
              borderRadius: '6px',
              marginBottom: '32px',
              fontSize: '0.95rem',
              color: '#7ed6df'
            }}>
              <strong>Independent App Notice:</strong> MindForge Arena (IQ Test Pro) is an independent intelligence practice application. It is not affiliated with, endorsed by, or connected to any government body, military organization, or official examination authority. All content is for self-assessment and educational purposes only.
            </div>

            <p>This Privacy Policy explains how <strong>MindForge Arena (IQ Test Pro)</strong> ("we", "us", or "our") collects, uses, stores, and protects your personal information when you use our mobile application and web platform. By using the app, you agree to the practices described in this policy.</p>

            <h3>1. Information We Collect</h3>
            <p>We collect only the minimum information necessary to provide our service:</p>
            <ul>
              <li><strong>Account Information:</strong> Your name and email address when you register.</li>
              <li><strong>Authentication Data:</strong> Your password (stored as a bcrypt hash — never in plain text).</li>
              <li><strong>Test Data:</strong> Your answers, scores, time spent per question, and test session history.</li>
              <li><strong>Device Information:</strong> Device type, OS version, and app version for diagnostic and compatibility purposes.</li>
              <li><strong>Usage Data:</strong> Pages visited and features used within the app.</li>
            </ul>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '16px 20px',
              margin: '12px 0'
            }}>
              We do <strong>not</strong> collect: financial data, precise GPS location, contacts, photos, microphone input, biometric data, or any sensitive personal information.
            </div>

            <h3>2. How We Use Your Information</h3>
            <p>Your data is used solely to:</p>
            <ul>
              <li>Create and manage your account.</li>
              <li>Deliver, operate, and improve the IQ test platform.</li>
              <li>Store and display your test history and performance results.</li>
              <li>Send essential service notifications (e.g., account-related updates).</li>
              <li>Ensure platform security and prevent abuse.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
            <p>We do <strong>not</strong> use your data for advertising, profiling, or sell it to any third party.</p>

            <h3>3. Data Storage and Security</h3>
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul>
              <li>Passwords are hashed using <strong>bcrypt</strong> and never stored in plain text.</li>
              <li>Sessions are managed via secure, <strong>HttpOnly cookies</strong> that expire after 7 days of inactivity.</li>
              <li>All data is stored in a secured database on our servers.</li>
              <li>All data transmitted between your device and our servers is encrypted via <strong>HTTPS/TLS</strong>.</li>
            </ul>
            <p>While we apply strong security practices, no internet transmission is 100% secure. We continuously work to protect your data using commercially reasonable means.</p>

            <h3>4. Data Retention</h3>
            <p>We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and all associated data at any time by contacting us. Upon a valid deletion request, your personal information will be permanently removed from our systems within <strong>30 days</strong>.</p>

            <h3>5. Sharing of Information</h3>
            <p>We do not sell, rent, or trade your personal information. We may share data only in these limited cases:</p>
            <ul>
              <li><strong>Legal Requirements:</strong> If required by law, court order, or a lawful government request.</li>
              <li><strong>Safety:</strong> To protect the rights, property, or safety of our users or the public.</li>
              <li><strong>Service Providers:</strong> Trusted third-party services that help operate our platform (e.g., hosting providers), bound by strict confidentiality agreements and prohibited from using your data for any other purpose.</li>
            </ul>

            <h3>6. Children's Privacy</h3>
            <p>MindForge Arena (IQ Test Pro) is intended for users aged <strong>13 and older</strong>. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal data, we will promptly delete it. If you believe a child has registered, please contact us immediately at the address below.</p>

            <h3>7. Your Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you.</li>
              <li><strong>Correct</strong> inaccurate or incomplete information.</li>
              <li><strong>Delete</strong> your account and all associated personal data.</li>
              <li><strong>Withdraw consent</strong> at any time where processing is based on consent.</li>
              <li><strong>Object</strong> to processing of your personal data.</li>
              <li><strong>Data portability</strong> — request a copy of your data in a structured format.</li>
            </ul>
            <p>To exercise any of these rights, contact us at the email address in Section 10.</p>

            <h3>8. Cookies and Tracking</h3>
            <p>We use session cookies solely to maintain your login state. These cookies are:</p>
            <ul>
              <li>HttpOnly — not accessible by JavaScript.</li>
              <li>Automatically expire after 7 days of inactivity.</li>
              <li>Not used for advertising, cross-site tracking, or analytics profiling.</li>
            </ul>
            <p>We do <strong>not</strong> use third-party advertising cookies, tracking pixels, or fingerprinting technologies.</p>

            <h3>9. Third-Party Services</h3>
            <p>Our app may use third-party services for hosting and infrastructure. These providers are contractually obligated to protect your data and may not use it for their own purposes. We do not integrate third-party advertising SDKs or social media trackers.</p>

            <h3>10. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. For significant changes, we will notify users via in-app notice or email. Continued use of the app after changes constitutes acceptance of the updated policy.</p>

            <h3>11. Contact Us</h3>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '12px'
            }}>
              <p><strong>App:</strong> MindForge Arena (IQ Test Pro)</p>
              <p><strong>Email:</strong> asifhasan10122000@gmail.com</p>
              <p><strong>Response Time:</strong> Within 72 hours</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 MindForge Arena (IQ Test Pro). All rights reserved. | This app is not affiliated with any government or military organization.</p>
        <a href="mailto:asifhasan10122000@gmail.com">asifhasan10122000@gmail.com</a>
      </footer>
    </div>
  );
}

export default IqTestPrivacy;
