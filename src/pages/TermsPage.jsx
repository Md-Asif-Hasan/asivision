import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="legal-content-container reveal">
        <div className="legal-content-card">
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last Updated: August 18, 2026</p>

          <section>
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing the Asivision website, subscribing to our Universal Pro plans, or engaging our professional services (including Google Play Console consultancy, digital marketing, software development, and IoT engineering), you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2>2. Digital SaaS Products & Subscriptions</h2>
            <p>
              Universal Pro subscription packages provide non-exclusive, non-transferable access to Asivision's digital software products (including MindForge Arena Pro, Eternora Life Simulator Pro, AI Scrapers, and upcoming digital tools).
            </p>
            <p>
              Subscriptions renew automatically at the end of each billing period (Monthly, 4-Month, or Yearly) unless cancelled before the renewal date through your Account Dashboard. Lifetime passes provide permanent access with no recurring charges.
            </p>
          </section>

          <section>
            <h2>3. Professional Custom Services & Payoneer Invoicing</h2>
            <p>
              Professional services — such as Google Play Console publishing assistance, closed testing coordination, targeted digital marketing campaigns, custom web/mobile development, and hardware/IoT engineering — are distinct custom services not included in SaaS subscriptions.
            </p>
            <p>
              These services are scoped individually and billed via Payoneer request payment links or official invoices. Deliverables and timelines are agreed upon in writing prior to project kickoff.
            </p>
          </section>

          <section>
            <h2>4. Intellectual Property</h2>
            <p>
              All software, design assets, trademarks, and codebases developed by Asivision Studio remain the intellectual property of Asivision Studio, unless explicitly transferred under a custom development contract.
            </p>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms, please contact our support team at{' '}
              <a href="mailto:asifhasan10122000@gmail.com" className="text-indigo-400 underline">asifhasan10122000@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
