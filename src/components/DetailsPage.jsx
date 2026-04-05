import { useState, useEffect } from 'react';
import { WEDDING_INFO } from '../data/guests';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';

/* ── Countdown ─────────────────────────────────────────────── */
function useCountdown(isoDate) {
  const getLeft = () => {
    const diff = new Date(isoDate) - new Date();
    if (diff <= 0) return { d:0, h:0, m:0, s:0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [left, setLeft] = useState(getLeft);
  useEffect(() => {
    const id = setInterval(() => setLeft(getLeft()), 1000);
    return () => clearInterval(id);
  }, [isoDate]);
  return left;
}

function pad(n) { return String(n).padStart(2, '0'); }

/* ── SVG Icons ─────────────────────────────────────────────── */
function IconCalendar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function IconChurch() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2 L12 7 M10 5 L14 5"/>
      <path d="M4 22 L4 10 Q4 7 8 7 L12 7 L16 7 Q20 7 20 10 L20 22"/>
      <rect x="9" y="15" width="6" height="7"/>
    </svg>
  );
}
function IconGlass() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <path d="M8 2 L12 9 L16 2 Z"/>
      <line x1="12" y1="9" x2="12" y2="18"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  );
}
function IconDress() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <path d="M9 2 L6 8 L4 22 L20 22 L18 8 L15 2"/>
      <path d="M9 2 Q12 5 15 2"/>
    </svg>
  );
}
function IconEnvelope() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <polyline points="2,5 12,13 22,5"/>
    </svg>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */
function Divider() {
  return (
    <div className="divider">
      <div className="divider-line"/>
      <span className="divider-icon">✦</span>
      <div className="divider-line"/>
    </div>
  );
}

function InfoCard({ IconComp, subtitle, title, children, delay = '0s' }) {
  return (
    <div className="details-card" style={{ '--delay': delay }}>
      <div className="details-card-header">
        <div className="details-card-icon"><IconComp /></div>
        <div>
          <p className="details-card-subtitle">{subtitle}</p>
          <h3 className="details-card-title">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="details-info-row">
      <span className="details-info-label">{label}</span>
      <span className="details-info-value">{value}</span>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function DetailsPage({ guest, onLogout }) {
  const { d, h, m, s } = useCountdown(WEDDING_INFO.dateISO);
  const W = WEDDING_INFO;

  return (
    <div className="page details-bg">
      <PhotoBackground />
      <div className="photo-overlay" aria-hidden="true" />
      <Petals />

      <div className="details-content">

        {/* Welcome */}
        <div className="details-welcome">
          <p className="details-welcome-greeting">Bienvenue,</p>
          <h1 className="details-welcome-name">{guest.prenom}</h1>
          <p className="details-welcome-msg">
            Nous sommes si heureux de vous compter parmi nos invités pour ce jour si spécial.
            Voici toutes les informations pour rejoindre notre célébration.
          </p>
        </div>

        {/* Couple */}
        <div className="details-couple">
          <div className="details-couple-names">
            {W.marie1}
            <span className="details-couple-amp">&amp;</span>
            {W.marie2}
          </div>
        </div>

        <Divider />

        {/* Countdown */}
        <div className="countdown-section">
          <p className="countdown-label">Compte à rebours jusqu'au grand jour</p>
          <div className="countdown-numbers">
            <div className="countdown-unit">
              <span className="countdown-number">{pad(d)}</span>
              <span className="countdown-unit-label">Jours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{pad(h)}</span>
              <span className="countdown-unit-label">Heures</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{pad(m)}</span>
              <span className="countdown-unit-label">Minutes</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number" style={{ animationDuration: '1s' }}>{pad(s)}</span>
              <span className="countdown-unit-label">Secondes</span>
            </div>
          </div>
        </div>

        <InfoCard IconComp={IconCalendar} subtitle="La Date" title={W.date} delay="0.35s"/>

        <InfoCard IconComp={IconChurch} subtitle="Cérémonie" title={W.ceremonie.lieu} delay="0.45s">
          <InfoRow label="Heure"   value={W.ceremonie.heure}/>
          <InfoRow label="Adresse" value={W.ceremonie.adresse}/>
        </InfoCard>

        <InfoCard IconComp={IconGlass} subtitle="Réception & Dîner" title={W.reception.lieu} delay="0.55s">
          <InfoRow label="Heure"   value={W.reception.heure}/>
          <InfoRow label="Adresse" value={W.reception.adresse}/>
        </InfoCard>

        <InfoCard IconComp={IconDress} subtitle="Dress Code" title="Tenue conseillée" delay="0.62s">
          <div className="dresscode-badge">✦ {W.dresscode}</div>
        </InfoCard>

        <InfoCard IconComp={IconEnvelope} subtitle="RSVP — Avant le" title={W.rsvpDate} delay="0.68s">
          <InfoRow label="Contact" value={W.contact}/>
        </InfoCard>

        <Divider />

        {/* Message */}
        <div className="details-note">
          <p className="details-note-text">"{W.messagePersonnel}"</p>
          <span className="details-note-signature">
            {W.marie1} &amp; {W.marie2}
          </span>
        </div>

        {/* Logout */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn-logout" onClick={onLogout}>
            &larr; Déconnexion
          </button>
        </div>

      </div>
    </div>
  );
}
