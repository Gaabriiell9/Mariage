import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';
import { useRsvp } from '../context/RSVPContext';

export default function ThankYouPage({ guest, onHome, onModify }) {
  const { t }      = useLang();
  const { rsvpData } = useRsvp();
  const displayName  = rsvpData?.prenom || guest?.prenom || '';

  return (
    <div className="page login-bg">
      <PhotoBackground />
      <div className="photo-overlay" aria-hidden="true" />
      <Petals />

      <div className="login-content">
        <div className="login-card" style={{ textAlign: 'center' }}>

          <div className="login-icon">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(58,87,140,0.35))' }}>
              <rect x="2" y="10" width="40" height="28" rx="5" fill="#3A578C" opacity="0.15" stroke="#3A578C" strokeWidth="1.5"/>
              <path d="M2 15 L22 27 L42 15" stroke="#3A578C" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              <path d="M16 22 L2 34" stroke="#3A578C" strokeWidth="1.2" opacity="0.4" strokeLinecap="round"/>
              <path d="M28 22 L42 34" stroke="#3A578C" strokeWidth="1.2" opacity="0.4" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="login-title">{t.thankYouTitle}</h2>

          {displayName && (
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'var(--dark)',
              marginBottom: 12,
            }}>
              {displayName},
            </p>
          )}

          <p className="login-subtitle" style={{ marginBottom: 28 }}>
            {t.thankYouMsg}
          </p>

          <span className="thankyou-signature">
            Joao Gabriel &amp; Isabella
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <button className="btn-modify" onClick={onModify}>
              {t.thankYouModify}
            </button>
            <button className="btn-logout" onClick={onHome}>
              &larr; {t.thankYouHome}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
