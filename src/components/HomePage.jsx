import { useState, useRef, useEffect, useCallback } from 'react';
import { GUESTS } from '../data/guests';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function HighlightMatch({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const nText = normalize(text);
  const nQuery = normalize(query);
  const idx = nText.indexOf(nQuery);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em>{text.slice(idx, idx + query.length)}</em>
      {text.slice(idx + query.length)}
    </>
  );
}

function FrameCorner() {
  return (
    <svg viewBox="0 0 90 90" fill="none">
      <path d="M8 8 L38 8" stroke="#B8933F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 8 L8 38" stroke="#B8933F" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="3.5" fill="#B8933F" opacity="0.6"/>
      <path d="M16 8 Q8 8 8 16" stroke="#B8933F" strokeWidth="0.8" fill="none" opacity="0.45"/>
      <path d="M24 8 Q8 8 8 24" stroke="#B8933F" strokeWidth="0.5" fill="none" opacity="0.25"/>
      <circle cx="38" cy="8" r="1.5" fill="#B8933F" opacity="0.35"/>
      <circle cx="8" cy="38" r="1.5" fill="#B8933F" opacity="0.35"/>
    </svg>
  );
}

function SearchSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#B8933F" strokeWidth="2.2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7"/>
      <line x1="16.5" y1="16.5" x2="22" y2="22"/>
    </svg>
  );
}

function HeartSVG() {
  return (
    <svg width="32" height="30" viewBox="0 0 32 30" fill="none"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(196,132,139,0.45))' }}>
      <path
        d="M16 28 C16 28 2 18 2 9 C2 4.5 5.5 2 9.5 2 C12.5 2 15 3.8 16 6 C17 3.8 19.5 2 22.5 2 C26.5 2 30 4.5 30 9 C30 18 16 28 16 28Z"
        fill="#C4848B" opacity="0.85"
      />
    </svg>
  );
}

function DiamondSVG() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="#B8933F">
      <polygon points="5,0 10,5 5,10 0,5"/>
    </svg>
  );
}

export default function HomePage({ onSelectGuest }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const results = query.trim().length >= 1
    ? GUESTS.filter(g => {
        const full = normalize(`${g.prenom} ${g.nom}`);
        const q = normalize(query.trim());
        return full.includes(q) || normalize(g.prenom).includes(q) || (g.nom && normalize(g.nom).includes(q));
      }).slice(0, 9)
    : [];

  const handleClickOutside = useCallback((e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = (guest) => { setOpen(false); setQuery(''); onSelectGuest(guest); };

  return (
    <div className="page home-bg">
      <PhotoBackground />
      <Petals />
      <div className="frame-corner frame-tl"><FrameCorner /></div>
      <div className="frame-corner frame-tr"><FrameCorner /></div>
      <div className="frame-corner frame-bl"><FrameCorner /></div>
      <div className="frame-corner frame-br"><FrameCorner /></div>

      <div className="home-content">
        <div className="home-ornament"><HeartSVG /></div>
        <p className="home-eyebrow">Vous êtes chaleureusement invité à</p>
        <h1 className="home-title">Notre Mariage</h1>
        <div className="home-divider">
          <div className="home-divider-line"/>
          <span className="home-divider-icon">✦</span>
          <div className="home-divider-line"/>
        </div>
        <p className="home-description">
          Recherchez votre prénom ou votre nom pour accéder à votre
          invitation personnalisée et découvrir tous les détails de
          notre célébration.
        </p>

        <div className="search-container" ref={containerRef}>
          <div className="search-wrapper">
            <span className="search-icon"><SearchSVG /></span>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher votre prénom ou nom..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => { if (query.trim()) setOpen(true); }}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          {open && query.trim().length >= 1 && (
            <div className="search-results" role="listbox">
              {results.length > 0 ? results.map((guest) => (
                <div key={guest.id} className="search-result-item" role="option" onClick={() => handleSelect(guest)}>
                  <span className="search-result-icon"><DiamondSVG /></span>
                  <span className="search-result-name">
                    <HighlightMatch text={guest.prenom} query={query}/>
                    {guest.nom ? <> <HighlightMatch text={guest.nom} query={query}/></> : null}
                  </span>
                </div>
              )) : (
                <div className="search-no-result">Aucun invité trouvé — vérifiez l'orthographe</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
