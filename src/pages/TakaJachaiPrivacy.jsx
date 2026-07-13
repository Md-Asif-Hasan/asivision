import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

function TakaJachaiPrivacy() {
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
            <h2>TAKAJACHAI</h2>
          </div>

          <div className="policy-card">
            <p><strong>Effective Date:</strong> July 13, 2026 | <strong>Last Updated:</strong> July 13, 2026</p>

            <div style={{
              background: 'rgba(126, 214, 223, 0.1)',
              borderLeft: '4px solid #7ed6df',
              padding: '16px 20px',
              borderRadius: '6px',
              marginBottom: '32px',
              fontSize: '0.95rem',
              color: '#7ed6df'
            }}>
              <strong>Important Disclaimers:</strong>
              <ul style={{ margin: '8px 0 0 20px', paddingLeft: '20px' }}>
                <li>TAKAJACHAI is NOT an official currency verification tool and is NOT affiliated with any government, central bank, or financial institution.</li>
                <li>The counterfeit detection feature provides assistance only and is NOT 100% accurate. Final currency verification should be done through official channels.</li>
                <li>This app is a business management tool for legitimate business purposes only.</li>
                <li>We do not provide financial services, banking services, or payment processing directly.</li>
              </ul>
            </div>

            <p>This Privacy Policy explains how <strong>TAKAJACHAI</strong> ("we", "us", or "our") collects, uses, stores, and protects your personal information when you use our mobile application and web platform. By using the app, you agree to the practices described in this policy.</p>

            <h3>1. Information We Collect</h3>
            <p>We collect only the minimum information necessary to provide our service:</p>
            <ul>
              <li><strong>Account Information:</strong> Your name, email address, and business details when you register.</li>
              <li><strong>Authentication Data:</strong> Your password (stored as a bcrypt hash — never in plain text).</li>
              <li><strong>Business Data:</strong> Sales records, inventory data, expense tracking, and financial transactions.</li>
              <li><strong>Camera Data:</strong> Images captured for counterfeit detection purposes ONLY with your explicit consent. Images are processed locally when possible and are not stored unless you choose to save them.</li>
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
              <strong>Camera Permission:</strong> The app requests camera access solely for the counterfeit detection feature. You can revoke this permission at any time in your device settings. We do not access camera for any other purpose.
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '16px 20px',
              margin: '12px 0'
            }}>
              We do <strong>not</strong> collect: precise GPS location, contacts unrelated to business, personal photos, microphone input, biometric data, or any sensitive personal information beyond what's necessary for business operations.
            </div>

            <h3>2. How We Use Your Information</h3>
            <p>Your data is used solely to:</p>
            <ul>
              <li>Create and manage your business account.</li>
              <li>Deliver counterfeit detection services and business management features.</li>
              <li>Store and display your sales, inventory, and financial records.</li>
              <li>Process and analyze currency images for authenticity verification.</li>
              <li>Send essential service notifications (e.g., account-related updates, security alerts).</li>
              <li>Ensure platform security and prevent abuse.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
            <p>We do <strong>not</strong> use your data for advertising, profiling, or sell it to any third party.</p>

            <h3>3. Data Storage and Security</h3>
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul>
              <li>Passwords are hashed using <strong>bcrypt</strong> and never stored in plain text.</li>
              <li>Sessions are managed via secure, <strong>HttpOnly cookies</strong> that expire after 7 days of inactivity.</li>
              <li>All business data is stored in a secured database on our servers.</li>
              <li>All data transmitted between your device and our servers is encrypted via <strong>HTTPS/TLS</strong>.</li>
              <li>Currency images are processed with secure algorithms and stored with encryption when cloud processing is required.</li>
            </ul>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '16px 20px',
              margin: '12px 0'
            }}>
              <strong>Financial Data Protection:</strong> We do not store payment card information, bank account details, or sensitive financial credentials. All payment processing is handled through secure third-party payment processors that comply with PCI-DSS standards.
            </div>
            <p>While we apply strong security practices, no internet transmission is 100% secure. We continuously work to protect your data using commercially reasonable means.</p>

            <h3>4. Data Retention</h3>
            <p>We retain your personal and business data for as long as your account is active or as needed to provide services. You may request deletion of your account and all associated data at any time by contacting us. Upon a valid deletion request, your personal information will be permanently removed from our systems within <strong>30 days</strong>. Business records may be retained longer to comply with legal and tax requirements.</p>

            <h3>5. Sharing of Information</h3>
            <p>We do not sell, rent, or trade your personal information. We may share data only in these limited cases:</p>
            <ul>
              <li><strong>Legal Requirements:</strong> If required by law, court order, or a lawful government request.</li>
              <li><strong>Safety:</strong> To protect the rights, property, or safety of our users or the public.</li>
              <li><strong>Service Providers:</strong> Trusted third-party services that help operate our platform (e.g., hosting providers, payment processors), bound by strict confidentiality agreements and prohibited from using your data for any other purpose.</li>
              <li><strong>Payment Processing:</strong> Payment data is handled by secure third-party payment processors and is not stored on our servers.</li>
            </ul>

            <h3>6. Children's Privacy</h3>
            <p>TAKAJACHAI is intended for business users aged <strong>18 and older</strong>. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal data, we will promptly delete it. If you believe a child has registered, please contact us immediately at the address below.</p>

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
            <p>Our app may use third-party services for hosting, infrastructure, and payment processing. These providers are contractually obligated to protect your data and may not use it for their own purposes. We do not integrate third-party advertising SDKs or social media trackers.</p>

            <h3>10. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page. For significant changes, we will notify users via in-app notice or email. Continued use of the app after changes constitutes acceptance of the updated policy.</p>

            <h3>11. Compliance and Legal</h3>
            <p>TAKAJACHAI is designed to comply with applicable data protection laws including GDPR and other regional privacy regulations. We regularly review our practices to ensure ongoing compliance.</p>
            <ul>
              <li><strong>GDPR Compliance:</strong> We provide data subject rights as required by GDPR including access, rectification, erasure, and portability.</li>
              <li><strong>Data Transfers:</strong> Data is stored and processed within secure data centers. International transfers are conducted with appropriate safeguards.</li>
              <li><strong>Legal Basis:</strong> We process your data based on your consent, contract performance, legal obligations, and legitimate business interests.</li>
            </ul>

            <h3>12. Contact Us</h3>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '12px'
            }}>
              <p><strong>App:</strong> TAKAJACHAI</p>
              <p><strong>Email:</strong> asifhasan10122000@gmail.com</p>
              <p><strong>Response Time:</strong> Within 72 hours</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 TAKAJACHAI. All rights reserved. | A business management and counterfeit detection tool.</p>
        <a href="mailto:asifhasan10122000@gmail.com">asifhasan10122000@gmail.com</a>
      </footer>
    </div>
  );
}

export default TakaJachaiPrivacy;
