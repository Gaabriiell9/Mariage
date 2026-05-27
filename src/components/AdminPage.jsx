import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { GUESTS } from '../data/guests';

const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD;

/* ── Helpers ────────────────────────────────────────────────── */
const norm = (s) => (s || '').toLowerCase().trim();

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
}

/* ── Small components ───────────────────────────────────────── */
function StatusBadge({ hasRsvp, isChild }) {
  if (isChild) return (
    <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:100, background:'#F3F4F6', color:'#9CA3AF', fontSize:'0.73rem', fontWeight:700, whiteSpace:'nowrap' }}>
      N/A
    </span>
  );
  return hasRsvp ? (
    <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:100, background:'#DCFCE7', color:'#166534', fontSize:'0.73rem', fontWeight:700, whiteSpace:'nowrap' }}>
      A répondu
    </span>
  ) : (
    <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:100, background:'#FEF3C7', color:'#92400E', fontSize:'0.73rem', fontWeight:700, whiteSpace:'nowrap' }}>
      En attente
    </span>
  );
}

function CategoryBadge({ category }) {
  const isChild = category === 'enfant';
  return (
    <span style={{ display:'inline-block', padding:'2px 10px', borderRadius:100, background: isChild ? '#FEF3C7' : '#EEF2FF', color: isChild ? '#B45309' : '#3A578C', fontSize:'0.73rem', fontWeight:700, whiteSpace:'nowrap' }}>
      {isChild ? 'Enfant' : 'Adulte'}
    </span>
  );
}

function BoolCell({ value }) {
  if (value === null || value === undefined) return <span style={{ color:'#9CA3AF' }}>—</span>;
  return value
    ? <span style={{ color:'#059669', fontWeight:700 }}>✓</span>
    : <span style={{ color:'#EF4444', fontWeight:700 }}>✗</span>;
}

function SortIcon({ col, sortCol, sortDir }) {
  if (col !== sortCol) return <span style={{ color:'#D1D5DB', marginLeft:4, fontSize:'0.7rem' }}>⇅</span>;
  return <span style={{ color:'#3A578C', marginLeft:4, fontSize:'0.7rem' }}>{sortDir === 'asc' ? '▲' : '▼'}</span>;
}

/* ── Login ──────────────────────────────────────────────────── */
function AdminLogin({ onAuth }) {
  const [pw, setPw]       = useState('');
  const [err, setErr]     = useState('');
  const [shake, setShake] = useState(false);

  const submit = (e) => {
    e?.preventDefault();
    if (!ADMIN_PASS) {
      setErr('VITE_ADMIN_PASSWORD non configuré dans .env.local');
      return;
    }
    if (pw === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', 'true');
      onAuth();
    } else {
      setErr('Mot de passe incorrect');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPw('');
    }
  };

  return (
    <div className="admin-login-outer">
      <div className="admin-login-card" style={{ animation: shake ? 'shake 0.5s ease' : 'none' }}>

        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:48, height:48, background:'linear-gradient(135deg,#3A578C,#6690C3)', borderRadius:12, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 style={{ fontSize:'1.4rem', fontWeight:700, color:'#111827', margin:'0 0 4px' }}>Administration</h1>
          <p style={{ color:'#6B7280', fontSize:'0.88rem', margin:0 }}>Tableau de bord — Mariage</p>
        </div>

        <form onSubmit={submit}>
          <label style={{ display:'block', fontSize:'0.72rem', fontWeight:600, color:'#374151', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(''); }}
            autoFocus
            style={{ width:'100%', padding:'12px 14px', border:`1.5px solid ${err ? '#EF4444' : '#D1D5DB'}`, borderRadius:8, fontSize:'1rem', outline:'none', boxSizing:'border-box', fontFamily:'inherit' }}
          />
          {err && <p style={{ color:'#EF4444', fontSize:'0.82rem', marginTop:6, marginBottom:0 }}>{err}</p>}
          <button type="submit" style={{ width:'100%', marginTop:18, padding:'13px', background:'linear-gradient(135deg,#3A578C,#6690C3)', border:'none', borderRadius:8, color:'white', fontWeight:600, fontSize:'0.95rem', cursor:'pointer', fontFamily:'inherit', minHeight:44 }}>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── Stat Card ──────────────────────────────────────────────── */
function StatCard({ title, value, sub, color }) {
  return (
    <div className="admin-stat-card" style={{ borderTop:`3px solid ${color}` }}>
      <p style={{ fontSize:'0.72rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', color:'#6B7280', margin:'0 0 8px' }}>{title}</p>
      <p style={{ fontSize:'1.75rem', fontWeight:700, color:'#111827', lineHeight:1, margin:0 }}>{value}</p>
      <p style={{ fontSize:'0.8rem', color:'#6B7280', margin:'4px 0 0' }}>{sub}</p>
    </div>
  );
}

/* ── Dashboard ──────────────────────────────────────────────── */
function AdminDashboard({ onLogout }) {
  const [rsvpList, setRsvpList] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [loadErr,  setLoadErr]  = useState(null);
  const [filter,     setFilter]   = useState('all');
  const [catFilter,  setCatFilter] = useState('all');
  const [search,     setSearch]   = useState('');
  const [sortCol,    setSortCol]  = useState(null);
  const [sortDir,    setSortDir]  = useState('asc');

  const loadData = useCallback(() => {
    setLoading(true);
    setLoadErr(null);
    supabase.from('rsvp_responses').select('*').then(({ data, error }) => {
      if (error) setLoadErr(error.message);
      else setRsvpList(data || []);
      setLoading(false);
    });
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const mergedData = useMemo(() =>
    GUESTS.map(guest => ({
      guest,
      rsvp: rsvpList.find(r => norm(r.prenom) === norm(guest.prenom) && norm(r.nom) === norm(guest.nom)) || null,
    }))
  , [rsvpList]);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  };

  const displayData = useMemo(() => {
    let d = [...mergedData];
    if (filter === 'answered') d = d.filter(r => r.rsvp);
    if (filter === 'pending')  d = d.filter(r => !r.rsvp && (r.guest.category ?? 'adulte') === 'adulte');
    if (catFilter === 'adulte') d = d.filter(r => (r.guest.category ?? 'adulte') === 'adulte');
    if (catFilter === 'enfant') d = d.filter(r => r.guest.category === 'enfant');
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(r => r.guest.prenom.toLowerCase().includes(q) || (r.guest.nom || '').toLowerCase().includes(q));
    }
    return d.sort((a, b) => {
      if (!sortCol) {
        const aIsChild = a.guest.category === 'enfant';
        const bIsChild = b.guest.category === 'enfant';
        if (aIsChild && !bIsChild) return 1;
        if (!aIsChild && bIsChild) return -1;
        if (!aIsChild && !bIsChild) {
          if (!a.rsvp && b.rsvp) return -1;
          if (a.rsvp && !b.rsvp) return 1;
        }
        return a.guest.prenom.localeCompare(b.guest.prenom);
      }
      const dir = sortDir === 'asc' ? 1 : -1;
      switch (sortCol) {
        case 'prenom':   return dir * a.guest.prenom.localeCompare(b.guest.prenom);
        case 'nom':      return dir * norm(a.guest.nom).localeCompare(norm(b.guest.nom));
        case 'category': return dir * (a.guest.category ?? 'adulte').localeCompare(b.guest.category ?? 'adulte');
        case 'status':   return dir * ((a.rsvp ? 1 : 0) - (b.rsvp ? 1 : 0));
        case 'mairie':   return dir * ((a.rsvp?.vient_mairie ? 1 : 0) - (b.rsvp?.vient_mairie ? 1 : 0));
        case 'diner':    return dir * ((a.rsvp?.vient_diner  ? 1 : 0) - (b.rsvp?.vient_diner  ? 1 : 0));
        case 'date': {
          const aT = a.rsvp ? new Date(a.rsvp.updated_at || a.rsvp.created_at).getTime() : 0;
          const bT = b.rsvp ? new Date(b.rsvp.updated_at || b.rsvp.created_at).getTime() : 0;
          return dir * (aT - bT);
        }
        default: return 0;
      }
    });
  }, [mergedData, filter, catFilter, search, sortCol, sortDir]);

  const exportCSV = useCallback(() => {
    const header = ['Prénom', 'Nom', 'Catégorie', 'Statut', 'Mairie', 'Dîner', 'Date réponse'];
    const rows = mergedData.map(({ guest, rsvp }) => {
      const isChild = guest.category === 'enfant';
      return [
        guest.prenom,
        guest.nom,
        isChild ? 'Enfant' : 'Adulte',
        isChild ? 'N/A' : (rsvp ? 'A répondu' : 'En attente'),
        isChild ? '' : (rsvp ? (rsvp.vient_mairie ? 'Oui' : 'Non') : ''),
        isChild ? '' : (rsvp ? (rsvp.vient_diner  ? 'Oui' : 'Non') : ''),
        isChild ? '' : (rsvp ? formatDate(rsvp.updated_at || rsvp.created_at) : ''),
      ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    });

    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvp_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [mergedData]);

  // Stats
  const totalGuests  = GUESTS.length;
  const nbAdultes    = GUESTS.filter(g => (g.category ?? 'adulte') === 'adulte').length;
  const nbEnfants    = GUESTS.filter(g => g.category === 'enfant').length;
  const answered     = mergedData.filter(r => r.rsvp && (r.guest.category ?? 'adulte') === 'adulte').length;
  const mairie       = mergedData.filter(r => r.rsvp?.vient_mairie);
  const diner        = mergedData.filter(r => r.rsvp?.vient_diner);
  const pct          = nbAdultes ? Math.round((answered / nbAdultes) * 100) : 0;

  const thStyle = (col) => ({
    padding: '12px 14px',
    textAlign: 'left',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.07em',
    color: '#6B7280',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    background: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  });

  const tdStyle = { padding: '11px 14px', fontSize: '0.88rem', color: '#374151', borderBottom: '1px solid #F3F4F6', verticalAlign: 'middle' };

  return (
    <div className="admin-layout">

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-info">
            <span className="admin-header-name">Joao Gabriel &amp; Isabella</span>
            <span className="admin-header-sep" aria-hidden="true">·</span>
            <span className="admin-header-deadline">Date limite RSVP : <strong>15 juin 2026</strong></span>
          </div>
          <div className="admin-header-actions">
            <button
              onClick={loadData}
              title="Actualiser"
              style={{ background:'none', border:'1px solid #E5E7EB', borderRadius:8, padding:'6px 14px', fontSize:'0.82rem', color:'#374151', cursor:'pointer', minHeight:36, fontFamily:'inherit' }}
            >
              ↻ Actualiser
            </button>
            <button
              onClick={onLogout}
              style={{ background:'#F3F4F6', border:'none', borderRadius:8, padding:'7px 16px', fontSize:'0.82rem', color:'#374151', cursor:'pointer', fontWeight:600, minHeight:36, fontFamily:'inherit' }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">

        {/* Title */}
        <h1 style={{ fontSize:'1.4rem', fontWeight:700, color:'#111827', margin:'0 0 24px' }}>
          Tableau de bord
        </h1>

        {/* Stats */}
        <div className="admin-stats-grid">
          <StatCard title="Invités" value={totalGuests} sub={`${nbAdultes} adulte${nbAdultes > 1 ? 's' : ''} / ${nbEnfants} enfant${nbEnfants > 1 ? 's' : ''}`} color="#3A578C" />
          <StatCard title="Ont répondu" value={`${answered} / ${nbAdultes}`} sub={`${pct} % des adultes`} color="#059669" />
          <StatCard title="Viennent à la mairie" value={mairie.length} sub={`adulte${mairie.length !== 1 ? 's' : ''} confirmé${mairie.length !== 1 ? 's' : ''}`} color="#D97706" />
          <StatCard title="Viennent au dîner"   value={diner.length}  sub={`adulte${diner.length  !== 1 ? 's' : ''} confirmé${diner.length  !== 1 ? 's' : ''}`} color="#7C3AED" />
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <div className="admin-toolbar-filters">
            {[['all', 'Tous'], ['answered', 'A répondu'], ['pending', 'En attente']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{
                padding: '6px 16px', borderRadius: 8, minHeight: 36,
                border: filter === val ? '1.5px solid #3A578C' : '1px solid #E5E7EB',
                background: filter === val ? '#EEF2FF' : 'white',
                color: filter === val ? '#3A578C' : '#374151',
                fontWeight: filter === val ? 700 : 400,
                fontSize: '0.84rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {label}
              </button>
            ))}
            <span style={{ borderLeft: '1px solid #E5E7EB', margin: '4px 2px', alignSelf: 'stretch' }} />
            {[['all', 'Tous'], ['adulte', 'Adultes'], ['enfant', 'Enfants']].map(([val, label]) => (
              <button key={val} onClick={() => setCatFilter(val)} style={{
                padding: '6px 16px', borderRadius: 8, minHeight: 36,
                border: catFilter === val ? '1.5px solid #B45309' : '1px solid #E5E7EB',
                background: catFilter === val ? '#FEF3C7' : 'white',
                color: catFilter === val ? '#B45309' : '#374151',
                fontWeight: catFilter === val ? 700 : 400,
                fontSize: '0.84rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                {label}
              </button>
            ))}
          </div>
          <div className="admin-toolbar-right">
            <input
              type="text"
              className="admin-search"
              placeholder="Rechercher…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button
              onClick={exportCSV}
              style={{ padding:'7px 16px', background:'#3A578C', color:'white', border:'none', borderRadius:8, fontSize:'0.84rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit', minHeight:36, whiteSpace:'nowrap' }}
            >
              ↓ Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        {loadErr ? (
          <div style={{ background:'#FEF2F2', border:'1px solid #FCA5A5', borderRadius:8, padding:'16px 20px', color:'#B91C1C', fontSize:'0.88rem' }}>
            Erreur Supabase : {loadErr}
          </div>
        ) : loading ? (
          <div style={{ textAlign:'center', padding:60, color:'#6B7280' }}>Chargement…</div>
        ) : (
          <div className="admin-table-wrapper">
            <table style={{ borderCollapse:'collapse', width:'100%', minWidth:760 }}>
              <thead>
                <tr>
                  {[
                    ['prenom', 'Prénom'],
                    ['nom', 'Nom'],
                    ['category', 'Catégorie'],
                    ['status', 'Statut'],
                    ['mairie', 'Mairie'],
                    ['diner', 'Dîner'],
                    ['date', 'Réponse'],
                  ].map(([col, label]) => (
                    <th key={label} style={thStyle(col)} onClick={() => handleSort(col)}>
                      {label}
                      <SortIcon col={col} sortCol={sortCol} sortDir={sortDir} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ ...tdStyle, textAlign:'center', color:'#9CA3AF', padding:'32px 14px' }}>
                      Aucun résultat
                    </td>
                  </tr>
                )}
                {displayData.map(({ guest, rsvp }, i) => {
                  const isChild = guest.category === 'enfant';
                  return (
                    <tr key={guest.id} style={{ background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                      <td style={{ ...tdStyle, fontWeight:600 }}>{guest.prenom}</td>
                      <td style={tdStyle}>{guest.nom || <span style={{ color:'#9CA3AF' }}>—</span>}</td>
                      <td style={tdStyle}><CategoryBadge category={guest.category ?? 'adulte'} /></td>
                      <td style={tdStyle}><StatusBadge hasRsvp={!!rsvp} isChild={isChild} /></td>
                      <td style={{ ...tdStyle, textAlign:'center' }}>
                        {isChild ? <span style={{ color:'#9CA3AF' }}>—</span> : <BoolCell value={rsvp?.vient_mairie} />}
                      </td>
                      <td style={{ ...tdStyle, textAlign:'center' }}>
                        {isChild ? <span style={{ color:'#9CA3AF' }}>—</span> : <BoolCell value={rsvp?.vient_diner} />}
                      </td>
                      <td style={{ ...tdStyle, color:'#6B7280', fontSize:'0.82rem', whiteSpace:'nowrap' }}>
                        {isChild ? <span style={{ color:'#D1D5DB' }}>—</span> : (rsvp ? formatDate(rsvp.updated_at || rsvp.created_at) : <span style={{ color:'#D1D5DB' }}>—</span>)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding:'10px 16px', borderTop:'1px solid #F3F4F6', fontSize:'0.78rem', color:'#9CA3AF' }}>
              {displayData.length} invité{displayData.length > 1 ? 's' : ''} affiché{displayData.length > 1 ? 's' : ''}
              {displayData.length !== totalGuests && ` (sur ${totalGuests} au total)`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Entry point ─────────────────────────────────────────────── */
export default function AdminPage() {
  const [auth, setAuth] = useState(sessionStorage.getItem('admin_auth') === 'true');

  if (!auth) return <AdminLogin onAuth={() => setAuth(true)} />;
  return <AdminDashboard onLogout={() => { sessionStorage.removeItem('admin_auth'); setAuth(false); }} />;
}
