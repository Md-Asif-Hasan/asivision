import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';

function EternoraPrivacy() {
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
            <h2>Eternora</h2>
          </div>

          <div className="policy-card">
            <p><strong>Effective Date:</strong> July 20, 2026 | <strong>Last Updated:</strong> July 20, 2026</p>

            <div style={{
              background: 'rgba(126, 214, 223, 0.1)',
              borderLeft: '4px solid #7ed6df',
              padding: '16px 20px',
              borderRadius: '6px',
              marginBottom: '32px',
              fontSize: '0.95rem',
              color: '#7ed6df'
            }}>
              <strong>Open Source & MIT License Notice:</strong> Eternora is an open-source life simulation game. The core software is released and licensed under the <strong>MIT License</strong>. You are free to inspect, modify, and distribute the code in accordance with the terms of the license.
            </div>

            <p>This Privacy Policy explains how <strong>Eternora</strong> ("we", "us", or "our") collects, uses, stores, and protects your personal information when you use our mobile application, virtual life simulator, and multiplayer services. By using the app, you agree to the practices described in this policy.</p>

            <h3>1. Information We Collect</h3>
            <p>We collect only the minimum information necessary to provide and secure our service:</p>
            <ul>
              <li><strong>Account & Authentication Information:</strong> Your name, email address, profile picture, or third-party authentication tokens (such as Google Sign-In) to verify your account and maintain security.</li>
              <li><strong>Game Progress & Stats:</strong> Game choices, characters created, family legacy trees, decades lived, relationship choices, and active simulator state.</li>
              <li><strong>Multiplayer & Leaderboard Data:</strong> Scores, completion times in 10-minute challenges, matchmaking preferences, and public leaderboard rankings.</li>
              <li><strong>Virtual Economy & Store:</strong> Coin balance, virtual rewards, purchases of themes, avatars, banners, frames, and sound packs.</li>
              <li><strong>Social & Communications:</strong> Chat messages, shared life stories, and interactions with friends within the app.</li>
              <li><strong>Device Information:</strong> Device type, operating system version, and unique identifiers used for diagnostic, capability, and performance monitoring.</li>
            </ul>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '16px 20px',
              margin: '12px 0'
            }}>
              We do <strong>not</strong> collect or store: credit card numbers, bank account numbers, physical locations (GPS coordinates), or microphone/audio logs. All premium payment transactions are handled through standard platform-native secure stores.
            </div>

            <h3>2. How We Use Your Information</h3>
            <p>Your data is used solely to:</p>
            <ul>
              <li>Provide, host, and maintain the Eternora game simulation and multiplayer matching engine.</li>
              <li>Sync game progress across your authorized devices and prevent data loss.</li>
              <li>Render your custom avatars, frames, and custom themes correctly.</li>
              <li>Display leaderboard rankings and process challenge rewards fairly.</li>
              <li>Moderate social features, chats, and shared stories to prevent abuse or terms violations.</li>
              <li>Send critical system notifications and support messages regarding your account.</li>
              <li>Comply with applicable legal requirements.</li>
            </ul>
            <p>We do <strong>not</strong> share your personal data with third-party advertisers, nor do we sell your data to brokers.</p>

            <h3>3. Data Storage and Security</h3>
            <p>We apply standard technical and administrative safeguards to protect your game data:</p>
            <ul>
              <li>All server communications are encrypted using secure <strong>HTTPS/TLS</strong> protocols.</li>
              <li>Authentication is handled through industry-certified federated identity providers or cryptographically hashed logins.</li>
              <li>Real-time chat is protected using secure database security rules ensuring only participants can read private chats.</li>
              <li>Open source components are regularly audited for security vulnerabilities.</li>
            </ul>
            <p>Please remember that no method of transmission or digital storage is 100% secure. While we protect your legacy data, we cannot guarantee absolute security.</p>

            <h3>4. Data Retention</h3>
            <p>We retain your simulation data and account details for as long as your account remains active. If you wish to delete your account and clear all associated game progress, legacy records, and chat history, you can trigger this option directly in the game settings or contact us. Deletions are processed within <strong>30 days</strong>.</p>

            <h3>5. Open Source Licensing (MIT License)</h3>
            <p>The codebase of this application is licensed under the <strong>MIT License</strong>. This means the application's code is public, and copies of it are subject to the following terms:</p>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '16px 20px',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              margin: '12px 0',
              whiteSpace: 'pre-wrap'
            }}>
{`Copyright (c) 2026 Asivision

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`}
            </div>

            <h3>6. Children's Privacy</h3>
            <p>Eternora is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and suspect your child has registered and shared personal data, please contact us immediately to have it deleted.</p>

            <h3>7. Your Rights</h3>
            <p>Depending on your location, you have the right to request access to your data, request corrections, request complete erasure of your game account, object to data processing, or receive a portable export of your simulation achievements. Contact us using the details below to exercise these rights.</p>

            <h3>8. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time to match new simulation features or compliance needs. Any changes will be posted on this page with an updated "Last Updated" date. Continued gameplay indicates consent to the revised terms.</p>

            <h3>9. Contact Us</h3>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '20px',
              marginTop: '12px'
            }}>
              <p><strong>App:</strong> Eternora (Life Simulation)</p>
              <p><strong>Email:</strong> asifhasan10122000@gmail.com</p>
              <p><strong>Response Time:</strong> Within 72 hours</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Eternora. All rights reserved. | Licensed under the MIT License.</p>
        <a href="mailto:asifhasan10122000@gmail.com">asifhasan10122000@gmail.com</a>
      </footer>
    </div>
  );
}

export default EternoraPrivacy;
