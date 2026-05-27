import { useState, useRef, useEffect } from 'react';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';

// ← Remplace par le vrai numéro avant déploiement
const CONTACT_TEL = '0680374569';

// Normalise une chaîne : supprime accents, lowercase, trim
function normalizeStr(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

// Mot de passe attendu = premier mot du nom de famille si disponible, sinon champ password
function expectedPassword(guest) {
  const nom = (guest.nom || '').trim();
  if (nom) return nom.split(/\s+/)[0];
  return guest.password || '';
}

function RingSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(184,147,63,0.4))' }}>
      <circle cx="20" cy="22" r="12" stroke="#3A578C" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="22" r="8" stroke="#6690C3" strokeWidth="1.2" fill="none" />
      <ellipse cx="20" cy="10" rx="5" ry="3.5" fill="#3A578C" opacity="0.9" />
      <ellipse cx="20" cy="10" rx="3" ry="2" fill="#E4EFFF" />
    </svg>
  );
}

export default function LoginPage({ guest, onLogin, onBack }) {
  const { t } = useLang();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    const entered = normalizeStr(password);
    const expected = normalizeStr(expectedPassword(guest));

    if (entered === expected) {
      onLogin();
    } else {
      setFailCount(f => f + 1);
      setError(t.loginError);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  const showContact = failCount >= 2;

  return (
    <div className="page login-bg">
      <PhotoBackground />
      <div className="photo-overlay" aria-hidden="true" />
      <Petals />
      <div className="login-content">
        <div className={`login-card${shake ? ' shake' : ''}`}>
          <div className="login-icon"><RingSVG /></div>
          <h2 className="login-title">{t.loginWelcome}</h2>
          <p className="login-subtitle">{t.loginSubtitle}</p>

          <div className="form-group">
            <label className="form-label">{t.labelPrenom}</label>
            <input type="text" className="form-input" value={guest.prenom} disabled />
          </div>

          <div className="form-group">
            <label className="form-label">{t.labelPassword}</label>
            <input
              ref={inputRef}
              type="password"
              className={`form-input${error ? ' has-error' : ''}`}
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoComplete="off"
            />
            <p className="hint-text">{t.passwordHint}</p>
          </div>

          {error && <div className="error-msg" role="alert">{error}</div>}

          {showContact && (
            <div style={{
              marginTop: 4,
              marginBottom: 8,
              padding: '12px 16px',
              background: 'rgba(102,144,195,0.1)',
              border: '1px solid rgba(102,144,195,0.3)',
              borderRadius: 12,
              fontSize: '0.84rem',
              color: '#1A2E4A',
              lineHeight: 1.6,
              textAlign: 'center',
            }}>
              {t.loginContactBefore}{' '}
              <a
                href={`tel:${CONTACT_TEL}`}
                style={{ color: 'var(--gold)', fontWeight: 700, textDecoration: 'none' }}
              >
                {CONTACT_TEL}
              </a>
              {' '}{t.loginContactAfter}
            </div>
          )}

          <button className="btn-login" onClick={handleSubmit}>
            {t.loginBtn} &nbsp;✦
          </button>
          <button className="btn-back" onClick={onBack}>
            &larr; {t.backBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
