import { useState, useEffect } from 'react';
import { WEDDING_INFO } from '../data/guests';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';

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
function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6 L21 6 M3 12 L21 12 M3 18 L21 18"/>
      <circle cx="6" cy="6" r="1.5" fill="white" stroke="none"/>
      <circle cx="6" cy="12" r="1.5" fill="white" stroke="none"/>
      <circle cx="6" cy="18" r="1.5" fill="white" stroke="none"/>
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

/* ── Menu ─────────────────────────────────────────────────── */
const MENU = {
  salgados: ["Coxinha", "Esfiha", "Quibe", "Pastel", "Pão de queijo"],
  plats: ["Gigo", "Lasagne", "Strogonoff", "Fricassée"],
  accompagnements: ["Arroz", "Farofa", "Salade", "Batata palha"],
  desserts: [
    "Brigadeiro", "Beijinho", "Pudim de leite",
    "Bolo de leite ninho", "Mousse de maracujá",
    "Gâteau de mariage décoré",
  ],
};

function MenuSection({ t }) {
  const categories = [
    { key: 'salgados',        label: t.menuSalgados,        items: MENU.salgados,        color: '#8B4560' },
    { key: 'plats',           label: t.menuPlats,           items: MENU.plats,           color: '#7A5C3A' },
    { key: 'accompagnements', label: t.menuAccompagnements, items: MENU.accompagnements, color: '#3D5A47' },
    { key: 'desserts',        label: t.menuDesserts,        items: MENU.desserts,        color: '#B8933F' },
  ];

  return (
    <div style={{
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 26,
      padding: '32px 24px',
      border: '1px solid rgba(240,228,196,0.75)',
      boxShadow: '0 8px 36px rgba(44,24,16,0.07)',
      marginBottom: 22,
      animation: 'slideInCard 0.7s ease 0.72s both',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <div style={{
          width: 52, height: 52,
          background: 'linear-gradient(135deg, #B8933F, #D4B86A)',
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(184,147,63,0.3)',
          flexShrink: 0,
        }}>
          <IconMenu />
        </div>
        <div>
          <p style={{
            fontSize: '0.72rem', textTransform: 'uppercase',
            letterSpacing: '0.14em', color: '#B8933F',
            fontWeight: 700, marginBottom: 4,
          }}>{t.menuSubtitle}</p>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.3rem, 4vw, 1.6rem)',
            fontWeight: 500, color: '#2C1810',
          }}>{t.menuTitle}</h3>
        </div>
      </div>

      {/* Grid 2 colonnes sur desktop, 1 sur mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
      }}>
        {categories.map(({ key, label, items, color }) => (
          <div key={key} style={{
            background: 'rgba(255,255,255,0.7)',
            border: `1.5px solid ${color}22`,
            borderRadius: 16,
            padding: '18px 16px',
            borderTop: `3px solid ${color}`,
          }}>
            <p style={{
              fontSize: '0.7rem', textTransform: 'uppercase',
              letterSpacing: '0.14em', color: color,
              fontWeight: 700, marginBottom: 12,
            }}>{label}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map(item => (
                <li key={item} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(240,228,196,0.5)',
                  fontSize: 'clamp(0.82rem, 2.5vw, 0.95rem)',
                  color: '#2C1810',
                  fontFamily: "'Nunito', sans-serif",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: color, flexShrink: 0, opacity: 0.7,
                  }}/>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function DetailsPage({ guest, onLogout }) {
  const { t, lang } = useLang();
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
          <p className="details-welcome-greeting">{t.welcomeGreeting}</p>
          <h1 className="details-welcome-name">
            {guest.prenom}{guest.nom ? ` ${guest.nom}` : ''}
          </h1>
          <p className="details-welcome-msg">{t.welcomeMsg}</p>
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
          <p className="countdown-label">{t.countdownLabel}</p>
          <div className="countdown-numbers">
            <div className="countdown-unit">
              <span className="countdown-number">{pad(d)}</span>
              <span className="countdown-unit-label">{t.countdownDays}</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{pad(h)}</span>
              <span className="countdown-unit-label">{t.countdownHours}</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{pad(m)}</span>
              <span className="countdown-unit-label">{t.countdownMinutes}</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number" style={{ animationDuration: '1s' }}>{pad(s)}</span>
              <span className="countdown-unit-label">{t.countdownSeconds}</span>
            </div>
          </div>
        </div>

        <InfoCard IconComp={IconCalendar} subtitle={t.cardDate} title={lang === 'pt' ? W.datePT : W.date} delay="0.35s"/>

        <InfoCard IconComp={IconChurch} subtitle={t.cardCeremonie} title={W.ceremonie.lieu} delay="0.45s">
          <InfoRow label={t.labelHeure}   value={W.ceremonie.heure}/>
          <InfoRow label={t.labelAdresse} value={W.ceremonie.adresse}/>
        </InfoCard>

        <InfoCard IconComp={IconGlass} subtitle={t.cardReception} title={W.reception.lieu} delay="0.55s">
          <InfoRow label={t.labelHeure}   value={W.reception.heure}/>
          <InfoRow label={t.labelAdresse} value={W.reception.adresse}/>
        </InfoCard>

        <InfoCard IconComp={IconDress} subtitle={t.cardDresscode} title={t.cardDresscodeTitle} delay="0.62s">
          <div className="dresscode-badge">✦ {lang === 'pt' ? W.dresscodePT : W.dresscode}</div>
        </InfoCard>

        <MenuSection t={t} />

        <Divider />

        {/* Message */}
        <div className="details-note">
          <p className="details-note-text">« {t.messagePersonnel} »</p>
          <span className="details-note-signature">{t.messagePersonnelRef}</span>
        </div>

        {/* Logout */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn-logout" onClick={onLogout}>
            &larr; {t.logout}
          </button>
        </div>

      </div>
    </div>
  );
}
