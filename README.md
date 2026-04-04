# 💍 Site Mariage — Invités

Site web personnalisé pour les invités de votre mariage. Chaque invité cherche son nom, se connecte avec le mot de passe de sa famille, et accède à tous les détails de la célébration.

## 🚀 Démarrage rapide

```bash
npm install
npm run dev
```

Le site sera disponible sur http://localhost:5173

---

## ✏️ Personnaliser le site

Tout ce que vous avez à modifier se trouve dans **un seul fichier** :

```
src/data/guests.js
```

### 1. Remplir les informations du mariage

Dans `WEDDING_INFO`, remplacez les placeholders :

```js
export const WEDDING_INFO = {
  marie1: "Votre Prénom",         // ← prénom marié·e 1
  marie2: "Prénom du conjoint",   // ← prénom marié·e 2
  date: "Samedi 14 Juin 2025",
  dateISO: "2025-06-14",          // pour le compte à rebours
  ceremonie: {
    heure: "15h00",
    lieu: "Église Saint-Michel",
    adresse: "12 rue de l'Église, Bordeaux",
  },
  reception: {
    heure: "19h30",
    lieu: "Château des Vignes",
    adresse: "Route des Châteaux, Margaux",
  },
  dresscode: "Tenue de soirée élégante",
  rsvpDate: "1er Mai 2025",
  contact: "mariage@exemple.com",
};
```

---

## 🔐 Table des mots de passe

| Invité(s)                            | Mot de passe      |
|--------------------------------------|-------------------|
| Susana, Joao, Léo, Grazielle, Clawendz | **SILVAFRANCA**   |
| Ricardo, Miriah, Anna Luiza, Maria Eduarda | **RIBEIROBORGES** |
| Gabriel Lionel Ferreira Dias         | **FERREIRADIAS**  |
| Léon Maia                            | **MAIA**          |
| Addrielly Leroy                      | **LEROY**         |
| Jeff, Victoria, Abigail, Anaia Sena  | **SENA**          |
| Robert, Marcineide Long              | **LONG**          |
| Wando, Joelise, Gabi Sampaio         | **SAMPAIO**       |
| Juliane, Marcos, Maelly Lacerda      | **LACERDA**       |
| Audrey Pharamp, Roberto              | **PHARAMP**       |
| Lily, Francisco                      | **LILY**          |
| Gilmar, Amanda, Clarisse, Samuel Ribeiro Borges | **RIBEIROBORGES** |
| Odineia, Bastiao Ribeiro Borges      | **RIBEIROBORGES** |
| Elidiane, Josimar Ribeiro Borges     | **RIBEIROBORGES** |
| Josiane, William Ribeiro Borges      | **RIBEIROBORGES** |
| Naomie                               | **NAOMIE**        |
| Isabelle Da Paixao                   | **DAPAIXAO**      |
| Mathilde                             | **MATHILDE**      |

> **Note :** Le mot de passe s'entre en majuscules, sans espaces ni accents.
> Toutes les branches RIBEIRO BORGES partagent le même mot de passe.

---

## 📦 Build pour production

```bash
npm run build
```

Le dossier `dist/` peut être déployé sur n'importe quel hébergeur statique
(Vercel, Netlify, Cloudflare Pages, GitHub Pages, votre serveur...).

---

## 🛠 Stack technique

- **React 18** + **Vite 5**
- Zéro dépendance UI externe
- Polices Google Fonts (Cormorant Garamond, Dancing Script, Nunito)
- Animations CSS pures
