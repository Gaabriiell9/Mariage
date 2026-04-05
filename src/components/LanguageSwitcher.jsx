import { useLang } from '../context/LanguageContext';

const FlagFR = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="9.33" height="20" fill="#002395"/>
    <rect x="9.33" width="9.33" height="20" fill="#fff"/>
    <rect x="18.66" width="9.34" height="20" fill="#ED2939"/>
  </svg>
);

const FlagBR = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="28" height="20" fill="#009C3B"/>
    <polygon points="14,2 26,10 14,18 2,10" fill="#FFDF00"/>
    <circle cx="14" cy="10" r="4.2" fill="#003087"/>
    <path d="M10.2 11.2 Q14 9 17.8 11.2" stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
  </svg>
);

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const btn = (code) => ({
    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    opacity: lang === code ? 1 : 0.38,
    transform: lang === code ? 'scale(1.12)' : 'scale(1)',
    transition: 'all 0.2s ease',
    borderRadius: 4,
    boxShadow: lang === code ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
    display: 'block',
  });

  return (
    <div style={{
      position: 'fixed', top: 14, right: 16, zIndex: 200,
      display: 'flex', gap: 8, alignItems: 'center',
    }}>
      <button onClick={() => setLang('fr')} style={btn('fr')} title="Français"><FlagFR /></button>
      <button onClick={() => setLang('pt')} style={btn('pt')} title="Português"><FlagBR /></button>
    </div>
  );
}
