import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Check, CheckCircle2, Clock, Copy, ExternalLink, FileText, Lock, Mail, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import { getAppsList, toPrivacySlug } from '../config/appsManager';
import { getAllPartnerApps } from '../config/partnershipManager';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CONTACT_EMAIL = 'asifhasan10122000@gmail.com';
const BUILT_IN_APP_LOGOS = {
  'taka-jachai': '/assets/logos/taka_jachai.png',
  'mindforge-arena': '/assets/logos/iq_test.png',
  eternora: '/assets/logos/eternora.png',
};

function getPolicyLines(value, fallback) {
  const lines = String(value || fallback).split('\n').map((line) => line.trim()).filter(Boolean);
  return lines.length ? lines : [fallback];
}

function findApplication(apps, requestedId) {
  if (!requestedId) return null;
  const normalizedRequest = toPrivacySlug(requestedId);
  return apps.find((item) => item?.id && toPrivacySlug(item.id) === normalizedRequest) || null;
}

function PolicySection({ number, title, intro, lines, variant, icon: Icon }) {
  return (
    <section className={`privacy-policy-section privacy-policy-section--${variant}`}>
      <div className="privacy-policy-section__heading">
        <span className="privacy-policy-section__number">{number}</span>
        <span className="privacy-policy-section__icon"><Icon size={17} /></span>
        <div>
          <p className="privacy-policy-section__eyebrow">Policy section {number}</p>
          <h2>{title}</h2>
        </div>
      </div>
      <p className="privacy-policy-section__intro">{intro}</p>
      <div className="privacy-policy-section__items">
        {lines.map((line, index) => (
          <div className="privacy-policy-item" key={`${number}-${index}`}>
            <CheckCircle2 size={16} aria-hidden="true" />
            <p>{line}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppLogo({ app }) {
  const [remoteLogoFailed, setRemoteLogoFailed] = useState(false);
  const cloudflareLogo = typeof app.logoUrl === 'string' ? app.logoUrl.trim() : '';
  const localLogo = BUILT_IN_APP_LOGOS[toPrivacySlug(app.id)];
  const logoSrc = !remoteLogoFailed && cloudflareLogo ? cloudflareLogo : localLogo;

  if (!logoSrc) return <span>{app.icon || 'App'}</span>;

  return (
    <img
      src={logoSrc}
      alt={`${app.name} logo`}
      onError={() => setRemoteLogoFailed(true)}
    />
  );
}

export default function AppPrivacyPage({ defaultId }) {
  const { appId } = useParams();
  const requestedId = appId || defaultId;
  const [apps, setApps] = useState(() => getAppsList());
  const [copied, setCopied] = useState(false);
  const app = findApplication(apps, requestedId);

  useEffect(() => {
    const refreshApps = () => setApps(getAppsList());
    refreshApps();
    window.addEventListener('asivision_apps_updated', refreshApps);
    return () => window.removeEventListener('asivision_apps_updated', refreshApps);
  }, [requestedId]);

  // Also fetch from partner apps in Firestore if not found in localStorage apps
  const [partnerApp, setPartnerApp] = useState(null);
  useEffect(() => {
    if (!app && requestedId) {
      getAllPartnerApps().then((partnerApps) => {
        const found = partnerApps.find(
          (a) => toPrivacySlug(a.appId || a.id) === toPrivacySlug(requestedId)
        );
        if (found) setPartnerApp(found);
      });
    }
  }, [app, requestedId]);

  // Resolve effective app (localStorage or Firestore partner)
  const resolvedApp = app || (partnerApp ? {
    id: partnerApp.appId || partnerApp.id,
    name: partnerApp.appName,
    category: partnerApp.category,
    description: partnerApp.description,
    icon: '🤝',
    logoUrl: partnerApp.logoUrl || '',
    linkUrl: partnerApp.appLink || '',
    effectiveDate: partnerApp.effectiveDate,
    disclaimers: partnerApp.disclaimers,
    collectedInfo: partnerApp.collectedInfo,
    howUsed: partnerApp.howUsed,
    storageSecurity: partnerApp.storageSecurity,
    userRights: partnerApp.userRights,
    externalPrivacyUrl: partnerApp.externalPrivacyUrl,
    privacyPolicyMode: partnerApp.privacyPolicyMode,
  } : null);

  const copyPolicyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard access may be unavailable in non-secure browser contexts.
    }
  };

  if (!resolvedApp) {
    return (
      <div className="page-shell-full privacy-page">
        <div className="bg-ambient" aria-hidden="true"><div className="ambient-orb orb-1" /><div className="ambient-orb orb-2" /></div>
        <Navbar />
        <main className="privacy-page__missing">
          <div className="privacy-missing-card">
            <span className="privacy-missing-card__icon"><FileText size={28} /></span>
            <p className="privacy-kicker">Privacy centre</p>
            <h1>Application policy not found</h1>
            <p>The application policy URL is not associated with a current Asivision application.</p>
            <Link to="/" className="privacy-button privacy-button--primary"><ArrowLeft size={16} /> Return to Asivision</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // If partner app uses external URL, redirect/link to it
  if (resolvedApp.privacyPolicyMode === 'url' && resolvedApp.externalPrivacyUrl) {
    return (
      <div className="page-shell-full privacy-page">
        <Navbar />
        <main className="privacy-page__missing">
          <div className="privacy-missing-card">
            <span className="privacy-missing-card__icon"><ExternalLink size={28} /></span>
            <p className="privacy-kicker">Privacy Policy</p>
            <h1>{resolvedApp.name}</h1>
            <p>This app uses an external privacy policy. Click below to view it.</p>
            <a href={resolvedApp.externalPrivacyUrl} target="_blank" rel="noreferrer" className="privacy-button privacy-button--primary">
              <ExternalLink size={16} /> View Privacy Policy
            </a>
            <Link to="/" className="privacy-button privacy-button--secondary mt-3"><ArrowLeft size={16} /> Return to Asivision</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const effectiveDate = resolvedApp.effectiveDate || 'August 20, 2026';
  const collectionLines = getPolicyLines(resolvedApp.collectedInfo, 'Account and device data necessary to deliver this application.');
  const useLines = getPolicyLines(resolvedApp.howUsed, 'Provide, secure, and improve the application services you request.');
  const securityLines = getPolicyLines(resolvedApp.storageSecurity, 'Data is protected with reasonable technical and organizational safeguards.');
  const rightsLines = getPolicyLines(resolvedApp.userRights, `Request access, correction, export, or deletion by contacting ${CONTACT_EMAIL}.`);

  return (
    <div className="page-shell-full privacy-page">
      <div className="bg-ambient privacy-page__ambient" aria-hidden="true"><div className="ambient-orb orb-1" /><div className="ambient-orb orb-2" /><div className="ambient-orb orb-3" /></div>
      <div className="privacy-page__chrome"><Navbar /></div>

      <main className="privacy-page__content">
        <div className="privacy-page__topbar">
          <Link to="/" className="privacy-back-link"><ArrowLeft size={15} /> Back to Asivision</Link>
          <div className="privacy-page__actions">
            <button type="button" onClick={copyPolicyLink} className="privacy-button privacy-button--quiet">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Link copied' : 'Copy link'}</button>
            <button type="button" onClick={() => window.print()} className="privacy-button privacy-button--quiet"><Printer size={15} /> Print / Save PDF</button>
          </div>
        </div>

        <header className="privacy-hero">
          <div className="privacy-hero__glow privacy-hero__glow--one" aria-hidden="true" /><div className="privacy-hero__glow privacy-hero__glow--two" aria-hidden="true" />
          <div className="privacy-hero__identity">
            <div className="privacy-app-icon"><AppLogo app={resolvedApp} /></div>
            <div><p className="privacy-kicker"><ShieldCheck size={14} /> Official privacy policy</p><h1>{resolvedApp.name}</h1><p className="privacy-hero__summary">A clear guide to how this application handles information, protects it, and gives you control.</p></div>
          </div>
          <div className="privacy-hero__meta"><span>{resolvedApp.category || 'Asivision application'}</span><p><Clock size={14} /> Effective {effectiveDate}</p></div>
        </header>

        <section className="privacy-trust-grid" aria-label="Privacy commitments">
          <article className="privacy-trust-card privacy-trust-card--indigo"><ShieldCheck size={19} /><div><span>Our commitment</span><strong>Purpose-led data use</strong></div></article>
          <article className="privacy-trust-card privacy-trust-card--cyan"><Lock size={19} /><div><span>Security focus</span><strong>Safeguards by design</strong></div></article>
          <article className="privacy-trust-card privacy-trust-card--violet"><Mail size={19} /><div><span>Need help?</span><strong>Privacy support available</strong></div></article>
        </section>

        {(resolvedApp.previewImageUrl || resolvedApp.description) && (
          <section className="privacy-about-card">
            {resolvedApp.previewImageUrl && <img src={resolvedApp.previewImageUrl} alt={`${resolvedApp.name} preview`} />}
            <div><p className="privacy-kicker"><Sparkles size={14} /> About the application</p><h2>Designed for {resolvedApp.name} users</h2><p>{resolvedApp.description || 'This policy applies to the application and the services it provides.'}</p>
              {resolvedApp.linkUrl && resolvedApp.linkUrl !== 'https://' && <a href={resolvedApp.linkUrl} target="_blank" rel="noreferrer" className="privacy-text-link">Open application <ExternalLink size={14} /></a>}
            </div>
          </section>
        )}

        {resolvedApp.disclaimers && <aside className="privacy-notice-card"><span className="privacy-notice-card__icon"><AlertTriangle size={18} /></span><div><strong>Important application notice</strong><p>{resolvedApp.disclaimers}</p></div></aside>}

        <section className="privacy-policy-card">
          <div className="privacy-policy-card__intro"><p className="privacy-kicker"><FileText size={14} /> Your information, explained</p><h2>Privacy at a glance</h2><p>This policy explains how <strong>{resolvedApp.name}</strong>, operated by Asivision Technology &amp; Innovation, collects, uses, stores, and protects information when you use the application or its related services.</p></div>
          <PolicySection number="01" title="Information we collect" intro="We collect only the information needed to operate and improve the service." lines={collectionLines} variant="indigo" icon={FileText} />
          <PolicySection number="02" title="How we use information" intro="Information is used for the workflows and services described below." lines={useLines} variant="emerald" icon={ShieldCheck} />
          <PolicySection number="03" title="Storage and security" intro="We use appropriate safeguards to help keep your information protected." lines={securityLines} variant="cyan" icon={Lock} />
          <PolicySection number="04" title="Your privacy choices" intro="You can ask us about or act on your personal-data rights at any time." lines={rightsLines} variant="violet" icon={CheckCircle2} />
          <section className="privacy-contact-card"><div className="privacy-contact-card__badge"><Mail size={18} /></div><div><p className="privacy-kicker">Privacy contact</p><h2>Questions or data requests?</h2><p>For access, correction, export, deletion, or privacy questions, contact our privacy team.</p></div><a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${resolvedApp.name} privacy request`)}`} className="privacy-button privacy-button--primary"><Mail size={15} /> Email privacy support</a></section>
        </section>
        <div className="privacy-page__assurance"><ShieldCheck size={17} /><span>Published by Asivision Technology &amp; Innovation · Last updated {effectiveDate}</span></div>
      </main>
      <div className="privacy-page__chrome"><Footer /></div>
    </div>
  );
}
