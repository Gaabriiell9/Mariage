// ============================================================
//  LISTE DES INVITÉS — Modifier ici pour ajouter/retirer
// ============================================================

export const GUESTS = [
  // --- Famille 1 : SILVA FRANCA ---
  { id: 1, prenom: "Susana", nom: "Silva Franca", password: "SILVAFRANCA" },
  { id: 2, prenom: "Joao", nom: "Silva Franca", password: "SILVAFRANCA" },
  { id: 3, prenom: "Léo", nom: "De Jesus", password: "SILVAFRANCA" },
  { id: 4, prenom: "Grazielle", nom: "Silva Franca", password: "SILVAFRANCA" },
  { id: 5, prenom: "Clawendz", nom: "", password: "SILVAFRANCA" },

  // --- Famille 2 : RIBEIRO BORGES / SOUZA ---
  { id: 6, prenom: "Ricardo", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 7, prenom: "Miriah", nom: "Santos Souza", password: "RIBEIROBORGES" },
  { id: 8, prenom: "Anna Luiza", nom: "Souza Fernandes", password: "RIBEIROBORGES" },
  { id: 9, prenom: "Maria Eduarda", nom: "Souza Fernandes", password: "SOUZAFERNANDES" },

  // --- Individuel ---
  { id: 10, prenom: "Gabriel Lionel", nom: "Ferreira Dias", password: "FERREIRADIAS" },
  { id: 11, prenom: "Léon", nom: "Maia", password: "MAIA" },
  { id: 12, prenom: "Addrielly", nom: "Leroy", password: "LEROY" },

  // --- Famille SENA ---
  { id: 13, prenom: "Jeff", nom: "Sena", password: "SENA" },
  { id: 14, prenom: "Victoria", nom: "Sena", password: "SENA" },
  { id: 15, prenom: "Abigail", nom: "Sena", password: "SENA" },
  { id: 16, prenom: "Anaia", nom: "Sena", password: "SENA" },

  // --- Famille LONG ---
  { id: 17, prenom: "Robert", nom: "Long", password: "LONG" },
  { id: 18, prenom: "Marcineide", nom: "Long", password: "LONG" },

  // --- Famille SAMPAIO ---
  { id: 19, prenom: "Wando", nom: "Sampaio", password: "SAMPAIO" },
  { id: 20, prenom: "Joelise", nom: "Sampaio", password: "SAMPAIO" },
  { id: 21, prenom: "Gabi", nom: "Sampaio", password: "SAMPAIO" },

  // --- Famille LACERDA ---
  { id: 22, prenom: "Juliane", nom: "Lacerda", password: "LACERDA" },
  { id: 23, prenom: "Marcos", nom: "Lacerda", password: "LACERDA" },
  { id: 24, prenom: "Maelly", nom: "Lacerda", password: "LACERDA" },

  // --- Famille PHARAMP ---
  { id: 25, prenom: "Audrey", nom: "Pharamp", password: "PHARAMP" },
  { id: 26, prenom: "Roberto", nom: "", password: "PHARAMP" },

  // --- Famille LILY ---
  { id: 27, prenom: "Lily", nom: "", password: "LILY" },
  { id: 28, prenom: "Francisco", nom: "", password: "LILY" },

  // --- Famille RIBEIRO BORGES (Gilmar) ---
  { id: 29, prenom: "Gilmar", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 30, prenom: "Amanda", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 31, prenom: "Clarisse", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 32, prenom: "Samuel", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },

  // --- Famille RIBEIRO BORGES (Odineia) ---
  { id: 33, prenom: "Odineia", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 34, prenom: "Bastiao", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },

  // --- Famille RIBEIRO BORGES (Elidiane) ---
  { id: 35, prenom: "Elidiane", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 36, prenom: "Josimar", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },

  // --- Famille RIBEIRO BORGES (Josiane) ---
  { id: 37, prenom: "Josiane", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },
  { id: 38, prenom: "William", nom: "Ribeiro Borges", password: "RIBEIROBORGES" },

  // --- Individuels ---
  { id: 39, prenom: "Naomie", nom: "", password: "NAOMIE" },
  { id: 40, prenom: "Isabelle", nom: "Da Paixao", password: "DAPAIXAO" },
  { id: 41, prenom: "Mathilde", nom: "", password: "MATHILDE" },
];

// ============================================================
//  INFORMATIONS DU MARIAGE — À compléter avec vos vraies infos
// ============================================================

export const WEDDING_INFO = {
  marie1: "Joao Gabriel",
  marie2: "Isabella",
  date: "Samedi 11 Juillet 2026",
  dateISO: "2026-07-11",

  ceremonie: {
    heure: "15h",              // ← Modifier
    lieu: "Carbet du PK6",
    adresse: "PK6, Guyane",          // ← Modifier si besoin
  },

  reception: {
    heure: "15h",              // ← Modifier
    lieu: "Carbet du PK6",
    adresse: "PK6, Guyane",          // ← Modifier si besoin
  },

  dresscode: "Tenue de soirée élégante",  // ← Modifier si besoin

  rsvpDate: "À préciser",                 // ← Modifier
  contact: "À préciser",                  // ← Modifier (email ou numéro)

  messagePersonnel:
    "Votre présence est le plus beau cadeau que vous puissiez nous offrir. Nous avons hâte de célébrer ce moment inoubliable avec vous.",
};
