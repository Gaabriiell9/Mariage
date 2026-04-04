import { useState, useRef, useEffect } from 'react';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';

function RingSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
      style={{ filter: 'drop-shadow(0 4px 12px rgba(184,147,63,0.4))' }}>
      <circle cx="20" cy="22" r="12" stroke="#B8933F" strokeWidth="2.5" fill="none"/>
      <circle cx="20" cy="22" r="8"  stroke="#D4B86A" strokeWidth="1.2" fill="none"/>
      <ellipse cx="20" cy="10" rx="5" ry="3.5" fill="#B8933F" opacity="0.9"/>
      <ellipse cx="20" cy="10" rx="3" ry="2"   fill="#F0E4C4"/>
    </svg>
  );
}

export default function LoginPage({ guest, onLogin, onBack }) {
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
      setError('Mot de passe incorrect. Demandez à votre famille si besoin.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="page login-bg">
      <PhotoBackground />
      <Petals />
      <div className="login-content">
        <div className={`login-card${shake ? ' shake' : ''}`}>
          <div className="login-icon"><RingSVG /></div>
          <h2 className="login-title">Bienvenue !</h2>
          <p className="login-subtitle">
            Confirmez votre identité pour accéder<br/>à votre invitation personnalisée
          </p>

          <div className="form-group">
            <label className="form-label">Votre prénom</label>
            <input type="text" className="form-input" value={guest.prenom} disabled/>
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe famille</label>
            <input
              ref={inputRef}
              type="password"
              className={`form-input${error ? ' has-error' : ''}`}
              placeholder="Entrez le mot de passe..."
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              autoComplete="off"
            />
            <p className="hint-text">
              Le mot de passe correspond au nom de famille (majuscules, sans accents ni espaces)
            </p>
          </div>

          {error && <div className="error-msg" role="alert">{error}</div>}

          <button className="btn-login" onClick={handleSubmit}>
            Accéder à mon invitation &nbsp;✦
          </button>
          <button className="btn-back" onClick={onBack}>
            &larr; Revenir à la recherche
          </button>
        </div>
      </div>
    </div>
  );
}
