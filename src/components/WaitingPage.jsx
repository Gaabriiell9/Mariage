import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';
import { WEDDING_INFO } from '../data/guests';

export default function WaitingPage({ guest, onRespondNow, onHome }) {
  const { t, lang } = useLang();
  const prenom = guest?.prenom ?? '';
  const deadline = lang === 'pt' ? WEDDING_INFO.rsvpDeadlinePT : WEDDING_INFO.rsvpDeadline;

  return (
    <div className="page login-bg">
      <PhotoBackground />
      <div className="photo-overlay" aria-hidden="true" />
      <Petals />

      <div className="login-content">
        <div className="login-card" style={{ textAlign: 'center' }}>

          {/* Icône horloge */}
          <div className="login-icon">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(58,87,140,0.35))' }}>
              <circle cx="22" cy="22" r="18" stroke="#3A578C" strokeWidth="1.8" fill="rgba(58,87,140,0.1)" />
              <line x1="22" y1="22" x2="22" y2="12" stroke="#3A578C" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="22" y1="22" x2="30" y2="26" stroke="#6690C3" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="22" cy="22" r="2" fill="#3A578C" />
            </svg>
          </div>

          {/* Titre */}
          <h2 className="login-title">
            {t.waitingTitle}{prenom ? <>, <span style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.3em',
              color: 'var(--gold)',
            }}>{prenom}</span> !</> : ' !'}
          </h2>

          {/* Message */}
          <p className="login-subtitle" style={{ marginBottom: 28, lineHeight: 1.7 }}>
            {t.waitingMsg}{' '}
            <strong>{deadline}</strong>{' '}
            {t.waitingMsg2}
          </p>

          {/* Signature */}
          <span className="thankyou-signature" style={{ display: 'block', marginBottom: 28 }}>
            Joao Gabriel &amp; Isabella
          </span>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <button className="btn-login" onClick={onRespondNow} style={{ width: '100%' }}>
              {t.waitingRespondNow} &nbsp;✦
            </button>
            <button className="btn-logout" onClick={onHome}>
              &larr; {t.logout}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
