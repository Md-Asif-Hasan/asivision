import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RefundPage() {
  return (
    <div className="page-shell-full">
      <Navbar />

      <main className="legal-content-container reveal">
        <div className="legal-content-card">
          <h1>Refund & Cancellation Policy</h1>
          <p className="legal-updated">Last Updated: August 18, 2026</p>

          <section>
            <h2>1. SaaS Digital Subscription Refunds</h2>
            <p>
              We want you to be completely satisfied with our digital apps and tools. If you experience technical defects or inability to access Pro features that our support team cannot resolve within 7 days of purchase, you may request a full refund within 14 days of initial subscription.
            </p>
          </section>

          <section>
            <h2>2. Subscription Cancellations</h2>
            <p>
              You can cancel your recurring subscription at any time via your Universal Account Dashboard. Upon cancellation, your Pro entitlement remains fully active until the conclusion of your current billing period, with no subsequent renewals charged.
            </p>
          </section>

          <section>
            <h2>3. Professional Services (Payoneer Invoiced)</h2>
            <p>
              Custom professional services (Google Play Console support, digital marketing, bespoke development, and hardware/IoT engineering) are milestone-based contracts. Refunds for custom services are evaluated based on the delivery status of agreed milestones outlined in the project scope.
            </p>
          </section>

          <section>
            <h2>4. How to Request a Refund</h2>
            <p>
              To initiate a refund request or discuss billing questions, please contact our support team at{' '}
              <a href="mailto:asifhasan10122000@gmail.com" className="text-indigo-400 underline">asifhasan10122000@gmail.com</a>{' '}
              or reach out via <Link to="/support" className="text-indigo-400 underline">Support Form</Link> with your Billing User ID and Order ID.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
