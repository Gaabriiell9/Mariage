import { useState } from 'react';
import Petals from './Petals';
import PhotoBackground from './PhotoBackground';
import { useLang } from '../context/LanguageContext';
import { useRsvp } from '../context/RSVPContext';
import { WEDDING_INFO } from '../data/guests';

function AnswerGroup({ value, onChange, t }) {
  return (
    <div className="rsvp-answer-group">
      <button
        type="button"
        className={`rsvp-answer-btn yes${value === true ? ' selected' : ''}`}
        onClick={() => onChange(true)}
      >
        ✓ {t.rsvpYes}
      </button>
      <button
        type="button"
        className={`rsvp-answer-btn no${value === false ? ' selected' : ''}`}
        onClick={() => onChange(false)}
      >
        ✗ {t.rsvpNo}
      </button>
    </div>
  );
}

function EventDetailRow({ label, value, bold }) {
  return (
    <div className="rsvp-event-detail-row">
      <span className="rsvp-event-detail-label">{label}</span>
      <span className={`rsvp-event-detail-value${bold ? ' rsvp-bold' : ''}`}>{value}</span>
    </div>
  );
}

export default function RSVPPage({ onSubmit, guest }) {
  const { t, lang }              = useLang();
  const { rsvpData, submitRsvp } = useRsvp();
  const W = WEDDING_INFO;

  const [vientMairie,   setVientMairie]   = useState(rsvpData?.vient_mairie  ?? null);
  const [vientDiner,    setVientDiner]    = useState(rsvpData?.vient_diner   ?? null);
  const [nombreEnfants, setNombreEnfants] = useState(rsvpData?.nombre_enfants ?? 0);
  const [error,         setError]         = useState('');
  const [submitting,    setSubmitting]    = useState(false);

  // Identité canonique depuis le guest sélectionné (pas de saisie libre)
  const prenom = guest?.prenom ?? '';
  const nom    = guest?.nom    ?? '';

  const civil = W.evenements.civil;
  const diner = W.evenements.diner;

  const handleSubmit = async () => {
    if (vientMairie === null || vientDiner === null) {
      setError(t.rsvpSubmitError);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const data = await submitRsvp({
        prenom,
        nom,
        accompagnants:  0,
        email:          null,
        nombre_enfants: nombreEnfants,
        vient_mairie:   vientMairie,
        vient_diner:    vientDiner,
      });
      onSubmit(data);
    } catch {
      setError(t.rsvpNetworkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page login-bg">
      <PhotoBackground />
      <div className="photo-overlay" aria-hidden="true" />
      <Petals />

      <div className="rsvp-scroll-wrapper">
        <div className="login-card rsvp-card">

          {/* Greeting + deadline */}
          <div className="rsvp-greeting">
            <p className="rsvp-greeting-text">
              {t.rsvpGreeting}{prenom ? <>, <strong>{prenom}</strong></> : null}
            </p>
            <p className="rsvp-deadline-text">
              {t.rsvpDeadlineMsg}{' '}
              <strong>{lang === 'pt' ? W.rsvpDeadlinePT : W.rsvpDeadline}</strong>
            </p>
          </div>

          {/* Q1 — Cérémonie civile */}
          <div className="rsvp-question">
            <p className="rsvp-question-label">{t.rsvpCivilQuestion}</p>
            <div className="rsvp-event-details">
              <EventDetailRow label={t.labelDate} value={lang === 'pt' ? civil.dateLabelPT : civil.dateLabel} />
              <EventDetailRow label={t.labelHeure} value={civil.heure} />
              <EventDetailRow label={t.labelAdresse} value={civil.lieu} />
            </div>
            <AnswerGroup value={vientMairie} onChange={(v) => { setVientMairie(v); setError(''); }} t={t} />
          </div>

          {/* Q2 — Dîner de mariage */}
          <div className="rsvp-question">
            <p className="rsvp-question-label">{t.rsvpDinerQuestion}</p>
            <div className="rsvp-event-details">
              <EventDetailRow label={t.labelDate} value={lang === 'pt' ? diner.dateLabelPT : diner.dateLabel} />
              <EventDetailRow label={t.labelHeure} value={diner.heure} />
              <EventDetailRow label={t.labelAdresse} value={diner.lieu} />
              <EventDetailRow
                label={t.rsvpDinerDressCode}
                value={lang === 'pt' ? diner.dressCodePT : diner.dressCode}
                bold
              />
            </div>
            <AnswerGroup value={vientDiner} onChange={(v) => { setVientDiner(v); setError(''); }} t={t} />
          </div>

          {/* Nombre d'enfants */}
          <div className="form-group">
            <label className="form-label">{t.rsvpNombreEnfants}</label>
            <input
              type="number"
              min="0"
              max="10"
              className="form-input"
              value={nombreEnfants}
              onChange={(e) =>
                setNombreEnfants(Math.min(10, Math.max(0, parseInt(e.target.value, 10) || 0)))
              }
            />
            <p className="hint-text">{t.rsvpNombreEnfantsHint}</p>
          </div>

          {error && <div className="error-msg" role="alert">{error}</div>}

          <button
            className="btn-login"
            onClick={handleSubmit}
            disabled={submitting || vientMairie === null || vientDiner === null}
            style={{ opacity: (submitting || vientMairie === null || vientDiner === null) ? 0.5 : 1 }}
          >
            {submitting ? t.rsvpSending : t.rsvpSubmitBtn} &nbsp;✦
          </button>
        </div>
      </div>
    </div>
  );
}
