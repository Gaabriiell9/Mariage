import { useState, useEffect } from 'react';
import { GUESTS } from './data/guests';
import { supabase } from './lib/supabase';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RSVPPage from './components/RSVPPage';
import DetailsPage from './components/DetailsPage';
import ThankYouPage from './components/ThankYouPage';
import WaitingPage from './components/WaitingPage';
import AdminPage from './components/AdminPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useRsvp } from './context/RSVPContext';

// Pages : 'home' | 'login' | 'rsvp' | 'waiting' | 'details' | 'thankyou'
const SESSION_KEY = 'wedding_session';
const laterKey    = (id) => `rsvp_later_${id}`;

// Vérifie qu'un objet RSVP localStorage est structurellement cohérent
// (anti-contournement : évite qu'un champ forgé court-circuite Supabase)
function isValidRsvp(data) {
  return (
    data?.submitted === true &&
    typeof data.vient_mairie === 'boolean' &&
    typeof data.vient_diner === 'boolean'
  );
}

export default function App() {
  const isAdmin = window.location.pathname === '/admin';

  const [page, setPage]         = useState('home');
  const [guest, setGuest]       = useState(null);
  const [initializing, setInit] = useState(!isAdmin); // skip init on admin
  const { initRsvp, clearRsvp } = useRsvp();

  // Restauration de session au chargement (ignorée sur /admin)
  useEffect(() => {
    if (isAdmin) return;

    const restore = async () => {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) { setInit(false); return; }

        const { guestId } = JSON.parse(raw);
        const found = GUESTS.find(g => g.id === guestId);
        if (!found) { localStorage.removeItem(SESSION_KEY); setInit(false); return; }

        setGuest(found);
        // Charge localStorage dans le contexte ET conserve les données pour le fallback offline
        const localData = initRsvp(found.id);

        // Supabase est toujours la source de vérité : on vérifie systématiquement,
        // même si localStorage prétend que la réponse est déjà soumise.
        // Cela empêche tout contournement par manipulation du localStorage.
        try {
          const { data } = await supabase
            .from('rsvp_responses')
            .select('prenom, nom, email, accompagnants, nombre_enfants, vient_mairie, vient_diner')
            .eq('prenom_norm', found.prenom.toLowerCase().trim())
            .eq('nom_norm', (found.nom || '').toLowerCase().trim())
            .maybeSingle();

          if (data) {
            // Supabase confirme la réponse → on met à jour localStorage et on route
            const rsvp = { ...data, submitted: true };
            localStorage.setItem(`rsvp_${found.id}`, JSON.stringify(rsvp));
            initRsvp(found.id); // recharge le contexte depuis localStorage mis à jour
            setPage(rsvp.vient_mairie || rsvp.vient_diner ? 'details' : 'thankyou');
          } else {
            // Aucune réponse en base → respecter le choix "plus tard" si présent
            setPage(localStorage.getItem(laterKey(found.id)) ? 'waiting' : 'rsvp');
          }
        } catch {
          // Supabase indisponible : fallback localStorage si données cohérentes,
          // sinon respecter le flag "plus tard", sinon renvoyer sur RSVP.
          if (isValidRsvp(localData)) {
            setPage(localData.vient_mairie || localData.vient_diner ? 'details' : 'thankyou');
          } else if (localStorage.getItem(laterKey(found.id))) {
            setPage('waiting');
          } else {
            setPage('rsvp');
          }
        }
      } catch {
        // Session corrompue → accueil
      }
      setInit(false);
    };

    restore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectGuest = (g) => { setGuest(g); setPage('login'); };

  const handleLogin = () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ guestId: guest.id }));
    const stored = initRsvp(guest.id);
    if (stored?.submitted) {
      setPage(stored.vient_mairie || stored.vient_diner ? 'details' : 'thankyou');
    } else if (localStorage.getItem(laterKey(guest.id))) {
      setPage('waiting');
    } else {
      setPage('rsvp');
    }
  };

  const handleBack = () => { setGuest(null); setPage('home'); };

  const handleRsvpSubmitted = (data) => {
    setPage(data.vient_mairie || data.vient_diner ? 'details' : 'thankyou');
  };

  const handleModifyRsvp = () => setPage('rsvp');

  const handleLater = () => {
    localStorage.setItem(laterKey(guest.id), 'true');
    setPage('waiting');
  };

  const handleRespondNow = () => setPage('rsvp');

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    if (guest) localStorage.removeItem(laterKey(guest.id));
    clearRsvp();
    setGuest(null);
    setPage('home');
  };

  // Route admin — indépendant du flux RSVP
  if (isAdmin) return <AdminPage />;

  // Spinner pendant la restauration de session
  if (initializing) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--cream)',
      }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <>
      <LanguageSwitcher />
      {page === 'home'     && <HomePage onSelectGuest={handleSelectGuest} />}
      {page === 'login'    && guest && <LoginPage guest={guest} onLogin={handleLogin} onBack={handleBack} />}
      {page === 'rsvp'     && guest && <RSVPPage guest={guest} onSubmit={handleRsvpSubmitted} onLater={handleLater} />}
      {page === 'waiting'  && guest && <WaitingPage guest={guest} onRespondNow={handleRespondNow} onHome={handleLogout} />}
      {page === 'details'  && guest && <DetailsPage guest={guest} onLogout={handleLogout} onModify={handleModifyRsvp} />}
      {page === 'thankyou' && guest && <ThankYouPage guest={guest} onHome={handleLogout} onModify={handleModifyRsvp} />}
    </>
  );
}
