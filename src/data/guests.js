// ============================================================
//  LISTE DES INVITÉS — Modifier ici pour ajouter/retirer
// ============================================================

export const GUESTS = [
  // --- Famille SILVA FRANCA ---
  { id: 'leo', prenom: 'Léo', nom: '', password: 'DEJESUS', category: 'adulte' },
  { id: 'grazy', prenom: 'Grazy', nom: '', password: 'SILVAFRANCA', category: 'adulte' },

  // --- Clawendz ---
  { id: 'clawendz', prenom: 'Clawendz', nom: '', password: 'FLEURISMAT', category: 'adulte' },

  // --- Famille RIBEIRO BORGES ---
  { id: 'ricardo', prenom: 'Ricardo', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'miriah', prenom: 'Miriah', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'gilmar', prenom: 'Gilmar', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'amanda', prenom: 'Amanda', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'odineia', prenom: 'Odineia', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'bastiao', prenom: 'Bastiao', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'elidiane', prenom: 'Elidiane', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'josimar', prenom: 'Josimar', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'josiane', prenom: 'Josiane', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },

  // --- Famille PHARAMP ---
  { id: 'audrey', prenom: 'Audrey', nom: '', password: 'PHARAMP', category: 'adulte' },
  { id: 'roberto', prenom: 'Roberto', nom: '', password: 'WINGRADE', category: 'adulte' },

  // --- Famille LONG ---
  { id: 'robert', prenom: 'Robert', nom: '', password: 'LONG', category: 'adulte' },
  { id: 'marcineid', prenom: 'Marcineid', nom: '', password: 'LONG', category: 'adulte' },

  // --- Famille SAMPAIO ---
  { id: 'wando', prenom: 'Wando', nom: '', password: 'SAMPAIO', category: 'adulte' },
  { id: 'joliese', prenom: 'Joliese', nom: '', password: 'SAMPAIO', category: 'adulte' },

  // --- Individuels ---
  { id: 'susy', prenom: 'Susy', nom: '', password: 'SILVAFRANCA', category: 'adulte' },
  { id: 'joao', prenom: 'Joao', nom: '', password: 'SILVAFRANCA', category: 'adulte' },
  { id: 'bia', prenom: 'Bia', nom: '', password: 'VALENTINSFARIAS', category: 'adulte' },
  { id: 'rikelbi', prenom: 'Rikelbi', nom: '', password: 'PINHEIROPEDROLEAL', category: 'adulte' },
  { id: 'anna-luiza', prenom: 'Anna Luiza', nom: '', password: 'SOUZAFERNANDES', category: 'adulte' },
  { id: 'maria-eduarda', prenom: 'Maria Eduarda', nom: '', password: 'SOUZAFERNANDES', category: 'adulte' },
  { id: 'william', prenom: 'William', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'clarisse', prenom: 'Clarisse', nom: '', password: 'RIBEIROBORGES', category: 'enfants' },
  { id: 'samuel', prenom: 'Samuel', nom: '', password: 'RIBEIROBORGES', category: 'adulte' },
  { id: 'mathilde', prenom: 'Mathilde', nom: '', password: 'CHAUDRUC', category: 'adulte' },
  { id: 'adrielly', prenom: 'Adrielly', nom: '', password: 'LEROY', category: 'adulte' },
  { id: 'leon', prenom: 'Léon', nom: '', password: 'MAIA', category: 'adulte' },
];

// ============================================================
//  INFORMATIONS DU MARIAGE
// ============================================================

export const WEDDING_INFO = {
  marie1: "Joao Gabriel",
  marie2: "Isabella",

  // Date du premier événement — utilisée pour le compte à rebours
  dateISO: "2026-06-27",

  // Date limite de réponse RSVP
  rsvpDeadline: "15 juin 2026",
  rsvpDeadlinePT: "15 de junho de 2026",

  evenements: {
    civil: {
      dateLabel: "Samedi 27 juin 2026",
      dateLabelPT: "Sábado, 27 de junho de 2026",
      heure: "11h00",
      lieu: "Mairie de Kourou",
      adresse: "Accueil Marie de Kourou",
    },
    diner: {
      dateLabel: "Samedi 27 juin 2026",
      dateLabelPT: "Sábado, 27 de junho de 2026",
      heure: "19h00",
      lieu: "Village Amérindien",
      adresse: "15 rue des Caribes, 97310 Kourou",
      dressCode: "Bleu / bleu clair",
      dressCodePT: "Azul / azul claro",
    },
  },
};
