import { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const RSVPContext = createContext(null);

const storageKey = (id) => `rsvp_${id}`;

function loadFromStorage(id) {
  try {
    const raw = localStorage.getItem(storageKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function RSVPProvider({ children }) {
  const [guestId, setGuestId] = useState(null);
  const [rsvpData, setRsvpData] = useState(null);

  // Appelé juste après le login — charge depuis localStorage et retourne les données
  const initRsvp = useCallback((id) => {
    setGuestId(id);
    const stored = loadFromStorage(id);
    setRsvpData(stored);
    return stored; // retour synchrone pour le routing dans App.jsx
  }, []);

  // Appelé à la soumission du formulaire RSVP — upsert Supabase + sauvegarde locale
  const submitRsvp = useCallback(async ({ prenom, nom, accompagnants, email, nombre_enfants, vient_mairie, vient_diner }) => {
    const { error } = await supabase
      .from('rsvp_responses')
      .upsert(
        {
          prenom,
          nom,
          email:          email ?? null,
          accompagnants:  accompagnants ?? 0,
          nombre_enfants: nombre_enfants ?? 0,
          vient_mairie,
          vient_diner,
        },
        { onConflict: 'prenom_norm,nom_norm' }
      );

    if (error) throw error;

    const data = {
      prenom,
      nom,
      email:          null,
      accompagnants:  0,
      nombre_enfants: nombre_enfants ?? 0,
      vient_mairie,
      vient_diner,
      submitted: true,
    };
    setRsvpData(data);
    if (guestId !== null) {
      localStorage.setItem(storageKey(guestId), JSON.stringify(data));
    }
    return data;
  }, [guestId]);

  // Appelé à la déconnexion
  const clearRsvp = useCallback(() => {
    setRsvpData(null);
    setGuestId(null);
  }, []);

  return (
    <RSVPContext.Provider value={{ rsvpData, initRsvp, submitRsvp, clearRsvp }}>
      {children}
    </RSVPContext.Provider>
  );
}

export function useRsvp() {
  return useContext(RSVPContext);
}
