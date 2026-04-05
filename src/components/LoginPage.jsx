import { useState, useRef, useEffect } from 'react';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';

function RingSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(184,147,63,0.4))' }}>
      <circle cx="20" cy="22" r="12" stroke="#3A578C" strokeWidth="2.5" fill="none"/>
      <circle cx="20" cy="22" r="8"  stroke="#6690C3" strokeWidth="1.2" fill="none"/>
      <ellipse cx="20" cy="10" rx="5" ry="3.5" fill="#3A578C" opacity="0.9"/>
      <ellipse cx="20" cy="10" rx="3" ry="2"   fill="#E4EFFF"/>
    </svg>
  );
}

export default function LoginPage({ guest, onLogin, onBack }) {
  const { t } = useLang();
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [shake, setShake]       = useState(false);
  const inputRef                = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    const clean = password.trim().toUpperCase().replace(/\s/g, '');
    if (clean === guest.password) {
      onLogin();
    } else {
      setError(t.loginError);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
      inputRef.current?.focus();
    }
  };

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
            <input type="text" className="form-input" value={guest.prenom} disabled/>
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
