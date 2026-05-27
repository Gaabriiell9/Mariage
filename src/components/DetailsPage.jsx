import { useState, useEffect } from 'react';
import { WEDDING_INFO } from '../data/guests';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';
import { useRsvp } from '../context/RSVPContext';

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
      <MenuDivider />
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
function MenuDivider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      margin: '22px 0',
    }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(58,87,140,0.22))' }} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="#6690C3" opacity="0.7">
        <polygon points="5,0 10,5 5,10 0,5"/>
      </svg>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(58,87,140,0.22))' }} />
    </div>
  );
}

function MenuSection({ t }) {
  const sections = [
    { key: 'entree',   label: t.menuEntree,        items: t.menuItems.entree   },
    { key: 'plats',    label: t.menuPlatPrincipal, items: t.menuItems.plats    },
    { key: 'desserts', label: t.menuDessert,       items: t.menuItems.desserts },
    { key: 'boissons', label: t.menuBoisson,       items: t.menuItems.boissons },
  ];

  return (
    <div style={{
      background: 'linear-gradient(160deg, rgba(255,255,255,0.96) 0%, rgba(235,242,252,0.92) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 20,
      border: '1px solid rgba(102,144,195,0.28)',
      boxShadow: '0 4px 32px rgba(58,87,140,0.10), inset 0 1px 0 rgba(255,255,255,0.8)',
      marginBottom: 22,
      animation: 'slideInCard 0.7s ease 0.72s both',
      maxWidth: 560,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      overflow: 'hidden',
    }}>
      {/* Liseré bleu en haut */}
      <div style={{
        height: 3,
        background: 'linear-gradient(to right, #3A578C, #6690C3, #3A578C)',
      }} />

      {/* En-tête */}
      <div style={{ textAlign: 'center', padding: '28px 32px 18px' }}>
        <p style={{
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#6690C3',
          fontWeight: 700,
          marginBottom: 8,
        }}>{t.menuSubtitle}</p>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.6rem, 5vw, 2rem)',
          fontWeight: 500,
          color: '#1A2E4A',
          letterSpacing: '0.04em',
        }}>{t.menuTitle}</h3>
      </div>

      {/* Séparateur d'en-tête */}
      <div style={{ padding: '0 32px' }}><MenuDivider /></div>

      {/* Sections */}
      <div style={{ padding: '4px 32px 32px' }}>
        {sections.map(({ key, label, items }, idx) => (
          <div key={key}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <p style={{
                fontSize: '0.64rem',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: '#3A578C',
                fontWeight: 700,
              }}>{label}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              {items.map((item, i) => (
                <p key={item} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1rem, 3vw, 1.15rem)',
                  fontStyle: 'italic',
                  color: '#1A2E4A',
                  lineHeight: 1.8,
                  marginBottom: i < items.length - 1 ? 2 : 0,
                }}>{item}</p>
              ))}
            </div>
            {idx < sections.length - 1 && <MenuDivider />}
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
          <ellipse cx="26" cy="52" rx="13" ry="16" fill="#7A5230"/>
          <path d="M13 44 Q4 36 6 26 Q7 22 10 24 Q9 32 16 40Z" fill="#7A5230"/>
          <ellipse cx="7.5" cy="24" rx="3.5" ry="3" fill="#C4956A"/>
          <path d="M39 44 Q48 50 46 58 Q45 62 42 60 Q44 54 38 48Z" fill="#7A5230"/>
          <ellipse cx="44.5" cy="61" rx="3.5" ry="3" fill="#C4956A"/>
          <path d="M20 66 Q18 72 14 72 Q12 72 12 70 Q15 70 17 64Z" fill="#7A5230"/>
          <path d="M32 66 Q34 72 38 72 Q40 72 40 70 Q37 70 35 64Z" fill="#7A5230"/>
          <ellipse cx="13" cy="71" rx="4" ry="2" fill="#C4956A"/>
          <ellipse cx="39" cy="71" rx="4" ry="2" fill="#C4956A"/>
          <ellipse cx="26" cy="53" rx="8" ry="10" fill="#C4956A"/>
          <ellipse cx="26" cy="26" rx="16" ry="15" fill="#7A5230"/>
          <circle cx="10" cy="26" r="6" fill="#7A5230"/>
          <circle cx="10" cy="26" r="3.8" fill="#C4956A"/>
          <circle cx="42" cy="26" r="6" fill="#7A5230"/>
          <circle cx="42" cy="26" r="3.8" fill="#C4956A"/>
          <ellipse cx="26" cy="31" rx="10" ry="7" fill="#C4956A"/>
          <circle cx="20" cy="23" r="5.5" fill="white"/>
          <circle cx="32" cy="23" r="5.5" fill="white"/>
          <circle cx="21" cy="24" r="3.2" fill="#3A1A00"/>
          <circle cx="33" cy="24" r="3.2" fill="#3A1A00"/>
          <circle cx="22" cy="22.5" r="1.1" fill="white"/>
          <circle cx="34" cy="22.5" r="1.1" fill="white"/>
          <path d="M15 17 Q20 13 25 16" stroke="#4A2800" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M27 16 Q32 13 37 17" stroke="#4A2800" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <circle cx="23" cy="30" r="1.4" fill="#5A3010"/>
          <circle cx="29" cy="30" r="1.4" fill="#5A3010"/>
          <path d="M17 34 Q26 42 35 34" fill="#3A0A0A"/>
          <path d="M17 34 Q26 42 35 34 Q35 34 35 33 Q26 40 17 33Z" fill="#C0392B"/>
          <ellipse cx="26" cy="40" rx="5" ry="3.5" fill="#E74C3C"/>
          <line x1="26" y1="37" x2="26" y2="43" stroke="#C0392B" strokeWidth="0.8"/>
          <rect x="20" y="34" width="4" height="3" rx="1" fill="white"/>
          <rect x="25" y="34" width="4" height="3" rx="1" fill="white"/>
          <rect x="30" y="34" width="4" height="3" rx="1" fill="white"/>
          <path d="M39 60 Q52 55 50 44 Q48 36 42 38" stroke="#7A5230" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function DetailsPage({ guest, onLogout, onModify }) {
  const { t, lang }  = useLang();
  const { rsvpData } = useRsvp();
  const { d, h, m, s } = useCountdown(WEDDING_INFO.dateISO);
  const W = WEDDING_INFO;

  const civil = W.evenements.civil;
  const diner = W.evenements.diner;

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

        {/* Événements confirmés */}
        <div className="details-events-header">
          <p className="details-events-label">{t.confirmedEvents}</p>
        </div>

        {rsvpData?.vient_mairie && (
          <InfoCard IconComp={IconChurch} subtitle={t.cardCivil} title={civil.lieu} delay="0.35s">
            <InfoRow label={t.labelDate}    value={lang === 'pt' ? civil.dateLabelPT : civil.dateLabel} />
            <InfoRow label={t.labelHeure}   value={civil.heure} />
            <InfoRow label={t.labelAdresse} value={civil.adresse} />
          </InfoCard>
        )}

        {rsvpData?.vient_diner && (
          <InfoCard IconComp={IconGlass} subtitle={t.cardDiner} title={diner.lieu} delay="0.45s">
            <InfoRow label={t.labelDate}    value={lang === 'pt' ? diner.dateLabelPT : diner.dateLabel} />
            <InfoRow label={t.labelHeure}   value={diner.heure} />
            <InfoRow label={t.labelAdresse} value={diner.adresse} />
            <div className="dresscode-badge">
              <IconDress />
              {lang === 'pt' ? diner.dressCodePT : diner.dressCode}
            </div>
          </InfoCard>
        )}

        {/* Menu (uniquement pour les invités au dîner) */}
        {rsvpData?.vient_diner && <MenuSection t={t} />}

        <Divider />

        {/* Message biblique */}
        <div className="details-note">
          <p className="details-note-text">« {t.messagePersonnel} »</p>
          <span className="details-note-signature">{t.messagePersonnelRef}</span>
        </div>

        <Divider />

        {/* Dress Code */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <img
            src="/photos/dress-code.jpg"
            alt="Dress code — palette de couleurs bleues"
            style={{
              maxWidth: 520,
              width: '100%',
              height: 'auto',
              borderRadius: 14,
              boxShadow: '0 6px 32px rgba(58,87,140,0.13), 0 1px 6px rgba(58,87,140,0.08)',
              display: 'block',
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <button className="btn-modify" onClick={onModify}>
            {t.modifyRsvp}
          </button>
          <button className="btn-logout" onClick={onLogout}>
            &larr; {t.logout}
          </button>
        </div>

      </div>
    </div>
  );
}
