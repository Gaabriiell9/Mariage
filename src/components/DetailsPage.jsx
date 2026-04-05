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
    { key: 'salgados',        label: t.menuSalgados,        items: MENU.salgados,        color: '#3A578C' },
    { key: 'plats',           label: t.menuPlats,           items: MENU.plats,           color: '#6690C3' },
    { key: 'accompagnements', label: t.menuAccompagnements, items: MENU.accompagnements, color: '#5A82B8' },
    { key: 'desserts',        label: t.menuDesserts,        items: MENU.desserts,        color: '#8AAED8' },
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
          background: 'linear-gradient(135deg, #3A578C, #6690C3)',
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
            letterSpacing: '0.14em', color: '#3A578C',
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

/* ── Special Message ─────────────────────────────────────── */
function SpecialMessage({ message }) {
  if (!message) return null;
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(58,87,140,0.12), rgba(102,144,195,0.08))',
      border: '1.5px solid rgba(102,144,195,0.4)',
      borderRadius: 22,
      padding: '28px 28px',
      marginBottom: 28,
      textAlign: 'center',
      animation: 'slideInCard 0.7s ease 0.2s both',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(to right, #3A578C, #6690C3, #3A578C)',
      }}/>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
        fontStyle: 'italic',
        color: '#1A2E4A',
        lineHeight: 1.9,
        marginBottom: 16,
      }}>"{message}"</p>
      <span style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1.5rem',
        color: '#3A578C',
        filter: 'drop-shadow(0 2px 6px rgba(58,87,140,0.25))',
      }}>Joao Gabriel & Isabella</span>
      <div style={{
        position: 'absolute',
        bottom: 8,
        right: 10,
        opacity: 0.9,
        userSelect: 'none',
      }}>
        <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* === CORPS === */}
          <ellipse cx="26" cy="52" rx="13" ry="16" fill="#7A5230"/>

          {/* === BRAS GAUCHE levé (grimace) === */}
          <path d="M13 44 Q4 36 6 26 Q7 22 10 24 Q9 32 16 40Z" fill="#7A5230"/>
          <ellipse cx="7.5" cy="24" rx="3.5" ry="3" fill="#C4956A"/>

          {/* === BRAS DROIT baissé === */}
          <path d="M39 44 Q48 50 46 58 Q45 62 42 60 Q44 54 38 48Z" fill="#7A5230"/>
          <ellipse cx="44.5" cy="61" rx="3.5" ry="3" fill="#C4956A"/>

          {/* === JAMBES === */}
          <path d="M20 66 Q18 72 14 72 Q12 72 12 70 Q15 70 17 64Z" fill="#7A5230"/>
          <path d="M32 66 Q34 72 38 72 Q40 72 40 70 Q37 70 35 64Z" fill="#7A5230"/>
          {/* Pieds */}
          <ellipse cx="13" cy="71" rx="4" ry="2" fill="#C4956A"/>
          <ellipse cx="39" cy="71" rx="4" ry="2" fill="#C4956A"/>

          {/* === VENTRE clair === */}
          <ellipse cx="26" cy="53" rx="8" ry="10" fill="#C4956A"/>

          {/* === TÊTE === */}
          <ellipse cx="26" cy="26" rx="16" ry="15" fill="#7A5230"/>

          {/* Oreilles */}
          <circle cx="10" cy="26" r="6" fill="#7A5230"/>
          <circle cx="10" cy="26" r="3.8" fill="#C4956A"/>
          <circle cx="42" cy="26" r="6" fill="#7A5230"/>
          <circle cx="42" cy="26" r="3.8" fill="#C4956A"/>

          {/* Museau proéminent */}
          <ellipse cx="26" cy="31" rx="10" ry="7" fill="#C4956A"/>

          {/* === YEUX TROLL (grands, exorbités) === */}
          <circle cx="20" cy="23" r="5.5" fill="white"/>
          <circle cx="32" cy="23" r="5.5" fill="white"/>
          {/* Iris */}
          <circle cx="21" cy="24" r="3.2" fill="#3A1A00"/>
          <circle cx="33" cy="24" r="3.2" fill="#3A1A00"/>
          {/* Reflets */}
          <circle cx="22" cy="22.5" r="1.1" fill="white"/>
          <circle cx="34" cy="22.5" r="1.1" fill="white"/>
          {/* Sourcils relevés (grimace) */}
          <path d="M15 17 Q20 13 25 16" stroke="#4A2800" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M27 16 Q32 13 37 17" stroke="#4A2800" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

          {/* === NARINE === */}
          <circle cx="23" cy="30" r="1.4" fill="#5A3010"/>
          <circle cx="29" cy="30" r="1.4" fill="#5A3010"/>

          {/* === BOUCHE TROLL grande ouverte avec langue === */}
          <path d="M17 34 Q26 42 35 34" fill="#3A0A0A"/>
          <path d="M17 34 Q26 42 35 34 Q35 34 35 33 Q26 40 17 33Z" fill="#C0392B"/>
          {/* Langue tirée */}
          <ellipse cx="26" cy="40" rx="5" ry="3.5" fill="#E74C3C"/>
          <line x1="26" y1="37" x2="26" y2="43" stroke="#C0392B" strokeWidth="0.8"/>
          {/* Dents */}
          <rect x="20" y="34" width="4" height="3" rx="1" fill="white"/>
          <rect x="25" y="34" width="4" height="3" rx="1" fill="white"/>
          <rect x="30" y="34" width="4" height="3" rx="1" fill="white"/>

          {/* === QUEUE === */}
          <path d="M39 60 Q52 55 50 44 Q48 36 42 38" stroke="#7A5230" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

        </svg>
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

        <SpecialMessage message={guest.specialMessage} />

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
